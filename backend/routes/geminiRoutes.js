import express from 'express';
import {
  getAIHealthSummary,
  getDietPlan,
  getSavedDietPlan,
  getWorkoutPlan,
  getSavedWorkoutPlan,
  chatWithAI,
} from '../controllers/geminiController.js';
const router = express.Router();

router.get('/health-summary/:email', getAIHealthSummary);
router.post('/get-diet-plan', getDietPlan);
router.get('/saved-diet-plan/:email', getSavedDietPlan);
router.post('/get-workout-plan', getWorkoutPlan);
router.get('/saved-workout-plan/:email', getSavedWorkoutPlan);
router.post('/chat', chatWithAI);

export default router;
