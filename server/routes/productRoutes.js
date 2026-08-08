const express = require("express");
const router = express.Router();

const {
  getProducts,
  getProductById,
  createProduct,
  getMyProducts,
} = require("../controllers/productController");

const { protect } = require("../middleware/authMiddleware");

router.get("/", getProducts);
router.get("/mine", protect, getMyProducts);
router.get("/:id", getProductById);
router.post("/", protect, createProduct);

module.exports = router;
