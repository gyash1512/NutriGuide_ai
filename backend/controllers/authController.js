import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import admin from 'firebase-admin';

// Register User
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, dob, weight, height, gender } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'User already exists' });

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name, email, password: hashedPassword, dob, weight, height, gender
    });

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Registration failed' });
  }
};

export const checkUserExists = async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(200).json({ exists: true });
    }

    return res.status(200).json({ exists: false });
  } catch (error) {
    console.error("Error checking user:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user in MongoDB
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid email or password' });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid email or password' });

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};
export const verifyToken = async (req, res) => {
  const { token } = req.body;

  try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      res.status(200).json({ uid: decodedToken.uid, email: decodedToken.email });
    } catch (error) {
      console.error('Error verifying token:', error);
      res.status(401).json({ error: 'Invalid token' });
    }
};
