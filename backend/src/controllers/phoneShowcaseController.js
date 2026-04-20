const PhoneShowcase = require("../models/PhoneShowcase");
const { cloudinary } = require("../config/cloudinary");

// GET /api/phone-showcase — public
exports.getAll = async (req, res) => {
  try {
    const items = await PhoneShowcase.find({ isActive: true }).sort({ order: 1, createdAt: 1 });
    res.json(items);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/phone-showcase/all — admin (includes inactive)
exports.getAllAdmin = async (req, res) => {
  try {
    const items = await PhoneShowcase.find().sort({ order: 1, createdAt: 1 });
    res.json(items);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/phone-showcase — admin, create
exports.create = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "Image required" });
    const { label, color, order } = req.body;
    const item = await PhoneShowcase.create({
      image: req.file.path,
      label: label || "",
      color: color || "primary",
      order: parseInt(order) || 0,
    });
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/phone-showcase/:id — admin, update (image optional)
exports.update = async (req, res) => {
  try {
    const item = await PhoneShowcase.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });

    const { label, color, order, isActive } = req.body;
    if (label !== undefined) item.label = label;
    if (color !== undefined) item.color = color;
    if (order !== undefined) item.order = parseInt(order);
    if (isActive !== undefined) item.isActive = isActive === "true" || isActive === true;

    if (req.file) {
      // Delete old image from Cloudinary
      const match = item.image.match(/speshway\/phone-showcase\/[^.]+/);
      if (match) await cloudinary.uploader.destroy(match[0]).catch(() => {});
      item.image = req.file.path;
    }

    await item.save();
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/phone-showcase/:id — admin
exports.remove = async (req, res) => {
  try {
    const item = await PhoneShowcase.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });

    // Delete from Cloudinary
    const match = item.image.match(/speshway\/phone-showcase\/[^.]+/);
    if (match) await cloudinary.uploader.destroy(match[0]).catch(() => {});

    await item.deleteOne();
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
