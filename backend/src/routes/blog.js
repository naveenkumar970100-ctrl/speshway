const express = require("express");
const router = express.Router();
const { uploadBlog } = require("../config/cloudinary");
const { verifyToken } = require("../middleware/auth");
const ctrl = require("../controllers/blogController");

router.get("/", ctrl.getPublic);
router.get("/all", verifyToken, ctrl.getAll);
router.get("/:id", ctrl.getOne);
router.post("/", verifyToken, uploadBlog.single("image"), ctrl.create);
router.put("/:id", verifyToken, uploadBlog.single("image"), ctrl.update);
router.delete("/:id", verifyToken, ctrl.remove);

module.exports = router;
