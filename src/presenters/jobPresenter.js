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

  getReleventMatch:(experience,skills)=>{
    Job.find({
      req_experience: experience, // Jobs with exactly 7 years of experience
      req_skills: { $all: skills } // Jobs with all specified skills (Java and SQL)
  }).then((result)=>result).catch(()=>"not found");
  }
};

module.exports = jobPresenter;
