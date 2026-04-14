export interface Experience {
  id: string
  company: string
  position: string
  location: string
  startDate: string
  endDate?: string | null
  description: string
  achievements: string[]
}
