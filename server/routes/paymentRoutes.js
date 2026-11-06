const express = require('express');
const router = express.Router();
const { createPaymentIntent } = require('../controllers/paymentController');
const { optionalAuth } = require('../middleware/authMiddleware');

router.post('/create-intent', optionalAuth, createPaymentIntent);
module.exports = router;
