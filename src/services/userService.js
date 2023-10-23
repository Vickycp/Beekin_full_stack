// src/services/userService.js
const userPresenter = require('../presenters/userPresenter');

const userService = {

    
  saveUser: (username, password,age,experience,useremail, gender,skill) => {
      return userPresenter.saveUser(username, password,age,experience, useremail,gender,skill);
  },

  getUserByEmail: (email) => {
 return userPresenter.getuserByEmail(email);
  },


  checkUserLogin: (email, password) => {
    // Logging the email for debugging purposes
    console.log('**user login email:**' + email + '*****');

    // Calling a function (userPresenter.getuserByEmail) to get user details by email
    return userPresenter.getuserByEmail(email).then((userDetails) => {
        // Logging the username of the user retrieved for debugging purposes
        console.log("check user: " + userDetails.username);

        // Comparing the password provided with the password from the retrieved user details
        if (userDetails.password === password) {
            // If passwords match, return response data for successful login
            return {
                message: 'login successfully.',
                https_code: 301,
                status: true,
                useremail: userDetails.useremail,
                userage: userDetails.age,
                userExp: userDetails.experience,
                userSkills: userDetails.skill
            };
        } else {
            // If passwords do not match, return response data for invalid credentials
            return {
                message: 'invalid credentials.',
                https_code: 401,
                status: false,
            };
        }
    });
}


};

module.exports = userService;
