import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      {/* Hero Section: Full-Width Image with Text on the Left */}
      <motion.div
  initial={{ opacity: 0, y: -50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
  className="w-full relative mb-8"
>
  {/* Image */}
  <img
    src="../images/home_main.png" // Replace with your image URL
    alt="NutriGuide AI"
    className="w-full aspect-[7.1/3] object-cover rounded-lg shadow-lg" // Adjust aspect ratio as needed
  />

  {/* Text Overlay with Animation and Hover Effect */}
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute inset-0 flex items-center justify-center p-8 bg-black bg-opacity-50 rounded-lg"
    >
        <div className="text-center max-w-md">
        <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-5xl font-bold text-white"
        >
            NutriGuide AI
        </motion.h2>
        <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-4 text-lg text-white"
        >
            Empowering you to make healthier choices every day.
        </motion.p>
        </div>
    </motion.div>
    </motion.div>

      {/* Key Features Section with Images */}
      <div className="mt-12">
        {/* Heading: Key Features */}
        <h2 className="text-3xl font-bold text-center mb-8">Key Features</h2>

        {/* Grid of Placeholders */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
            {
                title: "Personalized Plans",
                description:
                "Get customized meal and exercise plans tailored to your goals.",
                image: "../images/feature1.svg", // Replace with your image URL
            },
            {
                title: "AI-Powered Insights",
                description:
                "Leverage AI to analyze your habits and suggest improvements.",
                image: "../images/feature2.svg", // Replace with your image URL
            },
            {
                title: "Track Progress",
                description:
                "Monitor your progress with detailed analytics and reports.",
                image: "../images/feature3.svg", // Replace with your image URL
            },
            {
                title: "Community Support",
                description:
                "Join a community of like-minded individuals for motivation.",
                image: "../images/feature4.svg", // Replace with your image URL
            },
            ].map((feature, index) => (
                <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0, duration: 0 }} // Faster animations
                whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)" }} // Enhanced hover animation
                className="p-6 bg-orange-50 rounded-lg shadow-md hover:shadow-lg transition-all duration-300" // Light orangish background
              >
                {/* Feature Image */}
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-40 object-contain mb-4" // Increased image size to h-40
                />
              
                {/* Feature Title and Description */}
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
        </div>
        </div>
    </div>
  );
};

export default Home;