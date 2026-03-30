/**
 * Resume Upload Backend Snippet
 * Requirements: express, mongoose, multer, dotenv
 * Install: npm install express mongoose multer dotenv
 */

const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// 1. Connect to MongoDB Atlas
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err.message));

// 2. Resume Schema
const resumeSchema = new mongoose.Schema({
  filename: String,
  fileType: String,
  data: Buffer, // Binary file content
  uploadedAt: { type: Date, default: Date.now }
});

const Resume = mongoose.model('BinaryResume', resumeSchema);

// 3. Multer Setup (Memory Storage)
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    // Optional: Filter file types
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF, DOC, and TXT files are allowed.'));
    }
  }
});

// 4. API Endpoints

/**
 * POST /upload
 * Accepts a file field named 'resume'
 */
app.post('/upload', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const newResume = new Resume({
      filename: req.file.originalname,
      fileType: req.file.mimetype,
      data: req.file.buffer // Store the buffer directly
    });

    const savedResume = await newResume.save();

    res.status(201).json({
      message: 'Resume uploaded successfully!',
      id: savedResume._id,
      filename: savedResume.filename
    });
  } catch (error) {
    console.error('Upload Error:', error.message);
    res.status(500).json({ error: error.message || 'Server error during upload' });
  }
});

/**
 * GET /resume/:id
 * Retrieves the resume and sends it as a downloadable file
 */
app.get('/resume/:id', async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    // Set headers to trigger download
    res.set({
      'Content-Type': resume.fileType,
      'Content-Disposition': `attachment; filename="${resume.filename}"`
    });

    res.send(resume.data);
  } catch (error) {
    console.error('Retrieval Error:', error.message);
    res.status(500).json({ error: 'Server error while retrieving resume' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
