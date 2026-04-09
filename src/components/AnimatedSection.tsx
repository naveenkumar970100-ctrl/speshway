import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

type Anim =
  | "fade-in-up"
  | "fade-in"
  | "slide-in-left"
  | "slide-in-right"
  | "scale-in"
  | "reveal-text"
  | "zoom-in-out"
  | "rotate-in"
  | "scale-up"
  | "blur-in"
  | "card-rise"
  | "mask-reveal";

// CSS-transition based — consistent, reliable, no keyframe conflicts
const animMap: Record<Anim, { hidden: string; visible: string }> = {
  "fade-in-up":     { hidden: "opacity-0 translate-y-8",    visible: "opacity-100 translate-y-0" },
  "fade-in":        { hidden: "opacity-0",                  visible: "opacity-100" },
  "slide-in-left":  { hidden: "opacity-0 -translate-x-10",  visible: "opacity-100 translate-x-0" },
  "slide-in-right": { hidden: "opacity-0 translate-x-10",   visible: "opacity-100 translate-x-0" },
  "scale-in":       { hidden: "opacity-0 scale-95",         visible: "opacity-100 scale-100" },
  "reveal-text":    { hidden: "opacity-0 translate-y-4",    visible: "opacity-100 translate-y-0" },
  "zoom-in-out":    { hidden: "opacity-0 scale-[1.06]",     visible: "opacity-100 scale-100" },
  "rotate-in":      { hidden: "opacity-0 -rotate-3 translate-y-6", visible: "opacity-100 rotate-0 translate-y-0" },
  "scale-up":       { hidden: "opacity-0 scale-90",         visible: "opacity-100 scale-100" },
  "blur-in":        { hidden: "opacity-0 scale-95",         visible: "opacity-100 scale-100" },
  "card-rise":      { hidden: "opacity-0 translate-y-10",   visible: "opacity-100 translate-y-0" },
  "mask-reveal":    { hidden: "opacity-0 scale-95",         visible: "opacity-100 scale-100" },
};

const AnimatedSection = ({
  children,
  animation = "fade-in-up",
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  animation?: Anim;
  delay?: number;
  className?: string;
}) => {
  const { ref, visible } = useScrollAnimation();
  const { hidden, visible: vis } = animMap[animation];

  return (
    <div
      ref={ref}
      className={cn(
        "will-change-transform transition-[transform,opacity] duration-600 ease-out",
        visible ? vis : hidden,
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
