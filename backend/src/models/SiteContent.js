const mongoose = require("mongoose");

// Stores editable home page section titles/subtitles
const siteContentSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true }, // e.g. "hero_badge", "stats_title"
    label: { type: String, required: true },             // human-readable label for admin
    value: { type: String, required: true },             // the actual text
    section: { type: String, default: "home" },          // which page section
  },
  { timestamps: true }
);

module.exports = mongoose.model("SiteContent", siteContentSchema);
