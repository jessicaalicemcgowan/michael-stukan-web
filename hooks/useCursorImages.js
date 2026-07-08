"use client";

import { useEffect, useRef, useState } from "react";

const LERP = 0.1;
const MAX_ROTATION = 12;

export function useCursorImages(count) {
  const containerRef = useRef(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const positionsRef = useRef(
    Array.from({ length: count }, () => ({ x: 0, y: 0, rotation: 0 }))
  );
  const [positions, setPositions] = useState(positionsRef.current);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const handleMove = (event) => {
      const rect = container.getBoundingClientRect();
      targetRef.current = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };
    const handleEnter = () => setActive(true);
    const handleLeave = () => setActive(false);

    container.addEventListener("mousemove", handleMove);
    container.addEventListener("mouseenter", handleEnter);
    container.addEventListener("mouseleave", handleLeave);

    let frame;
    const tick = () => {
      let leaderX = targetRef.current.x;
      let leaderY = targetRef.current.y;

      const next = positionsRef.current.map((point) => {
        const dx = leaderX - point.x;
        const dy = leaderY - point.y;
        const x = point.x + dx * LERP;
        const y = point.y + dy * LERP;
        const rotation = Math.max(-MAX_ROTATION, Math.min(MAX_ROTATION, dx * 0.15));

        leaderX = x;
        leaderY = y;

        return { x, y, rotation };
      });

      positionsRef.current = next;
      setPositions(next);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      container.removeEventListener("mousemove", handleMove);
      container.removeEventListener("mouseenter", handleEnter);
      container.removeEventListener("mouseleave", handleLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return { containerRef, positions, active };
}
