import Image from 'next/image';
import { Github, Linkedin, Twitter, Download } from 'lucide-react';
import { Button } from '@components/ui/button';
import { Badge } from '@components/ui/badge';
import { getProfile } from '@infrastructure';

export async function Hero() {
  const profile = await getProfile();

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="mb-8">
            <Image
              src={profile.avatar}
              alt={profile.name}
              width={150}
              height={150}
              className="rounded-full mx-auto border-4 border-white shadow-xl"
            />
          </div>

          <Badge variant="outline" className="mb-4">
            {profile.location}
          </Badge>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            {profile.name}
          </h1>

          <h2 className="text-xl md:text-2xl text-gray-600 mb-6">
            {profile.title}
          </h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            {profile.bio}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" className="gap-2">
              <Download className="w-4 h-4" />
              Download Resume
            </Button>
            <Button variant="outline" size="lg">
              Contact Me
            </Button>
          </div>

          <div className="flex justify-center gap-4">
            {profile.social.map((social) => {
              const IconComponent = getSocialIcon(social.icon);
              return (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <IconComponent className="w-5 h-5" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function getSocialIcon(iconName: string) {
  switch (iconName) {
    case 'Github':
      return Github;
    case 'Linkedin':
      return Linkedin;
    case 'Twitter':
      return Twitter;
    default:
      return Github;
  }
}
