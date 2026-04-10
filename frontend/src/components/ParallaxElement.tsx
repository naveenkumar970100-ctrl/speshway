import { useRef, useEffect, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ParallaxElementProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  direction?: "vertical" | "horizontal";
  style?: React.CSSProperties;
}

const ParallaxElement = ({ children, className, speed = 0.2, direction = "vertical", style }: ParallaxElementProps) => {
  const elRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const offsetRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!elRef.current) return;
      const { top } = elRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      if (top < vh && top > -vh) {
        offsetRef.current = top * speed;
      }
    };

    const tick = () => {
      if (elRef.current) {
        const v = offsetRef.current;
        elRef.current.style.transform = direction === "vertical" ? `translateY(${v}px)` : `translateX(${v}px)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [speed, direction]);

  return (
    <div ref={elRef} className={cn("will-change-transform", className)} style={style}>
      {children}
    </div>
  );
};

export default ParallaxElement;
