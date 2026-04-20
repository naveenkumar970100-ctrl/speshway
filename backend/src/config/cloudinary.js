const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Factory — creates a Cloudinary multer storage for a specific folder
const makeStorage = (folder, opts = {}) =>
  new CloudinaryStorage({
    cloudinary,
    params: {
      folder: `speshway/${folder}`,
      allowed_formats: ["jpg", "jpeg", "png", "webp", "gif"],
      format: "webp", // Always convert to WebP for faster loading
      transformation: opts.transformation || [
        { width: opts.width || 1200, height: opts.height || 800, crop: "limit", quality: "auto:best", fetch_format: "auto" }
      ],
    },
  });

// Per-resource upload middleware — optimized per use case
const upload = multer({ storage: makeStorage("projects", { width: 1200, height: 800 }), limits: { fileSize: 10 * 1024 * 1024 } });
const uploadBlog = multer({ storage: makeStorage("blog", { width: 1200, height: 630 }), limits: { fileSize: 10 * 1024 * 1024 } });
const uploadTeam = multer({ storage: makeStorage("team", { width: 400, height: 400 }), limits: { fileSize: 10 * 1024 * 1024 } });
const uploadCarousel = multer({ storage: makeStorage("carousel", { width: 1920, height: 1080 }), limits: { fileSize: 10 * 1024 * 1024 } });

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
