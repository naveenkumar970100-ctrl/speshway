import { useEffect, useState } from "react";

const PageReveal = () => {
  const [phase, setPhase] = useState<"in" | "out" | "done">("in");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("out"), 700);
    const t2 = setTimeout(() => setPhase("done"), 1400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className="fixed inset-0 z-[1000] bg-primary flex items-center justify-center will-change-transform transition-[clip-path] duration-700 ease-in-out"
      style={{ clipPath: phase === "out" ? "inset(0 0 100% 0)" : "inset(0 0 0 0)" }}
    >
      <div
        className="flex flex-col items-center transition-[transform,opacity] duration-400"
        style={{ opacity: phase === "out" ? 0 : 1, transform: phase === "out" ? "translateY(-16px)" : "translateY(0)" }}
      >
        <span className="text-primary-foreground font-heading font-black text-4xl md:text-6xl tracking-[0.2em] uppercase">
          SPESHWAY
        </span>
        <div className="w-24 h-1 bg-primary-foreground mt-4 origin-left animate-line-grow" />
      </div>
    </div>
  );
};

export default PageReveal;
