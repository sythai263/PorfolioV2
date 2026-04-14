import {
  ContactSection,
  CtaBannerSection,
  ExperiencesSection,
  FooterSection,
  HeroSection,
  Navbar,
  ProjectsSection,
  TechStackSection,
} from '@components'
import { EducationSection } from '@components/educations'
import { TestimonialSection } from '@components/testimonials'
import {
  getEducations,
  getExperience,
  getProfile,
  getProjects,
  getTechStacks,
  getTestimonials,
} from '@infrastructure'

interface HomePageProps {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params

  const experiences = await getExperience(locale)
  const profile = await getProfile(locale)
  const techStacks = await getTechStacks()
  const projects = await getProjects(locale)
  const educations = await getEducations(locale)
  const testimonials = await getTestimonials(locale)
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500">
      <Navbar />

      <main>
        <HeroSection data={profile} />
        <TechStackSection data={techStacks} />
        <ExperiencesSection data={experiences} />
        <EducationSection data={educations} />
        <ProjectsSection data={projects} />
        <TestimonialSection data={testimonials} />
        <ContactSection />
        <CtaBannerSection />
      </main>

      <FooterSection />
    </div>
  )
}
