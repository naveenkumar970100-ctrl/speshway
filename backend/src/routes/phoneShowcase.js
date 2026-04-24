const express = require("express");
const router = express.Router();
const { upload } = require("../config/cloudinary");
const { verifyToken } = require("../middleware/auth");
const ctrl = require("../controllers/phoneShowcaseController");

router.get("/", ctrl.getAll);
router.get("/all", verifyToken, ctrl.getAllAdmin);
router.post("/", verifyToken, upload.single("image"), ctrl.create);
router.put("/:id", verifyToken, upload.single("image"), ctrl.update);
router.delete("/:id", verifyToken, ctrl.remove);

module.exports = router;
