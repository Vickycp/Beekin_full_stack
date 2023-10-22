// src/services/jobService.js
const jobPresenter = require('../presenters/jobPresenter');

const jobService = {
  saveJob: (title, description) => {
    return jobPresenter.saveJob(title, description);
  },
  getJobs: () => {
    return jobPresenter.getJobs();
  },

  getReleventJob:(experince,skill)=>{
      const skills= skill.split(',').map(skill => skill.trim());
      return jobPresenter.getReleventMatch(experince,skills);git 

  },
};

module.exports = jobService;
