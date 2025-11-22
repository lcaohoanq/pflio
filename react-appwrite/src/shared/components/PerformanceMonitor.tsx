import React, { useEffect, useState } from "react";

interface PerformanceMonitorProps {
  enabled?: boolean;
}

const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
  enabled = false,
}) => {
  const [fps, setFps] = useState(0);
  const [memoryUsage, setMemoryUsage] = useState(0);

  useEffect(() => {
    if (!enabled) return;

    let frameCount = 0;
    let lastTime = performance.now();
    let animationId: number;

    const measurePerformance = () => {
      frameCount++;
      const currentTime = performance.now();

      if (currentTime >= lastTime + 1000) {
        setFps(Math.round((frameCount * 1000) / (currentTime - lastTime)));
        frameCount = 0;
        lastTime = currentTime;

        // Memory usage (if available)
        if ("memory" in performance) {
          const memory = (performance as any).memory;
          setMemoryUsage(Math.round(memory.usedJSHeapSize / 1024 / 1024));
        }
      }

      animationId = requestAnimationFrame(measurePerformance);
    };

    animationId = requestAnimationFrame(measurePerformance);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="fixed top-4 right-4 bg-black/50 backdrop-blur-sm text-white text-xs p-2 rounded-lg z-50 font-mono">
      <div>FPS: {fps}</div>
      <div>Memory: {memoryUsage}MB</div>
    </div>
  );
};

export default PerformanceMonitor;
