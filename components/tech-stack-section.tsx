import { Code } from 'lucide-react';

export function TechStackSection() {
  const techStack = ['JavaScript', 'Java', 'C#', 'PHP', 'SQL'];

  return (
    <section className="py-20 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-t2 text-white">AI - DEVELOPER & PHOTO...</h2>
          <h3 className="text-h1 text-white">Tech Stack & Skills</h3>
        </div>

        {/* Tech Icons Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {techStack.map((tech) => (
            <div key={tech} className="flex flex-col items-center space-y-2">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <Code className="w-10 h-10 text-white" />
              </div>
              <span className="text-b14-reg text-white">{tech}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
