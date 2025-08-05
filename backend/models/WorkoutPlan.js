import mongoose from 'mongoose';

const workoutPlanSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  plan: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const WorkoutPlan = mongoose.model('WorkoutPlan', workoutPlanSchema);

export default WorkoutPlan;
