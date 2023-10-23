const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema({
  jobId: {
    type:  mongoose.Schema.Types.ObjectId,
    ref:'Job',
    required: true,
  },
  applicants:  [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User schema
      required: true,
    },
    applicationDate: {
      type: Date,
      default: Date.now,
    },
  }],
});

const JobApplication = mongoose.model('JobApplication', jobApplicationSchema);

module.exports = JobApplication;
