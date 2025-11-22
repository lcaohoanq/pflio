import React, { useEffect } from "react";

const PerformanceOptimizer: React.FC = () => {
  useEffect(() => {
    // Enable GPU acceleration for smoother animations
    const style = document.createElement("style");
    style.textContent = `
      /* Additional performance optimizations */
      .animate-pulse,
      .animate-bounce,
      .transition-all,
      .transform {
        will-change: transform, opacity;
        transform: translateZ(0);
      }

      /* Optimize backdrop-blur */
      .backdrop-blur-sm {
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
      }

      /* Optimize gradients */
      .bg-gradient-to-r,
      .bg-gradient-to-l,
      .bg-gradient-to-t,
      .bg-gradient-to-b {
        will-change: background;
      }

      /* Reduce paint operations */
      .fixed {
        will-change: transform;
      }

      /* Optimize text rendering */
      h1, h2, h3, h4, h5, h6, p {
        text-rendering: optimizeSpeed;
      }
    `;
    document.head.appendChild(style);

    // Clean up on unmount
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return null;
};

export default PerformanceOptimizer;
