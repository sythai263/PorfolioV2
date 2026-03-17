interface Project {
  id: number;
  title: string;
  description: string;
  isStaggered?: boolean;
}

export function ProjectsSection() {
  const projects: Project[] = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Modern e-commerce solution with real-time inventory and seamless checkout experience.',
      isStaggered: false
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Collaborative task management tool with real-time updates and team features.',
      isStaggered: true
    },
    {
      id: 3,
      title: 'Weather Dashboard',
      description: 'Beautiful weather application with detailed forecasts and interactive maps.',
      isStaggered: false
    },
    {
      id: 4,
      title: 'Portfolio Website',
      description: 'Responsive portfolio showcasing projects and skills with modern design.',
      isStaggered: true
    }
  ];

  return (
    <section id="projects" className="py-20 bg-neutral-09">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-t2 text-foreground">About Projects</h2>
          <p className="text-b16-reg text-neutral-04 max-w-2xl mx-auto">
            Explore my latest projects and creative works. From web applications to photography, 
            each project represents a unique challenge and learning experience.
          </p>
        </div>

        {/* Projects Grid - Staggered Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className={`space-y-4 ${project.isStaggered ? 'md:translate-y-8' : ''}`}
            >
              <div className="bg-neutral-06 rounded-2xl h-64 lg:h-80"></div>
              <div>
                <h3 className="text-h1 text-card-foreground">{project.title}</h3>
                <p className="text-b16-reg text-neutral-04 mt-2">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <button className="btn-custom btn-l bg-primary text-white">
            View More
          </button>
        </div>
      </div>
    </section>
  );
}
