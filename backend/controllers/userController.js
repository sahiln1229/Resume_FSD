const User = require('../models/User');
const fs = require('fs');

/**
 * Get current user profile
 */
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error("Fetch profile error:", err.message);
        res.status(500).send('Server Error');
    }
};

/**
 * Update user profile text data
 */
const updateUserProfile = async (req, res) => {
    try {
        const { name, phone, location, aboutMe, skills, socialLinks } = req.body;
        
        const profileFields = {
            name,
            phone,
            location,
            aboutMe,
            skills: Array.isArray(skills) ? skills : (skills ? skills.split(',').map(s => s.trim()) : []),
            socialLinks: socialLinks || {}
        };

        const user = await User.findByIdAndUpdate(
            req.userId,
            { $set: profileFields },
            { new: true }
        ).select('-password');

        res.json(user);
    } catch (err) {
        console.error("Update profile error:", err.message);
        res.status(500).send('Server Error');
    }
};

/**
 * Upload profile picture and store binary in MongoDB
 */
const uploadProfilePicture = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No image uploaded' });
        }

        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Save binary data to User model
        user.profileImage = fs.readFileSync(req.file.path);
        user.profileImageType = req.file.mimetype;

        await user.save();

        res.json({ message: 'Profile picture updated successfully' });
    } catch (err) {
        console.error("Profile picture upload error:", err.message);
        res.status(500).send('Server Error');
    }
};

/**
 * Serve the profile picture binary
 */
const getProfilePicture = async (req, res) => {
  try {
      const user = await User.findById(req.params.userId || req.userId);
      if (!user || !user.profileImage) {
          return res.status(404).json({ error: 'Image not found' });
      }

      res.set('Content-Type', user.profileImageType || 'image/png');
      res.send(user.profileImage);
  } catch (err) {
      console.error("Serve image error:", err.message);
      res.status(500).send('Server Error');
  }
};

module.exports = {
    getUserProfile,
    updateUserProfile,
    uploadProfilePicture,
    getProfilePicture
};
