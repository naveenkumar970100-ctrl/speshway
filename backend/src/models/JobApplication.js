const mongoose = require("mongoose");

const jobApplicationSchema = new mongoose.Schema(
  {
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
    jobTitle: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: "" },
    coverLetter: { type: String, default: "" },
    resumeUrl: { type: String, default: "" },       // Cloudinary URL
    resumePublicId: { type: String, default: "" },
    resumeOriginalName: { type: String, default: "" },
    status: { type: String, enum: ["New", "Reviewed", "Shortlisted", "Rejected"], default: "New" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("JobApplication", jobApplicationSchema);
