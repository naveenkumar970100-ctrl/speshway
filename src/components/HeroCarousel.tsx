import { useState, useEffect, useCallback } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroSlide1 from "@/assets/hero-slide-1.jpg";
import heroSlide2 from "@/assets/hero-slide-2.jpg";
import heroSlide3 from "@/assets/hero-slide-3.jpg";

const slides = [
  {
    image: heroSlide1,
    badge: "Welcome to the Future of IT",
    title: "Build Your Digital Future",
    highlight: "Speshway Solutions",
    desc: "Full-stack software, automation, and IT solutions that drive real business growth.",
    cta: { text: "Our Services", to: "/services" },
    cta2: { text: "Get in Touch", to: "/contact" },
  },
  {
    image: heroSlide2,
    badge: "Mobile App Development",
    title: "Stunning Mobile Apps",
    highlight: "For Every Platform",
    desc: "We build beautiful, high-performance mobile applications for iOS and Android.",
    cta: { text: "View Projects", to: "/projects" },
    cta2: { text: "Get a Quote", to: "/contact" },
  },
  {
    image: heroSlide3,
    badge: "Cloud & Security Solutions",
    title: "Secure & Scalable",
    highlight: "Cloud Infrastructure",
    desc: "Enterprise-grade cybersecurity and cloud solutions to protect and grow your business.",
    cta: { text: "Learn More", to: "/services" },
    cta2: { text: "Contact Us", to: "/contact" },
  },
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (animating) return;
      setAnimating(true);
      setCurrent(index);
      setTimeout(() => setAnimating(false), 800);
    },
    [animating]
  );

  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo]);
  const prev = useCallback(() => goTo((current - 1 + slides.length) % slides.length), [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center text-center overflow-hidden">
      {/* Background slides */}
      {slides.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
          style={{
            backgroundImage: `url(${s.image})`,
            opacity: i === current ? 1 : 0,
            transform: i === current ? "scale(1)" : "scale(1.1)",
          }}
        />
      ))}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-[2px]" />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />

      {/* Animated orbs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-primary/15 blur-3xl animate-pulse" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-secondary/15 blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }} />
      <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-accent/10 blur-3xl animate-pulse" style={{ animationDelay: "3s" }} />

      {/* Content */}
      <div className="relative z-10 container px-4">
        <div key={current} className="animate-fade-in-up">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-foreground/80 text-sm mb-6">
            {slide.badge} <ArrowRight size={14} className="text-primary" />
          </span>
        </div>
        <h1
          key={`title-${current}`}
          className="animate-fade-in-up text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-foreground leading-tight mb-6"
          style={{ animationDelay: "200ms" }}
        >
          {slide.title}
          <br />
          <span className="text-gradient">{slide.highlight}</span>
        </h1>
        <p
          key={`desc-${current}`}
          className="animate-fade-in-up text-muted-foreground max-w-2xl mx-auto text-base md:text-lg mb-8"
          style={{ animationDelay: "400ms" }}
        >
          {slide.desc}
        </p>
        <div
          key={`cta-${current}`}
          className="animate-fade-in-up flex flex-col sm:flex-row gap-4 justify-center"
          style={{ animationDelay: "600ms" }}
        >
          <Link
            to={slide.cta.to}
            className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)] transition-all duration-300 hover:scale-105"
          >
            {slide.cta.text}
          </Link>
          <Link
            to={slide.cta2.to}
            className="px-8 py-3 rounded-full glass text-foreground font-semibold hover:bg-muted transition-all"
          >
            {slide.cta2.text}
          </Link>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full glass flex items-center justify-center text-foreground hover:text-primary hover:border-primary/50 transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full glass flex items-center justify-center text-foreground hover:text-primary hover:border-primary/50 transition-all"
        aria-label="Next slide"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-2 rounded-full transition-all duration-500 ${
              i === current ? "w-8 bg-primary shadow-[0_0_10px_hsl(var(--primary)/0.5)]" : "w-2 bg-muted-foreground/40"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
