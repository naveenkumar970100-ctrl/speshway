const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const { cloudinary, upload } = require("../cloudinary");
const { verifyToken } = require("../middleware/auth");

// GET /api/projects — public
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    res.json(projects);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/projects/:id — public
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Not found" });
    res.json(project);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/projects — admin only, with image upload
router.post("/", verifyToken, upload.single("image"), async (req, res) => {
  try {
    const { title, category, description, tech, liveUrl, features, status, client, order } = req.body;
    const project = await Project.create({
      title,
      category,
      description,
      tech: tech ? JSON.parse(tech) : [],
      features: features ? JSON.parse(features) : [],
      liveUrl: liveUrl || "",
      status: status || "In Progress",
      client: client || "",
      order: order || 0,
      image: req.file ? req.file.path : "",
      imagePublicId: req.file ? req.file.filename : "",
    });
    res.status(201).json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/projects/:id — admin only
router.put("/:id", verifyToken, upload.single("image"), async (req, res) => {
  try {
    const existing = await Project.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: "Not found" });

    const { title, category, description, tech, liveUrl, features, status, client, order } = req.body;
    const updates = {
      title, category, description,
      tech: tech ? JSON.parse(tech) : existing.tech,
      features: features ? JSON.parse(features) : existing.features,
      liveUrl: liveUrl || existing.liveUrl,
      status: status || existing.status,
      client: client || existing.client,
      order: order !== undefined ? order : existing.order,
    };

    // If new image uploaded, delete old from Cloudinary
    if (req.file) {
      if (existing.imagePublicId) {
        await cloudinary.uploader.destroy(existing.imagePublicId).catch(() => {});
      }
      updates.image = req.file.path;
      updates.imagePublicId = req.file.filename;
    }

    const project = await Project.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/projects/:id — admin only
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Not found" });

    // Delete image from Cloudinary
    if (project.imagePublicId) {
      await cloudinary.uploader.destroy(project.imagePublicId).catch(() => {});
    }

    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
