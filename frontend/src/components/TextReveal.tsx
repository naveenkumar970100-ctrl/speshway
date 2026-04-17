import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

// Simple, reliable heading reveal — no word-level clipping
const TextReveal = ({ text, className, delay = 0 }: { text: string; className?: string; delay?: number; stagger?: number }) => {
  const { ref, visible } = useScrollAnimation(0.05);

  return (
    <h2
      ref={ref}
      className={cn(className)}
      style={{
        transform: visible ? "translateY(0)" : "translateY(24px)",
        opacity: visible ? 1 : 0,
        transition: `transform 0.6s ease, opacity 0.6s ease`,
        transitionDelay: `${delay}s`,
        willChange: "transform, opacity",
      }}
    >
      {text}
    </h2>
  );
};

export default TextReveal;
