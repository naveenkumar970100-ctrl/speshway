const CarouselSlide = require("../models/CarouselSlide");
const { cloudinary } = require("../config/cloudinary");

exports.getPublic = async (req, res) => {
  try {
    const slides = await CarouselSlide.find({ isActive: true }).sort({ order: 1 });
    res.json(slides);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAll = async (req, res) => {
  try {
    const slides = await CarouselSlide.find().sort({ order: 1 });
    res.json(slides);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

exports.create = async (req, res) => {
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
};

exports.update = async (req, res) => {
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
};

exports.toggle = async (req, res) => {
  try {
    const slide = await CarouselSlide.findById(req.params.id);
    if (!slide) return res.status(404).json({ message: "Not found" });
    const updated = await CarouselSlide.findByIdAndUpdate(req.params.id, { isActive: !slide.isActive }, { new: true });
    res.json(updated);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

exports.remove = async (req, res) => {
  try {
    const slide = await CarouselSlide.findById(req.params.id);
    if (!slide) return res.status(404).json({ message: "Not found" });
    if (slide.imagePublicId) await cloudinary.uploader.destroy(slide.imagePublicId).catch(() => {});
    await CarouselSlide.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};
