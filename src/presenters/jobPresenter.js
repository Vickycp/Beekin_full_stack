// src/presenters/jobPresenter.js
const Job = require('../model/Job');

const jobPresenter = {
  saveJob: (title, description) => {
    const job = new Job({ job_id, job_title,description,req_experience,req_skills });
    return job.save();
  },
  getJobs: () => {
    return Job.find().exec();
  },
};

module.exports = jobPresenter;
