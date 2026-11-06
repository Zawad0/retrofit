const router = require('express').Router();
const { protect } = require('../middleware/authMiddleware');
const { getWishlist, toggleWishlist, removeWishlistItem } = require('../controllers/wishlistController');
router.get('/wishlist', protect, getWishlist);
router.post('/wishlist/:productId', protect, toggleWishlist);
router.delete('/wishlist/:productId', protect, removeWishlistItem);
module.exports = router;
