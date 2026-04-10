import { ReactNode } from "react";

interface PhoneMockupProps {
  children: ReactNode;
  className?: string;
  animationClass?: string;
  animationDelay?: string;
  color?: "primary" | "secondary" | "accent";
}

const PhoneMockup = ({
  children,
  className = "",
  animationClass = "animate-float",
  animationDelay = "0s",
  color = "primary",
}: PhoneMockupProps) => (
  <div
    className={`relative ${animationClass} ${className} group`}
    style={{ animationDelay }}
  >
    {/* Glow behind phone */}
    <div className={`absolute inset-0 bg-${color}/20 blur-3xl rounded-full scale-75 -z-10 transition-all duration-700 group-hover:scale-110 group-hover:bg-${color}/40`} />

    {/* Phone frame */}
    <div className="relative w-[220px] mx-auto">
      {/* Outer shell — always dark regardless of theme */}
      <div
        className={`relative rounded-[2.5rem] border-2 border-${color}/30 shadow-[0_0_40px_hsl(var(--${color})/0.2)] overflow-hidden transition-all duration-500 group-hover:shadow-[0_0_60px_hsl(var(--${color})/0.45)] group-hover:border-${color}/60 group-hover:scale-[1.03]`}
        style={{
          aspectRatio: "9/19",
          background: "linear-gradient(to bottom, #1e1b2e, #0f0d1a)",
        }}
      >
        {/* Notch — always dark */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 rounded-b-2xl z-20 flex items-center justify-center gap-1.5"
          style={{ background: "#1e1b2e" }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-white/25" />
          <div className="w-8 h-1.5 rounded-full bg-white/15" />
        </div>

        {/* Status bar */}
        <div className="absolute top-7 left-0 right-0 px-5 flex justify-between items-center z-10">
          <span className="text-[9px] text-white/60 font-medium">9:41</span>
          <div className="flex items-center gap-1">
            <div className="flex gap-0.5 items-end">
              {[3, 5, 7, 9].map((h, i) => (
                <div key={i} className="w-0.5 bg-white/50 rounded-sm" style={{ height: h }} />
              ))}
            </div>
            <div className="w-3 h-1.5 rounded-sm border border-white/50 relative">
              <div className="absolute inset-0.5 right-0.5 bg-white/50 rounded-sm" />
            </div>
          </div>
        </div>

        {/* Screen content */}
        <div className="absolute inset-0 top-14 overflow-hidden">
          {children}
          {/* Scanline overlay on hover */}
          <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent animate-scanline" />
          </div>
        </div>

        {/* Home indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-20 h-1 rounded-full bg-white/20" />
      </div>

      {/* Side buttons */}
      <div className={`absolute -right-1 top-20 w-1 h-8 rounded-r-sm bg-${color}/30`} />
      <div className={`absolute -left-1 top-16 w-1 h-6 rounded-l-sm bg-${color}/30`} />
      <div className={`absolute -left-1 top-24 w-1 h-6 rounded-l-sm bg-${color}/30`} />
    </div>
  </div>
);

export default PhoneMockup;
