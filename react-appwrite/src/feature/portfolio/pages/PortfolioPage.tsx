import { animate, stagger } from "animejs";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import SkillsSection from "../../../shared/components/SkillsSection";
import { useTranslation } from "react-i18next";
import LanguageSelector from "~/shared/components/LanguageSelector";
// import AccessibilityEnhancer from "../components/AccessibilityEnhancer";
import CircularGallery from "~/shared/components/CircularGallery/CircularGallery";
import { Section } from "~/shared/constants";
import { useUnsplashForGallery } from "~/shared/hooks/useUnsplash";
import { SectionType } from "~/shared/types";
import { doRainPoop } from "~/shared/utils/animations";
import { socialLinks } from "~/shared/utils/images";
import { settings } from "~/shared/utils/settings";
import { useTheme } from "../../../shared/components/ThemeProvider";

const Portfolio: React.FC = () => {
  const { theme } = useTheme();
  const { t, i18n } = useTranslation();
  // Unsplash integration for gallery
  const {
    items: unsplashItems,
    loading: unsplashLoading,
    error: unsplashError,
    isSuccess: unsplashSuccess,
    refetch: refetchUnsplash,
  } = useUnsplashForGallery({
    username: "lcaohoanq",
    perPage: 12,
    enabled: true,
    cacheTime: 10 * 60 * 1000, // 10 minutes cache
    orderBy: "views", // Sort by most viewed (likes) in descending order
  }); // Debug Unsplash data
  useEffect(() => {}, [
    unsplashLoading,
    unsplashSuccess,
    unsplashError,
    unsplashItems,
  ]);

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
  const hasPlayedRainPoop = useRef(false);
  const currentSetting = settings.find((e) => e.section === currentSection);

  // Debug when galleryItems change and when we're on the about section
  useEffect(() => {}, [unsplashSuccess, unsplashItems, currentSection]);

  const sections: SectionType[] = useMemo(() => {
    return [
      {
        id: Section.HERO,
        title: t("portfolio.hero.title"),
        subtitle: t("portfolio.hero.subtitle"),
        content: (
          <div className="text-left space-y-6 md:space-y-8">
            <div className="relative flex items-start gap-20 md:gap-20">
              {" "}
              {/* Added items-center and gap */}
              {/* Avatar Section - Fixed width */}
              <div className="flex-shrink-0">
                {" "}
                {/* Prevent avatar from shrinking */}
                <div className="w-40 h-40 md:w-30 md:h-30 lg:w-30 lg:h-30 rounded-full overflow-hidden border-4 border-white shadow-2xl relative z-10 hover:shadow-3xl transition-all duration-500 hover:scale-105 magnetic-hover">
                  <img
                    src="https://avatars.githubusercontent.com/u/136492579?v=4"
                    alt="Profile"
                    className="w-50% h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                  {/* Glowing ring effect */}
                  <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-pulse"></div>
                </div>
                {/* Enhanced floating circles animation - positioned relative to avatar */}
              </div>
              {/* Text Content Section - Flexible width */}
              <div className="flex-1 space-y-4 min-w-0">
                {" "}
                {/* flex-1 allows it to take remaining space, min-w-0 prevents overflow */}
                <h1
                  className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight"
                  style={{ color: theme.colors.text }}
                >
                  {t("portfolio.hero.name")
                    .split(" ")
                    .map((word, index, array) => (
                      <React.Fragment key={index}>
                        <span className="inline-block hover:scale-105 transition-transform duration-300">
                          {word}
                        </span>
                        {index < array.length - 1 && " "}
                      </React.Fragment>
                    ))}
                </h1>
                <p
                  className="text-base md:text-lg leading-relaxed max-w-2xl"
                  style={{ color: theme.colors.textSecondary }}
                >
                  {t("portfolio.hero.role")}
                </p>
                <div className="flex flex-col sm:flex-row justify-start items-start sm:items-center mt-6">
                  <a
                    href="https://github.com/lcaohoanq"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative inline-block font-medium group overflow-hidden"
                    style={{ color: theme.colors.text }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div>
                        <span className="relative z-10 mb-3">lcaohoanq</span>

                        <span className="absolute bottom-0 right-0 h-0.5 bg-gray-900 transition-all duration-300 ease-out w-full group-hover:w-0"></span>
                      </div>
                      <img
                        src="/arrow-up-right-svgrepo-com.svg"
                        alt="Arrow"
                        className="w-4 h-4 relative z-0 transition-transform duration-300 group-hover:scale-125"
                      />
                    </div>
                  </a>
                </div>
                <p
                  className="text-base md:text-lg leading-relaxed max-w-2xl"
                  style={{ color: theme.colors.textSecondary }}
                >
                  {t("portfolio.hero.description")}
                </p>
              </div>
            </div>
          </div>
        ),
        background: theme.colors.background,
      },
      {
        id: Section.ABOUT,
        title: t("portfolio.about.title"),
        subtitle: t("portfolio.about.subtitle"),
        content: (
          <>
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <h2
                    className="text-4xl font-bold"
                    style={{ color: theme.colors.text }}
                  >
                    {t("portfolio.about.whoIAm")}
                  </h2>
                  <p
                    className="text-lg leading-relaxed"
                    style={{ color: theme.colors.textSecondary }}
                  >
                    {t("portfolio.about.intro")}
                  </p>
                  <p
                    className="text-lg leading-relaxed"
                    style={{ color: theme.colors.textSecondary }}
                  >
                    {t("portfolio.about.hobbies")}
                  </p>
                </div>

                {/* Stats Grid */}
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
                      50+
                    </h3>
                    <p style={{ color: theme.colors.textSecondary }}>
                      {t("portfolio.about.projects")}
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
                      2+
                    </h3>
                    <p style={{ color: theme.colors.textSecondary }}>
                      {t("portfolio.about.experience")}
                    </p>
                  </div>
                </div>
              </div>
            </div>{" "}
            {/* Gallery Section - Full width */}
            <div className="mt-10 relative z-30 w-full">
              <div
                className="relative w-full"
                style={{
                  height: "400px",
                  zIndex: 30,
                }}
              >
                {/* CircularGallery with Unsplash or fallback items */}
                <CircularGallery
                  items={
                    unsplashSuccess && unsplashItems && unsplashItems.length > 0
                      ? unsplashItems
                      : undefined
                  }
                  bend={0}
                  textColor="#ffffff"
                  borderRadius={0.05}
                  scrollEase={0.02}
                />
              </div>
            </div>
          </>
        ),
        background: theme.colors.background,
      },
      {
        id: Section.SKILLS,
        title: t("portfolio.skills.title"),
        subtitle: t("portfolio.skills.subtitle"),
        content: <SkillsSection currentSection={currentSection} />,
        background: theme.colors.background,
      },
      // {
      //   id: "projects",
      //   title: "Featured Projects",
      //   subtitle: "Some of My Best Work",
      //   content: <ProjectsSection currentSection={currentSection} />,
      //   background: theme.colors.background,
      // },
      {
        id: Section.CONTACT,
        title: t("portfolio.contact.title"),
        subtitle: t("portfolio.contact.subtitle"),
        content: (
          <div className="max-w-4xl mx-auto text-center">
            <p
              className="text-xl mb-8"
              style={{ color: theme.colors.textSecondary }}
            >
              {t("portfolio.contact.message")}
              <br />
              {t("portfolio.contact.reachOut")}
            </p>
            <div className="grid md:grid-cols-1 gap-8 mb-12 ">
              <div className="space-y-4">
                <div
                  className="w-16 h-16 mx-auto rounded-full flex items-center justify-center border"
                  style={{
                    backgroundColor: theme.colors.surface,
                    borderColor: theme.colors.border + "30",
                  }}
                >
                  <img src="/email.svg" alt="GitHub" className="w-6 h-6" />
                </div>
                <p
                  style={{ color: theme.colors.textSecondary }}
                  onClick={() => {
                    doRainPoop(() => {
                      // window.location.href = "mailto:hoangclw@gmail.com";
                    });
                  }}
                >
                  hoangclw@gmail.com
                </p>
              </div>
            </div>
            <div className="flex justify-center gap-6 transition-transform duration-300 hover:scale-105">
              {socialLinks.map(({ href, icon, alt }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={alt}
                  className="p-4 rounded-full border transition-all duration-300 hover:scale-110 hover:shadow-md hover:ring-2 hover:ring-[#121212]"
                  style={{
                    backgroundColor: theme.colors.surface,
                    borderColor: theme.colors.border + "30",
                  }}
                >
                  <img src={icon} alt={alt} className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
        ),
        background: theme.colors.background,
      },
    ];
  }, [
    theme.colors,
    unsplashSuccess,
    unsplashItems,
    i18n.language,
    currentSection,
  ]);

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
          // rotateX: isScrollingDown ? [0, -15] : [0, 15],
          // rotateY: [0, isScrollingDown ? 10 : -10],
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
              // rotateX: isScrollingDown ? [20, -5, 0] : [-20, 5, 0],
              // rotateY: [isScrollingDown ? -15 : 15, 0],
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
      } else {
        setIsAnimating(false);
      }
    },
    [currentSection, isAnimating, sections.length],
  );
  const handleWheel = useCallback(
    (e: WheelEvent) => {
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
    // Add wheel event listener with preventDefault capability
    if (containerRef.current) {
      containerRef.current.addEventListener("wheel", handleWheel, {
        passive: false,
      });
      return () => {
        if (containerRef.current) {
          containerRef.current.removeEventListener("wheel", handleWheel);
        }
      };
    }
  }, [handleWheel]);

  useEffect(() => {
    if (showScrollEffects) {
      const timer = setTimeout(() => setShowScrollEffects(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showScrollEffects]);

  // Auto trigger doRainPoop when entering contact section (only once)
  useEffect(() => {
    // Contact section is at index 3 (0: hero, 1: about, 2: skills, 3: contact)
    const contactSectionIndex = sections.findIndex(
      (s) => s.id === Section.CONTACT,
    );
    if (currentSection === contactSectionIndex && !hasPlayedRainPoop.current) {
      hasPlayedRainPoop.current = true;
      doRainPoop();
    }
  }, [currentSection, sections]);

  return (
    <div
      className="relative h-screen w-full overflow-hidden select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      ref={containerRef}
    >
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="author" content="lcaohoanq" />

      {/* Language Selector */}
      <LanguageSelector />
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
                ? "bg-black scale-150 ring-2 ring-white"
                : "bg-black/40 hover:bg-black/70 hover:scale-125"
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
          <div
            className={`w-full mx-auto relative ${
              section.id === "skills" || section.id === "about"
                ? "max-w-5xl"
                : "max-w-3xl"
            }`}
          >
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
                    className={`absolute animate-pulse particle-${shape}`}
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
                      // transform:  shape === "triangle" ? "rotate(45deg)" : "none",
                      animationDelay: `${Math.random() * 2}s`,
                      animationDuration: `${2 + Math.random() * 3}s`,
                      filter: `hue-rotate(${index * 60}deg)`,
                    }}
                  />
                );
              })}
            </div>

            {/* Parallax content wrapper */}
            <>{section.content}</>

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
          </div>
        </section>
      ))}

      {/* Scroll Indicator */}
      {currentSection < sections.length - 1 && (
        <div className="fixed bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 z-50 text-white text-center">
          <div className="animate-bounce text-center opacity-80">
            {currentSetting?.isShowIcon && (
              <div className="w-5 h-8 md:w-6 md:h-10 border-2 border-[#121212] rounded-full flex justify-center">
                <div className="w-1 h-2 md:h-3 bg-[#121212] rounded-full mt-1 md:mt-2 animate-pulse" />
              </div>
            )}
            {currentSetting?.scrollGuideTextKey && (
              <p className="mt-2 text-xs md:text-sm text-[#121212]">
                {t(currentSetting.scrollGuideTextKey)}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
