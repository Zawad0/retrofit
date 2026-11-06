const Order = require('../models/Order');
const Product = require('../models/Product');
const STAGES = ['Placed', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered'];

async function getTracking(req, res) {
  try {
    const reference = String(req.params.reference || '').trim().toUpperCase();
    if (!/^RF-[A-F0-9]{6}$/.test(reference)) return res.status(400).json({ message: 'Enter a valid tracking reference.' });
    const order = await Order.findOne({ trackingReference: reference }).select('trackingReference orderReference status statusHistory createdAt');
    if (!order) return res.status(404).json({ message: 'No order found for this tracking reference.' });
    return res.json({ order });
  } catch (error) { return res.status(500).json({ message: 'Unable to load tracking details.' }); }
}

async function getOrderHistory(req, res) {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 }).select('trackingReference orderReference status statusHistory items total createdAt');
    return res.json({ orders });
  } catch (error) { return res.status(500).json({ message: 'Unable to load order history.' }); }
}

async function getSellerOrders(req, res) {
  try {
    const productIds = await Product.find({ seller: req.user._id }).distinct('_id');
    const orders = await Order.find({ 'items.product': { $in: productIds } }).sort({ createdAt: -1 }).select('trackingReference orderReference status statusHistory items total createdAt');
    return res.json({ orders });
  } catch (error) { return res.status(500).json({ message: 'Unable to load seller orders.' }); }
}

async function updateOrderStatus(req, res) {
  try {
    const { status } = req.body;
    if (!STAGES.includes(status)) return res.status(400).json({ message: 'Choose a valid next delivery stage.' });
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found.' });
    if (req.user.role !== 'admin') {
      if (req.user.role !== 'seller') return res.status(403).json({ message: 'Seller or admin access required.' });
      const productIds = order.items.map((item) => item.product).filter(Boolean);
      const ownsItem = await Product.exists({ _id: { $in: productIds }, seller: req.user._id });
      if (!ownsItem) return res.status(403).json({ message: 'You cannot update this order.' });
    }
    const currentStage = STAGES.includes(order.status) ? STAGES.indexOf(order.status) : 0;
    if (STAGES.indexOf(status) !== currentStage + 1) return res.status(409).json({ message: 'Order stages must be updated one step at a time.' });
    order.status = status;
    order.statusHistory.push({ status, changedAt: new Date(), changedBy: req.user._id });
    await order.save();
    return res.json({ order });
  } catch (error) { return res.status(500).json({ message: 'Unable to update order status.' }); }
}

module.exports = { getTracking, getOrderHistory, getSellerOrders, updateOrderStatus };
