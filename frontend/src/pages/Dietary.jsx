import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { auth } from '../firebase';

const DietaryPage = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [location, setLocation] = useState('');
  const [dietaryPreference, setDietaryPreference] = useState('vegetarian');
  const [otherNotes, setOtherNotes] = useState('');
  const [dietPlan, setDietPlan] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSavedDietPlan = async () => {
      const email = auth.currentUser?.email;
      if (!email) return;

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/gemini/saved-diet-plan/${email}`, {
          headers: {
            'ngrok-skip-browser-warning': 'true',
          },
        });
        const data = await response.json();
        if (data.dietPlan) {
          setDietPlan(data.dietPlan);
        }
      } catch (error) {
        console.error('Error fetching saved diet plan:', error);
      }
    };

    if (activeSection === 'recommendations') {
      fetchSavedDietPlan();
    }
  }, [activeSection]);

  const handleGetDietPlan = () => {
    setLoading(true);
    const email = auth.currentUser?.email;
    if (!email) {
      alert("User email not found. Please log in again.");
      setLoading(false);
      return;
    }

    fetch(`${import.meta.env.VITE_API_URL}/api/gemini/get-diet-plan`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
      },
      body: JSON.stringify({ email, location, dietaryPreference, otherNotes })
    })
    .then(res => res.json())
    .then(data => {
      setDietPlan(data.dietPlan);
      setLoading(false);
    })
    .catch(error => {
      console.error('Error getting diet plan:', error);
      setDietPlan('Error: Could not get diet plan.');
      setLoading(false);
    });
  };

  const sections = [
    {
      id: "recommendations",
      title: "Dietary Recommendations",
      description: "Get personalized dietary recommendations based on your health goals.",
      content: (
        <div className="mt-6 p-6 bg-gray-50 rounded-lg">
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Location (for local cuisine suggestions)</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Dietary Preference</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={dietaryPreference}
              onChange={(e) => setDietaryPreference(e.target.value)}
            >
              <option value="vegetarian">Vegetarian</option>
              <option value="non-vegetarian">Non-Vegetarian</option>
              <option value="vegan">Vegan</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Other Notes (e.g., "more liquid", "avoid spicy food")</label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-lg"
              rows="4"
              value={otherNotes}
              onChange={(e) => setOtherNotes(e.target.value)}
            ></textarea>
          </div>

          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
            onClick={handleGetDietPlan}
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Get New Diet Plan'}
          </button>

          {dietPlan && (
            <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-2">Your 7-Day Diet Plan</h2>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{dietPlan}</ReactMarkdown>
            </div>
          )}
        </div>
      ),
    },
    {
      id: "menu-scanning",
      title: "Menu Scanning",
      description: "Scan restaurant menus to find dishes that fit your dietary needs.",
      content: (
        <div className="mt-6 p-6 bg-gray-50 rounded-lg">
          <h4 className="text-xl font-semibold mb-4">Scan a Menu</h4>
          <p className="text-gray-600">
            Upload a photo of a restaurant menu, and we'll analyze it for you.
          </p>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300">
            Upload Menu
          </button>
        </div>
      ),
    },
    {
      id: "chatbot",
      title: "Chatbot Assistance",
      description: "Get instant help from our AI-powered dietary chatbot.",
      content: (
        <div className="mt-6 p-6 bg-gray-50 rounded-lg">
          <h4 className="text-xl font-semibold mb-4">Chat with NutriBot</h4>
          <p className="text-gray-600">
            Ask questions about your diet, recipes, or nutritional needs.
          </p>
          <div className="mt-4 p-4 bg-white rounded-lg shadow-inner">
            <p className="text-gray-600">NutriBot: Hi! How can I assist you today?</p>
            <input
              type="text"
              placeholder="Type your message..."
              className="mt-2 w-full p-2 border rounded-lg"
            />
          </div>
        </div>
      ),
    },
    {
      id: "recipes",
      title: "Verified Recipes",
      description: "Access a library of verified recipes tailored to your dietary needs.",
      content: (
        <div className="mt-6 p-6 bg-gray-50 rounded-lg">
          <h4 className="text-xl font-semibold mb-4">Recipe Library</h4>
          <p className="text-gray-600">
            Browse and download recipes that align with your health goals.
          </p>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-md">
              <h5 className="text-lg font-semibold">Quinoa Salad</h5>
              <p className="text-gray-600">A healthy and delicious quinoa salad recipe.</p>
              <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300">
                Download Recipe
              </button>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-md">
              <h5 className="text-lg font-semibold">Grilled Chicken</h5>
              <p className="text-gray-600">A simple grilled chicken recipe with herbs.</p>
              <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300">
                Download Recipe
              </button>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-4">
        {/* Text-Only Banner Section */}
        <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="w-full text-center mb-12"
        >
            <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-5xl font-bold text-gray-900 mb-4"
            >
            Dietary Recommendations
            </motion.h2>
            <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-lg text-gray-600"
            >
            Personalized meal plans, menu scanning, and verified recipes at your fingertips.
            </motion.p>
        </motion.div>
      {/* Navigation Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {sections.map((section) => (
          <motion.div
            key={section.id}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}
          >
            <h3 className="text-xl font-bold mb-4">{section.title}</h3>
            <p className="text-gray-600">{section.description}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Active Section Content */}
      {activeSection && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-8"
        >
          {sections.find((section) => section.id === activeSection)?.content}
        </motion.div>
      )}
    </div>
  );
};

export default DietaryPage;
