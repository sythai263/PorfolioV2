import type { Project } from '@app-types'

export async function getProjects(locale: string = 'en'): Promise<Project[]> {
  const projectsData = await import(`@data/${locale}/projects.json`)
  return projectsData.default
}

export async function getFeaturedProjects(locale: string = 'en'): Promise<Project[]> {
  const projects = await getProjects(locale)
  return projects.filter((project) => project.featured)
}

export async function getProjectsByCategory(
  category: string,
  locale: string = 'en',
): Promise<Project[]> {
  const projects = await getProjects(locale)
  return category === 'all' ? projects : projects.filter((project) => project.category === category)
}
