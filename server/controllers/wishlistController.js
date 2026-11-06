const mongoose = require('mongoose');
const User = require('../models/User');
const Product = require('../models/Product');

exports.getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate({ path: 'wishlist', match: { status: 'available', moderationStatus: 'approved' } });
    res.json({ products: user?.wishlist || [] });
  } catch (error) { res.status(500).json({ message: 'Could not load wishlist' }); }
};
exports.toggleWishlist = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.productId)) return res.status(400).json({ message: 'Invalid product id' });
    const product = await Product.findOne({ _id: req.params.productId, status: 'available', moderationStatus: 'approved' });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    const user = await User.findById(req.user._id);
    const exists = user.wishlist.some(id => String(id) === String(product._id));
    if (exists) user.wishlist.pull(product._id); else user.wishlist.addToSet(product._id);
    await user.save();
    res.json({ saved: !exists, productId: product._id });
  } catch (error) { res.status(500).json({ message: 'Could not update wishlist' }); }
};
exports.removeWishlistItem = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.productId)) return res.status(400).json({ message: 'Invalid product id' });
    await User.updateOne({ _id: req.user._id }, { $pull: { wishlist: req.params.productId } });
    res.json({ saved: false, productId: req.params.productId });
  } catch (error) { res.status(500).json({ message: 'Could not remove wishlist item' }); }
};
