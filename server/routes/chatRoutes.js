const express = require('express');
const rateLimit = require('express-rate-limit');
const { reply } = require('../controllers/chatController');

const router = express.Router();
const chatLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 20,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { message: 'Too many chat messages. Please wait a minute and try again.' },
});

router.post('/', chatLimiter, reply);
module.exports = router;
