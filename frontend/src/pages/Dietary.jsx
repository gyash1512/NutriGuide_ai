import { useState } from "react";
import { motion } from "framer-motion";

const DietaryPage = () => {
  // State to manage which section is open
  const [activeSection, setActiveSection] = useState(null);

  // Sections data
  const sections = [
    {
      id: "recommendations",
      title: "Dietary Recommendations",
      description: "Get personalized dietary recommendations based on your health goals.",
      content: (
        <div className="mt-6 p-6 bg-gray-50 rounded-lg">
          <h4 className="text-xl font-semibold mb-4">Your Dietary Plan</h4>
          <p className="text-gray-600">
            Based on your health data, here are your recommended meals for the week:
          </p>
          <ul className="mt-4 list-disc list-inside text-gray-600">
            <li>Breakfast: Oatmeal with fruits</li>
            <li>Lunch: Grilled chicken salad</li>
            <li>Dinner: Quinoa with roasted vegetables</li>
          </ul>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300">
            View Full Plan
          </button>
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
      {/* Banner Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="w-full relative mb-8"
      >
        {/* Banner Image */}
        <img
          src="../images/dietary_banner.jpg" // Replace with your image URL
          alt="Dietary Recommendations"
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
              Dietary Recommendations
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-2 text-lg text-white"
            >
              Personalized meal plans, menu scanning, and verified recipes at your fingertips.
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

export default DietaryPage;