import { useEffect, useRef, useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const CounterAnimation = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const { ref, visible } = useScrollAnimation();
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>(0);
  const started = useRef(false);

  useEffect(() => {
    if (!visible || started.current) return;
    started.current = true;

    const duration = 1600;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
      else setCount(target);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [visible, target]);

  return <span ref={ref}>{count}{suffix}</span>;
};

export default CounterAnimation;
