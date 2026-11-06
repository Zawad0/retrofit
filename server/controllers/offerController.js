const Offer = require('../models/Offer');
const Product = require('../models/Product');
const mongoose = require('mongoose');

exports.createOffer = async (req, res) => {
  try {
    const offeredPrice = Number(req.body.offeredPrice);
    const product = await Product.findById(req.body.product);
    if (!product || product.status !== 'available' || product.moderationStatus !== 'approved') return res.status(404).json({ message: 'This item is not available for offers' });
    if (!mongoose.isValidObjectId(req.body.product) || !Number.isFinite(offeredPrice) || offeredPrice <= 0 || offeredPrice >= product.price) return res.status(400).json({ message: 'Enter a valid offer below the asking price' });
    if (String(product.seller) === String(req.user._id)) return res.status(403).json({ message: 'You cannot make an offer on your own item' });
    const offer = await Offer.create({ product: product._id, buyer: req.user._id, seller: product.seller, offeredPrice });
    res.status(201).json({ offer });
  } catch (error) { res.status(500).json({ message: 'Could not submit offer' }); }
};

exports.getSellerOffers = async (req, res) => {
  try {
    const filter = req.user.role === 'admin' ? {} : { seller: req.user._id };
    const offers = await Offer.find(filter).populate('product', 'name price image imageUrl').populate('buyer', 'name email').sort({ createdAt: -1 });
    res.json({ offers });
  } catch (error) { res.status(500).json({ message: 'Could not load offers' }); }
};

exports.updateOffer = async (req, res) => {
  try {
    if (!['Accepted', 'Rejected'].includes(req.body.status)) return res.status(400).json({ message: 'Status must be Accepted or Rejected' });
    const offer = await Offer.findById(req.params.id);
    if (!offer) return res.status(404).json({ message: 'Offer not found' });
    if (req.user.role !== 'admin' && String(offer.seller) !== String(req.user._id)) return res.status(403).json({ message: 'You can only manage offers for your listings' });
    if (offer.status !== 'Pending') return res.status(409).json({ message: 'This offer has already been resolved' });
    offer.status = req.body.status;
    await offer.save();
    if (offer.status === 'Accepted') await Offer.updateMany({ product: offer.product, _id: { $ne: offer._id }, status: 'Pending' }, { $set: { status: 'Rejected' } });
    res.json({ offer });
  } catch (error) { res.status(500).json({ message: 'Could not update offer' }); }
};
