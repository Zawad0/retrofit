const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: '',
    },

    price: {
      type: Number,
      required: true,
    },

    discount: {
      type: Number,
      default: 0,
    },

    group: {
      type: String,
      enum: ['Men', 'Women', 'Kids', 'Accessories'],
      required: true,
    },

    category: {
      type: String,
      enum: ['Men', 'Women', 'Kids', 'Accessories'],
    },

    style: {
      type: String,
      default: 'Western',
    },

    type: {
      type: String,
      default: '',
    },

    size: {
      type: String,
      required: true,
    },

    brand: {
      type: String,
      default: '',
    },

    material: {
      type: String,
      default: '',
    },

    usedFor: {
      type: String,
      default: '',
    },

    condition: {
      type: String,
      enum: ['New', 'Like New', 'Good', 'Fair'],
      required: true,
    },

    image: {
      type: String,
      default: '',
    },

    imageUrl: {
      type: String,
      default: '',
    },

    imageFit: {
      type: String,
      enum: ['cover', 'contain'],
      default: 'cover',
    },

    status: {
      type: String,
      enum: ['available', 'sold'],
      default: 'available',
    },
  },
  { timestamps: true }
);

// Pre-save hook to ensure category matches group and image/imageUrl sync
productSchema.pre('save', function (next) {
  if (!this.category && this.group) {
    this.category = this.group;
  }
  if (!this.group && this.category) {
    this.group = this.category;
  }
  if (!this.image && this.imageUrl) {
    this.image = this.imageUrl;
  }
  if (!this.imageUrl && this.image) {
    this.imageUrl = this.image;
  }
  next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

