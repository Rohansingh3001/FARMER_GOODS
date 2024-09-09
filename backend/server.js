const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const itemsRoutes = require('./routes/items');
const { addProduct } = require('./controllers/addProduct')
const { login } = require('./controllers/login')
const { register} = require('./controllers/register')
const { User} = require('./models/User')
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON

// Serve static files from 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/addproduct', addProduct);
// Routes
app.use('/api/items', itemsRoutes);
app.use('/api/login', login); // Login endpoint
app.use('/api/register', register); // Register endpoint

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
