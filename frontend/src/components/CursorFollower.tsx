import { useEffect, useRef } from "react";

const CursorFollower = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseDown = () => dotRef.current?.style.setProperty("transform", "translate(-50%,-50%) scale(0.7)");
    const onMouseUp = () => dotRef.current?.style.setProperty("transform", "translate(-50%,-50%) scale(1)");

    const onMouseOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const hovering = !!(t.tagName === "A" || t.tagName === "BUTTON" || t.closest("button") || t.closest("a"));
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(-50%,-50%) scale(${hovering ? 2.5 : 1})`;
        ringRef.current.style.opacity = hovering ? "0.6" : "1";
        ringRef.current.style.borderColor = hovering ? "hsl(var(--primary)/0.8)" : "hsl(var(--primary)/0.4)";
      }
    };

    const animate = () => {
      // Lerp ring toward cursor for smooth trailing
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;

      if (dotRef.current) {
        dotRef.current.style.left = `${pos.current.x}px`;
        dotRef.current.style.top = `${pos.current.y}px`;
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${ring.current.x}px`;
        ringRef.current.style.top = `${ring.current.y}px`;
      }
      if (glowRef.current) {
        glowRef.current.style.left = `${ring.current.x}px`;
        glowRef.current.style.top = `${ring.current.y}px`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    window.addEventListener("mouseover", onMouseOver, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mouseover", onMouseOver);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden lg:block">
      <div ref={dotRef} className="fixed w-2 h-2 bg-primary rounded-full will-change-transform" style={{ transform: "translate(-50%,-50%)" }} />
      <div ref={ringRef} className="fixed w-8 h-8 border border-primary/40 rounded-full will-change-transform transition-[transform,opacity,border-color] duration-300" style={{ transform: "translate(-50%,-50%)" }} />
      <div ref={glowRef} className="fixed w-40 h-40 bg-primary/5 rounded-full blur-3xl will-change-transform" style={{ transform: "translate(-50%,-50%)" }} />
    </div>
  );
};

export default CursorFollower;
