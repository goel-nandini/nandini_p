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

// New endpoint: Resume Download (UI/Form State Validation Only)
app.post('/api/resume-download', (req, res) => {
  const { name, email, company, purpose, message } = req.body;

  // Validate required fields
  if (!name || !email) {
    return res.status(400).json({ success: false, error: 'Name and Email are required fields.' });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, error: 'Invalid email format.' });
  }

  // TODO: Connect to MongoDB and send email notifications here
  console.log('Validated Resume Request:', { name, email, company, purpose, message });

  return res.status(200).json({
    success: true,
    message: 'Form validation successful! Form data recorded in logs.'
  });
});

// Database Connection (Commented out as per instructions)
/*
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('✅ MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
  });
*/

// Start server independently of DB connection
app.listen(PORT, () => {
  console.log(`🚀 Backend Server running on port ${PORT}`);
  console.log(`📝 Resume Form endpoint available at: http://localhost:${PORT}/api/resume-download`);
});
