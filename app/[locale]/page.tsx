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
import { getExperience, getProfile, getTechStacks } from "@infrastructure";

type Props = {
  params: { locale: string };
};

export default async function HomePage({ params: { locale } }: Props) {
  const experiences = await getExperience(locale);
  const profile = await getProfile(locale);
  const techStacks = await getTechStacks();
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500">
      <Navbar />

      <main>
        <HeroSection data={profile} />
        <TechStackSection data={techStacks} />
        <ExperiencesSection data={experiences} />
        <ProjectsSection />
        <ContactSection />
        <CtaBannerSection />
      </main>

      <FooterSection />
    </div>
  );
}
