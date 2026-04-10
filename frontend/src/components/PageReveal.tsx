import { useEffect, useState } from "react";
import logo from "@/assets/logo-speshway.png";

const PageReveal = () => {
  const [phase, setPhase] = useState<"in" | "out" | "done">("in");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("out"), 1200);
    const t2 = setTimeout(() => setPhase("done"), 1900);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className="fixed inset-0 z-[1000] bg-primary flex items-center justify-center will-change-transform transition-[clip-path] duration-700 ease-in-out"
      style={{ clipPath: phase === "out" ? "inset(0 0 100% 0)" : "inset(0 0 0 0)" }}
    >
      <div
        className="flex flex-col items-center gap-5 transition-[transform,opacity] duration-400"
        style={{ opacity: phase === "out" ? 0 : 1, transform: phase === "out" ? "translateY(-16px)" : "translateY(0)" }}
      >
        {/* Logo */}
        <img
          src={logo}
          alt="Speshway Solutions"
          className="w-40 h-40 object-contain drop-shadow-[0_0_24px_rgba(255,255,255,0.4)] animate-scale-up"
        />

        {/* Company name */}
        <div className="flex flex-col items-center gap-1">
          <span className="text-primary-foreground font-heading font-black text-3xl md:text-5xl tracking-[0.2em] uppercase">
            SPESHWAY SOLUTIONS
          </span>
          <span className="text-primary-foreground/70 text-xs md:text-sm tracking-[0.35em] uppercase font-medium">
            PRIVATE LIMITED
          </span>
        </div>

        <div className="w-32 h-0.5 bg-primary-foreground/60 mt-1 origin-left animate-line-grow" />
      </div>
    </div>
  );
};

export default PageReveal;
