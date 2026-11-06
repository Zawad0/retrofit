const express = require("express");
const router = express.Router();

const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getMyProducts,
} = require("../controllers/productController");

const { protect, verifySeller } = require("../middleware/authMiddleware");

router.get("/", getProducts);
router.get("/mine", protect, verifySeller, getMyProducts);
router.get("/:id", getProductById);
router.post("/", protect, verifySeller, createProduct);
router.put("/:id", protect, verifySeller, updateProduct);
router.delete("/:id", protect, verifySeller, deleteProduct);

module.exports = router;

