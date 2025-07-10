import React from "react";

interface SkillsProps {
  currentSection: number;
}

const SkillsSection: React.FC<SkillsProps> = ({ currentSection }) => {
  const skillCategories = [
    {
      title: "Backend",
      color: "green",
      skills: [
        { name: "Spring Boot", level: 90 },
        { name: "Java", level: 85 },
        { name: "Node.js", level: 75 },
        { name: "PostgreSQL", level: 80 },
        { name: "MongoDB", level: 70 },
      ],
    },
    {
      title: "Frontend",
      color: "blue",
      skills: [
        { name: "React", level: 88 },
        { name: "TypeScript", level: 82 },
        { name: "Tailwind CSS", level: 90 },
        { name: "HTML5", level: 95 },
        { name: "CSS3", level: 85 },
      ],
    },
    {
      title: "Tools & Others",
      color: "purple",
      skills: [
        { name: "Git", level: 85 },
        { name: "Docker", level: 70 },
        { name: "Vite", level: 80 },
        { name: "Webpack", level: 65 },
        { name: "REST APIs", level: 90 },
      ],
    },
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      green: {
        dot: "bg-green-400",
        text: "text-green-400",
        gradient: "from-green-400 to-green-600",
      },
      blue: {
        dot: "bg-blue-400",
        text: "text-blue-400",
        gradient: "from-blue-400 to-blue-600",
      },
      purple: {
        dot: "bg-purple-400",
        text: "text-purple-400",
        gradient: "from-purple-400 to-purple-600",
      },
    };
    return colorMap[color as keyof typeof colorMap];
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid md:grid-cols-3 gap-6 md:gap-8">
        {skillCategories.map((category, categoryIndex) => {
          const colors = getColorClasses(category.color);
          return (
            <div
              key={category.title}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 md:p-8 hover:bg-white/15 transition-all duration-300 transform hover:scale-105"
            >
              <h3 className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center">
                <span
                  className={`w-3 h-3 ${colors.dot} rounded-full mr-3`}
                ></span>
                {category.title}
              </h3>
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 text-sm md:text-base">
                        {skill.name}
                      </span>
                      <span
                        className={`${colors.text} text-xs md:text-sm font-mono`}
                      >
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                      <div
                        className={`bg-gradient-to-r ${colors.gradient} h-2 rounded-full transition-all duration-1000 ease-out`}
                        style={{
                          width:
                            currentSection === 2 ? `${skill.level}%` : "0%",
                          transitionDelay:
                            currentSection === 2
                              ? `${skillIndex * 100}ms`
                              : "0ms",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SkillsSection;
