import { motion } from "framer-motion";

const AboutUsPage = () => {
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
          src="../public/images/about_us_banner.jpg" // Replace with your image URL
          alt="About Us"
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
              About Us
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-2 text-lg text-white"
            >
              Learn more about our mission, vision, and team.
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* About Us Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-12"
      >
        <h3 className="text-2xl font-bold mb-4">About Us</h3>
        <div className="p-6 bg-gray-50 rounded-lg">
          <h4 className="text-xl font-semibold mb-4">Our Mission</h4>
          <p className="text-gray-600">
            At NutriGuide AI, our mission is to empower individuals to lead healthier lives through
            personalized nutrition and fitness guidance.
          </p>
          <h4 className="text-xl font-semibold mt-6 mb-4">Our Vision</h4>
          <p className="text-gray-600">
            We envision a world where everyone has access to the tools and knowledge they need to
            achieve their health goals.
          </p>
          <h4 className="text-xl font-semibold mt-6 mb-4">Our Team</h4>
          <p className="text-gray-600">
            Our team of experts includes nutritionists, fitness trainers, and AI specialists who are
            passionate about helping you succeed.
          </p>
        </div>
      </motion.div>

      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-12"
      >
        <h3 className="text-2xl font-bold mb-4">FAQ</h3>
        <div className="p-6 bg-gray-50 rounded-lg">
          <h4 className="text-xl font-semibold mb-4">Frequently Asked Questions</h4>
          <div className="space-y-4">
            <div>
              <h5 className="text-lg font-semibold">How does NutriGuide AI work?</h5>
              <p className="text-gray-600">
                NutriGuide AI uses advanced algorithms to analyze your health data and provide
                personalized recommendations.
              </p>
            </div>
            <div>
              <h5 className="text-lg font-semibold">Is my data secure?</h5>
              <p className="text-gray-600">
                Yes, we use state-of-the-art encryption to ensure your data is safe and secure.
              </p>
            </div>
            <div>
              <h5 className="text-lg font-semibold">Can I cancel my subscription anytime?</h5>
              <p className="text-gray-600">
                Absolutely! You can cancel your subscription at any time with no hidden fees.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Contact Us Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mb-12"
      >
        <h3 className="text-2xl font-bold mb-4">Contact Us</h3>
        <div className="p-6 bg-gray-50 rounded-lg">
          <h4 className="text-xl font-semibold mb-4">Contact Information</h4>
          <p className="text-gray-600">
            Have questions or need support? Reach out to us via email or phone.
          </p>
          <div className="mt-4 space-y-2">
            <p className="text-gray-600">
              <strong>Email:</strong> support@nutriguideai.com
            </p>
            <p className="text-gray-600">
              <strong>Phone:</strong> +1 (123) 456-7890
            </p>
          </div>
          <h4 className="text-xl font-semibold mt-6 mb-4">Send Us a Message</h4>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-2 border rounded-lg"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-2 border rounded-lg"
            />
            <textarea
              placeholder="Your Message"
              rows="4"
              className="w-full p-2 border rounded-lg"
            ></textarea>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutUsPage;