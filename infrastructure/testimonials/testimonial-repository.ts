import type { TestimonialType } from '@app-types'

export async function getTestimonials(locale: string = 'en'): Promise<TestimonialType[]> {
  const testimonialsData = await import(`@data/${locale}/testimonials.json`)
  return testimonialsData.default
}
