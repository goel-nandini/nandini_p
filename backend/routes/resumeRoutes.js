const express = require('express');
const { downloadResume, getDownloadLogs } = require('../controllers/resumeController');

const router = express.Router();

// POST /api/resume/download (Public) - New route for form submission
router.post('/download', downloadResume);

// GET /api/resume/logs (Optional Admin Route)
router.get('/logs', getDownloadLogs);

module.exports = router;
