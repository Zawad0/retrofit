const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { getGlobalEcoImpact, getUserEcoImpact } = require('../controllers/ecoImpactController');
const router = express.Router();
router.get('/', getGlobalEcoImpact);
router.get('/me', protect, getUserEcoImpact);
module.exports = router;
