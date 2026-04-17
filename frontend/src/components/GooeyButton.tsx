import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GooeyButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  color?: "primary" | "secondary" | "accent";
}

const colorMap = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_30px_hsl(var(--primary)/0.5)]",
  secondary: "bg-secondary text-white dark:text-white hover:bg-secondary/90 hover:shadow-[0_0_30px_hsl(var(--secondary)/0.5)] border border-secondary/20",
  accent: "bg-accent text-accent-foreground hover:bg-accent/90 hover:shadow-[0_0_30px_hsl(var(--accent)/0.5)]",
};

const GooeyButton = ({ children, className, onClick, color = "primary" }: GooeyButtonProps) => (
  <button
    onClick={onClick}
    className={cn(
      "relative px-8 py-4 rounded-full font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl",
      colorMap[color],
      className
    )}
  >
    {children}
  </button>
);

export default GooeyButton;
