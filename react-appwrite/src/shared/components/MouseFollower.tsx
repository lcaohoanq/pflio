import React, { useEffect, useRef, useCallback } from "react";

interface MouseFollowerProps {
  currentSection: number;
}

const MouseFollower: React.FC<MouseFollowerProps> = ({ currentSection }) => {
  const followerRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number>();
  const lastPosition = useRef({ x: 0, y: 0 });
  const isThrottled = useRef(false);

  // Heavily optimized mouse move handler with throttling
  const handleMouseMove = useCallback((e: MouseEvent) => {
    // Throttle to every 16ms (60fps max)
    if (isThrottled.current) return;

    isThrottled.current = true;

    // Cancel previous animation frame
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }

    rafId.current = requestAnimationFrame(() => {
      // Only update if position changed significantly
      const deltaX = Math.abs(e.clientX - lastPosition.current.x);
      const deltaY = Math.abs(e.clientY - lastPosition.current.y);

      if (deltaX > 2 || deltaY > 2) {
        if (followerRef.current) {
          // Use transform3d for GPU acceleration
          followerRef.current.style.transform = `translate3d(${e.clientX - 16}px, ${e.clientY - 16}px, 0)`;
        }
        lastPosition.current = { x: e.clientX, y: e.clientY };
      }

      isThrottled.current = false;
    });
  }, []);

  useEffect(() => {
    // Use passive event listener for better performance
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [handleMouseMove]);

  const sectionColors = [
    "bg-purple-400/20",
    "bg-pink-400/20",
    "bg-blue-400/20",
    "bg-yellow-400/20",
    "bg-green-400/20",
  ];

  return (
    <>
      {/* Simplified cursor follower - removed trail for better performance */}
      <div
        ref={followerRef}
        className={`fixed w-6 h-6 ${sectionColors[currentSection]} rounded-full pointer-events-none z-50 mix-blend-difference transition-colors duration-300 ease-out`}
        style={{
          transform: "translate3d(-50%, -50%, 0)",
          backdropFilter: "blur(8px)",
          willChange: "transform",
        }}
      />
    </>
  );
};

export default MouseFollower;
