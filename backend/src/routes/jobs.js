const express = require("express");
const router = express.Router();
const Job = require("../models/Job");
const { verifyToken } = require("../middleware/auth");

// GET /api/jobs — public, only open jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find({ status: "Open" }).sort({ order: 1, createdAt: -1 });
    res.json(jobs);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/jobs/all — admin, all jobs
router.get("/all", verifyToken, async (req, res) => {
  try {
    const jobs = await Job.find().sort({ order: 1, createdAt: -1 });
    res.json(jobs);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/jobs/:id — public
router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Not found" });
    res.json(job);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/jobs — admin
router.post("/", verifyToken, async (req, res) => {
  try {
    const { title, location, type, salary, department, experience, desc, requirements, status, order } = req.body;
    const job = await Job.create({
      title, location, type, salary, department, experience, desc,
      requirements: Array.isArray(requirements) ? requirements : (requirements ? requirements.split("\n").map(r => r.trim()).filter(Boolean) : []),
      status: status || "Open",
      order: order || 0,
    });
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/jobs/:id — admin
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const { title, location, type, salary, department, experience, desc, requirements, status, order } = req.body;
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      {
        title, location, type, salary, department, experience, desc,
        requirements: Array.isArray(requirements) ? requirements : (requirements ? requirements.split("\n").map(r => r.trim()).filter(Boolean) : []),
        status: status || "Open",
        order: order || 0,
      },
      { new: true }
    );
    if (!job) return res.status(404).json({ message: "Not found" });
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/jobs/:id — admin
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: "Job deleted" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
