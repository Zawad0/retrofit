const Product = require('../models/Product');
const Order = require('../models/Order');
const cloudinary = require('../config/cloudinary');

exports.createUploadSignature = async (req, res) => {
  try {
    const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_UPLOAD_PRESET } = process.env;
    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET || !CLOUDINARY_UPLOAD_PRESET) return res.status(503).json({ message: 'Cloudinary is not configured on the server' });
    const timestamp = Math.floor(Date.now() / 1000);
    const folder = `retrofit/sellers/${req.user._id}`;
    const params = { timestamp, folder };
    if (CLOUDINARY_UPLOAD_PRESET) params.upload_preset = CLOUDINARY_UPLOAD_PRESET;
    const signature = cloudinary.utils.api_sign_request(params, CLOUDINARY_API_SECRET);
    res.json({ timestamp, folder, signature, apiKey: CLOUDINARY_API_KEY, cloudName: CLOUDINARY_CLOUD_NAME, uploadPreset: CLOUDINARY_UPLOAD_PRESET || null });
  } catch (error) { res.status(500).json({ message: 'Could not create Cloudinary upload signature' }); }
};

exports.getMyListings = async (req, res) => {
  try { res.json(await Product.find({ seller: req.user._id }).sort({ createdAt: -1 })); }
  catch (error) { res.status(500).json({ message: error.message }); }
};

exports.getMySales = async (req, res) => {
  try {
    const products = await Product.find({ seller: req.user._id }).select('_id name price image moderationStatus status');
    const ids = products.map((product) => product._id);
    const sales = ids.length ? await Order.aggregate([
      { $match: { 'items.product': { $in: ids }, status: { $ne: 'Cancelled' } } },
      { $unwind: '$items' },
      { $match: { 'items.product': { $in: ids } } },
      { $group: { _id: '$items.product', units: { $sum: '$items.quantity' }, revenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } }, orderIds: { $addToSet: '$_id' } } },
      { $project: { _id: 0, product: '$_id', units: 1, revenue: 1, orders: { $size: '$orderIds' } } },
    ]) : [];
    res.json({ products, sales });
  } catch (error) { res.status(500).json({ message: error.message }); }
};
