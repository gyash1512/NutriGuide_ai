import mongoose from 'mongoose';

const mealPlanSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  meals: [
    {
      day: {
        type: String,
        required: true,
      },
      breakfast: { type: String },
      lunch: { type: String },
      dinner: { type: String },
      snacks: { type: String },
    },
  ],
  plan: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const MealPlan = mongoose.model('MealPlan', mealPlanSchema);

export default MealPlan;
