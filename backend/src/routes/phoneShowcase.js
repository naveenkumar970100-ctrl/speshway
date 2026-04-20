const express = require("express");
const router = express.Router();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { cloudinary } = require("../config/cloudinary");
const { verifyToken } = require("../middleware/auth");
const ctrl = require("../controllers/phoneShowcaseController");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "speshway/phone-showcase",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ width: 400, height: 800, crop: "limit", quality: "auto:good" }],
  },
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

router.get("/", ctrl.getAll);
router.get("/all", verifyToken, ctrl.getAllAdmin);
router.post("/", verifyToken, upload.single("image"), ctrl.create);
router.put("/:id", verifyToken, upload.single("image"), ctrl.update);
router.delete("/:id", verifyToken, ctrl.remove);

module.exports = router;
