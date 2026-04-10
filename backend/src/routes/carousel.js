const express = require("express");
const router = express.Router();
const CarouselSlide = require("../models/CarouselSlide");
const { cloudinary, upload } = require("../cloudinary");
const { verifyToken } = require("../middleware/auth");

// Seed default slides if none exist
const seedSlides = async () => {
  const count = await CarouselSlide.countDocuments();
  if (count === 0) {
    await CarouselSlide.insertMany([
      { badge: "Welcome to the Future of IT", title: "Build Your Digital Future", highlight: "Speshway Solutions", desc: "Full-stack software, automation, and IT solutions that drive real business growth.", ctaText: "Our Services", ctaLink: "/services", cta2Text: "Get in Touch", cta2Link: "/contact", order: 0 },
      { badge: "Mobile App Development", title: "Stunning Mobile Apps", highlight: "For Every Platform", desc: "We build beautiful, high-performance mobile applications for iOS and Android.", ctaText: "View Projects", ctaLink: "/projects", cta2Text: "Get a Quote", cta2Link: "/contact", order: 1 },
      { badge: "Cloud & Security Solutions", title: "Secure & Scalable", highlight: "Cloud Infrastructure", desc: "Enterprise-grade cybersecurity and cloud solutions to protect and grow your business.", ctaText: "Learn More", ctaLink: "/services", cta2Text: "Contact Us", cta2Link: "/contact", order: 2 },
    ]);
    console.log("✅ Carousel slides seeded");
  }
};
seedSlides();

// GET /api/carousel — public, only active slides
router.get("/", async (req, res) => {
  try {
    const slides = await CarouselSlide.find({ isActive: true }).sort({ order: 1 });
    res.json(slides);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/carousel/all — admin, all slides
router.get("/all", verifyToken, async (req, res) => {
  try {
    const slides = await CarouselSlide.find().sort({ order: 1 });
    res.json(slides);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/carousel — admin, with optional image
router.post("/", verifyToken, upload.single("image"), async (req, res) => {
  try {
    const { badge, title, highlight, desc, ctaText, ctaLink, cta2Text, cta2Link, order } = req.body;
    const slide = await CarouselSlide.create({
      badge, title, highlight, desc,
      ctaText: ctaText || "Learn More",
      ctaLink: ctaLink || "/services",
      cta2Text: cta2Text || "Contact Us",
      cta2Link: cta2Link || "/contact",
      order: order || 0,
      image: req.file ? req.file.path : "",
      imagePublicId: req.file ? req.file.filename : "",
    });
    res.status(201).json(slide);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/carousel/:id — admin
router.put("/:id", verifyToken, upload.single("image"), async (req, res) => {
  try {
    const existing = await CarouselSlide.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: "Not found" });

    const { badge, title, highlight, desc, ctaText, ctaLink, cta2Text, cta2Link, order, isActive } = req.body;
    const updates = { badge, title, highlight, desc, ctaText, ctaLink, cta2Text, cta2Link, order, isActive: isActive === "true" || isActive === true };

    if (req.file) {
      if (existing.imagePublicId) await cloudinary.uploader.destroy(existing.imagePublicId).catch(() => {});
      updates.image = req.file.path;
      updates.imagePublicId = req.file.filename;
    }

    const slide = await CarouselSlide.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json(slide);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH /api/carousel/:id/toggle — admin, toggle active
router.patch("/:id/toggle", verifyToken, async (req, res) => {
  try {
    const slide = await CarouselSlide.findById(req.params.id);
    if (!slide) return res.status(404).json({ message: "Not found" });
    const updated = await CarouselSlide.findByIdAndUpdate(
      req.params.id,
      { isActive: !slide.isActive },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/carousel/:id — admin
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const slide = await CarouselSlide.findById(req.params.id);
    if (!slide) return res.status(404).json({ message: "Not found" });
    if (slide.imagePublicId) await cloudinary.uploader.destroy(slide.imagePublicId).catch(() => {});
    await CarouselSlide.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
