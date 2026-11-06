const router = require('express').Router();
const { protect, verifySeller } = require('../middleware/authMiddleware');
const { createOffer, getSellerOffers, updateOffer } = require('../controllers/offerController');
router.post('/', protect, createOffer);
router.get('/seller', protect, verifySeller, getSellerOffers);
router.put('/:id', protect, verifySeller, updateOffer);
module.exports = router;
