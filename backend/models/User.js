const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: false  // Optional for OAuth users
    },
    oauthProvider: {
        type: String,
        enum: ['local', 'google', 'github'],
        default: 'local'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    profileImage: {
      type: Buffer, // Binary image data
      required: false
    },
    profileImageType: {
      type: String, // MIME type (e.g., 'image/png')
      required: false
    },
    phone: String,
    location: String,
    aboutMe: String,
    skills: [String],
    socialLinks: {
      linkedin: String,
      github: String,
      portfolio: String
    }
});

module.exports = mongoose.model('User', userSchema);
