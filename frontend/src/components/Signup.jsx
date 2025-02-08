import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    dob: '',
    weight: '',
    height: '',
    gender: ''
  });

  const { signupWithEmail } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create User in Firebase
      // await signupWithEmail(formData.email, formData.password);
      const firebaseUser = await signupWithEmail(formData.email, formData.password);
      const firebaseUID = firebaseUser.uid; // Get the Firebase UID
      // Send user data to backend
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`,{ ...formData});

    } catch (error) {
      console.error('Signup error:', error.response?.data || error.message);
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} className="w-full p-2 mb-4 border rounded-lg" />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full p-2 mb-4 border rounded-lg" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full p-2 mb-4 border rounded-lg" />
        <input type="date" name="dob" onChange={handleChange} className="w-full p-2 mb-4 border rounded-lg" />
        <input type="number" name="weight" placeholder="Weight (kg)" onChange={handleChange} className="w-full p-2 mb-4 border rounded-lg" />
        <input type="number" name="height" placeholder="Height (cm)" onChange={handleChange} className="w-full p-2 mb-4 border rounded-lg" />
        <select name="gender" onChange={handleChange} className="w-full p-2 mb-4 border rounded-lg">
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
