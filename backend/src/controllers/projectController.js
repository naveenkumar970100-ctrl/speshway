const Project = require("../models/Project");
const { cloudinary } = require("../config/cloudinary");

exports.getAll = async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    res.json(projects);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getOne = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Not found" });
    res.json(project);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

exports.create = async (req, res) => {
  try {
    const { title, category, description, tech, liveUrl, features, status, client, order } = req.body;
    const project = await Project.create({
      title, category, description,
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
};

exports.update = async (req, res) => {
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
    if (req.file) {
      if (existing.imagePublicId) await cloudinary.uploader.destroy(existing.imagePublicId).catch(() => {});
      updates.image = req.file.path;
      updates.imagePublicId = req.file.filename;
    }
    const project = await Project.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Not found" });
    if (project.imagePublicId) await cloudinary.uploader.destroy(project.imagePublicId).catch(() => {});
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};
