const express = require('express');
const { downloadResume, getDownloadLogs } = require('../controllers/resumeController');

const router = express.Router();

// GET /api/resume/download (Public)
router.get('/download', downloadResume);

// GET /api/resume/logs (Optional Admin Route)
router.get('/logs', getDownloadLogs);

module.exports = router;
