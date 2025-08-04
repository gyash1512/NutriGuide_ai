import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import MedicalDetails from "./pages/MedicalDetails";
import Dietary from "./pages/Dietary";
import Workout from "./pages/Workout";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot"; // Import the Chatbot component
import { auth } from "./firebase"; // Import auth from Firebase
import axios from "axios";
import { AuthProvider } from './context/AuthContext';

const sendTokenToBackend = async () => {
  if (!auth.currentUser) return;

  try {
    // Get the Firebase ID token
    const idToken = await auth.currentUser.getIdToken();

    // Send the token to the backend
    await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/verify-token`, { token: idToken });
  } catch (error) {
    console.error('Error sending token to backend:', error);
  }
};


const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (user) sendTokenToBackend();
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <AuthProvider>
        <Header user={user} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/medical-details" element={user ? <MedicalDetails /> : <Navigate to="/login" />} />
          <Route path="/dietary" element={user ? <Dietary /> : <Navigate to="/login" />} />
          <Route path="/workout" element={user ? <Workout /> : <Navigate to="/login" />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
        </Routes>
        <Chatbot />
        <Footer />
      </AuthProvider>
    </Router>
  );
};

export default App;
