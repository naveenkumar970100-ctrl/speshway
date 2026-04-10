const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true },
    value: { type: String, default: "" },
    group: { type: String, default: "general" },
    label: { type: String, default: "" },
    type: { type: String, default: "text" }, // text, textarea, color, toggle, url
  },
  { timestamps: true }
);

module.exports = mongoose.model("Settings", settingsSchema);
