// src/views/apiEndpoints.js
const express = require('express');
const basicAuth = require('basic-auth');
const router = express.Router();
const userService = require('../services/userService');
const { check, body } = require('express-validator');
const { validationResult } = require('express-validator');

// Basic Authentication Middleware
const auth = (req, res, next) => {
  const user = basicAuth(req);
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

router.post(
  '/createUser',
  [
    body('username').trim().isLength({ min: 1 }).withMessage('Username is required.'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters.'),
    body('age').isInt({ min: 1 }).withMessage('Age must be a positive integer.'),
    body('experience').isInt({ min: 0 }).withMessage('Experience must be a non-negative integer.'),
    body('useremail').isEmail().normalizeEmail().withMessage('Invalid email address.'),
    body('gender').isIn(['male', 'female', 'other']).withMessage('Invalid gender.'),
    body('skill').trim().not().isEmpty().withMessage('Skills are required.'),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password, age, experience, useremail, gender, skill } = req.body;

    const listofSkill = skill.split(',').map(skill => skill.trim());
    userService
      .saveUser(username, password, age, experience, useremail, gender, listofSkill)
      .then(() => res.status(201).send('User created successfully.'))
      .catch(() => res.status(500).send('Internal Server Error.'));
  }
);




router.post(
  '/userLogin',
  [
    check('useremail').isEmail().normalizeEmail(),
    check('password').isLength({ min: 6 }).trim(),
  ],
  auth,
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { useremail, password } = req.body;

    userService
      .checkUserLogin(useremail, password)
      .then((responseData) => {
        console.log(responseData.https_code);
        return res.status(responseData.https_code).send(responseData);
      })
      .catch(() => res.status(500).send('Please try again.'));
  }
);



module.exports = router;
