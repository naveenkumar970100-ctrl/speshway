import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { toSlug } from "@/pages/ServiceDetail";
import { useAssets } from "@/hooks/useAssets";


const quickLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Projects", path: "/projects" },
  { name: "Career", path: "/career" },
  { name: "Contact", path: "/contact" },
];

const socialIcons = [
  { Icon: Facebook, key: "social_facebook", fallback: "https://www.facebook.com/profile.php?id=61584485021568" },
  { Icon: Twitter, key: "social_twitter", fallback: "https://x.com/SpeshwayM56509" },
  { Icon: Linkedin, key: "social_linkedin", fallback: "https://www.linkedin.com/company/speshway-solutions-pvt-ltd/" },
  { Icon: Instagram, key: "social_instagram", fallback: "https://www.instagram.com/speshwaysolutionsofficial/" },
];

const Footer = () => {
  const { logo } = useAssets();
  const [services, setServices] = useState<{ name: string; path: string }[]>([]);
  const [settings, setSettings] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch("/api/services")
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setServices(data.slice(0, 6).map((s: { title: string }) => ({
            name: s.title,
            path: `/services/${toSlug(s.title)}`,
          })));
        }
      })
      .catch(() => {});
    fetch("/api/settings")
      .then(r => r.json())
      .then(data => setSettings(data))
      .catch(() => {});
  }, []);

  return (
  <footer className="relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-background to-card" />
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

    <div className="relative container py-8 md:py-16 grid grid-cols-3 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-10">
      {/* Brand */}
      <div className="col-span-3 md:col-span-1">
        <div className="flex items-center gap-2 mb-3">
          <img src={logo} alt="Speshway" className="h-8 w-8 md:h-10 md:w-10 object-contain" />
          <div>
            <span className="block text-xs md:text-sm font-bold text-foreground leading-tight">SPESHWAY SOLUTIONS</span>
            <span className="block text-[9px] md:text-[10px] text-muted-foreground tracking-widest">PRIVATE LIMITED</span>
          </div>
        </div>
        <p className="text-xs md:text-sm text-muted-foreground leading-relaxed mb-3 md:mb-5">
          Delivering innovative IT solutions and driving digital transformation for businesses worldwide.
        </p>
        <div className="flex gap-2 md:gap-3">
          {socialIcons.map(({ Icon, key, fallback }, i) => {
            const href = settings[key] || fallback;
            return (
              <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                className="w-7 h-7 md:w-9 md:h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all cursor-pointer">
                <Icon size={13} />
              </a>
            );
          })}
        </div>
      </div>

      {/* Quick Links */}
      <div>
        <h4 className="font-semibold mb-2 md:mb-4 text-foreground text-xs md:text-base">Quick Links</h4>
        <div className="flex flex-col gap-1 md:gap-2 text-xs md:text-sm text-muted-foreground">
          {quickLinks.map((l) => (
            <Link key={l.name} to={l.path} className="hover:text-primary transition-colors w-fit">
              {l.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Services */}
      <div>
        <h4 className="font-semibold mb-2 md:mb-4 text-foreground text-xs md:text-base">Services</h4>
        <div className="flex flex-col gap-1 md:gap-2 text-xs md:text-sm text-muted-foreground">
          {services.length > 0 ? services.map((s) => (
            <Link key={s.name} to={s.path} className="hover:text-primary transition-colors w-fit">
              {s.name}
            </Link>
          )) : (
            <Link to="/services" className="hover:text-primary transition-colors">View All Services</Link>
          )}
        </div>
      </div>

      {/* Contact */}
      <div>
        <h4 className="font-semibold mb-2 md:mb-4 text-foreground text-xs md:text-base">Contact</h4>
        <div className="flex flex-col gap-2 md:gap-3 text-xs md:text-sm text-muted-foreground">
          <span className="flex items-start gap-1.5">
            <MapPin size={12} className="text-primary shrink-0 mt-0.5" />
            <span className="leading-tight">T-Hub, Plot No 1/C, Sy No 83/1, Raidurgam, Hyderabad, Telangana 500032</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Phone size={12} className="text-secondary shrink-0" />
            +91 9100006020
          </span>
          <span className="flex items-center gap-1.5">
            <Mail size={12} className="text-accent shrink-0" />
            info@speshway.com
          </span>
        </div>
      </div>
    </div>

    {/* Bottom bar */}
    <div className="relative border-t border-border py-4">
      <div className="container flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
        <span>&copy; {new Date().getFullYear()} SPESHWAY SOLUTIONS PRIVATE LIMITED. All rights reserved.</span>
        <div className="flex gap-4">
          <Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
          <Link to="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link>
        </div>
      </div>
    </div>
  </footer>
  );
};

export default Footer;
