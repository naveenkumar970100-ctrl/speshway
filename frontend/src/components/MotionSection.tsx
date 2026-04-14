import { ReactNode, useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Anim = "zoom-out" | "skew-up" | "slide-horizontal" | "parallax-reveal" | "rotate-3d" | "reveal-from-center";

interface MotionSectionProps {
  children: ReactNode;
  className?: string;
  animation?: Anim;
  delay?: number;
}

const animStyles: Record<Anim, { hidden: string; visible: string }> = {
  "zoom-out":          { hidden: "opacity-0 scale-[1.08]",   visible: "opacity-100 scale-100" },
  "skew-up":           { hidden: "opacity-0 translate-y-12", visible: "opacity-100 translate-y-0" },
  "slide-horizontal":  { hidden: "opacity-0 -translate-x-12",visible: "opacity-100 translate-x-0" },
  "parallax-reveal":   { hidden: "opacity-0 translate-y-8",  visible: "opacity-100 translate-y-0" },
  "rotate-3d":         { hidden: "opacity-0 translate-y-10", visible: "opacity-100 translate-y-0" },
  "reveal-from-center":{ hidden: "opacity-0 scale-95",       visible: "opacity-100 scale-100" },
};

const MotionSection = ({ children, className, animation = "parallax-reveal", delay = 0 }: MotionSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const { hidden, visible: vis } = animStyles[animation];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Trigger immediately if already visible on mount
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setVisible(true);
      return;
    }

    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("transition-[transform,opacity] duration-700 ease-out", visible ? vis : hidden, className)}
      style={{ transitionDelay: `${delay}s`, willChange: visible ? "auto" : "transform, opacity" }}
    >
      {children}
    </div>
  );
};

export default MotionSection;
