import { HashRouter  as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import MedicalDetails from "./pages/MedicalDetails";
import Dietary from "./pages/Dietary";
import Workout from "./pages/Workout";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import Footer from "./components/Footer";
const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/medical-details" element={<MedicalDetails />} />
        <Route path="/dietary" element={<Dietary />} />
        <Route path="/workout" element={<Workout />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/about-us" element={<AboutUs />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
