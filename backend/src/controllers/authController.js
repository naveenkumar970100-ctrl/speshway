const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");

exports.login = async (req, res) => {
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
    res.json({ token, admin: { email: admin.email, name: admin.name, role: admin.role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
};

exports.verify = (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(400).json({ valid: false });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ valid: true, admin: decoded });
  } catch {
    res.json({ valid: false });
  }
};
