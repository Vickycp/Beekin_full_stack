// src/services/jobService.js
const jobPresenter = require('../presenters/jobPresenter');

const jobService = {
  saveJob: (title, description) => {
    return jobPresenter.saveJob(title, description);
  },
  getJobs: () => {
    return jobPresenter.getJobs();
  },
};

module.exports = jobService;
