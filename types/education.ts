export interface EducationType {
  id: string | number
  schools: string[]
  duration: string
  degree: string
  descriptions: string[]
  image: string
  theme?: 'blue' | 'orange' | 'green'
}
