const express = require('express');
const rateLimit = require('express-rate-limit');
const { sendMessage, getChatHistory } = require('../controllers/chatController');

const router = express.Router();

// ─── Rate Limiting ─────────────────────────────────────────────
// Max 30 chat messages per IP per 10 minutes
const chatLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    reply: "You've sent too many messages! Please wait a few minutes before chatting again. 😊",
  },
  handler: (req, res, next, options) => {
    res.status(429).json(options.message);
  },
});

// ─── Routes ───────────────────────────────────────────────────
// POST /api/chat  — send a message, get AI reply
router.post('/', chatLimiter, sendMessage);

// GET /api/chat/history/:sessionId  — retrieve past conversation
router.get('/history/:sessionId', getChatHistory);

module.exports = router;
