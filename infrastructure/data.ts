import { Experience, Profile, Project, Skill, TechStack } from "@app-types";

export async function getProfile(): Promise<Profile> {
  const profileData = await import("@data/profile.json");
  return profileData.default;
}

export async function getProjects(): Promise<Project[]> {
  const projectsData = await import("@data/projects.json");
  return projectsData.default;
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await getProjects();
  return projects.filter((project) => project.featured);
}

export async function getProjectsByCategory(
  category: string,
): Promise<Project[]> {
  const projects = await getProjects();
  return category === "all"
    ? projects
    : projects.filter((project) => project.category === category);
}

export async function getExperience(): Promise<Experience[]> {
  const experienceData = await import("@data/experience.json");
  return experienceData.default.sort((a, b) => {
    const dateA = a.endDate ? new Date(a.endDate) : new Date();
    const dateB = b.endDate ? new Date(b.endDate) : new Date();
    return dateB.getTime() - dateA.getTime();
  });
}

export async function getSkills(): Promise<Skill[]> {
  const skillsData = await import("@data/skills.json");
  return skillsData.default;
}

export async function getSkillsByCategory(category: string): Promise<Skill[]> {
  const skills = await getSkills();
  return category === "all"
    ? skills
    : skills.filter((skill) => skill.category === category);
}

export async function getTechStacks(): Promise<TechStack[]> {
  const techStacksData = await import("@data/tech-stack.json");
  return techStacksData.default;
}
