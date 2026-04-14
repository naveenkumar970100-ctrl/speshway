const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth");
const ctrl = require("../controllers/settingsController");
const Settings = require("../models/Settings");

const defaults = [
  { key: "site_name", label: "Site Name", value: "Speshway Solutions", group: "site", type: "text" },
  { key: "site_tagline", label: "Tagline", value: "Private Limited", group: "site", type: "text" },
  { key: "site_description", label: "Site Description", value: "Full-stack software, automation, and IT solutions that drive real business growth.", group: "site", type: "textarea" },
  { key: "contact_email", label: "Email", value: "info@speshway.com", group: "contact", type: "text" },
  { key: "contact_phone", label: "Phone", value: "+91 9100006020", group: "contact", type: "text" },
  { key: "contact_address", label: "Address", value: "T-Hub, Plot No 1/C, Sy No 83/1, Raidurgam, Knowledge City Rd, Hyderabad, Telangana 500032", group: "contact", type: "textarea" },
  { key: "contact_whatsapp", label: "WhatsApp Number", value: "919100006020", group: "contact", type: "text" },
  { key: "social_facebook", label: "Facebook URL", value: "", group: "social", type: "url" },
  { key: "social_twitter", label: "Twitter URL", value: "", group: "social", type: "url" },
  { key: "social_linkedin", label: "LinkedIn URL", value: "", group: "social", type: "url" },
  { key: "social_instagram", label: "Instagram URL", value: "", group: "social", type: "url" },
  { key: "social_youtube", label: "YouTube URL", value: "", group: "social", type: "url" },
  { key: "seo_title", label: "SEO Title", value: "Speshway Solutions - IT Services & Software Development", group: "seo", type: "text" },
  { key: "seo_description", label: "SEO Meta Description", value: "Speshway Solutions provides full-stack software development, cloud solutions, AI & automation services.", group: "seo", type: "textarea" },
  { key: "seo_keywords", label: "SEO Keywords", value: "software development, IT solutions, mobile apps, cloud, AI, Hyderabad", group: "seo", type: "text" },
  { key: "home_stats_title", label: "Stats Section Title", value: "Innovation & Excellence", group: "home", type: "text" },
  { key: "home_services_label", label: "Services Label", value: "What We Do", group: "home", type: "text" },
  { key: "home_services_title", label: "Services Title", value: "Innovation & Excellence", group: "home", type: "text" },
  { key: "home_whyus_label", label: "Why Us Label", value: "Why Choose Us", group: "home", type: "text" },
  { key: "home_whyus_title", label: "Why Us Title", value: "Delivering Excellence In Every Project", group: "home", type: "text" },
  { key: "home_cta_title", label: "CTA Title", value: "Ready to Transform Your Business?", group: "home", type: "text" },
  { key: "home_cta_subtitle", label: "CTA Subtitle", value: "Let's discuss how Speshway Solutions can accelerate your digital journey.", group: "home", type: "textarea" },
  { key: "footer_copyright", label: "Footer Copyright Text", value: "SPESHWAY SOLUTIONS PRIVATE LIMITED. All rights reserved.", group: "appearance", type: "text" },
  { key: "maintenance_mode", label: "Maintenance Mode", value: "false", group: "appearance", type: "toggle" },
  { key: "color_primary", label: "Primary Color", value: "#7c3aed", group: "appearance", type: "color" },
  { key: "color_secondary", label: "Secondary Color", value: "#06b6d4", group: "appearance", type: "color" },
  { key: "color_accent", label: "Accent Color", value: "#f59e0b", group: "appearance", type: "color" },
];

// Seed — insert missing keys only, preserve existing values
const seedSettings = async () => {
  for (const d of defaults) {
    const existing = await Settings.findOne({ key: d.key });
    if (!existing) {
      await Settings.create(d);
    } else {
      await Settings.updateOne({ key: d.key }, { $set: { label: d.label, group: d.group, type: d.type } });
    }
  }
};
seedSettings();

router.get("/", ctrl.getPublic);
router.get("/all", verifyToken, ctrl.getAll);
router.put("/", verifyToken, ctrl.updateBulk);
router.put("/:key", verifyToken, ctrl.updateOne);

module.exports = router;
