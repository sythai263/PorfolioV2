import type { EducationType } from '@app-types'

export async function getEducations(locale: string = 'en'): Promise<EducationType[]> {
  const educationsData = await import(`@data/${locale}/educations.json`)
  return educationsData.default
}
