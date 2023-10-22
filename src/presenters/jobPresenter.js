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

  getReleventMatch:async (experience,skills)=> {
    return await Job.collection.find({ req_experience: experience, // Jobs with exactly 7 years of experience
     req_skills: { $exists: skills} }).toArray().catch(()=>"not found");
  }
};

module.exports = jobPresenter;
