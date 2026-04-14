import type { TechStack } from "@app-types";

export async function getTechStacks(): Promise<TechStack[]> {
  const techStacksData = await import("@data/tech-stack.json");
  return techStacksData.default;
}
