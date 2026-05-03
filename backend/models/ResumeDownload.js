/**
 * ResumeDownload Model
 * ---------------------
 * Mongoose schema that records every time a visitor downloads the resume.
 * Fields stored:
 *   - ipAddress  : visitor's IP (used to detect repeat downloads)
 *   - userAgent  : browser / device string
 *   - timestamp  : auto-captured at the moment of the request
 */

const mongoose = require('mongoose');

const resumeDownloadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    company: {
      type: String,
      trim: true,
    },
    purpose: {
      type: String,
      enum: ['Hiring', 'Collaboration', 'Just Viewing', ''],
      default: 'Just Viewing',
    },
    message: {
      type: String,
      trim: true,
    },
    ipAddress: {
      type: String,
      trim: true,
    },
    userAgent: {
      type: String,
      trim: true,
    },
  },
  {
    // Automatically adds `createdAt` and `updatedAt` fields
    timestamps: true,

    // Clean up the JSON output: remove __v and rename _id to id
    toJSON: {
      virtuals: true,
      transform(_doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

// Index on createdAt so admin queries (sorted by newest) stay fast
resumeDownloadSchema.index({ createdAt: -1 });

module.exports = mongoose.model('ResumeDownload', resumeDownloadSchema);
