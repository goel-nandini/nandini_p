const ResumeDownload = require('../models/ResumeDownload');
const nodemailer = require('nodemailer');

const sendEmails = async (data) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log('Skipping emails, no credentials provided.');
    return;
  }
  
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailToMe = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // Send notification to yourself
    subject: '🚀 New Resume Download',
    html: `
      <h2>New Resume Download</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Company:</strong> ${data.company || 'N/A'}</p>
      <p><strong>Purpose:</strong> ${data.purpose || 'N/A'}</p>
      <p><strong>Message:</strong> ${data.message || 'N/A'}</p>
      <p><strong>IP Address:</strong> ${data.ipAddress}</p>
      <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
    `
  };

  const mailToUser = {
    from: process.env.EMAIL_USER,
    to: data.email,
    subject: 'Thanks for visiting my portfolio!',
    html: `
      <p>Hi ${data.name},</p>
      <p>Thank you for downloading my resume! I really appreciate your interest.</p>
      <p>I'm a Full Stack Developer passionate about building modern, interactive web applications.</p>
      <p>You can view more of my work securely on my <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}">Portfolio</a>.</p>
      <p>Feel free to reply to this email if you'd like to get in touch!</p>
      <br />
      <p>Best regards,<br/>Nandini Goel</p>
    `
  };

  await transporter.sendMail(mailToMe);
  await transporter.sendMail(mailToUser);
};

/**
 * @desc    Track a resume download, process form, and send emails
 * @route   POST /api/resume/download
 * @access  Public
 */
const downloadResume = async (req, res) => {
  try {
    const { name, email, company, purpose, message } = req.body;
    
    if (!name || !email) {
       return res.status(400).json({ success: false, message: 'Name and email are required' });
    }

    const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress || req.ip;
    const userAgent = req.headers['user-agent'] || 'Unknown';

    const newDownload = await ResumeDownload.create({
      name,
      email,
      company,
      purpose,
      message,
      ipAddress,
      userAgent
    });

    // Send emails asynchronously
    sendEmails(newDownload).catch(err => console.error("Email error:", err));

    res.status(200).json({ 
      success: true, 
      message: 'Download tracked and emails sent successfully' 
    });

  } catch (error) {
    console.error('Error handling resume download:', error.message);
    res.status(500).json({ success: false, message: 'Server error processing download' });
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
