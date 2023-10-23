// src/app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const jobApiEndpoints = require('./src/views/jobApiEndpoints');
const userApiEndpoints = require('./src/views/userApiEndpoints');
// Initialize Express app
const app = express();
app.use(bodyParser.json());
app.use(express.json());


// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/jobportal', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', false);
  next();
});

// API Endpoints
app.use('/job', jobApiEndpoints);
app.use('/user', userApiEndpoints);


// Start server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
