const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');

const getStats = async (_req, res) => {
  try {
    const [totalUsers, totalOrders, revenue, pendingProducts] = await Promise.all([
      User.countDocuments(),
      Order.countDocuments(),
      Order.aggregate([
        // Revenue reflects completed payments only; pending cash/bKash orders are not revenue.
        { $match: { status: { $ne: 'Cancelled' }, paymentStatus: 'paid' } },
        { $group: { _id: null, total: { $sum: '$total' } } },
      ]),
      Product.countDocuments({ moderationStatus: 'pending' }),
    ]);
    res.json({ totalUsers, totalOrders, totalRevenue: revenue[0]?.total || 0, pendingProducts });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const getUsers = async (_req, res) => {
  try { res.json(await User.find().select('-password').sort({ createdAt: -1 })); }
  catch (error) { res.status(500).json({ message: error.message }); }
};

const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    if (!['buyer', 'seller'].includes(role)) return res.status(400).json({ message: 'Role must be buyer or seller' });
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.role === 'admin') return res.status(400).json({ message: 'Admin roles cannot be changed here' });
    user.role = role;
    if (role === 'seller') user.sellerRequested = false;
    await user.save();
    res.json({ _id: user._id, name: user.name, email: user.email, role: user.role, sellerRequested: user.sellerRequested });
  } catch (error) { res.status(400).json({ message: error.message }); }
};

const deleteUser = async (req, res) => {
  try {
    if (req.params.id === req.user.id) return res.status(400).json({ message: 'Cannot delete your own admin account' });
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.role === 'admin') return res.status(400).json({ message: 'Admin accounts cannot be removed here' });
    await user.deleteOne();
    res.json({ message: 'User removed' });
  } catch (error) { res.status(400).json({ message: error.message }); }
};

const getModerationProducts = async (_req, res) => {
  try {
    res.json(await Product.find({ moderationStatus: { $in: ['pending', 'rejected'] } }).populate('seller', 'name email').sort({ createdAt: -1 }));
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const getModerationProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('seller', 'name email');
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (_error) { res.status(400).json({ message: 'Invalid product ID' }); }
};

const moderateProduct = async (req, res) => {
  try {
    const { moderationStatus } = req.body;
    if (!['approved', 'rejected'].includes(moderationStatus)) return res.status(400).json({ message: 'Choose approved or rejected' });
    const product = await Product.findByIdAndUpdate(req.params.id, { moderationStatus }, { new: true, runValidators: true }).populate('seller', 'name email');
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) { res.status(400).json({ message: error.message }); }
};

const getOrders = async (_req, res) => {
  try { res.json(await Order.find().populate('user', 'name email').sort({ createdAt: -1 })); }
  catch (error) { res.status(500).json({ message: error.message }); }
};

const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (_error) { res.status(400).json({ message: 'Invalid order ID' }); }
};

const updateOrder = async (req, res) => {
  try {
    if (req.body.paymentStatus !== undefined) {
      if (req.body.paymentStatus !== 'paid') return res.status(400).json({ message: 'Payment status can only be verified as paid' });
      const order = await Order.findById(req.params.id);
      if (!order) return res.status(404).json({ message: 'Order not found' });
      if (order.paymentMethod !== 'bkash' || !order.bkashDetails?.transactionId) return res.status(400).json({ message: 'Only bKash orders with a submitted TrxID can be verified' });
      order.paymentStatus = 'paid';
      await order.save();
      return res.json(await order.populate('user', 'name email'));
    }
    const allowedStatuses = ['Placed', 'Pending', 'Confirmed', 'Processing', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled'];
    if (!allowedStatuses.includes(req.body.status)) return res.status(400).json({ message: 'Invalid order status' });
    const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true, runValidators: true }).populate('user', 'name email');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (error) { res.status(400).json({ message: error.message }); }
};

module.exports = { getStats, getUsers, updateUserRole, deleteUser, getModerationProducts, getModerationProduct, moderateProduct, getOrders, getOrder, updateOrder };
