import express from 'express';
import {
  createMealPlan,
  getMealPlans,
  getMealPlanById,
  updateMealPlan,
  deleteMealPlan,
} from '../controllers/mealPlanController.js';
const router = express.Router();

router.route('/').post(createMealPlan).get(getMealPlans);
router
  .route('/:id')
  .get(getMealPlanById)
  .put(updateMealPlan)
  .delete(deleteMealPlan);

export default router;
