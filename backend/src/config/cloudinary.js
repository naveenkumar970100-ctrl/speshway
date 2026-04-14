const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Image upload (projects, blog, team, carousel)
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "speshway/projects",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ width: 1200, height: 800, crop: "limit", quality: "auto" }],
  },
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

// Resume upload (raw files — PDF, DOC, DOCX)
const resumeStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "speshway/resumes",
    resource_type: "raw",
    allowed_formats: ["pdf", "doc", "docx"],
  },
});
const uploadResume = multer({ storage: resumeStorage, limits: { fileSize: 5 * 1024 * 1024 } });

module.exports = { cloudinary, upload, uploadResume };
