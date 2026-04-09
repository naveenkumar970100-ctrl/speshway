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
    className={`relative ${animationClass} ${className}`}
    style={{ animationDelay }}
  >
    {/* Glow behind phone */}
    <div className={`absolute inset-0 bg-${color}/20 blur-3xl rounded-full scale-75 -z-10`} />

    {/* Phone frame */}
    <div className="relative w-[220px] mx-auto">
      {/* Outer shell */}
      <div className={`relative rounded-[2.5rem] bg-gradient-to-b from-card to-muted border-2 border-${color}/30 shadow-[0_0_40px_hsl(var(--${color})/0.2)] overflow-hidden`}
        style={{ aspectRatio: "9/19" }}>

        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-card rounded-b-2xl z-20 flex items-center justify-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40" />
          <div className="w-8 h-1.5 rounded-full bg-muted-foreground/20" />
        </div>

        {/* Status bar */}
        <div className="absolute top-7 left-0 right-0 px-5 flex justify-between items-center z-10">
          <span className="text-[9px] text-muted-foreground font-medium">9:41</span>
          <div className="flex items-center gap-1">
            <div className="flex gap-0.5 items-end">
              {[3, 5, 7, 9].map((h, i) => (
                <div key={i} className={`w-0.5 bg-muted-foreground/60 rounded-sm`} style={{ height: h }} />
              ))}
            </div>
            <div className="w-3 h-1.5 rounded-sm border border-muted-foreground/60 relative">
              <div className="absolute inset-0.5 right-0.5 bg-muted-foreground/60 rounded-sm" />
            </div>
          </div>
        </div>

        {/* Screen content */}
        <div className="absolute inset-0 top-14 overflow-hidden">
          {children}
        </div>

        {/* Home indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-20 h-1 rounded-full bg-muted-foreground/30" />
      </div>

      {/* Side buttons */}
      <div className={`absolute -right-1 top-20 w-1 h-8 rounded-r-sm bg-${color}/30`} />
      <div className={`absolute -left-1 top-16 w-1 h-6 rounded-l-sm bg-${color}/30`} />
      <div className={`absolute -left-1 top-24 w-1 h-6 rounded-l-sm bg-${color}/30`} />
    </div>
  </div>
);

export default PhoneMockup;
