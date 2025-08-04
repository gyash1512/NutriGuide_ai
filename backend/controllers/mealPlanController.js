import MealPlan from '../models/MealPlan.js';

// Create a new meal plan
export const createMealPlan = async (req, res) => {
  try {
    const { name, description, meals } = req.body;
    const mealPlan = new MealPlan({
      user: req.user.id,
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
    const mealPlans = await MealPlan.find({ user: req.user.id });
    res.json(mealPlans);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single meal plan by ID
export const getMealPlanById = async (req, res) => {
  try {
    const mealPlan = await MealPlan.findById(req.params.id);
    if (mealPlan && mealPlan.user.toString() === req.user.id) {
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

    if (mealPlan && mealPlan.user.toString() === req.user.id) {
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
    if (mealPlan && mealPlan.user.toString() === req.user.id) {
      await mealPlan.remove();
      res.json({ message: 'Meal plan removed' });
    } else {
      res.status(404).json({ message: 'Meal plan not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
