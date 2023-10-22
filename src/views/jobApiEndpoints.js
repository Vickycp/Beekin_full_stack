// src/views/apiEndpoints.js
const express = require('express');
const basicAuth = require('basic-auth');
const router = express.Router();
const userService = require('../services/userService');
const jobService = require('../services/jobService');

// Basic Authentication Middleware
const auth = (req, res, next) => {
  const user = basicAuth(req);
  console.log('******'+user.name+'*****');
  if (!user || !user.name || !user.pass) {
    return res.status(401).send('Authentication required.');
  }

  userService
    .getUserByEmail(user.name)
    .then((foundUser) => {
       userpass=foundUser.password;
      if (foundUser && userpass===user.pass) {
        next();
      } else {
        res.status(401).send('Authentication failed.');
      }
    })
    .catch(() => res.status(401).send('Authentication failed.'));
};





router.post('/job', auth, (req, res) => {
  // ... (same as previous implementation)
});

router.get('/listofjobs', auth, (req, res) => {
   jobService
   .getJobs()
   .then((jobs) => res.status(200).json(jobs))
   .catch(() => res.status(500).send('Error fetching jobs.'));
});

module.exports = router;
