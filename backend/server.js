const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const { Server } = require('socket.io');
require('dotenv').config();

const resumeRoutes = require('./routes/resume');

const app = express();
const server = http.createServer(app);

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

// Setup Socket.IO for real-time progress updates
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

app.set('io', io); // Make io accessible in routes/controllers

// Connect to MongoDB
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 5000 // 5 seconds timeout
  })
    .then(() => console.log('✅ Connected to MongoDB Atlas'))
    .catch(err => {
      console.error('❌ MongoDB connection error:', err.message);
      console.warn('⚠️  Database operation might fail or time out until connection is fixed.');
    });
} else {
  console.warn('⚠️ No MONGODB_URI found in .env file. Database operations will fail.');
}

// Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api', resumeRoutes);

// Socket.io connection logging
io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);
  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
