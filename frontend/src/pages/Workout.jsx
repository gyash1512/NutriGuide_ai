import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { auth } from '../firebase';

const WorkoutPage = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [fitnessLevel, setFitnessLevel] = useState('beginner');
  const [goals, setGoals] = useState('');
  const [otherNotes, setOtherNotes] = useState('');
  const [workoutPlan, setWorkoutPlan] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSavedWorkoutPlan = async () => {
      const email = auth.currentUser?.email;
      if (!email) return;

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/gemini/saved-workout-plan/${email}`, {
          headers: {
            'ngrok-skip-browser-warning': 'true',
          },
        });
        const data = await response.json();
        if (data.workoutPlan) {
          setWorkoutPlan(data.workoutPlan);
        }
      } catch (error) {
        console.error('Error fetching saved workout plan:', error);
      }
    };

    if (activeSection === 'workout-plans') {
      fetchSavedWorkoutPlan();
    }
  }, [activeSection]);

  const handleGetWorkoutPlan = () => {
    setLoading(true);
    const email = auth.currentUser?.email;
    if (!email) {
      alert("User email not found. Please log in again.");
      setLoading(false);
      return;
    }

    fetch(`${import.meta.env.VITE_API_URL}/api/gemini/get-workout-plan`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
      },
      body: JSON.stringify({ email, fitnessLevel, goals, otherNotes })
    })
    .then(res => res.json())
    .then(data => {
      setWorkoutPlan(data.workoutPlan);
      setLoading(false);
    })
    .catch(error => {
      console.error('Error getting workout plan:', error);
      setWorkoutPlan('Error: Could not get workout plan.');
      setLoading(false);
    });
  };

  const sections = [
    {
      id: "workout-plans",
      title: "Workout Plans",
      description: "Get personalized workout plans tailored to your fitness goals.",
      content: (
        <div className="mt-6 p-6 bg-gray-50 rounded-lg">
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Fitness Level</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={fitnessLevel}
              onChange={(e) => setFitnessLevel(e.target.value)}
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Goals (e.g., "lose weight", "build muscle")</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={goals}
              onChange={(e) => setGoals(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Other Notes (e.g., "focus on legs", "no equipment")</label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-lg"
              rows="4"
              value={otherNotes}
              onChange={(e) => setOtherNotes(e.target.value)}
            ></textarea>
          </div>

          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
            onClick={handleGetWorkoutPlan}
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Get New Workout Plan'}
          </button>

          {workoutPlan && (
            <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-2">Your 7-Day Workout Plan</h2>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{workoutPlan}</ReactMarkdown>
            </div>
          )}
        </div>
      ),
    },
    {
      id: "exercise-tracking",
      title: "Exercise Tracking",
      description: "Track your exercises and monitor your progress over time.",
      content: (
        <div className="mt-6 p-6 bg-gray-50 rounded-lg">
          <h4 className="text-xl font-semibold mb-4">Track Your Exercises</h4>
          <p className="text-gray-600">
            Log your workouts and see your progress with detailed analytics.
          </p>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300">
            Log Workout
          </button>
        </div>
      ),
    },
    {
      id: "personalized-coaching",
      title: "Personalized Coaching",
      description: "Get one-on-one coaching from certified fitness trainers.",
      content: (
        <div className="mt-6 p-6 bg-gray-50 rounded-lg">
          <h4 className="text-xl font-semibold mb-4">Work with a Coach</h4>
          <p className="text-gray-600">
            Connect with a certified coach for personalized guidance and support.
          </p>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300">
            Find a Coach
          </button>
        </div>
      ),
    },
    {
      id: "community-challenges",
      title: "Community Challenges",
      description: "Join fitness challenges and compete with others.",
      content: (
        <div className="mt-6 p-6 bg-gray-50 rounded-lg">
          <h4 className="text-xl font-semibold mb-4">Join a Challenge</h4>
          <p className="text-gray-600">
            Participate in community challenges to stay motivated and achieve your goals.
          </p>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300">
            View Challenges
          </button>
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
            Workout Plans
            </motion.h2>
            <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-lg text-gray-600"
            >
            Personalized workout plans, exercise tracking, and community challenges.
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

export default WorkoutPage;
