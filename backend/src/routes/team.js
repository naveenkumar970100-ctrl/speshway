const express = require("express");
const router = express.Router();
const { uploadTeam } = require("../config/cloudinary");
const { verifyToken } = require("../middleware/auth");
const ctrl = require("../controllers/teamController");

router.get("/", ctrl.getPublic);
router.get("/all", verifyToken, ctrl.getAll);
router.post("/", verifyToken, uploadTeam.single("image"), ctrl.create);
router.put("/:id", verifyToken, uploadTeam.single("image"), ctrl.update);
router.delete("/:id", verifyToken, ctrl.remove);

module.exports = router;
