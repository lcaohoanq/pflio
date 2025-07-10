import React, { useEffect, useRef, useState, useCallback } from "react";
import { animate, stagger } from "animejs";
import SkillsSection from "../components/SkillsSection";
import ProjectsSection from "../components/ProjectsSection";
import KeyboardHints from "../components/KeyboardHints";

const Portfolio: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [showKeyboardHints, setShowKeyboardHints] = useState(false);
  const sectionsRef = useRef<HTMLElement[]>([]);

  const sections = [
    {
      id: "hero",
      title: "Welcome to My Portfolio",
      subtitle: "Software Engineer & Backend Developer",
      content: (
        <div className="text-center space-y-6 md:space-y-8">
          <div className="relative">
            <div className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full overflow-hidden border-4 border-white shadow-2xl relative z-10">
              <img
                src="https://avatars.githubusercontent.com/u/136492579?v=4"
                alt="Profile"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            {/* Floating circles animation */}
            <div className="absolute inset-0 -z-10">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-4 h-4 bg-white/20 rounded-full animate-pulse"
                  style={{
                    left: `${20 + Math.sin((i * Math.PI) / 3) * 100}%`,
                    top: `${50 + Math.cos((i * Math.PI) / 3) * 50}%`,
                    animationDelay: `${i * 0.5}s`,
                    animationDuration: "3s",
                  }}
                />
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              <span className="inline-block hover:scale-105 transition-transform duration-300">
                Luu
              </span>{" "}
              <span className="inline-block hover:scale-105 transition-transform duration-300">
                Cao
              </span>{" "}
              <span className="inline-block hover:scale-105 transition-transform duration-300">
                Hoang
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed px-4">
              Passionate about creating innovative solutions with{" "}
              <span className="text-green-300 font-semibold">Spring Boot</span>,{" "}
              <span className="text-blue-300 font-semibold">React</span>, and
              modern web technologies
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
            <a
              href="https://github.com/lcaohoanq"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white text-gray-900 px-6 py-3 rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-105 font-medium flex items-center space-x-2"
            >
              <span>GitHub</span>
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </a>
            <a
              href="https://linkedin.com/in/lcaohoanq"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-all duration-300 hover:scale-105 font-medium flex items-center space-x-2"
            >
              <span>LinkedIn</span>
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </a>
            <a
              href="https://shinbun.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition-all duration-300 hover:scale-105 font-medium flex items-center space-x-2"
            >
              <span>Blog</span>
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </a>
          </div>
          {/* Scroll hint */}
          <div className="mt-12 opacity-70">
            <p className="text-sm text-gray-300 mb-2">Discover more below</p>
            <div className="w-6 h-10 border-2 border-white/50 rounded-full mx-auto flex justify-center">
              <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce"></div>
            </div>
          </div>
        </div>
      ),
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    {
      id: "about",
      title: "About Me",
      subtitle: "My Journey & Passion",
      content: (
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-white">Who I Am</h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                I'm a dedicated software engineer with a passion for backend
                development, particularly with Spring Boot. I love creating
                robust, scalable applications and exploring the latest
                technologies in web development.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                When I'm not coding, you'll find me capturing moments through
                photography on Unsplash, cycling through scenic routes, or
                sharing knowledge through my blog "shinbun 新聞".
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
                <h3 className="text-2xl font-bold text-white">5+</h3>
                <p className="text-gray-300">Projects</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
                <h3 className="text-2xl font-bold text-white">3+</h3>
                <p className="text-gray-300">Years Learning</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
                <h3 className="text-2xl font-bold text-white">100+</h3>
                <p className="text-gray-300">Commits</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
                <h3 className="text-2xl font-bold text-white">24/7</h3>
                <p className="text-gray-300">Learning</p>
              </div>
            </div>
          </div>
        </div>
      ),
      background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    },
    {
      id: "skills",
      title: "Technical Skills",
      subtitle: "Technologies I Work With",
      content: <SkillsSection currentSection={currentSection} />,
      background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    },
    {
      id: "projects",
      title: "Featured Projects",
      subtitle: "Some of My Best Work",
      content: <ProjectsSection currentSection={currentSection} />,
      background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    },
    {
      id: "contact",
      title: "Let's Connect",
      subtitle: "Get In Touch",
      content: (
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xl text-gray-300 mb-8">
            I'm always interested in new opportunities and collaborations. Feel
            free to reach out if you'd like to work together!
          </p>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">📧</span>
              </div>
              <h3 className="text-lg font-semibold text-white">Email</h3>
              <p className="text-gray-300">lcaohoanq@gmail.com</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">💼</span>
              </div>
              <h3 className="text-lg font-semibold text-white">LinkedIn</h3>
              <a
                href="https://linkedin.com/in/lcaohoanq"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 hover:text-blue-200 transition-colors"
              >
                /in/lcaohoanq
              </a>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-lg font-semibold text-white">Blog</h3>
              <a
                href="https://shinbun.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 hover:text-blue-200 transition-colors"
              >
                shinbun 新聞
              </a>
            </div>
          </div>
          <div className="flex justify-center space-x-6">
            <a
              href="https://github.com/lcaohoanq"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 text-white p-4 rounded-full hover:bg-gray-700 transition-colors"
            >
              <img src="/github.png" alt="GitHub" className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com/in/lcaohoanq"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white p-4 rounded-full hover:bg-blue-700 transition-colors"
            >
              <img src="/linkedin.png" alt="LinkedIn" className="w-6 h-6" />
            </a>
            <a
              href="https://unsplash.com/@lcaohoanq"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-700 text-white p-4 rounded-full hover:bg-gray-600 transition-colors"
            >
              <img src="/unsplash.png" alt="Unsplash" className="w-6 h-6" />
            </a>
          </div>
        </div>
      ),
      background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    },
  ];

  useEffect(() => {
    // Initialize sections animation
    sectionsRef.current.forEach((section, index) => {
      if (section) {
        animate(section.children, {
          opacity: index === 0 ? [0, 1] : 0,
          translateY: index === 0 ? [50, 0] : 50,
          delay: stagger(100),
          duration: 800,
          easing: "easeOutQuart",
        });
      }
    });
  }, []);

  const scrollToSection = useCallback(
    (index: number) => {
      if (
        index === currentSection ||
        isAnimating ||
        index < 0 ||
        index >= sections.length
      )
        return;

      setIsAnimating(true);
      const currentSectionEl = sectionsRef.current[currentSection];
      const nextSectionEl = sectionsRef.current[index];

      if (currentSectionEl && nextSectionEl) {
        // Enhanced exit animation
        animate(currentSectionEl.children, {
          opacity: 0,
          translateY: index > currentSection ? -30 : 30,
          scale: 0.95,
          duration: 500,
          easing: "easeInCubic",
          complete: () => {
            setCurrentSection(index);

            // Enhanced entrance animation
            animate(nextSectionEl.children, {
              opacity: [0, 1],
              translateY: index > currentSection ? [30, 0] : [-30, 0],
              scale: [0.95, 1],
              delay: stagger(80, { start: 200 }),
              duration: 700,
              easing: "easeOutCubic",
              complete: () => {
                setIsAnimating(false);
              },
            });
          },
        });
      } else {
        setIsAnimating(false);
      }
    },
    [currentSection, isAnimating, sections.length],
  );

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      if (isAnimating) return;

      const threshold = 50; // Minimum wheel delta to trigger scroll
      if (Math.abs(e.deltaY) < threshold) return;

      if (e.deltaY > 0 && currentSection < sections.length - 1) {
        scrollToSection(currentSection + 1);
      } else if (e.deltaY < 0 && currentSection > 0) {
        scrollToSection(currentSection - 1);
      }
    },
    [currentSection, isAnimating, scrollToSection, sections.length],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (isAnimating) return;

      if (e.key === "ArrowDown" && currentSection < sections.length - 1) {
        scrollToSection(currentSection + 1);
      } else if (e.key === "ArrowUp" && currentSection > 0) {
        scrollToSection(currentSection - 1);
      } else if (e.key === "h" || e.key === "H") {
        setShowKeyboardHints(!showKeyboardHints);
      }
    },
    [
      currentSection,
      isAnimating,
      scrollToSection,
      sections.length,
      showKeyboardHints,
    ],
  );

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart || isAnimating) return;

    const touchEnd = e.changedTouches[0].clientY;
    const diff = touchStart - touchEnd;
    const threshold = 50; // Minimum swipe distance

    if (Math.abs(diff) > threshold) {
      if (diff > 0 && currentSection < sections.length - 1) {
        // Swipe up - go to next section
        scrollToSection(currentSection + 1);
      } else if (diff < 0 && currentSection > 0) {
        // Swipe down - go to previous section
        scrollToSection(currentSection - 1);
      }
    }
    setTouchStart(null);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSection]);

  return (
    <div
      className="relative h-screen w-full overflow-hidden select-none"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      ref={containerRef}
    >
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-white/20 z-50">
        <div
          className="h-full bg-white transition-all duration-700 ease-out"
          style={{
            width: `${((currentSection + 1) / sections.length) * 100}%`,
          }}
        />
      </div>

      {/* Navigation Dots */}
      <div className="fixed right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-50 space-y-3">
        {sections.map((section, index) => (
          <button
            key={index}
            onClick={() => scrollToSection(index)}
            disabled={isAnimating}
            className={`group relative w-3 h-3 rounded-full transition-all duration-300 ${
              currentSection === index
                ? "bg-white scale-150 shadow-lg shadow-white/50"
                : "bg-white/50 hover:bg-white/80 hover:scale-125"
            } ${isAnimating ? "pointer-events-none" : ""}`}
            aria-label={`Go to section ${index + 1}: ${section.title}`}
          >
            {/* Tooltip */}
            <span className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
              {section.title}
            </span>
          </button>
        ))}
      </div>

      {/* Back to Home Button */}
      <div className="fixed top-4 md:top-8 left-4 md:left-8 z-50">
        <a
          href="/"
          className="bg-white/20 backdrop-blur-sm text-white px-4 md:px-6 py-2 md:py-3 rounded-full hover:bg-white/30 transition-all duration-300 text-sm md:text-base flex items-center space-x-2 hover:scale-105"
        >
          <span>←</span>
          <span className="hidden md:inline">Home</span>
        </a>
      </div>

      {/* Section Counter */}
      <div className="fixed top-4 md:top-8 right-4 md:right-8 z-40 bg-white/20 backdrop-blur-sm text-white px-3 md:px-4 py-2 rounded-full text-sm">
        <span className="font-mono">
          {String(currentSection + 1).padStart(2, "0")}
        </span>
        <span className="text-white/70 mx-1">/</span>
        <span className="font-mono text-white/70">
          {String(sections.length).padStart(2, "0")}
        </span>
      </div>

      {/* Sections */}
      {sections.map((section, index) => (
        <section
          key={section.id}
          ref={(el) => {
            if (el) sectionsRef.current[index] = el;
          }}
          className={`absolute inset-0 flex items-center justify-center px-4 md:px-8 ${
            currentSection === index ? "block" : "hidden"
          }`}
          style={{
            background: section.background,
            backgroundAttachment: "fixed",
          }}
        >
          <div className="w-full max-w-7xl mx-auto relative">
            {/* Floating particles effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${2 + Math.random() * 3}s`,
                  }}
                />
              ))}
            </div>
            {section.content}
          </div>
        </section>
      ))}

      {/* Scroll Indicator */}
      {currentSection < sections.length - 1 && (
        <div className="fixed bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 z-50 text-white text-center">
          <div className="animate-bounce">
            <div className="w-5 h-8 md:w-6 md:h-10 border-2 border-white rounded-full flex justify-center opacity-80">
              <div className="w-1 h-2 md:h-3 bg-white rounded-full mt-1 md:mt-2 animate-pulse"></div>
            </div>
            <p className="mt-2 text-xs md:text-sm opacity-80">
              {currentSection === 0
                ? "Scroll to explore"
                : "Continue scrolling"}
            </p>
          </div>
        </div>
      )}

      {/* Help Button */}
      <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50">
        <button
          onClick={() => setShowKeyboardHints(!showKeyboardHints)}
          className="bg-white/20 backdrop-blur-sm text-white w-10 h-10 md:w-12 md:h-12 rounded-full hover:bg-white/30 transition-all duration-300 flex items-center justify-center text-sm md:text-base hover:scale-110"
          aria-label="Show keyboard shortcuts"
        >
          ?
        </button>
      </div>

      {/* Keyboard Hints */}
      <KeyboardHints show={showKeyboardHints} />

      {/* Loading overlay for transitions */}
      {isAnimating && (
        <div className="fixed inset-0 bg-black/20 z-30 pointer-events-none" />
      )}
    </div>
  );
};

export default Portfolio;
