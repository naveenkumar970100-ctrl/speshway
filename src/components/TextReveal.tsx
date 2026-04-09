import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// Word-based reveal — far fewer DOM nodes than char-by-char
const TextReveal = ({ text, className, delay = 0 }: { text: string; className?: string; delay?: number; stagger?: number }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const words = text.split(" ");

  return (
    <div ref={ref} className={cn("flex flex-wrap gap-x-[0.3em]", className)}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden"
        >
          <span
            className="inline-block will-change-transform transition-[transform,opacity] duration-500 ease-out"
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
