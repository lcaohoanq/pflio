import React, { useState } from "react";

interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  gradient: string;
}

interface ProjectsProps {
  currentSection: number;
}

const ProjectsSection: React.FC<ProjectsProps> = ({ currentSection }) => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

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

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-4 md:gap-6 max-h-[60vh] overflow-hidden">
        {projects.map((project, index) => (
          <div
            key={project.title}
            className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-white/15 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl"
            onMouseEnter={() => setHoveredProject(index)}
            onMouseLeave={() => setHoveredProject(null)}
          >
            {/* Project Image/Gradient */}
            <div
              className={`h-32 md:h-36 bg-gradient-to-r ${project.gradient} relative overflow-hidden`}
            >
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute inset-0 flex items-center justify-center">
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
              {hoveredProject === index && (
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
            <div className="p-4">
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                {project.title}
              </h3>
              <p className="text-gray-300 mb-3 text-xs leading-relaxed line-clamp-2">
                {project.description}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-1 mb-3">
                {project.technologies.slice(0, 3).map((tech, techIndex) => (
                  <span
                    key={tech}
                    className="bg-white/20 text-white px-2 py-0.5 rounded-full text-xs font-medium backdrop-blur-sm border border-white/10"
                    style={{
                      animationDelay:
                        currentSection === 3 ? `${techIndex * 100}ms` : "0ms",
                    }}
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="bg-white/10 text-white px-2 py-0.5 rounded-full text-xs">
                    +{project.technologies.length - 3}
                  </span>
                )}
              </div>

              {/* Project Links */}
              <div className="flex space-x-3">
                <a
                  href={project.liveUrl}
                  className="text-blue-300 hover:text-blue-200 transition-colors text-xs font-medium flex items-center space-x-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>View Project</span>
                  <span>→</span>
                </a>
                <a
                  href={project.githubUrl}
                  className="text-gray-300 hover:text-white transition-colors text-xs font-medium flex items-center space-x-1"
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
      <div className="text-center mt-6">
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
