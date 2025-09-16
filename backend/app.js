const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

// Import routes
const authRoutes = require('./Routes/authRoutes');
const feedbackRoutes = require('./Routes/feedbackRoutes');
const eventRoutes = require('./Routes/eventRoutes');
const studentRoutes = require('./Routes/studentRoutes');
const adminsRoutes = require('./Routes/adminRoutes');
const userRoutes = require('./Routes/userRoutes');  // 👈 make sure file exists

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/events', eventRoutes);  // 👈 changed to /api/events for clarity
app.use('/api/admins', adminsRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/users', userRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
