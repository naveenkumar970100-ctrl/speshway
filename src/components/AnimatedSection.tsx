import { ReactNode } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

type Anim = "fade-in-up" | "fade-in" | "slide-in-left" | "slide-in-right" | "scale-in";

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
  return (
    <div
      ref={ref}
      className={`${className} ${visible ? `animate-${animation}` : "opacity-0"}`}
      style={{ animationDelay: `${delay}ms`, animationFillMode: "forwards" }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
