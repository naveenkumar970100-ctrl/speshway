const express = require("express");
const router = express.Router();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { cloudinary } = require("../config/cloudinary");
const { verifyToken } = require("../middleware/auth");
const ctrl = require("../controllers/assetController");

const assetStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "speshway/assets",
    allowed_formats: ["jpg", "jpeg", "png", "webp", "svg"],
    transformation: [{ quality: "auto:good" }],
  },
});
const uploadAsset = multer({ storage: assetStorage, limits: { fileSize: 10 * 1024 * 1024 } });

// GET /api/assets — public, get all asset URLs
router.get("/", ctrl.getAll);

// POST /api/assets/upload — admin, upload asset
router.post("/upload", verifyToken, uploadAsset.single("file"), ctrl.upload);

module.exports = router;
