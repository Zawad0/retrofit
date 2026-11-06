const express = require("express");
const router = express.Router();

const { signup, login, getMe, requestSellerRole } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", protect, getMe);
router.post("/seller-request", protect, requestSellerRole);

module.exports = router;
