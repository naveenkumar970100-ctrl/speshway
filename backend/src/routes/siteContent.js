const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth");
const ctrl = require("../controllers/siteContentController");
const SiteContent = require("../models/SiteContent");

const defaults = [
  { key: "stats_title", label: "Stats Section Title", value: "Innovation & Excellence", section: "home" },
  { key: "stats_subtitle", label: "Stats Section Subtitle", value: "End-to-end IT solutions tailored to your business needs, powered by innovation and expertise.", section: "home" },
  { key: "services_label", label: "Services Label", value: "What We Do", section: "home" },
  { key: "services_title", label: "Services Section Title", value: "Innovation & Excellence", section: "home" },
  { key: "portfolio_label", label: "Portfolio Label", value: "Portfolio", section: "home" },
  { key: "portfolio_title", label: "Portfolio Section Title", value: "Our Latest Masterpieces", section: "home" },
  { key: "portfolio_subtitle", label: "Portfolio Subtitle", value: "We build stunning mobile apps and web solutions that redefine user experience.", section: "home" },
  { key: "whyus_label", label: "Why Us Label", value: "Why Choose Us", section: "home" },
  { key: "whyus_title", label: "Why Us Title", value: "Delivering Excellence In Every Project", section: "home" },
  { key: "testimonials_label", label: "Testimonials Label", value: "Testimonials", section: "home" },
  { key: "testimonials_title", label: "Testimonials Title", value: "What Our Clients Say", section: "home" },
  { key: "cta_title", label: "CTA Title", value: "Ready to Transform Your Business?", section: "home" },
  { key: "cta_subtitle", label: "CTA Subtitle", value: "Let's discuss how Speshway Solutions can accelerate your digital journey and bring your vision to life.", section: "home" },
];

const seedDefaults = async () => {
  for (const d of defaults) {
    await SiteContent.findOneAndUpdate({ key: d.key }, d, { upsert: true });
  }
};
seedDefaults();

router.get("/", ctrl.getPublic);
router.get("/all", verifyToken, ctrl.getAll);
router.put("/:key", verifyToken, ctrl.updateOne);

module.exports = router;
