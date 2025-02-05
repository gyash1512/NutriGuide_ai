const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173', 'https://nutriguideai.vercel.app/'],
  methods: 'GET, POST, PUT, DELETE',
  credentials: true,
}));

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});