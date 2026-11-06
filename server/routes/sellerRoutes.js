const express = require('express');
const router = express.Router();
const { protect, verifySeller } = require('../middleware/authMiddleware');
const seller = require('../controllers/sellerController');
router.use(protect, verifySeller);
router.get('/products', seller.getMyListings);
router.get('/sales', seller.getMySales);
router.post('/cloudinary-signature', seller.createUploadSignature);
module.exports = router;
