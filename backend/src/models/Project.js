const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    tech: [{ type: String }],
    liveUrl: { type: String, default: "" },
    features: [{ type: String }],
    status: { type: String, enum: ["Active", "Completed", "In Progress"], default: "In Progress" },
    client: { type: String, default: "" },
    image: { type: String, default: "" },       // Cloudinary URL
    imagePublicId: { type: String, default: "" }, // Cloudinary public_id for deletion
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
