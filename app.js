// src/app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jobApiEndpoints = require('./src/views/jobApiEndpoints');
const userApiEndpoints = require('./src/views/userApiEndpoints');

// Initialize Express app
const app = express();
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/jobportal', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// API Endpoints
app.use('/job', jobApiEndpoints);
app.use('/user', userApiEndpoints);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
