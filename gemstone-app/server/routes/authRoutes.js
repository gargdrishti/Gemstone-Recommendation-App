import express from 'express';
import { register, login, getMe } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('https://gemstone-recommendation-app.onrender.com/register', register);
router.post('https://gemstone-recommendation-app.onrender.com/login', login);
router.get('/me', protect, getMe);

export default router;
