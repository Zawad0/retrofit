const mongoose = require("mongoose");
const Order = require("../models/Order");
const Product = require("../models/Product");

// Create new order
const createOrder = async (req, res) => {
  try {
    const { items, deliveryDetails } = req.body;
    const paymentMethod = req.body.paymentMethod || "cash";
    const bkashInput = req.body.bkashDetails || {};

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Order must contain at least one item" });
    }

    if (
      !deliveryDetails ||
      !deliveryDetails.fullName ||
      !deliveryDetails.mobileNumber ||
      !deliveryDetails.address
    ) {
      return res
        .status(400)
        .json({ message: "Please provide complete delivery details" });
    }
    if (!['cash', 'bkash'].includes(paymentMethod)) return res.status(400).json({ message: "Choose Cash on delivery or bKash" });
    if (paymentMethod === 'bkash') {
      if (!process.env.BKASH_MERCHANT_NUMBER) return res.status(503).json({ message: "bKash merchant payments are not configured yet." });
      if (!/^01[3-9]\d{8}$/.test(String(bkashInput.payerNumber || '').replace(/[\s-]/g, '')) || !/^[A-Za-z0-9-]{6,30}$/.test(String(bkashInput.transactionId || '').trim())) {
        return res.status(400).json({ message: "Enter a valid bKash sender number and Transaction ID (TrxID)." });
      }
    }

    if (items.length > 50) return res.status(400).json({ message: "An order can contain at most 50 items" });
    const normalizedItems = [];
    for (const item of items) {
      const productId = item.product || item._id;
      const quantity = Number(item.quantity);
      if (!mongoose.Types.ObjectId.isValid(productId) || !Number.isInteger(quantity) || quantity < 1 || quantity > 20) {
        return res.status(400).json({ message: "One or more cart items are invalid" });
      }
      const product = await Product.findOne({ _id: productId, status: "available", moderationStatus: "approved" }).lean();
      if (!product) return res.status(409).json({ message: "A cart item is no longer available. Refresh your cart." });
      normalizedItems.push({ product: product._id, name: product.name, brand: product.brand || "", size: product.size || "", price: product.price, quantity, image: product.image || product.imageUrl || "", group: product.group || "", type: product.type || product.style || "" });
    }

    const subtotal = normalizedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const shipping = subtotal >= 1500 ? 0 : 100;
    const vat = Math.round(subtotal * 0.05);
    const total = subtotal + shipping + vat;

    // Generate unique order reference
    const timestampSuffix = String(Date.now()).slice(-6);
    const randomDigits = Math.floor(100 + Math.random() * 900);
    const orderReference = String(req.body.orderReference || `RF-${timestampSuffix}${randomDigits}`).trim();
    if (!/^RF-\d{9}$/.test(orderReference)) return res.status(400).json({ message: "Invalid order reference" });

    const order = await Order.create({
      user: req.user ? req.user._id : undefined,
      orderReference,
      items: normalizedItems,
      deliveryDetails: {
        fullName: deliveryDetails.fullName,
        mobileNumber: deliveryDetails.mobileNumber,
        address: deliveryDetails.address,
        city: deliveryDetails.city || "Dhaka",
      },
      paymentMethod,
      bkashDetails: paymentMethod === 'bkash' ? {
        payerNumber: String(bkashInput.payerNumber).replace(/[\s-]/g, ''),
        transactionId: String(bkashInput.transactionId).trim().toUpperCase(),
        merchantNumber: process.env.BKASH_MERCHANT_NUMBER,
        paymentReference: orderReference,
      } : undefined,
      paymentStatus: "pending",
      subtotal,
      shipping,
      vat,
      total,
      status: "Pending",
    });

    res.status(201).json(order);
  } catch (error) {
    if (error.code === 11000 && error.keyPattern?.['bkashDetails.transactionId']) {
      return res.status(409).json({ message: "This bKash Transaction ID has already been submitted." });
    }
    res.status(500).json({ message: error.message });
  }
};

// Get logged-in user's orders
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get order by reference or ID
const getOrderByReference = async (req, res) => {
  try {
    const { reference } = req.params;
    let order = await Order.findOne({ orderReference: reference });

    if (!order && reference.match(/^[0-9a-fA-F]{24}$/)) {
      order = await Order.findById(reference);
    }

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // A public reference lookup must not disclose buyer contact or delivery address.
    res.status(200).json({
      _id: order._id,
      orderReference: order.orderReference,
      items: order.items,
      paymentMethod: order.paymentMethod,
      paymentStatus: order.paymentStatus,
      subtotal: order.subtotal,
      shipping: order.shipping,
      vat: order.vat,
      total: order.total,
      status: order.status,
      createdAt: order.createdAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getOrderByReference,
};
