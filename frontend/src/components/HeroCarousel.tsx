import { useState, useEffect, useRef, useCallback } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";

// Cloudinary URLs — no local imports needed
const CLOUDINARY_SLIDES = [
  "https://res.cloudinary.com/djjimbk12/image/upload/speshway/carousel/hero-slide-1.jpg",
  "https://res.cloudinary.com/djjimbk12/image/upload/speshway/carousel/hero-slide-2.jpg",
  "https://res.cloudinary.com/djjimbk12/image/upload/speshway/carousel/hero-slide-3.jpg",
];

interface ApiSlide {
  _id: string; badge: string; title: string; highlight: string; desc: string;
  ctaText: string; ctaLink: string; cta2Text: string; cta2Link: string;
  image: string; isActive: boolean; order: number;
}

const defaultSlides = [
  { image: CLOUDINARY_SLIDES[0], badge: "Welcome to the Future of IT", title: "Build Your Digital Future", highlight: "Speshway Solutions", desc: "Full-stack software, automation, and IT solutions that drive real business growth.", cta: { text: "Our Services", to: "/services" }, cta2: { text: "Get in Touch", to: "/contact" } },
  { image: CLOUDINARY_SLIDES[1], badge: "Mobile App Development", title: "Stunning Mobile Apps", highlight: "For Every Platform", desc: "We build beautiful, high-performance mobile applications for iOS and Android.", cta: { text: "View Projects", to: "/projects" }, cta2: { text: "Get a Quote", to: "/contact" } },
  { image: CLOUDINARY_SLIDES[2], badge: "Cloud & Security Solutions", title: "Secure & Scalable", highlight: "Cloud Infrastructure", desc: "Enterprise-grade cybersecurity and cloud solutions to protect and grow your business.", cta: { text: "Learn More", to: "/services" }, cta2: { text: "Contact Us", to: "/contact" } },
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [prevIdx, setPrevIdx] = useState<number | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { theme } = useTheme();
  const isLight = theme === "light";
  const [slides, setSlides] = useState(defaultSlides);

  // Fetch slides from API, fall back to defaults
  useEffect(() => {
    fetch("/api/carousel")
      .then(r => r.json())
      .then((data: ApiSlide[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setSlides(data.map((s, i) => ({
            image: s.image || CLOUDINARY_SLIDES[i % 3],
            badge: s.badge,
            title: s.title,
            highlight: s.highlight,
            desc: s.desc,
            cta: { text: s.ctaText, to: s.ctaLink },
            cta2: { text: s.cta2Text, to: s.cta2Link },
          })));
        }
      })
      .catch(() => {});
  }, []);

  const goTo = useCallback((index: number) => {
    if (transitioning) return;
    setTransitioning(true);
    setPrevIdx(current);
    setCurrent(index);
    setTimeout(() => { setPrevIdx(null); setTransitioning(false); }, 600);
  }, [current, transitioning]);

  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo]);
  const prev = useCallback(() => goTo((current - 1 + slides.length) % slides.length), [current, goTo]);

  useEffect(() => {
    timerRef.current = setInterval(next, 2000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [next]);

  const slide = slides[current];

  return (
    <section className="relative min-h-[95vh] flex items-center justify-center text-center overflow-hidden bg-background -mt-20">
      {slides.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${s.image})`,
            opacity: i === current ? 1 : 0,
            filter: isLight ? "brightness(0.75) saturate(0.9)" : "brightness(0.55)",
            transition: (i === current || i === prevIdx) ? "opacity 0.6s ease" : "none",
          }}
        />
      ))}

      {/* Overlay */}
      <div className={isLight ? "absolute inset-0 bg-black/45" : "absolute inset-0 bg-background/40"} />
      <div className={`absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t ${isLight ? "from-black/60" : "from-background"} to-transparent`} />
      <div className={`absolute top-0 left-0 right-0 h-24 bg-gradient-to-b ${isLight ? "from-black/40" : "from-background/50"} to-transparent`} />

      {/* Content — pt-20 clears the fixed navbar height */}
      <div className="relative z-10 container px-4 pt-24 pb-16">
        <div key={`badge-${current}`} className="animate-fade-in-up mb-8">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/15 border border-white/30 text-white text-sm backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-primary" />
            {slide.badge}
            <ArrowRight size={14} className="text-primary" />
          </span>
        </div>

        <h1
          key={`title-${current}`}
          className="animate-fade-in-up text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-white leading-[1.1] mb-6 tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
          style={{ animationDelay: "80ms" }}
        >
          {slide.title}
          <br />
          <span className="text-gradient">{slide.highlight}</span>
        </h1>

        <p
          key={`desc-${current}`}
          className="animate-fade-in-up text-white/85 max-w-2xl mx-auto text-lg md:text-xl mb-10 font-light leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]"
          style={{ animationDelay: "160ms" }}
        >
          {slide.desc}
        </p>

        <div
          key={`cta-${current}`}
          className="animate-fade-in-up flex flex-col sm:flex-row gap-4 justify-center items-center"
          style={{ animationDelay: "240ms" }}
        >
          <Link
            to={slide.cta.to}
            className="px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-bold uppercase tracking-widest hover:shadow-[0_0_25px_hsl(var(--primary)/0.5)] hover:scale-105 transition-all duration-300"
          >
            {slide.cta.text}
          </Link>
          <Link
            to={slide.cta2.to}
            className="px-8 py-3.5 rounded-full bg-white/15 border border-white/30 text-white font-bold hover:bg-white/25 backdrop-blur-sm transition-all duration-300"
          >
            {slide.cta2.text}
          </Link>
        </div>
      </div>

      {/* Prev / Next */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 hidden md:flex w-11 h-11 rounded-full bg-white/15 border border-white/30 items-center justify-center text-white hover:text-primary hover:bg-white/25 backdrop-blur-sm transition-all duration-200"
        aria-label="Previous slide"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 hidden md:flex w-11 h-11 rounded-full bg-white/15 border border-white/30 items-center justify-center text-white hover:text-primary hover:bg-white/25 backdrop-blur-sm transition-all duration-200"
        aria-label="Next slide"
      >
        <ChevronRight size={22} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-1.5 rounded-full transition-all duration-400 ${i === current ? "w-10 bg-primary" : "w-3 bg-white/30 hover:bg-white/50"}`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
