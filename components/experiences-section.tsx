interface Experience {
  id: number;
  position: string;
  company: string;
  period: string;
  description: string;
}

export function ExperiencesSection() {
  const experiences: Experience[] = [
    {
      id: 1,
      position: 'Senior Frontend Developer',
      company: 'Tech Company',
      period: '2022 - Present',
      description: 'Experience placeholder - Add your job description, achievements, and technologies used here.'
    },
    {
      id: 2,
      position: 'Full Stack Developer',
      company: 'Startup Inc',
      period: '2020 - 2022',
      description: 'Experience placeholder - Add your job description, achievements, and technologies used here.'
    }
  ];

  return (
    <section id="experiences" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-t2 text-foreground mb-12">Experiences</h2>
        
        <div className="space-y-8">
          {experiences.map((experience) => (
            <div key={experience.id} className="bg-card border border-border rounded-2xl p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-h1 text-card-foreground">{experience.position}</h3>
                  <p className="text-b18-semi text-primary">{experience.company}</p>
                </div>
                <div className="text-b14-reg text-neutral-04 mt-2 md:mt-0">
                  {experience.period}
                </div>
              </div>
              <p className="text-b16-reg text-neutral-04">
                {experience.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
