import React, { useEffect, useRef } from "react";
import { animate } from "animejs";

interface SectionTransitionProps {
  isActive: boolean;
  direction: "up" | "down";
  sectionIndex: number;
  onComplete?: () => void;
}

const SectionTransition: React.FC<SectionTransitionProps> = ({
  isActive,
  direction,
  sectionIndex,
  onComplete,
}) => {
  const transitionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive || !transitionRef.current) return;

    const element = transitionRef.current;

    // Create different transition effects based on section
    const transitions = [
      // Hero section - Liquid morphing
      () => createLiquidTransition(element),
      // About section - Geometric shapes
      () => createGeometricTransition(element),
      // Skills section - Code matrix
      () => createMatrixTransition(element),
      // Projects section - Card flip
      () => createCardFlipTransition(element),
      // Contact section - Ripple effect
      () => createRippleTransition(element),
    ];

    const currentTransition = transitions[sectionIndex] || transitions[0];
    currentTransition();
  }, [isActive, direction, sectionIndex]);

  const createLiquidTransition = (element: HTMLElement) => {
    // Create liquid blob effect
    const blob = document.createElement("div");
    blob.className = "absolute inset-0 overflow-hidden";
    blob.innerHTML = `
      <svg class="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="liquidGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
          </linearGradient>
        </defs>
        <path d="M0,50 Q25,0 50,50 T100,50 L100,100 L0,100 Z" fill="url(#liquidGrad)" />
      </svg>
    `;
    element.appendChild(blob);

    animate(blob.querySelector("path"), {
      d: [
        "M0,50 Q25,0 50,50 T100,50 L100,100 L0,100 Z",
        "M0,30 Q25,80 50,30 T100,30 L100,100 L0,100 Z",
        "M0,70 Q25,20 50,70 T100,70 L100,100 L0,100 Z",
        "M0,50 Q25,0 50,50 T100,50 L100,100 L0,100 Z",
      ],
      duration: 2000,
      easing: "easeInOutQuart",
      complete: () => {
        element.removeChild(blob);
        onComplete?.();
      },
    });
  };

  const createGeometricTransition = (element: HTMLElement) => {
    // Create animated geometric shapes
    const shapes = ["circle", "square", "triangle", "hexagon"];
    const container = document.createElement("div");
    container.className = "absolute inset-0 flex items-center justify-center";

    shapes.forEach((shape, i) => {
      const shapeEl = document.createElement("div");
      shapeEl.className = `absolute w-20 h-20 bg-gradient-to-r from-pink-400 to-red-400 opacity-80`;

      switch (shape) {
        case "circle":
          shapeEl.style.borderRadius = "50%";
          break;
        case "square":
          shapeEl.style.borderRadius = "10%";
          break;
        case "triangle":
          shapeEl.style.clipPath = "polygon(50% 0%, 0% 100%, 100% 100%)";
          break;
        case "hexagon":
          shapeEl.style.clipPath =
            "polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)";
          break;
      }

      container.appendChild(shapeEl);
    });

    element.appendChild(container);

    animate(container.children, {
      scale: [0, 1.5, 0],
      rotate: [0, 360, 720],
      opacity: [0, 1, 0],
      delay: (el, i) => i * 200,
      duration: 1500,
      easing: "easeOutElastic(1, .8)",
      complete: () => {
        element.removeChild(container);
        onComplete?.();
      },
    });
  };

  const createMatrixTransition = (element: HTMLElement) => {
    // Create Matrix-style digital rain
    const matrix = document.createElement("div");
    matrix.className = "absolute inset-0 bg-black/80 overflow-hidden";

    for (let i = 0; i < 20; i++) {
      const column = document.createElement("div");
      column.className =
        "absolute top-0 text-green-400 font-mono text-sm opacity-80";
      column.style.left = `${Math.random() * 100}%`;
      column.style.animationDelay = `${Math.random() * 2}s`;

      const chars = "01abcdefghijklmnopqrstuvwxyz";
      let text = "";
      for (let j = 0; j < 20; j++) {
        text += chars[Math.floor(Math.random() * chars.length)] + "<br>";
      }
      column.innerHTML = text;

      matrix.appendChild(column);
    }

    element.appendChild(matrix);

    animate(matrix.children, {
      translateY: [-200, window.innerHeight + 200],
      opacity: [0, 1, 0],
      delay: (el, i) => i * 100,
      duration: 2000,
      easing: "linear",
      complete: () => {
        element.removeChild(matrix);
        onComplete?.();
      },
    });
  };

  const createCardFlipTransition = (element: HTMLElement) => {
    // Create 3D card flip effect
    const card = document.createElement("div");
    card.className =
      "absolute inset-0 flex items-center justify-center perspective-1000";
    card.innerHTML = `
      <div class="w-64 h-40 relative transform-style-3d">
        <div class="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-lg backface-hidden"></div>
        <div class="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-lg backface-hidden transform rotateY-180"></div>
      </div>
    `;

    element.appendChild(card);

    animate(card.querySelector(".transform-style-3d"), {
      rotateY: [0, 180, 360],
      scale: [1, 1.2, 1],
      duration: 1800,
      easing: "easeInOutQuart",
      complete: () => {
        element.removeChild(card);
        onComplete?.();
      },
    });
  };

  const createRippleTransition = (element: HTMLElement) => {
    // Create multiple ripple effects
    const rippleContainer = document.createElement("div");
    rippleContainer.className =
      "absolute inset-0 flex items-center justify-center";

    for (let i = 0; i < 5; i++) {
      const ripple = document.createElement("div");
      ripple.className =
        "absolute w-0 h-0 border-4 border-white/30 rounded-full";
      rippleContainer.appendChild(ripple);
    }

    element.appendChild(rippleContainer);

    animate(rippleContainer.children, {
      width: [0, 300],
      height: [0, 300],
      opacity: [1, 0],
      delay: (el, i) => i * 200,
      duration: 1500,
      easing: "easeOutQuart",
      complete: () => {
        element.removeChild(rippleContainer);
        onComplete?.();
      },
    });
  };

  if (!isActive) return null;

  return (
    <div
      ref={transitionRef}
      className="fixed inset-0 z-50 pointer-events-none"
      style={{ mixBlendMode: "multiply" }}
    />
  );
};

export default SectionTransition;
