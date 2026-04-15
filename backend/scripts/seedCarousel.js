/**
 * Seeds 10 professional carousel slides with images uploaded to Cloudinary.
 * Run: node scripts/seedCarousel.js  (backend must be running on port 5000)
 */

const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);

const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const API = "http://localhost:5000/api";

// 10 professional slides — Mobile Dev, Web Dev, Digital Marketing
const slides = [
  {
    badge: "Mobile App Development",
    title: "Stunning Mobile Apps",
    highlight: "For Every Platform",
    desc: "We craft high-performance iOS & Android apps that users love — from concept to App Store launch.",
    ctaText: "View Projects", ctaLink: "/projects",
    cta2Text: "Get a Quote", cta2Link: "/contact",
    order: 0,
    // Mobile phones / app development
    imageUrl: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=1400&q=85",
    imageId: "carousel-mobile-1",
  },
  {
    badge: "Web Development",
    title: "Build Your Digital Future",
    highlight: "With Speshway Solutions",
    desc: "Full-stack web applications built with React, Node.js, and modern frameworks that scale with your business.",
    ctaText: "Our Services", ctaLink: "/services",
    cta2Text: "Get in Touch", cta2Link: "/contact",
    order: 1,
    // Web developer coding on laptop
    imageUrl: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=1400&q=85",
    imageId: "carousel-web-1",
  },
  {
    badge: "Digital Marketing",
    title: "Grow Your Brand",
    highlight: "Online & Beyond",
    desc: "Data-driven digital marketing strategies — SEO, SEM, social media, and content that converts visitors into customers.",
    ctaText: "Learn More", ctaLink: "/services",
    cta2Text: "Contact Us", cta2Link: "/contact",
    order: 2,
    // Digital marketing analytics dashboard
    imageUrl: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=1400&q=85",
    imageId: "carousel-marketing-1",
  },
  {
    badge: "Mobile App Development",
    title: "iOS & Android Apps",
    highlight: "That Users Love",
    desc: "From fintech to healthcare, we build cross-platform mobile solutions with React Native and Flutter.",
    ctaText: "View Projects", ctaLink: "/projects",
    cta2Text: "Start Project", cta2Link: "/contact",
    order: 3,
    // Person using smartphone app
    imageUrl: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=1400&q=85",
    imageId: "carousel-mobile-2",
  },
  {
    badge: "Web Development",
    title: "Enterprise Web Solutions",
    highlight: "Built to Scale",
    desc: "Robust, secure, and lightning-fast web platforms for startups and enterprises. We turn ideas into reality.",
    ctaText: "Our Work", ctaLink: "/projects",
    cta2Text: "Talk to Us", cta2Link: "/contact",
    order: 4,
    // Team working on web project with multiple screens
    imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1400&q=85",
    imageId: "carousel-web-2",
  },
  {
    badge: "Digital Marketing",
    title: "SEO & Social Media",
    highlight: "That Drives Results",
    desc: "Rank higher, reach more. Our digital marketing experts craft campaigns that deliver measurable ROI.",
    ctaText: "Get Started", ctaLink: "/contact",
    cta2Text: "Our Services", cta2Link: "/services",
    order: 5,
    // Social media marketing on phone/laptop
    imageUrl: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1400&q=85",
    imageId: "carousel-marketing-2",
  },
  {
    badge: "Mobile App Development",
    title: "UI/UX That Converts",
    highlight: "Beautiful & Functional",
    desc: "Award-winning mobile UI/UX design combined with robust backend engineering for apps that stand out.",
    ctaText: "See Portfolio", ctaLink: "/projects",
    cta2Text: "Get a Quote", cta2Link: "/contact",
    order: 6,
    // UI/UX design wireframes and prototypes
    imageUrl: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=1400&q=85",
    imageId: "carousel-mobile-3",
  },
  {
    badge: "Web Development",
    title: "Cloud-Native Applications",
    highlight: "Powered by AWS & Azure",
    desc: "Scalable cloud architecture, microservices, and DevOps pipelines that keep your business running 24/7.",
    ctaText: "Cloud Services", ctaLink: "/services",
    cta2Text: "Contact Us", cta2Link: "/contact",
    order: 7,
    // Cloud computing / server infrastructure
    imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1400&q=85",
    imageId: "carousel-web-3",
  },
  {
    badge: "Digital Marketing",
    title: "Content That Connects",
    highlight: "With Your Audience",
    desc: "Strategic content marketing, email campaigns, and brand storytelling that builds trust and drives engagement.",
    ctaText: "Learn More", ctaLink: "/services",
    cta2Text: "Get in Touch", cta2Link: "/contact",
    order: 8,
    // Content creation / marketing team
    imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1400&q=85",
    imageId: "carousel-marketing-3",
  },
  {
    badge: "Full-Stack Solutions",
    title: "End-to-End IT Solutions",
    highlight: "From Idea to Launch",
    desc: "Strategy, design, development, and marketing — everything you need to succeed in the digital world.",
    ctaText: "Start Today", ctaLink: "/contact",
    cta2Text: "View Services", cta2Link: "/services",
    order: 9,
    // Tech team collaboration / innovation
    imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1400&q=85",
    imageId: "carousel-fullstack-1",
  },
];

