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
    // Visitor's IP address (supports both IPv4 and IPv6)
    ipAddress: {
      type: String,
      required: true,
      trim: true,
    },

    // Full User-Agent string from the request headers
    userAgent: {
      type: String,
      required: true,
      trim: true,
    },

    // When the download happened (auto-managed by Mongoose with timestamps option)
    // We expose it explicitly in responses via the createdAt virtual below
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
