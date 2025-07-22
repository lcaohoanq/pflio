import { FaCheckCircle } from "react-icons/fa";
import React from "react";
import { title } from "process";
interface SkillsProps {
  currentSection: number;
}

const SkillsSection: React.FC<SkillsProps> = ({ currentSection }) => {
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
        "MongoDB",
        "Redis",
        "RESTful API",
        "JWT Authentication",
        "gRPC",
        "Spring Security",
      ],
    },
    {
      title: "Frontend",
      skills: [
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "HTML5",
        "CSS3",
        "Zustand",
        "React Hook Form",
        "Vite",
        "Storybook",
        "Chakra UI",
        "Material UI",
      ],
    },
    {
      title: "Mobile",
      skills: [
        "React Native",
        "Expo",
        "Android Development",
        "iOS Development",
        "Flutter",
        "Dart",
        "Firebase",
      ],
    },
    {
      title: "Devops",
      skills: [
        "Docker",
        "Kubernetes",
        "AWS (EC2, S3, RDS)",
        "Terraform",
        "CI/CD (GitHub Actions, Jenkins)",
        "Monitoring (Prometheus, Grafana)",
      ],
    },
    {
      title: "Cloud & DevOps",
      skills: [
        "AWS (EC2, S3, RDS)",
        "Docker",
        "Kubernetes",
        "Terraform",
        "CI/CD (GitHub Actions, Jenkins)",
        "Monitoring (Prometheus, Grafana)",
      ],
    },
    {
      title: "Tools & Others",
      skills: [
        "Git",
        "Docker",
        "CI/CD (GitHub Actions)",
        "Linux",
        "Nginx",
        "Postman",
        "Swagger/OpenAPI",
        "WebSocket",
        "Keycloak",
        "Figma",
        "Jira",
        "VS Code",
      ],
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-12">
      <div className="grid md:grid-cols-3 gap-8">
        {skillCategories.map((category) => (
          <div
            key={category.title}
            className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 hover:shadow-md transition duration-300"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FaCheckCircle className="text-indigo-500" />
              {category.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm font-medium rounded-full hover:bg-indigo-200 transition"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsSection;
