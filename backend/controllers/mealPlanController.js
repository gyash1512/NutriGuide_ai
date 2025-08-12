import MealPlan from '../models/MealPlan.js';
import User from '../models/User.js';

// Create a new meal plan
export const createMealPlan = async (req, res) => {
  try {
    const { name, description, meals } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const mealPlan = new MealPlan({
      email: user.email,
      name,
      description,
      meals,
    });
    const createdMealPlan = await mealPlan.save();
    res.status(201).json(createdMealPlan);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all meal plans for a user
export const getMealPlans = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const mealPlans = await MealPlan.find({ email: user.email });
    res.json(mealPlans);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single meal plan by ID
export const getMealPlanById = async (req, res) => {
  try {
    const mealPlan = await MealPlan.findById(req.params.id);
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (mealPlan && mealPlan.email === user.email) {
      res.json(mealPlan);
    } else {
      res.status(404).json({ message: 'Meal plan not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a meal plan
export const updateMealPlan = async (req, res) => {
  try {
    const { name, description, meals } = req.body;
    const mealPlan = await MealPlan.findById(req.params.id);
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (mealPlan && mealPlan.email === user.email) {
      mealPlan.name = name || mealPlan.name;
      mealPlan.description = description || mealPlan.description;
      mealPlan.meals = meals || mealPlan.meals;

      const updatedMealPlan = await mealPlan.save();
      res.json(updatedMealPlan);
    } else {
      res.status(404).json({ message: 'Meal plan not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a meal plan
export const deleteMealPlan = async (req, res) => {
  try {
    const mealPlan = await MealPlan.findById(req.params.id);
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (mealPlan && mealPlan.email === user.email) {
      await mealPlan.deleteOne();
      res.json({ message: 'Meal plan removed' });
    } else {
      res.status(404).json({ message: 'Meal plan not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
