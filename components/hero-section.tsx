import { Download, User } from 'lucide-react';

export function HeroSection() {
  return (
    <section id="home" className="pt-16 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-b18-semi text-primary">Hello! I'm LE SY THAI</p>
              <h1 className="text-t1 text-foreground">Developer & Photographer</h1>
            </div>
            
            <p className="text-b16-reg text-neutral-04 max-w-lg">
              Passionate about creating beautiful digital experiences and capturing moments through photography. 
              Specialized in modern web development and creative visual storytelling.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn-custom btn-l bg-primary text-white">
                Hire Me
              </button>
              <button className="btn-custom btn-l border-2 border-primary text-primary hover:bg-primary hover:text-white">
                <Download className="w-4 h-4 mr-2" />
                Download CV
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative w-full h-96 lg:h-full min-h-[400px]">
              {/* Abstract Background Shape */}
              <div className="absolute inset-0 bg-primary rounded-3xl opacity-10"></div>
              <div className="absolute inset-4 bg-primary rounded-3xl opacity-20"></div>
              <div className="absolute inset-8 bg-neutral-06 rounded-2xl"></div>
              {/* Profile Image Placeholder */}
              <div className="absolute inset-12 bg-neutral-06 rounded-2xl flex items-center justify-center">
                <User className="w-24 h-24 text-neutral-04" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
