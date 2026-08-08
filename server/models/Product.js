const mongoose = require(`mongoose`);

const productSchema = new mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: `User`,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    discount: {
      type: Number,
    },

    category: {
      type: String,
      enum: [`Men`, `Women`, `Kids`, `Accessories`],
      required: true,
    },

    size: {
      type: String,
      required: true,
    },

    brand: {
      type: String,
    },

    condition: {
      type: String,
      enum: [`New`, `Like New`, `Good`, `Fair`],
      required: true,
    },

    imageUrl: {
      type: String,
    },
  },

  { timestamps: true },
);

const Product = mongoose.model(`Product`, productSchema);

module.exports = Product;
