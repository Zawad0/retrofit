const express = require("express");
const router = express.Router();

const { createOrder, getMyOrders, getOrderByReference } = require("../controllers/orderController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", createOrder);
router.get("/mine", protect, getMyOrders);
router.get("/:reference", getOrderByReference);

module.exports = router;
