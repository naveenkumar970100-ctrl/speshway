const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");
const { login, verify } = require("../controllers/authController");

// Seed default admin on startup
const seedAdmin = async () => {
  try {
    const hashed = bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10);
    await Admin.findOneAndUpdate(
      { email: process.env.ADMIN_EMAIL },
      { name: "Speshway Admin", email: process.env.ADMIN_EMAIL, password: hashed, role: "Super Admin", isActive: true },
      { upsert: true, new: true }
    );
    console.log("✅ Admin ready:", process.env.ADMIN_EMAIL);
  } catch (err) {
    console.error("Seed error:", err.message);
  }
};
seedAdmin();

router.post("/login", login);
router.post("/verify", verify);

module.exports = router;
