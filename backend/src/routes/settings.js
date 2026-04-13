const express = require("express");
const router = express.Router();
const Settings = require("../models/Settings");
const { verifyToken } = require("../middleware/auth");

const defaults = [
  // Site Info
  { key: "site_name", label: "Site Name", value: "Speshway Solutions", group: "site", type: "text" },
  { key: "site_tagline", label: "Tagline", value: "Private Limited", group: "site", type: "text" },
  { key: "site_description", label: "Site Description", value: "Full-stack software, automation, and IT solutions that drive real business growth.", group: "site", type: "textarea" },
  // Contact
  { key: "contact_email", label: "Email", value: "info@speshway.com", group: "contact", type: "text" },
  { key: "contact_phone", label: "Phone", value: "+91 9100006020", group: "contact", type: "text" },
  { key: "contact_address", label: "Address", value: "T-Hub, Plot No 1/C, Sy No 83/1, Raidurgam, Knowledge City Rd, Hyderabad, Telangana 500032", group: "contact", type: "textarea" },
  { key: "contact_whatsapp", label: "WhatsApp Number", value: "919100006020", group: "contact", type: "text" },
  // Social
  { key: "social_facebook", label: "Facebook URL", value: "", group: "social", type: "url" },
  { key: "social_twitter", label: "Twitter URL", value: "", group: "social", type: "url" },
  { key: "social_linkedin", label: "LinkedIn URL", value: "", group: "social", type: "url" },
  { key: "social_instagram", label: "Instagram URL", value: "", group: "social", type: "url" },
  { key: "social_youtube", label: "YouTube URL", value: "", group: "social", type: "url" },
  // SEO
  { key: "seo_title", label: "SEO Title", value: "Speshway Solutions - IT Services & Software Development", group: "seo", type: "text" },
  { key: "seo_description", label: "SEO Meta Description", value: "Speshway Solutions provides full-stack software development, cloud solutions, AI & automation services.", group: "seo", type: "textarea" },
  { key: "seo_keywords", label: "SEO Keywords", value: "software development, IT solutions, mobile apps, cloud, AI, Hyderabad", group: "seo", type: "text" },
  // Home Page
  { key: "home_stats_title", label: "Stats Section Title", value: "Innovation & Excellence", group: "home", type: "text" },
  { key: "home_services_label", label: "Services Label", value: "What We Do", group: "home", type: "text" },
  { key: "home_services_title", label: "Services Title", value: "Innovation & Excellence", group: "home", type: "text" },
  { key: "home_whyus_label", label: "Why Us Label", value: "Why Choose Us", group: "home", type: "text" },
  { key: "home_whyus_title", label: "Why Us Title", value: "Delivering Excellence In Every Project", group: "home", type: "text" },
  { key: "home_cta_title", label: "CTA Title", value: "Ready to Transform Your Business?", group: "home", type: "text" },
  { key: "home_cta_subtitle", label: "CTA Subtitle", value: "Let's discuss how Speshway Solutions can accelerate your digital journey.", group: "home", type: "textarea" },
  // Stats counters (homepage hero)
  { key: "stat_projects", label: "Projects Delivered", value: "50", group: "stats", type: "text" },
  { key: "stat_clients", label: "Happy Clients", value: "30", group: "stats", type: "text" },
  { key: "stat_team", label: "Team Members", value: "15", group: "stats", type: "text" },
  { key: "stat_experience", label: "Years Experience", value: "5", group: "stats", type: "text" },
  { key: "stat_projects_suffix", label: "Projects Suffix (e.g. +)", value: "+", group: "stats", type: "text" },
  { key: "stat_clients_suffix", label: "Clients Suffix", value: "+", group: "stats", type: "text" },
  { key: "stat_team_suffix", label: "Team Suffix", value: "+", group: "stats", type: "text" },
  { key: "stat_experience_suffix", label: "Experience Suffix", value: "+", group: "stats", type: "text" },
  // Why Choose Us — 4 stat cards
  { key: "whyus_stat1_val", label: "Why Us Stat 1 Value", value: "99%", group: "stats", type: "text" },
  { key: "whyus_stat1_label", label: "Why Us Stat 1 Label", value: "Satisfaction", group: "stats", type: "text" },
  { key: "whyus_stat2_val", label: "Why Us Stat 2 Value", value: "24/7", group: "stats", type: "text" },
  { key: "whyus_stat2_label", label: "Why Us Stat 2 Label", value: "Support", group: "stats", type: "text" },
  { key: "whyus_stat3_val", label: "Why Us Stat 3 Value", value: "100+", group: "stats", type: "text" },
  { key: "whyus_stat3_label", label: "Why Us Stat 3 Label", value: "Tech Stack", group: "stats", type: "text" },
  { key: "whyus_stat4_val", label: "Why Us Stat 4 Value", value: "50+", group: "stats", type: "text" },
  { key: "whyus_stat4_label", label: "Why Us Stat 4 Label", value: "Partners", group: "stats", type: "text" },
  // Why Choose Us — 6 bullet points
  { key: "whyus_point1", label: "Why Us Point 1", value: "Custom development tailored to your business needs", group: "stats", type: "text" },
  { key: "whyus_point2", label: "Why Us Point 2", value: "Agile methodology with rapid deployment", group: "stats", type: "text" },
  { key: "whyus_point3", label: "Why Us Point 3", value: "Enterprise-grade security & 99.9% uptime", group: "stats", type: "text" },
  { key: "whyus_point4", label: "Why Us Point 4", value: "Scalable architecture from startup to enterprise", group: "stats", type: "text" },
  { key: "whyus_point5", label: "Why Us Point 5", value: "Transparent communication throughout", group: "stats", type: "text" },
  { key: "whyus_point6", label: "Why Us Point 6", value: "Dedicated post-launch support & maintenance", group: "stats", type: "text" },
  // Projects page stats
  { key: "proj_stat1_val", label: "Projects Page Stat 1 Value", value: "50+", group: "stats", type: "text" },
  { key: "proj_stat1_label", label: "Projects Page Stat 1 Label", value: "Projects Delivered", group: "stats", type: "text" },
  { key: "proj_stat2_val", label: "Projects Page Stat 2 Value", value: "30+", group: "stats", type: "text" },
  { key: "proj_stat2_label", label: "Projects Page Stat 2 Label", value: "Happy Clients", group: "stats", type: "text" },
  { key: "proj_stat3_val", label: "Projects Page Stat 3 Value", value: "98%", group: "stats", type: "text" },
  { key: "proj_stat3_label", label: "Projects Page Stat 3 Label", value: "On-Time Delivery", group: "stats", type: "text" },
  { key: "proj_stat4_val", label: "Projects Page Stat 4 Value", value: "4.9★", group: "stats", type: "text" },
  { key: "proj_stat4_label", label: "Projects Page Stat 4 Label", value: "Average Rating", group: "stats", type: "text" },
  // Appearance
  { key: "footer_copyright", label: "Footer Copyright Text", value: "SPESHWAY SOLUTIONS PRIVATE LIMITED. All rights reserved.", group: "appearance", type: "text" },
  { key: "maintenance_mode", label: "Maintenance Mode", value: "false", group: "appearance", type: "toggle" },
  // Brand Colors
  { key: "color_primary", label: "Primary Color", value: "#7c3aed", group: "appearance", type: "color" },
  { key: "color_secondary", label: "Secondary Color", value: "#06b6d4", group: "appearance", type: "color" },
  { key: "color_accent", label: "Accent Color", value: "#f59e0b", group: "appearance", type: "color" },
];

