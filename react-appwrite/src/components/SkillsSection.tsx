import { FaCheckCircle } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";

interface SkillsProps {
  currentSection: number;
}

const SkillsSection: React.FC<SkillsProps> = ({ currentSection }) => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [visibleSkills, setVisibleSkills] = useState<{
    [key: number]: number[];
  }>({});
  const sectionRef = useRef<HTMLDivElement>(null);

  const skillCategories = [
    {
      title: "Backend",
      skills: [
        "Spring Boot",
        "Java",
        "Kotlin",
        "Node.js",
        "Express.js",
        "PostgreSQL",
        "MySQL",
        "MongoDB",
        "Redis",
        "RESTful API",
        "GraphQL",
        "Microservices with Spring",
        "JWT Authentication",
        "Keycloak",
      ],
    },
    {
      title: "Frontend",
      skills: [
        "React",
        "TypeScript",
        "Tailwind CSS",
        "HTML",
        "CSS",
        "JavaScript",
        "Pug",
        "Storybook",
        "Material UI",
      ],
    },
    {
      title: "Mobile",
      skills: ["Android Development", "Jetpack Compose", "Kotlin"],
    },
    {
      title: "Linux",
      skills: ["Ubuntu", "Debian", "Arch Linux", "Shell Scripting", "Docker"],
    },
    {
      title: "Cloud & DevOps",
      skills: [
        "Selft-hosting",
        "Home Lab",
        "ZimaOS",
        "Docker",
        "CI/CD (GitHub Actions, Jenkins)",
        "Monitoring (Prometheus, Grafana)",
      ],
    },
    {
      title: "Tools & Others",
      skills: [
        "Git",
        "Linux",
        "Nginx",
        "Postman",
        "Swagger",
        "Figma",
        "DataGrip",
        "Jira",
        "GitHub Projects",
        "VS Code",
        "IntelliJ",
      ],
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardIndex = parseInt(
              entry.target.getAttribute("data-card-index") || "0",
            );

            setTimeout(() => {
              setVisibleCards((prev) => [...prev, cardIndex]);

              const skills = skillCategories[cardIndex].skills;
              skills.forEach((_, skillIndex) => {
                setTimeout(() => {
                  setVisibleSkills((prev) => ({
                    ...prev,
                    [cardIndex]: [...(prev[cardIndex] || []), skillIndex],
                  }));
                }, skillIndex * 80);
              });
            }, cardIndex * 150);
          }
        });
      },
      { threshold: 0.3 },
    );

    const cards = sectionRef.current?.querySelectorAll(".skill-card");
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="max-w-6xl mx-auto px-4 md:px-8 py-12 relative"
    >
      {/* Background Effects - Non-intrusive */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 relative z-10">
        {skillCategories.map((category, index) => {
          const isVisible = visibleCards.includes(index);

          return (
            <div
              key={category.title}
              data-card-index={index}
              className={`skill-card bg-white border border-gray-200 rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-500 relative group overflow-hidden transform ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
            >
              {/* Animated Border Glow */}
              <div
                className={`absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-xl`}
              ></div>

              {/* Subtle Shimmer Effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"></div>

              <h3 className="text-xl font-semibold text-[#121212] mb-4 flex items-center gap-2 relative z-10">
                <FaCheckCircle
                  className={`text-[#FFCC00] transform transition-all duration-300 group-hover:scale-110 ${
                    isVisible ? "animate-bounce" : ""
                  }`}
                  style={{
                    animationDelay: `${index * 200}ms`,
                    animationDuration: "1s",
                    animationIterationCount: "2",
                  }}
                />

                {/* Fixed smooth title transition */}
                <span className="relative">
                  {/* Base text - fades out on hover */}
                  <span className="transition-opacity duration-300 group-hover:opacity-0">
                    {category.title}
                  </span>

                  {/* Gradient text - fades in on hover */}
                  <span className="absolute top-0 left-0 bg-gradient-to-r from-[#121212] to-purple-600 bg-clip-text text-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {category.title}
                  </span>
                </span>
              </h3>

              <div className="flex flex-wrap gap-2 relative z-10">
                {category.skills.map((skill, skillIndex) => {
                  const isSkillVisible =
                    visibleSkills[index]?.includes(skillIndex);

                  return (
                    <span
                      key={skill}
                      className={`px-3 py-1 bg-gray-100 text-[#090040] text-sm font-medium rounded-full hover:bg-[#B13BFF40] transition-all duration-300 cursor-pointer relative overflow-hidden group/skill transform hover:scale-105 ${
                        isSkillVisible
                          ? "translate-y-0 opacity-100"
                          : "translate-y-2 opacity-0"
                      }`}
                      style={{
                        transitionDelay: `${skillIndex * 50}ms`,
                      }}
                    >
                      {/* Skill Hover Glow */}

                      {/* Skill Text */}
                      <span className="relative z-10 group-hover/skill:text-purple-700 transition-colors duration-200">
                        {skill}
                      </span>

                      {/* Micro Shimmer on Skill */}
                      <div className="absolute inset-0 -translate-x-full group-hover/skill:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SkillsSection;
