const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Factory — creates a Cloudinary multer storage for a specific folder
const makeStorage = (folder) =>
  new CloudinaryStorage({
    cloudinary,
    params: {
      folder: `speshway/${folder}`,
      allowed_formats: ["jpg", "jpeg", "png", "webp", "gif"],
      transformation: [{ width: 1200, height: 800, crop: "limit", quality: "auto:good" }],
    },
  });

// Per-resource upload middleware
const upload = multer({ storage: makeStorage("projects"), limits: { fileSize: 10 * 1024 * 1024 } });
const uploadBlog = multer({ storage: makeStorage("blog"), limits: { fileSize: 10 * 1024 * 1024 } });
const uploadTeam = multer({ storage: makeStorage("team"), limits: { fileSize: 10 * 1024 * 1024 } });
const uploadCarousel = multer({ storage: makeStorage("carousel"), limits: { fileSize: 10 * 1024 * 1024 } });

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

module.exports = { cloudinary, upload, uploadBlog, uploadTeam, uploadCarousel, uploadResume };
