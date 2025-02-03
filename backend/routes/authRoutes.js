import express from 'express';
import admin from '../config/firebaseAdmin.js'; // Add .js extension

const router = express.Router();

router.post('/verify-token', async (req, res) => {
  const { token } = req.body;

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    res.status(200).json({ uid: decodedToken.uid, email: decodedToken.email });
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
});

export default router;