// Seed defaults — only insert missing keys, NEVER overwrite existing values
const seedSettings = async () => {
  for (const d of defaults) {
    const existing = await Settings.findOne({ key: d.key });
    if (!existing) {
      // New key — insert with default value
      await Settings.create(d);
    } else {
      // Existing key — only update metadata (label, group, type), preserve value
      await Settings.updateOne({ key: d.key }, { $set: { label: d.label, group: d.group, type: d.type } });
    }
  }
};
seedSettings();

// GET /api/settings — public, returns key-value map
router.get("/", async (req, res) => {
  try {
    res.set("Cache-Control", "no-store, no-cache, must-revalidate");
    const items = await Settings.find();
    const map = {};
    items.forEach(i => { map[i.key] = i.value; });
    res.json(map);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/settings/all — admin, full objects grouped
router.get("/all", verifyToken, async (req, res) => {
  try {
    res.set("Cache-Control", "no-store");
    const items = await Settings.find().sort({ group: 1, key: 1 });
    res.json(items);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /api/settings/:key — admin, update single
router.put("/:key", verifyToken, async (req, res) => {
  try {
    const item = await Settings.findOneAndUpdate(
      { key: req.params.key },
      { value: req.body.value },
      { new: true }
    );
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json(item);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /api/settings — admin, bulk update
router.put("/", verifyToken, async (req, res) => {
  try {
    const updates = req.body; // { key: value, ... }
    const results = [];
    for (const [key, value] of Object.entries(updates)) {
      const item = await Settings.findOneAndUpdate({ key }, { value }, { new: true });
      if (item) results.push(item);
    }
    res.json({ updated: results.length });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
