import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook

const Header = () => {
  const { user, logout } = useAuth(); // Get the user and logout function from the context

  return (
    <header className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo with Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-xl font-bold"
        >
          <Link to="/">
            <img
              src="../images/logo.svg" // Replace with your logo path
              alt="Logo"
              className="h-12 w-auto" // Adjust size as needed
            />
          </Link>
        </motion.div>

        {/* Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6 text-lg font-medium">
            <li>
              <Link to="/" className="hover:text-blue-500 transition-colors duration-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/medical-details" className="hover:text-blue-500 transition-colors duration-300">
                Medical Details
              </Link>
            </li>
            <li>
              <Link to="/dietary" className="hover:text-blue-500 transition-colors duration-300">
                Dietary
              </Link>
            </li>
            <li>
              <Link to="/workout" className="hover:text-blue-500 transition-colors duration-300">
                Workout
              </Link>
            </li>
            <li>
              <Link to="/about-us" className="hover:text-blue-500 transition-colors duration-300">
                About Us
              </Link>
            </li>
            {/* Show login/signup if user is not authenticated */}
            {!user ? (
              <>
                <li>
                  <Link to="/login" className="hover:text-blue-500 transition-colors duration-300">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/signup" className="hover:text-blue-500 transition-colors duration-300">
                    Signup
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <button
                  onClick={logout}
                  className="hover:text-blue-500 transition-colors duration-300"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </nav>

        {/* Mobile Menu Button (Hamburger Icon) */}
        <button className="md:hidden p-2 focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Navigation (Hidden by Default) */}
      <nav className="md:hidden mt-4">
        <ul className="flex flex-col space-y-4 text-lg font-medium">
          <li>
            <Link to="/" className="hover:text-blue-500 transition-colors duration-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/medical-details" className="hover:text-blue-500 transition-colors duration-300">
              Medical Details
            </Link>
          </li>
          <li>
            <Link to="/dietary" className="hover:text-blue-500 transition-colors duration-300">
              Dietary
            </Link>
          </li>
          <li>
            <Link to="/workout" className="hover:text-blue-500 transition-colors duration-300">
              Workout
            </Link>
          </li>
          <li>
            <Link to="/about-us" className="hover:text-blue-500 transition-colors duration-300">
              About Us
            </Link>
          </li>
          {/* Show login/signup if user is not authenticated */}
          {!user ? (
            <>
              <li>
                <Link to="/login" className="hover:text-blue-500 transition-colors duration-300">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="hover:text-blue-500 transition-colors duration-300">
                  Signup
                </Link>
              </li>
            </>
          ) : (
            <li>
              <button
                onClick={logout}
                className="hover:text-blue-500 transition-colors duration-300"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
