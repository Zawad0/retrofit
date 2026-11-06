const express = require("express");
const router = express.Router();

const { getMyOrders, getOrderByReference } = require("../controllers/orderController");

const { protect } = require("../middleware/authMiddleware");

// Prevent the former browser-calculated, unpaid order flow from creating orders.
router.post("/", (_req, res) => res.status(410).json({ message: "Use the secure Stripe checkout endpoint." }));
router.get("/mine", protect, getMyOrders);
router.get("/:reference", getOrderByReference);

module.exports = router;
