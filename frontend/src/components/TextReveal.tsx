import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

// Uses shared IntersectionObserver for performance
const TextReveal = ({ text, className, delay = 0 }: { text: string; className?: string; delay?: number; stagger?: number }) => {
  const { ref, visible } = useScrollAnimation();
  const words = text.split(" ");

  return (
    <div ref={ref} className={cn("flex flex-wrap gap-x-[0.3em]", className)}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <span
            className="inline-block transition-[transform,opacity] duration-500 ease-out"
            style={{
              transform: visible ? "translateY(0)" : "translateY(110%)",
              opacity: visible ? 1 : 0,
              transitionDelay: `${delay + i * 0.06}s`,
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </div>
  );
};

export default TextReveal;
