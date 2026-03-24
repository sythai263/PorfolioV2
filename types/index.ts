export interface Profile {
  name: string;
  title: string;
  bio: string;
  avatar: string;
  email: string;
  location: string;
  social: SocialLink[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  category: ProjectCategory;
  featured: boolean;
}

export type ProjectCategory = "web" | "mobile" | "design" | "other";

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate?: string;
  description: string;
  achievements: string[];
}

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  level: SkillLevel;
  icon?: string;
}

export type SkillCategory =
  | "all"
  | "frontend"
  | "backend"
  | "tools"
  | "design"
  | "other";
export type SkillLevel = "beginner" | "intermediate" | "advanced" | "expert";

export interface TechStack {
  id: string;
  name: string;
  category: SkillCategory;
  level: SkillLevel;
  icon: string;
  orbit: "inner" | "outer";
  angle: number;
}

export interface NavigationItem {
  label: string;
  href: string;
  icon: string;
}
