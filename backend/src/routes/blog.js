const express = require("express");
const router = express.Router();
const { upload } = require("../config/cloudinary");
const { verifyToken } = require("../middleware/auth");
const ctrl = require("../controllers/blogController");

router.get("/", ctrl.getPublic);
router.get("/all", verifyToken, ctrl.getAll);
router.get("/:id", ctrl.getOne);
router.post("/", verifyToken, upload.single("image"), ctrl.create);
router.put("/:id", verifyToken, upload.single("image"), ctrl.update);
router.delete("/:id", verifyToken, ctrl.remove);

module.exports = router;
