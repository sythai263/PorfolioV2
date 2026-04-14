import type { Experience } from "@app-types";

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
