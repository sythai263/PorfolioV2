"use client";

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
import { useState } from "react";

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter:", email);
    setEmail("");
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact Form:", formData);
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500">
      <Navbar />

      <main>
        <HeroSection />
        <TechStackSection />
        <ExperiencesSection />
        <ProjectsSection />
        <ContactSection
          formData={formData}
          setFormData={setFormData}
          handleContactSubmit={handleContactSubmit}
        />
        <CtaBannerSection />
      </main>

      <FooterSection
        email={email}
        setEmail={setEmail}
        handleNewsletterSubmit={handleNewsletterSubmit}
      />
    </div>
  );
}
