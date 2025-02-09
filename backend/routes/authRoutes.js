import express from 'express';
import admin from '../config/firebaseAdmin.js'; // Add .js extension
import { checkUserExists , registerUser, loginUser, verifyToken } from '../controllers/authController.js';

const router = express.Router();
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/verify-token', verifyToken);
router.post('/check-user', checkUserExists);
export default router;
