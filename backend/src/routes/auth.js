const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");
const router = express.Router();

// Seed default admin — always re-create to ensure correct hash
const seedAdmin = async () => {
  try {
    const hashed = bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10);
    await Admin.findOneAndUpdate(
      { email: process.env.ADMIN_EMAIL },
      {
        name: "Speshway Admin",
        email: process.env.ADMIN_EMAIL,
        password: hashed,
        role: "Super Admin",
        isActive: true,
      },
      { upsert: true, new: true }
    );
    console.log("✅ Admin ready:", process.env.ADMIN_EMAIL);
  } catch (err) {
    console.error("Seed error:", err.message);
  }
};
seedAdmin();

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Email and password are required." });

  try {
    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin || !admin.isActive)
      return res.status(401).json({ message: "Invalid credentials." });

    const isMatch = bcrypt.compareSync(password, admin.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials." });

    admin.lastLogin = new Date();
    await admin.save();

    const token = jwt.sign(
      { id: admin._id, email: admin.email, name: admin.name, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.json({
      token,
      admin: { email: admin.email, name: admin.name, role: admin.role },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
});

// POST /api/auth/verify
router.post("/verify", (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(400).json({ valid: false });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ valid: true, admin: decoded });
  } catch {
    res.json({ valid: false });
  }
});

module.exports = router;
