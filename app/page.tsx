'use client';

import { useState } from 'react';
import {
  Navbar,
  HeroSection,
  TechStackSection,
  ExperiencesSection,
  ProjectsSection,
  ContactSection,
  CtaBannerSection,
  FooterSection
} from '@components';

export default function HomePage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [email, setEmail] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter:', email);
    setEmail('');
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact Form:', formData);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

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
