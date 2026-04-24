const express = require("express");
const router = express.Router();
const { upload } = require("../config/cloudinary");
const { verifyToken } = require("../middleware/auth");
const ctrl = require("../controllers/assetController");

// GET /api/assets — public, get all asset URLs
router.get("/", ctrl.getAll);

// POST /api/assets/upload — admin, upload asset
router.post("/upload", verifyToken, upload.single("file"), ctrl.upload);

module.exports = router;
