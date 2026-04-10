const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    location: { type: String, required: true },
    type: { type: String, enum: ["Full-time", "Part-time", "Contract", "Internship"], default: "Full-time" },
    salary: { type: String, default: "" },
    department: { type: String, default: "" },
    experience: { type: String, default: "" },
    desc: { type: String, required: true },
    requirements: [{ type: String }],
    status: { type: String, enum: ["Open", "Closed", "Draft"], default: "Open" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
