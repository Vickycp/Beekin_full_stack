// src/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },

    password:{
        type:String,
        required:true
    },

    age: {
        type: Number,
        required: false
    },
    experience: {
        type: Number,
        required: true
    },

    useremail: {
        type: String,
        required: true
    },
    
    gender: {
        type: String,
        required: true
    },
    skill: {
        type: [String],
        required: true
    },


});

const User = mongoose.model('User', userSchema);
module.exports = User;
