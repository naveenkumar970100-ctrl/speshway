import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from "lucide-react";
import logo from "@/assets/logo-speshway.png";

const Footer = () => (
  <footer className="relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-background to-card" />
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    
    <div className="relative container py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
      <div>
        <div className="flex items-center gap-3 mb-4">
          <img src={logo} alt="Speshway" className="h-10 w-10 object-contain" />
          <div>
            <span className="block text-sm font-bold text-foreground">SPESHWAY</span>
            <span className="block text-[10px] text-muted-foreground tracking-widest">SOLUTIONS PVT LTD</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          Helping startups and enterprises design, develop, and maintain full-stack software and IT solutions.
        </p>
        <div className="flex gap-3">
          {[Github, Linkedin, Twitter].map((Icon, i) => (
            <div key={i} className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all cursor-pointer">
              <Icon size={16} />
            </div>
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-semibold mb-4 text-foreground">Quick Links</h4>
        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          {["About", "Services", "Projects", "Career"].map((l) => (
            <Link key={l} to={`/${l.toLowerCase()}`} className="hover:text-primary transition-colors hover:translate-x-1 transform duration-200">{l}</Link>
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-semibold mb-4 text-foreground">Resources</h4>
        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          {["Blog", "Team", "FAQ", "Contact"].map((l) => (
            <Link key={l} to={`/${l.toLowerCase()}`} className="hover:text-primary transition-colors hover:translate-x-1 transform duration-200">{l}</Link>
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-semibold mb-4 text-foreground">Contact</h4>
        <div className="flex flex-col gap-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-2"><Mail size={14} className="text-primary" /> info@speshway.com</span>
          <span className="flex items-center gap-2"><Phone size={14} className="text-secondary" /> +91 98765 43210</span>
          <span className="flex items-center gap-2"><MapPin size={14} className="text-accent" /> Hyderabad, India</span>
        </div>
      </div>
    </div>
    <div className="relative border-t border-border py-4 text-center text-xs text-muted-foreground">
      © {new Date().getFullYear()} Speshway Solutions Pvt. Ltd. All rights reserved.
    </div>
  </footer>
);

export default Footer;
