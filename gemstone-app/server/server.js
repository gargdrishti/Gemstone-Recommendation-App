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
// Allow localhost and any Vercel preview/production domains dynamically.
// app.use(cors({
//   origin: (origin, callback) => {
//     if (!origin) return callback(null, true); // allow non-browser or server-to-server requests
//     // Allow localhost dev server
//     if (origin.startsWith('http://localhost')) return callback(null, true);
//     // Allow Vercel preview/production domains (e.g. *.vercel.app)
//     if (origin.endsWith('.vercel.app')) return callback(null, true);
//     // Reject other origins
//     return callback(new Error('CORS policy: origin not allowed'), false);
//   },
//   credentials: true,
// }));
//   ],
//   credentials: true
// }));
// app.use(cors({
//   origin: [
//     'https://gemstone-recommendation-app-drishtis-projects-38fcc71a.vercel.app'
//   ],
//   credentials: true
// }));
app.use(cors({
  origin: true,
  credentials: true,
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
