import React, { useEffect, useRef } from "react";

interface MouseFollowerProps {
  currentSection: number;
}

const MouseFollower: React.FC<MouseFollowerProps> = ({ currentSection }) => {
  const followerRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (followerRef.current) {
        followerRef.current.style.left = `${e.clientX}px`;
        followerRef.current.style.top = `${e.clientY}px`;
      }

      // Create trail effect
      trailRef.current.forEach((trail, index) => {
        if (trail) {
          setTimeout(() => {
            trail.style.left = `${e.clientX}px`;
            trail.style.top = `${e.clientY}px`;
          }, index * 50);
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const sectionColors = [
    "bg-purple-400/30",
    "bg-pink-400/30",
    "bg-blue-400/30",
    "bg-yellow-400/30",
    "bg-green-400/30",
  ];

  return (
    <>
      {/* Main cursor follower */}
      <div
        ref={followerRef}
        className={`fixed w-8 h-8 ${sectionColors[currentSection]} rounded-full pointer-events-none z-50 mix-blend-difference transition-all duration-300 ease-out`}
        style={{
          transform: "translate(-50%, -50%)",
          backdropFilter: "blur(10px)",
        }}
      />

      {/* Trail effect */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) trailRef.current[i] = el;
          }}
          className={`fixed w-2 h-2 ${sectionColors[currentSection]} rounded-full pointer-events-none z-40 transition-all duration-300 ease-out`}
          style={{
            transform: "translate(-50%, -50%)",
            opacity: (5 - i) * 0.2,
          }}
        />
      ))}
    </>
  );
};

export default MouseFollower;
