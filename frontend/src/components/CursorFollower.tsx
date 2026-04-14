import { useEffect, useRef } from "react";

const CursorFollower = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const pos = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const dirty = useRef(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      dirty.current = true;
    };

    const onMouseDown = () => dotRef.current?.style.setProperty("transform", "translate(-50%,-50%) scale(0.7)");
    const onMouseUp = () => dotRef.current?.style.setProperty("transform", "translate(-50%,-50%) scale(1)");

    const onMouseOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const hovering = !!(t.tagName === "A" || t.tagName === "BUTTON" || t.closest("button") || t.closest("a"));
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(-50%,-50%) scale(${hovering ? 2.2 : 1})`;
        ringRef.current.style.opacity = hovering ? "0.5" : "1";
      }
    };

    const animate = () => {
      // Only update DOM when mouse has moved
      if (dirty.current) {
        ring.current.x += (pos.current.x - ring.current.x) * 0.15;
        ring.current.y += (pos.current.y - ring.current.y) * 0.15;

        if (dotRef.current) {
          dotRef.current.style.left = `${pos.current.x}px`;
          dotRef.current.style.top = `${pos.current.y}px`;
        }
        if (ringRef.current) {
          ringRef.current.style.left = `${ring.current.x}px`;
          ringRef.current.style.top = `${ring.current.y}px`;
        }

        // Stop marking dirty once ring catches up
        const dx = Math.abs(pos.current.x - ring.current.x);
        const dy = Math.abs(pos.current.y - ring.current.y);
        if (dx < 0.5 && dy < 0.5) dirty.current = false;
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
      <div ref={dotRef} className="fixed w-2 h-2 bg-primary rounded-full" style={{ transform: "translate(-50%,-50%)", willChange: "left, top" }} />
      <div ref={ringRef} className="fixed w-8 h-8 border border-primary/40 rounded-full transition-[transform,opacity] duration-200" style={{ transform: "translate(-50%,-50%)", willChange: "left, top" }} />
    </div>
  );
};

export default CursorFollower;
