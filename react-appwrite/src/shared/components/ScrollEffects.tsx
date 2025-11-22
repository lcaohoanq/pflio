import React, { useEffect } from "react";
import { animate } from "animejs";

interface ScrollEffectsProps {
  isActive: boolean;
  sectionIndex: number;
  direction: "up" | "down";
}

const ScrollEffects: React.FC<ScrollEffectsProps> = ({
  isActive,
  sectionIndex,
  direction,
}) => {
  useEffect(() => {
    if (!isActive) return;

    // Create ripple effect
    const createRipple = () => {
      const ripple = document.createElement("div");
      ripple.className = "fixed inset-0 pointer-events-none z-30";
      ripple.style.background = `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 70%)`;
      document.body.appendChild(ripple);

      animate(ripple, {
        scale: [0, 2],
        opacity: [0.8, 0],
        duration: 1000,
        easing: "easeOutQuart",
        complete: () => {
          document.body.removeChild(ripple);
        },
      });
    };

    // Create particle burst
    const createParticleBurst = () => {
      const container = document.createElement("div");
      container.className = "fixed inset-0 pointer-events-none z-30";
      document.body.appendChild(container);

      // Create particles
      const particles = Array.from({ length: 20 }, () => {
        const particle = document.createElement("div");
        particle.className = "absolute w-2 h-2 bg-white rounded-full";
        particle.style.left = "50%";
        particle.style.top = "50%";
        container.appendChild(particle);
        return particle;
      });

      // Animate particles
      particles.forEach((particle, i) => {
        const angle = (i / particles.length) * Math.PI * 2;
        const distance = 200 + Math.random() * 100;

        animate(particle, {
          translateX: Math.cos(angle) * distance,
          translateY:
            Math.sin(angle) * distance + (direction === "down" ? -100 : 100),
          scale: [1, 0],
          opacity: [1, 0],
          duration: 1500,
          easing: "easeOutQuart",
          delay: i * 20,
          complete: () => {
            if (i === particles.length - 1) {
              document.body.removeChild(container);
            }
          },
        });
      });
    };

    // Create screen flash
    const createScreenFlash = () => {
      const flash = document.createElement("div");
      flash.className = "fixed inset-0 bg-white pointer-events-none z-40";
      document.body.appendChild(flash);

      animate(flash, {
        opacity: [0, 0.3, 0],
        duration: 400,
        easing: "easeInOutQuart",
        complete: () => {
          document.body.removeChild(flash);
        },
      });
    };

    // Execute effects based on section
    const timer = setTimeout(() => {
      createRipple();

      if (sectionIndex === 0 || sectionIndex === 3) {
        createParticleBurst();
      }

      if (sectionIndex === 2) {
        createScreenFlash();
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [isActive, sectionIndex, direction]);

  return null;
};

export default ScrollEffects;
