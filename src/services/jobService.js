// src/services/jobService.js
const jobPresenter = require('../presenters/jobPresenter');

const jobService = {
  saveJob: (title, description) => {
    return jobPresenter.saveJob(title, description);
  },
  getJobs: () => {
    return jobPresenter.getJobs();
  },

  getReleventJob: async (experience, skill) => {
    try {
      const skills = skill.split(',').map(skill => skill.trim());
      // console.log('Skills:', skills, 'Experience:', experience);
  
      const results = await jobPresenter.getReleventMatch(experience, skills);
      
      if (results && results.length > 0) {
        return {
          result: results,
          status: true,
          http_code: 200,
          message: "Relevant jobs found"
        };
      } else {
        return {
          result: null,
          status: false,
          http_code: 404,
          message: "No relevant jobs found"
        };
      }
    } catch (error) {
      console.error(error);
      return {
        result: null,
        status: false,
        http_code: 500,
        message: "Internal server error"
      };
    }
  },
};

module.exports = jobService;
