import type { Skill } from "@app-types";

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
