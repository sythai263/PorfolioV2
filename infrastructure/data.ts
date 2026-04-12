import {
  EducationType,
  Experience,
  Profile,
  Project,
  Skill,
  TechStack,
  TestimonialType,
} from "@app-types";

export async function getProfile(locale: string = "en"): Promise<Profile> {
  const profileData = await import(`@data/${locale}/profile.json`);
  return profileData.default;
}

export async function getProjects(locale: string = "en"): Promise<Project[]> {
  const projectsData = await import(`@data/${locale}/projects.json`);
  return projectsData.default;
}
export async function getEducations(
  locale: string = "en",
): Promise<EducationType[]> {
  const projectsData = await import(`@data/${locale}/educations.json`);
  return projectsData.default;
}

export async function getFeaturedProjects(
  locale: string = "en",
): Promise<Project[]> {
  const projects = await getProjects(locale);
  return projects.filter((project) => project.featured);
}

export async function getProjectsByCategory(
  category: string,
  locale: string = "en",
): Promise<Project[]> {
  const projects = await getProjects(locale);
  return category === "all"
    ? projects
    : projects.filter((project) => project.category === category);
}

export async function getExperience(
  locale: string = "en",
): Promise<Experience[]> {
  const experienceData = await import(`@data/${locale}/experience.json`);
  return experienceData.default.sort((a: Experience, b: Experience) => {
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

export async function getTestimonials(
  locale: string = "en",
): Promise<TestimonialType[]> {
  const testimonialsData = await import(`@data/${locale}/testimonials.json`);
  return testimonialsData.default;
}
