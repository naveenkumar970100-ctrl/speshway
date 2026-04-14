const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth");
const ctrl = require("../controllers/jobController");

// Static routes FIRST — before /:id to avoid param conflicts
router.get("/", ctrl.getPublic);
router.get("/all", verifyToken, ctrl.getAll);
router.get("/applications/all", verifyToken, ctrl.getAllApplications);
router.patch("/applications/:appId/status", verifyToken, ctrl.updateApplicationStatus);
router.post("/", verifyToken, ctrl.create);

// Param routes AFTER
router.get("/:id", ctrl.getOne);
router.put("/:id", verifyToken, ctrl.update);
router.delete("/:id", verifyToken, ctrl.remove);
router.post("/:id/apply", ctrl.resumeUpload.single("resume"), ctrl.apply);
router.get("/:id/applications", verifyToken, ctrl.getJobApplications);

module.exports = router;
