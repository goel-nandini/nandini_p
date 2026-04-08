const ResumeDownload = require('../models/ResumeDownload');

/**
 * @desc    Track a resume download and redirect to PDF
 * @route   GET /api/resume/download
 * @access  Public
 */
const downloadResume = async (req, res) => {
  try {
    // 1. Extract tracking information
    // Get IP address (checking headers for proxies like NGINX first)
    const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress || req.ip;
    
    // Get User-Agent string to know device/browser
    const userAgent = req.headers['user-agent'] || 'Unknown';

    // 2. Save tracking data to MongoDB
    await ResumeDownload.create({
      ipAddress,
      userAgent
    });

    console.log(`[Resume Download] Tracked from IP: ${ipAddress}`);

    // 3. Respond
    // Return a JSON response - the frontend will handle the actual file download trigger
    res.status(200).json({ 
      success: true, 
      message: 'Download tracked successfully' 
    });

  } catch (error) {
    console.error('Error tracking resume download:', error.message);
    // Even if tracking fails, we might still want to let them download 
    // but here we just return a 500 error for the API
    res.status(500).json({ success: false, message: 'Server error tracking download' });
  }
};

/**
 * @desc    Get all resume download logs
 * @route   GET /api/resume/logs
 * @access  Admin (Public for now as optional request)
 */
const getDownloadLogs = async (req, res) => {
  try {
    // Fetch logs sorted by newest first
    const logs = await ResumeDownload.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: logs.length,
      data: logs
    });
  } catch (error) {
    console.error('Error fetching logs:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = {
  downloadResume,
  getDownloadLogs
};