async function getToken() {
  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD }),
  });
  const data = await res.json();
  if (!data.token) throw new Error("Login failed");
  return data.token;
}

async function uploadToCloudinary(imageUrl, publicId) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(imageUrl, {
      folder: "speshway/carousel",
      public_id: publicId,
      overwrite: true,
      transformation: [{ width: 1400, height: 700, crop: "fill", quality: "auto:good", gravity: "center" }],
    }, (err, result) => err ? reject(err) : resolve(result));
  });
}

async function run() {
  console.log("🔐 Authenticating...");
  const token = await getToken();
  console.log("✅ Authenticated\n");

  // Clear existing slides first
  console.log("🗑️  Clearing existing carousel slides...");
  const existing = await fetch(`${API}/carousel/all`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json());
  for (const slide of (Array.isArray(existing) ? existing : [])) {
    await fetch(`${API}/carousel/${slide._id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
  }
  console.log(`   Removed ${existing.length || 0} old slides\n`);

  console.log("🚀 Creating 10 carousel slides...\n");

  for (const slide of slides) {
    try {
      process.stdout.write(`⬆️  [${slide.order + 1}/10] ${slide.badge} — uploading image... `);

      // Upload image to Cloudinary
      const uploaded = await uploadToCloudinary(slide.imageUrl, slide.imageId);
      console.log(`✅`);

      // Create slide via API
      const fd = new FormData();
      fd.append("badge", slide.badge);
      fd.append("title", slide.title);
      fd.append("highlight", slide.highlight);
      fd.append("desc", slide.desc);
      fd.append("ctaText", slide.ctaText);
      fd.append("ctaLink", slide.ctaLink);
      fd.append("cta2Text", slide.cta2Text);
      fd.append("cta2Link", slide.cta2Link);
      fd.append("order", String(slide.order));
      // Pass the Cloudinary URL directly (no file upload needed — already on Cloudinary)
      fd.append("imageUrl", uploaded.secure_url);

      // Use JSON instead since image is already on Cloudinary
      const res = await fetch(`${API}/carousel`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          badge: slide.badge, title: slide.title, highlight: slide.highlight,
          desc: slide.desc, ctaText: slide.ctaText, ctaLink: slide.ctaLink,
          cta2Text: slide.cta2Text, cta2Link: slide.cta2Link, order: slide.order,
          image: uploaded.secure_url, imagePublicId: uploaded.public_id,
        }),
      });

      if (res.ok) {
        console.log(`   💾 Saved: "${slide.title} ${slide.highlight}"`);
      } else {
        const err = await res.json();
        console.log(`   ⚠️  API error: ${err.message}`);
      }
    } catch (err) {
      console.error(`   ❌ Failed: ${err.message}`);
    }
  }

  console.log("\n🎉 Done! 10 carousel slides created with Cloudinary images.");
  console.log("📋 Admin can edit them at: localhost:8080/admin/carousel");
}

run().catch(console.error);
