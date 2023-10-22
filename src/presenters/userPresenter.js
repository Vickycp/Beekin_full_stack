// src/presenters/userPresenter.js
const User = require('../model/User');

const userPresenter = {
  saveUser: (username, password,age,experience, useremail,gender,skill) => {
    const user = new User({ username, password,age,experience, useremail,gender,skill});
    return user.save();
  },

  getuserByEmail:(useremail)=>{
    return User.findOne({ useremail }).exec();
  }
};

module.exports = userPresenter;
