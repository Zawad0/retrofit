const express = require('express');
const router = express.Router();
const { protect, verifyAdmin } = require('../middleware/authMiddleware');
const admin = require('../controllers/adminController');

router.use(protect, verifyAdmin);
router.get('/stats', admin.getStats);
router.get('/users', admin.getUsers);
router.put('/users/:id/role', admin.updateUserRole);
router.delete('/users/:id', admin.deleteUser);
router.get('/products', admin.getModerationProducts);
router.get('/products/:id/moderate', admin.getModerationProduct);
router.put('/products/:id/moderate', admin.moderateProduct);
router.get('/orders', admin.getOrders);
router.get('/orders/:id', admin.getOrder);
router.put('/orders/:id', admin.updateOrder);

module.exports = router;
