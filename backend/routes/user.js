const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const auth = require('../middleware/auth');
const { 
    getUserProfile, 
    updateUserProfile, 
    uploadProfilePicture, 
    getProfilePicture 
} = require('../controllers/userController');

// Multer Setup for Image Uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../tmp')); // Store temporarily before DB save
  },
  filename: function (req, file, cb) {
      cb(null, `profile-${req.userId}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
  fileFilter: (req, file, cb) => {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (allowedTypes.includes(file.mimetype)) {
          cb(null, true);
      } else {
          cb(new Error('Only JPEG, PNG and JPG images are allowed.'));
      }
  }
});

// Routes
router.get('/profile', auth, getUserProfile);
router.put('/profile', auth, updateUserProfile);
router.post('/profile-image', auth, upload.single('profileImage'), uploadProfilePicture);
router.get('/profile-image', auth, getProfilePicture);
router.get('/profile-image/:userId', auth, getProfilePicture);
router.get('/public/profile-image/:userId', getProfilePicture); // Publicly accessible for <img> tags

module.exports = router;
