import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import recommendationRoutes from './routes/recommendationRoutes.js';

dotenv.config();
connectDB();

const app = express();

// Middleware
//app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:3000'], credentials: true }));
// app.use(cors({
//   origin: [
//     'http://localhost:5173',
//     'https://gemstone-app.vercel.app' ,
//      'http://localhost:3000',
//     'https://gemstone-app-git-main-drishtigarg10.vercel.app'
//      // your vercel URL
//   ],
//   credentials: true
// }));
app.use(cors({
  origin: [
    'https://gemstone-recommendation-app-drishtis-projects-38fcc71a.vercel.app'
  ],
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/recommendations', recommendationRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: '🌟 Gemstone API is running.' });
});

// 404
app.use('*', (req, res) => {
  res.status(404).json({ success: false, message: 'Route not found.' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
