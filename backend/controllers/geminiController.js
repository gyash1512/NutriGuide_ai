import generativeModel from '../config/gemini.js';
import { getMedicalDataForAnalysis } from './userController.js';
import { conn, insertData } from '../config/db.js';

export const getAIHealthSummary = async (req, res) => {
  try {
    // First, get the medical data
    getMedicalDataForAnalysis(req, {
      status: (code) => ({
        json: async (medicalData) => {
          if (Object.keys(medicalData).length === 0) {
            return res.status(200).json({ analysis: "No medical data found for this user." });
          }

          const prompt = `Analyze the following medical data and provide a summary: ${JSON.stringify(
            medicalData
          )}`;
          const result = await generativeModel.generateContent(prompt);
          const response = result.response;
          const text = response.candidates[0].content.parts[0].text;
          res.json({ analysis: text });
        }
      })
    });
  } catch (error) {
    console.error('Error in getAIHealthSummary:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getWorkoutPlan = async (req, res) => {
  try {
    const { email, fitnessLevel, goals, otherNotes } = req.body;

    // Create a mock request object for getMedicalDataForAnalysis
    const mockReq = { params: { email } };

    getMedicalDataForAnalysis(mockReq, {
      status: (code) => ({
        json: async (medicalData) => {
          let prompt = `Generate a 7-day workout plan.`;

          if (Object.keys(medicalData).length > 0) {
            prompt += `\n\nHere is the user's medical data for context:\n${JSON.stringify(medicalData, null, 2)}`;
          }

          prompt += `\n\nPlease consider the following user preferences:\n`;
          if (fitnessLevel) prompt += `- Fitness Level: ${fitnessLevel}\n`;
          if (goals) prompt += `- Goals: ${goals}\n`;
          if (otherNotes) prompt += `- Other important notes: ${otherNotes}\n`;

          const result = await generativeModel.generateContent(prompt);
          const response = result.response;
          const text = response.candidates[0].content.parts[0].text;

          // Save the new workout plan to the database
          insertData('workout_plans', { email, plan: text }, (err, result) => {
            if (err) {
              console.error('Error saving workout plan:', err);
              // Still return the workout plan to the user even if saving fails
              return res.json({ workoutPlan: text });
            }
            res.json({ workoutPlan: text });
          });
        }
      })
    });
  } catch (error) {
    console.error('Error in getWorkoutPlan:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getSavedWorkoutPlan = (req, res) => {
  const { email } = req.params;
  const query = "SELECT plan FROM workout_plans WHERE email = ? ORDER BY created_at DESC LIMIT 1";
  conn.query(query, [email], (err, result) => {
    if (err) {
      console.error('Error fetching saved workout plan:', err);
      return res.status(500).json({ message: 'Server error' });
    }
    if (result.length > 0) {
      res.json({ workoutPlan: result[0].plan });
    } else {
      res.json({ workoutPlan: null });
    }
  });
};

export const getDietPlan = async (req, res) => {
  try {
    const { email, location, dietaryPreference, otherNotes } = req.body;

    // Create a mock request object for getMedicalDataForAnalysis
    const mockReq = { params: { email } };

    getMedicalDataForAnalysis(mockReq, {
      status: (code) => ({
        json: async (medicalData) => {
          let prompt = `Generate a 7-day diet plan.`;

          if (Object.keys(medicalData).length > 0) {
            prompt += `\n\nHere is the user's medical data for context:\n${JSON.stringify(medicalData, null, 2)}`;
          }

          prompt += `\n\nPlease consider the following user preferences:\n`;
          if (location) prompt += `- Location for local cuisine suggestions: ${location}\n`;
          if (dietaryPreference) prompt += `- Dietary Preference: ${dietaryPreference}\n`;
          if (otherNotes) prompt += `- Other important notes: ${otherNotes}\n`;
          
          const result = await generativeModel.generateContent(prompt);
          const response = result.response;
          const text = response.candidates[0].content.parts[0].text;

          // Save the new diet plan to the database
          insertData('meal_plans', { email, plan: text }, (err, result) => {
            if (err) {
              console.error('Error saving diet plan:', err);
              // Still return the diet plan to the user even if saving fails
              return res.json({ dietPlan: text });
            }
            res.json({ dietPlan: text });
          });
        }
      })
    });
  } catch (error) {
    console.error('Error in getDietPlan:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getSavedDietPlan = (req, res) => {
  const { email } = req.params;
  const query = "SELECT plan FROM meal_plans WHERE email = ? ORDER BY created_at DESC LIMIT 1";
  conn.query(query, [email], (err, result) => {
    if (err) {
      console.error('Error fetching saved diet plan:', err);
      return res.status(500).json({ message: 'Server error' });
    }
    if (result.length > 0) {
      res.json({ dietPlan: result[0].plan });
    } else {
      res.json({ dietPlan: null });
    }
  });
};

export const chatWithAI = async (req, res) => {
  try {
    const { history, message } = req.body;
    const chat = generativeModel.startChat({
      history: history,
    });
    const result = await chat.sendMessageStream(message);

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    for await (const chunk of result.stream) {
      res.write(`data: ${JSON.stringify(chunk)}\n\n`);
    }
    res.end();
  } catch (error) {
    console.error('Error in chatWithAI:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
