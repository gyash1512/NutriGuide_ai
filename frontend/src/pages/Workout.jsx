import { useState } from "react";
import { motion } from "framer-motion";

const WorkoutPage = () => {
  // State to manage which section is open
  const [activeSection, setActiveSection] = useState(null);

  // Sections data
  const sections = [
    {
      id: "workout-plans",
      title: "Workout Plans",
      description: "Get personalized workout plans tailored to your fitness goals.",
      content: (
        <div className="mt-6 p-6 bg-gray-50 rounded-lg">
          <h4 className="text-xl font-semibold mb-4">Your Workout Plan</h4>
          <p className="text-gray-600">
            Based on your fitness level and goals, here is your weekly workout plan:
          </p>
          <ul className="mt-4 list-disc list-inside text-gray-600">
            <li>Monday: Cardio (30 mins)</li>
            <li>Wednesday: Strength Training (45 mins)</li>
            <li>Friday: Yoga & Stretching (30 mins)</li>
          </ul>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300">
            View Full Plan
          </button>
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
      {/* Banner Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="w-full relative mb-8"
      >
        {/* Banner Image */}
        <img
          src="../public/images/workout_banner.jpg" // Replace with your image URL
          alt="Workout Plans"
          className="w-full aspect-[7.1/3] object-cover rounded-lg shadow-lg"
        />

        {/* Banner Text */}
        <div className="absolute inset-0 flex items-center justify-center p-8 bg-black bg-opacity-50 rounded-lg">
          <div className="text-center max-w-md">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-3xl font-bold text-white"
            >
              Workout Plans
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-2 text-lg text-white"
            >
              Personalized workout plans, exercise tracking, and community challenges.
            </motion.p>
          </div>
        </div>
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