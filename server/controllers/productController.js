const Product = require("../models/Product");

// Normalizer helper for flexible Bangla-English search matching
const normaliseSearchText = (value) =>
  String(value || "")
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\b(?:sharee|sari|shari)\b/g, "saree")
    .replace(/\b(?:kamij|kamiz)\b/g, "kameez")
    .replace(/\bpanjabi\b/g, "punjabi")
    .replace(/\btshirt\b/g, "t shirt")
    .replace(/\s+/g, " ")
    .trim();

const getProducts = async (req, res) => {
  try {
    const {
      group,
      category,
      style,
      type,
      size,
      brand,
      condition,
      q,
      search,
      minPrice,
      maxPrice,
      sort,
      status,
    } = req.query;

    const filter = {};

    // Group / Category filter
    const targetGroup = group || category;
    if (targetGroup) {
      filter.$or = [
        { group: new RegExp(`^${targetGroup}$`, "i") },
        { category: new RegExp(`^${targetGroup}$`, "i") },
      ];
    }

    // Style filter (e.g. 'Traditional', 'Western')
    if (style && style !== "All clothing") {
      filter.style = new RegExp(`^${style}$`, "i");
    }

    // Subcategory / Type filter (e.g. 'Saree', 'Punjabi', 'Newborn')
    if (type) {
      filter.type = new RegExp(`^${type}$`, "i");
    }

    if (size) filter.size = size;
    if (brand) filter.brand = new RegExp(`^${brand}$`, "i");
    if (condition) filter.condition = condition;
    if (status) filter.status = status;

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const searchTerm = search || q;
    if (searchTerm) {
      const normalized = normaliseSearchText(searchTerm);
      const tokens = normalized.split(" ").filter(Boolean);

      if (tokens.length > 0) {
        const regexPatterns = tokens.map((token) => new RegExp(token, "i"));
        const searchConditions = regexPatterns.map((regex) => ({
          $or: [
            { name: regex },
            { brand: regex },
            { type: regex },
            { style: regex },
            { group: regex },
            { category: regex },
            { material: regex },
            { condition: regex },
            { description: regex },
          ],
        }));

        if (filter.$and) {
          filter.$and.push(...searchConditions);
        } else {
          filter.$and = searchConditions;
        }
      }
    }

    // Sorting
    let sortOption = { createdAt: -1 };
    if (sort === "price_asc") sortOption = { price: 1 };
    if (sort === "price_desc") sortOption = { price: -1 };
    if (sort === "oldest") sortOption = { createdAt: 1 };

    const products = await Product.find(filter)
      .sort(sortOption)
      .populate("seller", "name email");

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "seller",
      "name email"
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({
      message: "Invalid product ID",
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const productData = {
      ...req.body,
      group: req.body.group || req.body.category || "Women",
      category: req.body.category || req.body.group || "Women",
      seller: req.user?._id || req.body.seller,
    };

    const product = await Product.create(productData);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check ownership or admin
    if (
      product.seller &&
      product.seller.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized to update this listing" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check ownership or admin
    if (
      product.seller &&
      product.seller.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized to delete this listing" });
    }

    await product.deleteOne();
    res.status(200).json({ message: "Product removed successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({ seller: req.user._id });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getMyProducts,
};

