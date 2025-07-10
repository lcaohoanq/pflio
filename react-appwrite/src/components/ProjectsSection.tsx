import React, { useState, useEffect } from "react";
import { Project } from "~/types";

interface Props {
  currentSection: number;
}

const ProjectsSection: React.FC<Props> = ({ currentSection }) => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [visibleProjects, setVisibleProjects] = useState<number>(0);
  const [animationStep, setAnimationStep] = useState<number>(0);

  const projects: Project[] = [
    {
      title: "Portfolio Website",
      description:
        "A modern, responsive portfolio built with React, TypeScript, and Tailwind CSS featuring smooth animations and fullpage scrolling.",
      image: "from-purple-400 to-pink-400",
      technologies: ["React", "TypeScript", "Tailwind", "Anime.js", "Vite"],
      liveUrl: "#",
      githubUrl: "https://github.com/lcaohoanq",
      gradient: "from-purple-400 to-pink-400",
    },
    {
      title: "Spring Boot API",
      description:
        "RESTful API built with Spring Boot, featuring JWT authentication, PostgreSQL database, and comprehensive error handling.",
      image: "from-green-400 to-blue-400",
      technologies: ["Spring Boot", "Java", "PostgreSQL", "JWT", "Maven"],
      liveUrl: "#",
      githubUrl: "https://github.com/lcaohoanq",
      gradient: "from-green-400 to-blue-400",
    },
    {
      title: "E-commerce Platform",
      description:
        "Full-stack e-commerce solution with React frontend, Node.js backend, and integrated payment processing.",
      image: "from-yellow-400 to-red-400",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "Express"],
      liveUrl: "#",
      githubUrl: "https://github.com/lcaohoanq",
      gradient: "from-yellow-400 to-red-400",
    },
    {
      title: "Mobile App UI",
      description:
        "Beautiful mobile application interface design with React Native, featuring smooth animations and intuitive UX.",
      image: "from-indigo-400 to-cyan-400",
      technologies: ["React Native", "Expo", "TypeScript", "AsyncStorage"],
      liveUrl: "#",
      githubUrl: "https://github.com/lcaohoanq",
      gradient: "from-indigo-400 to-cyan-400",
    },
  ];

  // Function to get slide animation class based on project index
  const getSlideAnimation = (index: number, isVisible: boolean) => {
    if (isVisible) {
      return "opacity-100 translate-y-0 translate-x-0 scale-100 rotate-0";
    }

    // Different slide directions for each project
    const animations = [
      "opacity-0 -translate-y-16 -translate-x-8 scale-75 -rotate-2", // Top-left
      "opacity-0 -translate-y-16 translate-x-8 scale-75 rotate-2", // Top-right
      "opacity-0 translate-y-16 -translate-x-8 scale-75 rotate-1", // Bottom-left
      "opacity-0 translate-y-16 translate-x-8 scale-75 -rotate-1", // Bottom-right
    ];

    return animations[index % animations.length];
  };

  // Animation effect when entering projects section
  useEffect(() => {
    if (currentSection === 3) {
      // Projects section index
      // Reset animation
      setVisibleProjects(0);
      setAnimationStep(0);

      // Start sequential animation with proper timing
      const startAnimation = () => {
        const animateNextProject = (projectIndex: number) => {
          if (projectIndex < projects.length) {
            setTimeout(
              () => {
                setVisibleProjects(projectIndex + 1);
                setAnimationStep(projectIndex + 1);
                animateNextProject(projectIndex + 1);
              },
              projectIndex === 0 ? 500 : 1000,
            ); // First project after 500ms, then 1000ms between each
          }
        };

        animateNextProject(0);
      };

      // Small delay before starting the animation
      const timer = setTimeout(startAnimation, 400);
      return () => clearTimeout(timer);
    } else {
      // Reset when leaving section
      setVisibleProjects(0);
      setAnimationStep(0);
    }
  }, [currentSection, projects.length]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-4 md:gap-6 max-h-[60vh] overflow-hidden">
        {projects.map((project, index) => (
          <div
            key={project.title}
            className={`bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-white/15 transition-all transform hover:scale-105 hover:shadow-2xl ${getSlideAnimation(
              index,
              index < visibleProjects,
            )}`}
            style={{
              transitionDuration: "1200ms",
              transitionTimingFunction:
                "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              transform: index < visibleProjects ? "none" : undefined,
            }}
            onMouseEnter={() => setHoveredProject(index)}
            onMouseLeave={() => setHoveredProject(null)}
          >
            {/* Project Image/Gradient */}
            <div
              className={`h-32 md:h-36 bg-gradient-to-r ${project.gradient} relative overflow-hidden transition-all duration-1000 ${
                index < visibleProjects ? "opacity-100" : "opacity-30"
              }`}
            >
              <div className="absolute inset-0 bg-black/20"></div>
              <div
                className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${
                  index < visibleProjects
                    ? "transform translate-y-0 opacity-100 scale-100"
                    : "transform translate-y-4 opacity-30 scale-75"
                }`}
              >
                <div className="text-white text-6xl opacity-30">
                  {index === 0
                    ? "💻"
                    : index === 1
                      ? "⚡"
                      : index === 2
                        ? "🛒"
                        : "📱"}
                </div>
              </div>
              {hoveredProject === index && index < visibleProjects && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center space-x-4 transition-all duration-300">
                  <a
                    href={project.liveUrl}
                    className="bg-white text-gray-900 px-4 py-2 rounded-full hover:bg-gray-100 transition-colors text-sm font-medium"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live Demo
                  </a>
                  <a
                    href={project.githubUrl}
                    className="bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition-colors text-sm font-medium"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                </div>
              )}
            </div>

            {/* Project Content */}
            <div
              className={`p-4 transition-all duration-1200 ${
                index < visibleProjects
                  ? "transform translate-y-0 opacity-100"
                  : "transform translate-y-8 opacity-30"
              }`}
              style={{
                transitionDelay: index < visibleProjects ? "200ms" : "0ms",
              }}
            >
              <h3
                className={`text-lg font-bold mb-2 group-hover:text-blue-300 transition-all duration-700 ${
                  index < visibleProjects ? "text-white" : "text-gray-500"
                }`}
              >
                {project.title}
              </h3>
              <p
                className={`mb-3 text-xs leading-relaxed line-clamp-2 transition-all duration-700 ${
                  index < visibleProjects ? "text-gray-300" : "text-gray-500"
                }`}
              >
                {project.description}
              </p>

              {/* Technologies */}
              <div
                className={`flex flex-wrap gap-1 mb-3 transition-all duration-1000 ${
                  index < visibleProjects ? "opacity-100" : "opacity-30"
                }`}
              >
                {project.technologies.slice(0, 3).map((tech, techIndex) => (
                  <span
                    key={tech}
                    className={`bg-white/20 text-white px-2 py-0.5 rounded-full text-xs font-medium backdrop-blur-sm border border-white/10 transition-all duration-500 ${
                      index < visibleProjects
                        ? "transform translate-y-0 opacity-100"
                        : "transform translate-y-2 opacity-30"
                    }`}
                    style={{
                      transitionDelay:
                        index < visibleProjects
                          ? `${400 + techIndex * 100}ms`
                          : "0ms",
                    }}
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span
                    className={`bg-white/10 text-white px-2 py-0.5 rounded-full text-xs transition-all duration-500 ${
                      index < visibleProjects ? "opacity-100" : "opacity-30"
                    }`}
                  >
                    +{project.technologies.length - 3}
                  </span>
                )}
              </div>

              {/* Project Links */}
              <div
                className={`flex space-x-3 transition-all duration-1000 ${
                  index < visibleProjects
                    ? "transform translate-y-0 opacity-100"
                    : "transform translate-y-4 opacity-30"
                }`}
                style={{
                  transitionDelay: index < visibleProjects ? "600ms" : "0ms",
                }}
              >
                <a
                  href={project.liveUrl}
                  className={`hover:text-blue-200 transition-colors text-xs font-medium flex items-center space-x-1 ${
                    index < visibleProjects ? "text-blue-300" : "text-gray-500"
                  }`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>View Project</span>
                  <span>→</span>
                </a>
                <a
                  href={project.githubUrl}
                  className={`hover:text-white transition-colors text-xs font-medium flex items-center space-x-1 ${
                    index < visibleProjects ? "text-gray-300" : "text-gray-500"
                  }`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Source Code</span>
                  <span>↗</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Projects Link */}
      <div
        className={`text-center mt-6 transition-all duration-1000 ${
          visibleProjects >= projects.length
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
        style={{
          transitionDelay: visibleProjects >= projects.length ? "800ms" : "0ms",
        }}
      >
        <a
          href="https://github.com/lcaohoanq"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-105 text-sm"
        >
          <span>View All Projects</span>
          <span>↗</span>
        </a>
      </div>
    </div>
  );
};

export default ProjectsSection;
