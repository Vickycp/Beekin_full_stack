// src/models/Job.js
const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    job_id: {
        type: String,
        required: true
    },
    job_title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    req_experience: {
        type: Number,
        required: true
    },
    req_skills: {
        type: [String],
        required: true
    },
});

const Job = mongoose.model('Job', jobSchema);
module.exports = Job;
