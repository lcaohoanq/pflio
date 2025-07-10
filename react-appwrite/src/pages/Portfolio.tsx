import React, { useEffect, useRef, useState, useCallback } from "react";
import { animate, stagger } from "animejs";
import SkillsSection from "../components/SkillsSection";
import ProjectsSection from "../components/ProjectsSection";
import KeyboardHints from "../components/KeyboardHints";
import MouseFollower from "../components/MouseFollower";
import ScrollEffects from "../components/ScrollEffects";
import PerformanceMonitor from "../components/PerformanceMonitor";
import AccessibilityEnhancer from "../components/AccessibilityEnhancer";
import ThemeSelector from "../components/ThemeSelector";
import { useTheme } from "../components/ThemeProvider";

const Portfolio: React.FC = () => {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [showKeyboardHints, setShowKeyboardHints] = useState(false);
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const [lastScrollDirection, setLastScrollDirection] = useState<"up" | "down">(
    "down",
  );
  const [showScrollEffects, setShowScrollEffects] = useState(false);
  const [showPerformanceMonitor, setShowPerformanceMonitor] = useState(false);
  const sectionsRef = useRef<HTMLElement[]>([]);
  const particlesRef = useRef<HTMLDivElement[]>([]);

  const sectionTitles = ["Hero", "About", "Skills", "Projects", "Contact"];

  const sections = [
    {
      id: "hero",
      title: "Welcome to My Portfolio",
      subtitle: "Software Engineer & Backend Developer",
      content: (
        <div className="text-center space-y-6 md:space-y-8">
          <div className="relative">
            <div className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full overflow-hidden border-4 border-white shadow-2xl relative z-10 hover:shadow-3xl transition-all duration-500 hover:scale-105 magnetic-hover">
              <img
                src="https://avatars.githubusercontent.com/u/136492579?v=4"
                alt="Profile"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
              {/* Glowing ring effect */}
              <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-pulse"></div>
            </div>
            {/* Enhanced floating circles animation */}
            <div className="absolute inset-0 -z-10">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-3 h-3 md:w-4 md:h-4 bg-white/20 rounded-full animate-pulse hover:bg-white/40 transition-colors"
                  style={{
                    left: `${30 + Math.sin((i * Math.PI) / 4) * 80}%`,
                    top: `${50 + Math.cos((i * Math.PI) / 4) * 40}%`,
                    animationDelay: `${i * 0.3}s`,
                    animationDuration: `${2 + Math.random()}s`,
                    filter: `hue-rotate(${i * 45}deg)`,
                  }}
                />
              ))}
              {/* Orbiting elements */}
              {[...Array(3)].map((_, i) => (
                <div
                  key={`orbit-${i}`}
                  className="absolute w-1 h-1 bg-blue-300/60 rounded-full"
                  style={{
                    left: `${50 + Math.sin((Date.now() / 1000 + i * 2) * 0.5) * 60}%`,
                    top: `${50 + Math.cos((Date.now() / 1000 + i * 2) * 0.5) * 30}%`,
                    animation: `orbit ${3 + i}s linear infinite`,
                  }}
                />
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              style={{ color: theme.colors.text }}
            >
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
            <p
              className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed px-4"
              style={{ color: theme.colors.textSecondary }}
            >
              Passionate about creating innovative solutions with{" "}
              <span
                className="font-semibold"
                style={{ color: theme.colors.accent }}
              >
                Spring Boot
              </span>
              ,{" "}
              <span
                className="font-semibold"
                style={{ color: theme.colors.primary }}
              >
                React
              </span>
              , and modern web technologies
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
          {/* <div className="mt-12 opacity-70">
            <p className="text-sm text-gray-300 mb-2">Discover more below</p>
            <div className="w-6 h-10 border-2 border-white/50 rounded-full mx-auto flex justify-center">
              <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce"></div>
            </div>
          </div> */}
        </div>
      ),
      background: theme.colors.background,
    },
    {
      id: "about",
      title: "About Me",
      subtitle: "My Journey & Passion",
      content: (
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2
                className="text-4xl font-bold"
                style={{ color: theme.colors.text }}
              >
                Who I Am
              </h2>
              <p
                className="text-lg leading-relaxed"
                style={{ color: theme.colors.textSecondary }}
              >
                I'm a dedicated software engineer with a passion for backend
                development, particularly with Spring Boot. I love creating
                robust, scalable applications and exploring the latest
                technologies in web development.
              </p>
              <p
                className="text-lg leading-relaxed"
                style={{ color: theme.colors.textSecondary }}
              >
                When I'm not coding, you'll find me capturing moments through
                photography on Unsplash, cycling through scenic routes, or
                sharing knowledge through my blog "shinbun 新聞".
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div
                className="backdrop-blur-sm rounded-lg p-6 text-center border"
                style={{
                  backgroundColor: theme.colors.surface,
                  borderColor: theme.colors.border + "30",
                }}
              >
                <h3
                  className="text-2xl font-bold"
                  style={{ color: theme.colors.primary }}
                >
                  5+
                </h3>
                <p style={{ color: theme.colors.textSecondary }}>Projects</p>
              </div>
              <div
                className="backdrop-blur-sm rounded-lg p-6 text-center border"
                style={{
                  backgroundColor: theme.colors.surface,
                  borderColor: theme.colors.border + "30",
                }}
              >
                <h3
                  className="text-2xl font-bold"
                  style={{ color: theme.colors.primary }}
                >
                  3+
                </h3>
                <p style={{ color: theme.colors.textSecondary }}>
                  Years Learning
                </p>
              </div>
              <div
                className="backdrop-blur-sm rounded-lg p-6 text-center border"
                style={{
                  backgroundColor: theme.colors.surface,
                  borderColor: theme.colors.border + "30",
                }}
              >
                <h3
                  className="text-2xl font-bold"
                  style={{ color: theme.colors.primary }}
                >
                  100+
                </h3>
                <p style={{ color: theme.colors.textSecondary }}>Commits</p>
              </div>
              <div
                className="backdrop-blur-sm rounded-lg p-6 text-center border"
                style={{
                  backgroundColor: theme.colors.surface,
                  borderColor: theme.colors.border + "30",
                }}
              >
                <h3
                  className="text-2xl font-bold"
                  style={{ color: theme.colors.primary }}
                >
                  24/7
                </h3>
                <p style={{ color: theme.colors.textSecondary }}>Learning</p>
              </div>
            </div>
          </div>
        </div>
      ),
      background: theme.colors.background,
    },
    {
      id: "skills",
      title: "Technical Skills",
      subtitle: "Technologies I Work With",
      content: <SkillsSection currentSection={currentSection} />,
      background: theme.colors.background,
    },
    {
      id: "projects",
      title: "Featured Projects",
      subtitle: "Some of My Best Work",
      content: <ProjectsSection currentSection={currentSection} />,
      background: theme.colors.background,
    },
    {
      id: "contact",
      title: "Let's Connect",
      subtitle: "Get In Touch",
      content: (
        <div className="max-w-4xl mx-auto text-center">
          <p
            className="text-xl mb-8"
            style={{ color: theme.colors.textSecondary }}
          >
            I'm always interested in new opportunities and collaborations. Feel
            free to reach out if you'd like to work together!
          </p>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="space-y-4">
              <div
                className="w-16 h-16 mx-auto rounded-full flex items-center justify-center border"
                style={{
                  backgroundColor: theme.colors.surface,
                  borderColor: theme.colors.border + "30",
                }}
              >
                <span className="text-2xl">📧</span>
              </div>
              <h3
                className="text-lg font-semibold"
                style={{ color: theme.colors.text }}
              >
                Email
              </h3>
              <p style={{ color: theme.colors.textSecondary }}>
                lcaohoanq@gmail.com
              </p>
            </div>
            <div className="space-y-4">
              <div
                className="w-16 h-16 mx-auto rounded-full flex items-center justify-center border"
                style={{
                  backgroundColor: theme.colors.surface,
                  borderColor: theme.colors.border + "30",
                }}
              >
                <span className="text-2xl">💼</span>
              </div>
              <h3
                className="text-lg font-semibold"
                style={{ color: theme.colors.text }}
              >
                LinkedIn
              </h3>
              <a
                href="https://linkedin.com/in/lcaohoanq"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
                style={{ color: theme.colors.primary }}
              >
                /in/lcaohoanq
              </a>
            </div>
            <div className="space-y-4">
              <div
                className="w-16 h-16 mx-auto rounded-full flex items-center justify-center border"
                style={{
                  backgroundColor: theme.colors.surface,
                  borderColor: theme.colors.border + "30",
                }}
              >
                <span className="text-2xl">📱</span>
              </div>
              <h3
                className="text-lg font-semibold"
                style={{ color: theme.colors.text }}
              >
                Blog
              </h3>
              <a
                href="https://shinbun.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
                style={{ color: theme.colors.primary }}
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
              className="p-4 rounded-full transition-all duration-300 hover:scale-110 border"
              style={{
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border + "30",
              }}
            >
              <img src="/github.png" alt="GitHub" className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com/in/lcaohoanq"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-full transition-all duration-300 hover:scale-110 border"
              style={{
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border + "30",
              }}
            >
              <img src="/linkedin.png" alt="LinkedIn" className="w-6 h-6" />
            </a>
            <a
              href="https://unsplash.com/@lcaohoanq"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-full transition-all duration-300 hover:scale-110 border"
              style={{
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border + "30",
              }}
            >
              <img src="/unsplash.png" alt="Unsplash" className="w-6 h-6" />
            </a>
          </div>
        </div>
      ),
      background: theme.colors.background,
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
      const isScrollingDown = index > currentSection;

      // Update parallax offset for background movement
      setParallaxOffset(index * 50);
      setLastScrollDirection(isScrollingDown ? "down" : "up");
      setShowScrollEffects(true);

      if (currentSectionEl && nextSectionEl) {
        // Enhanced exit animation with parallax and rotation
        animate(currentSectionEl.children, {
          opacity: [1, 0],
          translateY: isScrollingDown ? [-20, -80] : [20, 80],
          translateX: isScrollingDown ? [0, -30] : [0, 30],
          scale: [1, 0.8],
          rotateX: isScrollingDown ? [0, -15] : [0, 15],
          rotateY: [0, isScrollingDown ? 10 : -10],
          duration: 600,
          easing: "easeInQuart",
          delay: stagger(50, { from: isScrollingDown ? "first" : "last" }),
          complete: () => {
            setCurrentSection(index);
            setScrollProgress((index + 1) / sections.length);

            // Create wave effect for entrance
            const waveDelay = stagger(100, {
              grid: [3, 3],
              from: isScrollingDown ? "first" : "last",
            });

            // Enhanced entrance animation with bounce and glow effects
            animate(nextSectionEl.children, {
              opacity: [0, 1],
              translateY: isScrollingDown ? [60, 0] : [-60, 0],
              translateX: isScrollingDown ? [40, 0] : [-40, 0],
              scale: [0.7, 1.05, 1],
              rotateX: isScrollingDown ? [20, -5, 0] : [-20, 5, 0],
              rotateY: [isScrollingDown ? -15 : 15, 0],
              duration: 1000,
              easing: "easeOutElastic(1, .8)",
              delay: waveDelay,
              complete: () => {
                setIsAnimating(false);

                // Add subtle floating animation to elements
                animate(nextSectionEl.querySelectorAll("h1, h2, h3"), {
                  translateY: [0, -5, 0],
                  duration: 3000,
                  easing: "easeInOutSine",
                  loop: true,
                  direction: "alternate",
                });
              },
            });

            // Animate background particles
            if (particlesRef.current[index]) {
              animate(particlesRef.current[index].children, {
                scale: [0, 1],
                opacity: [0, 0.6, 0.3],
                rotate: [0, 360],
                duration: 2000,
                easing: "easeOutQuart",
                delay: stagger(100, { start: 400 }),
              });
            }
          },
        });

        // Create screen transition effect
        const transitionOverlay = document.createElement("div");
        transitionOverlay.className = "fixed inset-0 z-40 pointer-events-none";
        transitionOverlay.style.background = `linear-gradient(${
          isScrollingDown ? "0deg" : "180deg"
        }, transparent 0%, rgba(0,0,0,0.8) 50%, transparent 100%)`;
        document.body.appendChild(transitionOverlay);

        animate(transitionOverlay, {
          opacity: [0, 1, 0],
          duration: 800,
          easing: "easeInOutQuart",
          complete: () => {
            document.body.removeChild(transitionOverlay);
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
      // Allow default zoom behavior when Ctrl key is pressed
      if (e.ctrlKey) {
        return;
      }

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
      } else if (e.key === "t" || e.key === "T") {
        setShowThemeSelector(!showThemeSelector);
      } else if (e.key === "p" || e.key === "P") {
        setShowPerformanceMonitor(!showPerformanceMonitor);
      }
    },
    [
      currentSection,
      isAnimating,
      scrollToSection,
      sections.length,
      showKeyboardHints,
      showThemeSelector,
      showPerformanceMonitor,
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
  }, [handleKeyDown]);

  useEffect(() => {
    if (showScrollEffects) {
      const timer = setTimeout(() => setShowScrollEffects(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showScrollEffects]);

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
      <div className="fixed right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-50 gap-3 space-y-3">
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
            {/* Enhanced floating particles effect with morphing shapes */}
            <div
              className="absolute inset-0 overflow-hidden pointer-events-none"
              ref={(el) => {
                if (el) particlesRef.current[index] = el;
              }}
            >
              {[...Array(30)].map((_, i) => {
                const shapes = ["circle", "square", "triangle", "diamond"];
                const shape = shapes[i % shapes.length];
                const size = Math.random() * 4 + 2;

                return (
                  <div
                    key={i}
                    className={`absolute bg-white/20 animate-pulse particle-${shape}`}
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      width: `${size}px`,
                      height: `${size}px`,
                      borderRadius:
                        shape === "circle"
                          ? "50%"
                          : shape === "diamond"
                            ? "50% 0"
                            : "0",
                      transform:
                        shape === "triangle" ? "rotate(45deg)" : "none",
                      animationDelay: `${Math.random() * 2}s`,
                      animationDuration: `${2 + Math.random() * 3}s`,
                      filter: `hue-rotate(${index * 60}deg)`,
                    }}
                  />
                );
              })}

              {/* Moving background waves */}
              <div className="absolute inset-0 opacity-10">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-full h-full"
                    style={{
                      background: `radial-gradient(circle at ${50 + i * 20}% ${30 + i * 25}%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
                      animation: `float ${3 + i}s ease-in-out infinite`,
                      animationDelay: `${i * 0.5}s`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Parallax content wrapper */}
            <div
              className="relative z-10"
              style={{
                transform: `translateY(${parallaxOffset * 0.1}px)`,
                transition: "transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)",
              }}
            >
              {section.content}
            </div>

            {/* Section-specific background effects */}
            {index === 0 && (
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Code rain effect for hero section */}
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute text-green-300/20 font-mono text-xs animate-pulse"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 2}s`,
                      transform: `rotate(${Math.random() * 360}deg)`,
                    }}
                  >
                    {
                      ["</>", "{code}", "API", "React", "Java", "Spring"][
                        Math.floor(Math.random() * 6)
                      ]
                    }
                  </div>
                ))}
              </div>
            )}

            {index === 2 && (
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Tech icons floating for skills section */}
                {["⚛️", "☕", "🐘", "⚡", "🔧", "📱", "💻", "🚀"].map(
                  (icon, i) => (
                    <div
                      key={i}
                      className="absolute text-2xl opacity-20 animate-bounce"
                      style={{
                        left: `${Math.random() * 90 + 5}%`,
                        top: `${Math.random() * 90 + 5}%`,
                        animationDelay: `${i * 0.3}s`,
                        animationDuration: `${2 + Math.random()}s`,
                      }}
                    >
                      {icon}
                    </div>
                  ),
                )}
              </div>
            )}
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

      {/* Theme Button */}
      <div className="fixed top-20 right-4 md:top-20 md:right-8 z-50">
        <button
          onClick={() => setShowThemeSelector(!showThemeSelector)}
          className="backdrop-blur-sm text-white w-10 h-10 md:w-12 md:h-12 rounded-full transition-all duration-300 flex items-center justify-center text-sm md:text-base hover:scale-110 border"
          style={{
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.border + "40",
          }}
          aria-label="Change theme"
        >
          🎨
        </button>
      </div>

      {/* Help Button */}
      <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50">
        <button
          onClick={() => setShowKeyboardHints(!showKeyboardHints)}
          className="backdrop-blur-sm text-white w-10 h-10 md:w-12 md:h-12 rounded-full transition-all duration-300 flex items-center justify-center text-sm md:text-base hover:scale-110 border"
          style={{
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.border + "40",
          }}
          aria-label="Show keyboard shortcuts"
        >
          ?
        </button>
      </div>

      {/* Keyboard Hints */}
      <KeyboardHints show={showKeyboardHints} />

      {/* Theme Selector */}
      <ThemeSelector
        show={showThemeSelector}
        onClose={() => setShowThemeSelector(false)}
      />

      {/* Loading overlay for transitions */}
      {isAnimating && (
        <div className="fixed inset-0 bg-black/20 z-30 pointer-events-none" />
      )}

      {/* Mouse follower effect */}
      <MouseFollower currentSection={currentSection} />

      {/* Scroll effects */}
      <ScrollEffects
        isActive={showScrollEffects}
        sectionIndex={currentSection}
        direction={lastScrollDirection}
      />

      {/* Performance Monitor */}
      <PerformanceMonitor enabled={showPerformanceMonitor} />

      {/* Accessibility Enhancements */}
      {/* <AccessibilityEnhancer
        currentSection={currentSection}
        totalSections={sections.length}
        sectionTitles={sectionTitles}
      /> */}
    </div>
  );
};

export default Portfolio;
