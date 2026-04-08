// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const resumeRoutes = require('./routes/resumeRoutes');
const chatRoutes = require('./routes/chatRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS so frontend can communicate with backend
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Vite default port
  methods: ['GET', 'POST'],
  credentials: true
}));

// Express built-in middleware for parsing JSON
app.use(express.json({ limit: '10kb' })); // Limit payload size for security

// Routes
app.use('/api/resume', resumeRoutes);
app.use('/api/chat', chatRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: '🟢 Portfolio backend is running' });
});

// Database Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    
    // Only start server after DB connects
    app.listen(PORT, () => {
      console.log(`🚀 Backend Server running independently on port ${PORT}`);
      console.log(`🤖 Chat API available at: http://localhost:${PORT}/api/chat`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1); // Exit process with failure
  });
