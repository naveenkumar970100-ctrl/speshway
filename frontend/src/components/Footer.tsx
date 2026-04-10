import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import logo from "@/assets/logo-speshway.png";

const quickLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Projects", path: "/projects" },
  { name: "Career", path: "/career" },
  { name: "Send Resume", path: "/contact" },
  { name: "Fraud Alert", path: "/contact" },
];

const services = [
  { name: "Web Development", path: "/services" },
  { name: "Mobile Apps", path: "/services" },
  { name: "Cloud Solutions", path: "/services" },
  { name: "AI & ML", path: "/services" },
];

const socials = [Facebook, Twitter, Linkedin, Instagram];

const Footer = () => (
  <footer className="relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-background to-card" />
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

    <div className="relative container py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
      {/* Brand */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <img src={logo} alt="Speshway" className="h-10 w-10 object-contain" />
          <div>
            <span className="block text-sm font-bold text-foreground">SPESHWAY SOLUTIONS</span>
            <span className="block text-[10px] text-muted-foreground tracking-widest">PRIVATE LIMITED</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed mb-5">
          Delivering innovative IT solutions and driving digital transformation for businesses worldwide.
        </p>
        <div className="flex gap-3">
          {socials.map((Icon, i) => (
            <div key={i} className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all cursor-pointer">
              <Icon size={16} />
            </div>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div>
        <h4 className="font-semibold mb-4 text-foreground">Quick Links</h4>
        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          {quickLinks.map((l) => (
            <Link key={l.name} to={l.path} className="hover:text-primary transition-colors hover:translate-x-1 transform duration-200 w-fit">
              {l.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Services */}
      <div>
        <h4 className="font-semibold mb-4 text-foreground">Services</h4>
        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          {services.map((s) => (
            <Link key={s.name} to={s.path} className="hover:text-primary transition-colors hover:translate-x-1 transform duration-200 w-fit">
              {s.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div>
        <h4 className="font-semibold mb-4 text-foreground">Contact</h4>
        <div className="flex flex-col gap-3 text-sm text-muted-foreground">
          <span className="flex items-start gap-2">
            <MapPin size={14} className="text-primary shrink-0 mt-0.5" />
            T-Hub, Plot No 1/C, Sy No 83/1, Raidurgam, Knowledge City Rd, panmaktha, Hyderabad, Serilingampalle (M), Telangana 500032
          </span>
          <span className="flex items-center gap-2">
            <Phone size={14} className="text-secondary shrink-0" />
            +91 9100006020
          </span>
          <span className="flex items-center gap-2">
            <Mail size={14} className="text-accent shrink-0" />
            info@speshway.com
          </span>
        </div>
      </div>
    </div>

    {/* Bottom bar */}
    <div className="relative border-t border-border py-4">
      <div className="container flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
        <span>© {new Date().getFullYear()} SPESHWAY SOLUTIONS PRIVATE LIMITED. All rights reserved.</span>
        <div className="flex gap-4">
          <Link to="/contact" className="hover:text-primary transition-colors">Privacy Policy</Link>
          <Link to="/contact" className="hover:text-primary transition-colors">Terms of Service</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
