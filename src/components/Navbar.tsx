import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";
import logo from "@/assets/logo-speshway.png";
import MagneticButton from "./MagneticButton";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Projects", path: "/projects" },
  { name: "Blog", path: "/blog" },
  { name: "Team", path: "/team" },
  { name: "Career", path: "/career" },
  { name: "FAQ", path: "/faq" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isLight = theme === "light";

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out-expo",
        isLight
          ? "py-3 bg-white shadow-md border-b border-gray-200"
          : scrolled
            ? "py-3 glass shadow-2xl border-b border-border"
            : "py-6 bg-transparent"
      )}
    >
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group relative">
          <div className="relative">
            <img 
              src={logo} 
              alt="Speshway Solutions" 
              className="h-10 w-10 object-contain group-hover:scale-110 transition-transform duration-500 ease-out-back" 
            />
            <div className="absolute inset-0 bg-primary/20 blur-xl scale-0 group-hover:scale-150 transition-transform duration-700 rounded-full opacity-0 group-hover:opacity-100" />
          </div>
          <div className="group-hover:animate-glitch transition-all">
            <span className="block text-sm font-bold tracking-[0.15em] text-foreground uppercase">SPESHWAY SOLUTIONS</span>
            <span className="block text-[9px] text-muted-foreground tracking-[0.3em] font-medium uppercase opacity-70">PRIVATE LIMITED</span>
          </div>
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((l, i) => (
            <Link
              key={l.path}
              to={l.path}
              className={cn(
                "relative text-[13px] font-bold uppercase tracking-wider px-4 py-2 transition-all duration-500 group overflow-hidden",
                pathname === l.path ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <span className="relative z-10">{l.name}</span>
              
              {/* Creative Hover Effect */}
              <span className={cn(
                "absolute bottom-1.5 left-4 right-4 h-0.5 bg-primary origin-left transition-transform duration-500 ease-out-expo",
                pathname === l.path ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
              )} />
              
              <span className="absolute inset-0 bg-primary/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out-expo" />
            </Link>
          ))}
          
          <div className="ml-4 flex items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_hsl(var(--primary)/0.3)]"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <MagneticButton distance={40} strength={0.2}>
              <Link
                to="/contact"
                className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-[13px] font-bold uppercase tracking-widest hover:shadow-[0_0_30px_hsl(var(--primary)/0.5)] transition-all duration-500 hover:scale-105 inline-block"
              >
                Contact Us
              </Link>
            </MagneticButton>
          </div>
        </div>

        {/* Mobile toggle */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-10 h-10 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-primary transition-all duration-300"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button 
            className="w-10 h-10 rounded-full glass flex items-center justify-center text-foreground hover:text-primary transition-colors" 
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={cn(
        "lg:hidden fixed inset-0 top-[64px] backdrop-blur-2xl transition-all duration-700 ease-out-expo z-40",
        isLight ? "bg-white/98 border-t border-gray-200" : "bg-background/95",
        open ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      )}>
        <div className="container py-12 flex flex-col gap-4">
          {navLinks.map((l, i) => (
            <Link
              key={l.path}
              to={l.path}
              onClick={() => setOpen(false)}
              className={cn(
                "text-2xl font-heading font-bold py-4 px-6 rounded-2xl transition-all duration-500 flex items-center justify-between group",
                pathname === l.path
                  ? "text-primary bg-primary/10 translate-x-4"
                  : "text-muted-foreground hover:text-foreground hover:bg-primary/5 hover:translate-x-2"
              )}
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {l.name}
              <div className={cn(
                "w-2 h-2 rounded-full bg-primary transition-transform duration-500",
                pathname === l.path ? "scale-100" : "scale-0 group-hover:scale-100"
              )} />
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="mt-8 px-8 py-5 rounded-2xl bg-primary text-primary-foreground font-bold text-center text-xl shadow-2xl shadow-primary/20"
          >
            Get In Touch
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
