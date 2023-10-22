// src/presenters/jobPresenter.js
const Job = require('../model/Job');

const JobApplications= require('../model/JobApplication');

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
  },
   
  getApplicationByJobId:async(jobId)=>{
    console.log("P jobId :"+jobId);
         return await JobApplications.findOne({jobId:jobId }).exec();
  },

  getJobByID:(jobid)=>{
    console.log("get job"+ jobid);
    return Job.findOne({ _id:jobid});
  },

  createJobApplication: (jobid, userId) => {
    console.log("P C jobId:" + jobid + " userId:" + userId);
  
    // Create a new instance of the JobApplications model
    const jobApplications = new JobApplications({
      jobId: jobid,
      applicants: [{ userId: userId }],
    });
  
    // Save the new job application to the database and return the promise
    return jobApplications.save();
  },
  
checkAlreadyApplid:(useId)=>{
  JobApplications.findById()
},
  updateJobApplicant: async (jobId, userId) => {
    console.log("P U jobId:" + jobId + " userId:" + userId);
    
    // Find the job application based on the jobId
    let application = await JobApplications.findOne({ jobId: jobId }).exec();
    
    // Log the details of the application being updated
    console.log("application to update " + application.jobId);
    
    // Add the new applicant's userId to the applicants array of the found job application
    application.applicants.push({ userId: userId });
  
    // Save the updated job application back to the database
    await application.save();
  
    // Return the updated job application (optional, if needed)
    return await application.applicants.find(applicant => applicant.userId.equals(userId));
  },
  

};

module.exports = jobPresenter;
