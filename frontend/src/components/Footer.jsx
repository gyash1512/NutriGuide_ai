import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-12">
      <div className="container mx-auto px-4">
        {/* Footer Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8"
        >
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">NutriGuide AI</h3>
            <p className="text-gray-400">
              Empowering you to make healthier choices every day.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Home
                </a>
              </li>
              <li>
                <a href="/medical-details" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Medical Details
                </a>
              </li>
              <li>
                <a href="/dietary" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Dietary
                </a>
              </li>
              <li>
                <a href="/workout" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Workout
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Contact Us</h3>
            <p className="text-gray-400">Email: support@nutriguideai.com</p>
            <p className="text-gray-400">Phone: +1 (123) 456-7890</p>
          </div>

          {/* Social Media Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <i className="fab fa-facebook text-2xl"></i>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <i className="fab fa-twitter text-2xl"></i>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <i className="fab fa-instagram text-2xl"></i>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <i className="fab fa-linkedin text-2xl"></i>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Copyright Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400"
        >
          <p>&copy; {new Date().getFullYear()} NutriGuide AI. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;