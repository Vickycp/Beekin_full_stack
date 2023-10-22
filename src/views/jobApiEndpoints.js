// src/views/apiEndpoints.js
const express = require('express');
const basicAuth = require('basic-auth');
const router = express.Router();
const userService = require('../services/userService');
const jobService = require('../services/jobService');
const { validationResult, body ,query} = require('express-validator');

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


router.get(
  '/listofjobs',
  [
    query('page').optional().isInt({ min: 1 }).withMessage('Invalid page number.'),
    query('pageSize').optional().isInt({ min: 1, max: 100 }).withMessage('Invalid page size.'),
  ],
  auth,
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { page = 1, pageSize = 10 } = req.query;

    jobService
      .getJobs(page, pageSize)
      .then((jobs) => res.status(200).json(jobs))
      .catch(() => res.status(500).send('Error fetching jobs.'));
  }
);

router.post(
  '/relatedJobs',
  [
    body('experience').isInt({ min: 0 }).withMessage('Experience must be a non-negative integer.'),
    body('skill').not().isEmpty().withMessage('Skill is required.'),
  ],
  auth,
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { experience, skill } = req.body;

    jobService
      .getRelevantJob(experience, skill)
      .then((jobResult) => {
        return res.status(jobResult.http_code).json(jobResult);
      })
      .catch(() => res.status(500).send('Error fetching jobs.'));
  }
);

router.post(
  '/jobApply',
  [
    body('jobid').isMongoId().withMessage('Invalid job ID format.'),
    body('userid').isMongoId().withMessage('Invalid user ID format.'),
  ],
  auth,
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { jobid, userid } = req.body;

    jobService
      .applyFindedJobs(jobid, userid)
      .then((jobResult) => {
        return res.status(jobResult.http_code).json(jobResult);
      })
      .catch(() => res.status(500).send('Error while applying.'));
  }
);

module.exports = router;
