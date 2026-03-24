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

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500">
      <Navbar />

      <main>
        <HeroSection />
        <TechStackSection />
        <ExperiencesSection />
        <ProjectsSection />
        <ContactSection />
        <CtaBannerSection />
      </main>

      <FooterSection />
    </div>
  );
}
