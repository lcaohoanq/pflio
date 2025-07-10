import React, { useEffect, useState } from "react";

interface AccessibilityEnhancerProps {
  currentSection: number;
  totalSections: number;
  sectionTitles: string[];
}

const AccessibilityEnhancer: React.FC<AccessibilityEnhancerProps> = ({
  currentSection,
  totalSections,
  sectionTitles,
}) => {
  const [announceText, setAnnounceText] = useState("");
  const [reducedMotion, setReducedMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    // Announce section changes
    const sectionName =
      sectionTitles[currentSection] || `Section ${currentSection + 1}`;
    setAnnounceText(
      `Now viewing ${sectionName}, section ${currentSection + 1} of ${totalSections}`,
    );
  }, [currentSection, totalSections, sectionTitles]);

  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
    document.body.classList.toggle("high-contrast", !highContrast);
  };

  return (
    <>
      {/* Screen reader announcements */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {announceText}
      </div>

      {/* Accessibility controls */}
      <div className="fixed bottom-4 left-4 flex flex-col space-y-2 z-50">
        <button
          onClick={toggleHighContrast}
          className="bg-gray-800 text-white p-2 rounded-full text-xs hover:bg-gray-700 transition-colors"
          title="Toggle high contrast"
          aria-label="Toggle high contrast mode"
        >
          🎨
        </button>

        {reducedMotion && (
          <div
            className="bg-yellow-600 text-white p-2 rounded text-xs max-w-48"
            role="status"
          >
            Reduced motion detected
          </div>
        )}
      </div>

      {/* Skip navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white p-2 rounded z-50"
      >
        Skip to main content
      </a>

      {/* Section navigation for screen readers */}
      <nav className="sr-only" aria-label="Portfolio sections">
        <ul>
          {sectionTitles.map((title, index) => (
            <li key={index}>
              <a href={`#section-${index}`}>
                {title} {index === currentSection ? "(current)" : ""}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default AccessibilityEnhancer;
