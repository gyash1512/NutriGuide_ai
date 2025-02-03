import express from 'express';
import cors from 'cors';  // Import cors package
import authRoutes from './routes/authRoutes.js'; // Add .js extension for ES modules

const app = express();

// Middleware

app.use(express.json());

// CORS middleware configuration
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from React frontend
  methods: 'GET, POST, PUT, DELETE',  // Allowed HTTP methods
  credentials: true,  // If you need credentials (cookies, etc.)
}));

// Add COOP & COEP headers to all responses
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  next();
});

// Routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
