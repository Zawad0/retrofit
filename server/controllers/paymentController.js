const mongoose = require('mongoose');
const Stripe = require('stripe');
const Order = require('../models/Order');
const Product = require('../models/Product');

const stripe = () => {
  if (!process.env.STRIPE_SECRET_KEY) throw new Error('Stripe is not configured');
  return new Stripe(process.env.STRIPE_SECRET_KEY);
};

// Never accept prices/totals from the browser: load current prices from MongoDB.
const createPaymentIntent = async (req, res) => {
  let order;
  let intentCreated = false;
  try {
    const { items, deliveryDetails } = req.body;
    if (!Array.isArray(items) || items.length === 0 || items.length > 50) {
      return res.status(400).json({ message: 'Provide between 1 and 50 order items.' });
    }
    if (!deliveryDetails || !['fullName', 'mobileNumber', 'address'].every((key) => typeof deliveryDetails[key] === 'string' && deliveryDetails[key].trim())) {
      return res.status(400).json({ message: 'Complete delivery details are required.' });
    }

    const normalized = [];
    for (const item of items) {
      const productId = item.product || item._id;
      const quantity = Number(item.quantity);
      if (!mongoose.Types.ObjectId.isValid(productId) || !Number.isInteger(quantity) || quantity < 1 || quantity > 20) {
        return res.status(400).json({ message: 'One or more cart items are invalid.' });
      }
      const product = await Product.findOne({ _id: productId, status: 'available', moderationStatus: 'approved' }).lean();
      if (!product) return res.status(409).json({ message: 'A cart item is no longer available. Refresh your cart.' });
      if (!Number.isFinite(product.price) || product.price <= 0) return res.status(409).json({ message: 'A cart item has an invalid price.' });
      normalized.push({ product: product._id, name: product.name, brand: product.brand || '', size: product.size || '', price: product.price, quantity, image: product.image || product.imageUrl || '', group: product.group || '', type: product.type || product.style || '' });
    }

    const subtotal = normalized.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal >= 1500 ? 0 : 100;
    const vat = Math.round(subtotal * 0.05);
    const total = subtotal + shipping + vat;
    // BDT is a two-decimal Stripe currency; product prices here are whole taka.
    const amount = Math.round(total * 100);
    if (!Number.isSafeInteger(amount) || amount < 50 || amount > 99999999) {
      return res.status(400).json({ message: 'Order total is outside Stripe limits.' });
    }

    const orderReference = `RF-${Date.now().toString().slice(-6)}${Math.floor(100 + Math.random() * 900)}`;
    order = await Order.create({ user: req.user?._id, orderReference, items: normalized,
      deliveryDetails: { fullName: deliveryDetails.fullName.trim(), mobileNumber: deliveryDetails.mobileNumber.trim(), address: deliveryDetails.address.trim(), city: String(deliveryDetails.city || 'Dhaka').trim() },
      paymentMethod: 'stripe', paymentStatus: 'pending', subtotal, shipping, vat, total, status: 'Pending' });

    const intent = await stripe().paymentIntents.create({
      amount, currency: (process.env.STRIPE_CURRENCY || 'bdt').toLowerCase(),
      payment_method_types: ['card'],
      metadata: { orderId: order._id.toString(), orderReference: order.orderReference },
    }, { idempotencyKey: `retrofit-order-${order._id}` });
    intentCreated = true;
    // Narrow update avoids overwriting a webhook that could arrive immediately.
    await Order.updateOne({ _id: order._id }, { $set: { stripePaymentIntentId: intent.id } });
    return res.status(201).json({ clientSecret: intent.client_secret, orderReference: order.orderReference, subtotal, shipping, vat, total, currency: intent.currency });
  } catch (error) {
    if (order && !intentCreated) await Order.deleteOne({ _id: order._id }).catch(() => {});
    console.error('Create payment intent failed:', error.message);
    return res.status(500).json({ message: 'Unable to start payment. Please try again.' });
  }
};

const handleStripeWebhook = async (req, res) => {
  let event;
  try {
    if (!process.env.STRIPE_WEBHOOK_SECRET) return res.status(503).send('Webhook is not configured');
    event = stripe().webhooks.constructEvent(req.body, req.headers['stripe-signature'], process.env.STRIPE_WEBHOOK_SECRET);
  } catch (error) {
    return res.status(400).send(`Webhook signature verification failed: ${error.message}`);
  }
  try {
    if (event.type === 'payment_intent.succeeded') {
      const intent = event.data.object;
      const orderId = intent.metadata?.orderId;
      if (!mongoose.Types.ObjectId.isValid(orderId)) return res.status(400).send('Invalid order metadata');
      const expectedCurrency = (process.env.STRIPE_CURRENCY || 'bdt').toLowerCase();
      const targetOrder = await Order.findById(orderId).select('total stripePaymentIntentId paymentStatus').lean();
      if (!targetOrder) return res.status(500).send('Order not found; retry webhook');
      if (targetOrder.stripePaymentIntentId && targetOrder.stripePaymentIntentId !== intent.id) return res.status(400).send('Payment intent does not match order');
      if (intent.currency !== expectedCurrency || intent.amount !== Math.round(targetOrder.total * 100)) return res.status(400).send('Payment amount or currency does not match order');
      await Order.updateOne({ _id: orderId, paymentStatus: 'pending', $or: [{ stripePaymentIntentId: intent.id }, { stripePaymentIntentId: null }] }, { $set: { stripePaymentIntentId: intent.id, paymentStatus: 'paid', status: 'Confirmed' } });
    }
    if (event.type === 'payment_intent.payment_failed') {
      const intent = event.data.object;
      if (mongoose.Types.ObjectId.isValid(intent.metadata?.orderId)) {
        await Order.updateOne({ _id: intent.metadata.orderId, paymentStatus: 'pending', $or: [{ stripePaymentIntentId: intent.id }, { stripePaymentIntentId: null }] }, { $set: { stripePaymentIntentId: intent.id, paymentStatus: 'failed' } });
      }
    }
    return res.json({ received: true });
  } catch (error) {
    console.error('Stripe webhook processing failed:', error.message);
    return res.status(500).send('Webhook processing failed');
  }
};

module.exports = { createPaymentIntent, handleStripeWebhook };
