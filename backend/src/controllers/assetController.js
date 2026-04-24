const Settings = require("../models/Settings");
const { cloudinary, uploadToCloudinary } = require("../config/cloudinary");

// GET /api/assets — returns all asset URLs from settings
exports.getAll = async (req, res) => {
  try {
    const items = await Settings.find({ group: "assets" });
    const map = {};
    items.forEach(i => { map[i.key] = i.value; });
    res.json(map);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/assets/upload — admin, upload a static asset to Cloudinary
exports.upload = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });
    const { key } = req.body;
    if (!key) return res.status(400).json({ message: "Asset key required" });

    // Delete old asset from Cloudinary if exists
    const existing = await Settings.findOne({ key });
    if (existing?.value) {
      const publicIdMatch = existing.value.match(/speshway\/assets\/[^.]+/);
      if (publicIdMatch) await cloudinary.uploader.destroy(publicIdMatch[0]).catch(() => {});
    }

    // Upload new asset
    const result = await uploadToCloudinary(req.file.buffer, {
      folder: "speshway/assets",
      transformation: [{ quality: "auto:good" }],
    });

    // Save new URL to settings
    await Settings.findOneAndUpdate(
      { key },
      { key, label: key, value: result.secure_url, group: "assets", type: "image" },
      { upsert: true, new: true }
    );

    res.json({ url: result.secure_url, key });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
