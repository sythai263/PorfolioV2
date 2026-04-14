import type { Profile } from '@app-types'

export async function getProfile(locale: string = 'en'): Promise<Profile> {
  const profileData = await import(`@data/${locale}/profile.json`)
  return profileData.default
}
