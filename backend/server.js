import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import mealPlanRoutes from './routes/mealPlanRoutes.js';
import geminiRoutes from './routes/geminiRoutes.js';
import { conn } from './config/db.js'; // Import MySQL connection

dotenv.config();

const app = express();

// Middleware

app.use(express.json());
// CORS middleware configuration
app.use(cors({
  origin: ['http://localhost:5173',"https://nutriguideai.vercel.app"], // Allow requests from React frontend
  methods: 'GET, POST, PUT, DELETE',  // Allowed HTTP methods
  credentials: true,  // If you need credentials (cookies, etc.)
}));

// Handle preflight requests
app.options('*', cors()); // Enable preflight for all routes
// Add COOP & COEP headers to all responses
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Replace '*' with allowed domains if needed
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Authorization, X-Auth-Token');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.get('/', (req, res) => {
  res.send('NutriGuide AI Backend is up and running!');
});
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/meal-plans', mealPlanRoutes);
app.use('/api/gemini', geminiRoutes);
const MONGO_URI = process.env.MONGO_URI; // Load MongoDB URI from .env
const PORT = process.env.PORT || 5000; // Load port from .env or default to 5000

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB:", err.message);
    process.exit(1); // Exit process on failure
  });

// Start the server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));