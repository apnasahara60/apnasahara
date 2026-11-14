import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import { Server as SocketIOServer } from 'socket.io';
import { connectDB } from './config/db.js';
import apiRouter from './routes/api.js';

dotenv.config();

const app = express();
const server = http.createServer(app);

// Cross-Origin Resource Sharing
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Socket.IO Setup for real-time events on Render
const io = new SocketIOServer(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

app.set('io', io);

io.on('connection', (socket) => {
  console.log(`🔌 Client connected to Socket.IO: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`❌ Client disconnected: ${socket.id}`);
  });
});

// Connect to MongoDB
connectDB();

// API Routes
app.use('/api', apiRouter);

// Health Check endpoint for Render deployment monitoring
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'ApnaSahara Backend',
    database: 'MongoDB',
    timestamp: new Date().toISOString()
  });
});

app.get('/', (req, res) => {
  res.json({
    message: 'ApnaSahara Eldercare API Server is running.',
    version: '1.0.0',
    documentation: '/api'
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 ApnaSahara Backend Server running on port ${PORT}`);
});
