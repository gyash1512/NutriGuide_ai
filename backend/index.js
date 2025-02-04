import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

// Import routes
import authRoutes from './routes/authRoutes.js';
// import userRoutes from './routes/userRoutes.js';

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json()); // Parse JSON request body
app.use(cors({
  origin: ['http://localhost:5173',"https://nutriguideai.vercel.app/"], // Allow requests from React frontend
  methods: 'GET, POST, PUT, DELETE',  // Allowed HTTP methods
  credentials: true,  // If you need credentials (cookies, etc.)
}));// Enable CORS

// Database connection
// import connectDB from './config/db.js';
// connectDB(); // Connect to MongoDB

// Default Route to Check Server
app.get('/', (req, res) => {
  res.send('NutriGuide AI Backend is up and running!');
});

// Routes
app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




// import express from 'express';

// const app = express();

// app.get('/', (req, res) => {
//   res.send('Server is up and running!');
// });

// const PORT = 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
