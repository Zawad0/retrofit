const express = require("express");
const router = express.Router();

const {
  createOrder,
  getMyOrders,
  getOrderByReference,
} = require("../controllers/orderController");

const { protect, optionalAuth } = require("../middleware/authMiddleware");

router.post("/", optionalAuth, createOrder);
router.get("/mine", protect, getMyOrders);
router.get("/:reference", getOrderByReference);

module.exports = router;
