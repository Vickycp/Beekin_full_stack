// src/views/apiEndpoints.js
const express = require('express');
const basicAuth = require('basic-auth');
const router = express.Router();
const userService = require('../services/userService');
const cors=require('cors')

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

router.post('/createUser', cors(),(req, res) => {
   const { username, password,age,experience,useremail, gender,skill } = req.body;
  
  // Validate if username and password are present in the request body
  if (!username || !password) {
    return res.status(400).send('Username and password are required.');
  }
  const listofSkill= skill.split(',').map(skill => skill.trim());
  userService
    .saveUser(username, password,age,experience,useremail,gender,listofSkill)
    .then(() => res.status(201).send('User created successfully.'))
   
});




router.get('/userLogin',auth, (req, res) => {
    console.log("request foun") 
    const {useremail,password}= req.body;
    userService.checkUserLogin(useremail,password)
    .then((responseData) =>{ 
        
        console.log(responseData.https_code);
       return res.status(responseData.https_code).send(responseData)})
       .catch(() => res.status(500).send('please try again.')); ;




});



module.exports = router;
