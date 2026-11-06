const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true, index: true },
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  offeredPrice: { type: Number, required: true, min: 1 },
  status: { type: String, enum: ['Pending', 'Accepted', 'Rejected'], default: 'Pending', index: true },
}, { timestamps: { createdAt: true, updatedAt: true } });

offerSchema.index({ product: 1, buyer: 1, status: 1 });
module.exports = mongoose.model('Offer', offerSchema);
