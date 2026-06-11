import express from 'express';
import {
  generateRecommendation,
  getHistory,
  getRecommendationById,
  toggleSave,
  deleteRecommendation,
  getAllGemstones,
} from '../controllers/recommendationController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public
router.get('/gemstones', getAllGemstones);

// Protected
router.post('/generate', protect, generateRecommendation);
router.get('/history', protect, getHistory);
router.get('/:id', protect, getRecommendationById);
router.patch('/:id/save', protect, toggleSave);
router.delete('/:id', protect, deleteRecommendation);

export default router;
