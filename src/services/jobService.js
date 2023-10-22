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
      // console.log('Skills:', skills, 'Experience:', experience);wor
  
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

  applyFindedJobs: async (jobId, userId) => {
    try {
      console.log("1 jobId:" + jobId + " userId:" + userId);
  
      // Check if the job exists
      const job = await jobPresenter.getJobByID(jobId); // Assuming getJobID was a typo, corrected to getJobByID
      console.log("2 job id:" + job._id);
  
      if (!job) {
        throw new Error('Job not found.');
      }
  
      // Check if the job application already exists
      let jobApplication = await jobPresenter.getApplicationByJobId(job._id);
      console.log("job details service:" + jobApplication);
  
      let jobDetails;
  
      if (!jobApplication) {
        // If the job application does not exist, create a new one
        jobDetails = await jobPresenter.createJobApplication(jobId, userId);
      } else {
        // If the job application exists, add the user to the applicants
        const applicant = jobApplication.applicants.find(applicant => applicant.userId.equals(userId));

        if (applicant) {
          console.log('Found applicant:', applicant);
          return {
            status: false,
            jobDetails: applicant,
            http_code: 400,
            message: "Application already present."
          };
          
        } else {
          console.log('User ID not found in applicants array.');
          jobDetails= await jobPresenter.updateJobApplicant(jobId, userId); // Or return null or an appropriate message if the user ID is not found
        }

        
      }
  
      if (jobDetails) {
        return {
          status: true,
          jobDetails: jobDetails,
          http_code: 201,
          message: "Application sent."
        };
      } else {
        throw new Error('Failed to process the job application.');
      }
  
    } catch (error) {
      return {
        status: false,
        jobDetails: error.message,
        http_code: 400,
        message: "Application failed."
      };
    }
  }
  

};

module.exports = jobService;
