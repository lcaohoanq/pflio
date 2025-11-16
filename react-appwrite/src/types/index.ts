import { Section } from "~/constants";

export type Project = {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  gradient: string;
};

export type SectionType = {
  id: Section;
  title: string;
  subtitle: string;
  content: React.JSX.Element;
  background: string;
};
