const mongoose = require('mongoose');

const chatSessionSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
      index: true,
    },
    messages: [
      {
        role: { type: String, enum: ['system', 'user', 'assistant'] },
        content: { type: String, required: true },
        timestamp: { type: Date, default: Date.now }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('ChatSession', chatSessionSchema);
