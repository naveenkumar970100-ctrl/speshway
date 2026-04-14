const express = require("express");
const router = express.Router();
const Testimonial = require("../models/Testimonial");
const { verifyToken } = require("../middleware/auth");

// Seed defaults if none exist
const seed = async () => {
  const count = await Testimonial.countDocuments();
  if (count === 0) {
    await Testimonial.insertMany([
      { name: "Abdul Hameed", role: "CEO, KSA", text: "Speshway has designed solutions for my business at very reasonable prices. They are mavens in providing quality services and offering customer support.", rating: 5, order: 0 },
      { name: "Arjun M.", role: "CEO, TechStartup", text: "Speshway delivered our platform ahead of schedule with exceptional quality. The team was professional and truly understood our vision.", rating: 5, order: 1 },
      { name: "Ravi K.", role: "Founder, FinEdge", text: "Professional team, transparent process, and outstanding results. They built our fintech app from scratch and it exceeded all expectations.", rating: 5, order: 2 },
    ]);
  }
};
seed();

// GET /api/testimonials — public, active only
router.get("/", async (req, res) => {
  try {
    const items = await Testimonial.find({ isActive: true }).sort({ order: 1, createdAt: 1 });
    res.json(items);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/testimonials/all — admin
router.get("/all", verifyToken, async (req, res) => {
  try {
    const items = await Testimonial.find().sort({ order: 1, createdAt: 1 });
    res.json(items);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/testimonials — admin
router.post("/", verifyToken, async (req, res) => {
  try {
    const { name, role, text, rating, order } = req.body;
    const item = await Testimonial.create({ name, role, text, rating: rating || 5, order: order || 0 });
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/testimonials/:id — admin
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const { name, role, text, rating, isActive, order } = req.body;
    const item = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { name, role, text, rating, isActive, order },
      { new: true }
    );
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/testimonials/:id — admin
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
