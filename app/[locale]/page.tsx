import {
  ContactSection,
  CtaBannerSection,
  ExperiencesSection,
  FooterSection,
  HeroSection,
  Navbar,
  ProjectsSection,
  TechStackSection,
} from "@components";
import {
  getExperience,
  getProfile,
  getProjects,
  getTechStacks,
} from "@infrastructure";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  const experiences = await getExperience(locale);
  const profile = await getProfile(locale);
  const techStacks = await getTechStacks();
  const projects = await getProjects();
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500">
      <Navbar />

      <main>
        <HeroSection data={profile} />
        <TechStackSection data={techStacks} />
        <ExperiencesSection data={experiences} />
        <ProjectsSection data={projects} />
        <ContactSection />
        <CtaBannerSection />
      </main>

      <FooterSection />
    </div>
  );
}
