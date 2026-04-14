const Contact = require("../models/Contact");

exports.submit = async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !subject || !message)
    return res.status(400).json({ message: "All fields are required." });
  try {
    const entry = await Contact.create({ name, email, subject, message });
    res.status(201).json({ message: "Message received! We'll get back to you soon.", id: entry._id });
  } catch {
    res.status(500).json({ message: "Server error." });
  }
};
