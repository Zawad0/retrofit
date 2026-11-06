const express = require('express');
const { protect, verifySeller } = require('../middleware/authMiddleware');
const { createOrder, getMyOrders, getOrderByReference } = require('../controllers/orderController');
const { getTracking, getOrderHistory, getSellerOrders, updateOrderStatus } = require('../controllers/orderTrackingController');
const router = express.Router();

router.post('/', createOrder);
router.get('/history', protect, getOrderHistory);
router.get('/seller', protect, verifySeller, getSellerOrders);
router.get('/tracking/:reference', getTracking);
router.patch('/:id/status', protect, updateOrderStatus);
router.get('/mine', protect, getMyOrders);
router.get('/:reference', getOrderByReference);

module.exports = router;
