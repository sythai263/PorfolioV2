import { Github, Linkedin, Twitter, Heart } from 'lucide-react';
import { Button } from '@components/ui/button';
import { SOCIAL_LINKS } from '@constants';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h3 className="text-xl font-bold mb-2">John Doe</h3>
            <p className="text-gray-400">
              Full Stack Developer passionate about creating amazing web experiences
            </p>
          </div>

          <div className="flex gap-4">
            {SOCIAL_LINKS.map((social) => {
              const IconComponent = getSocialIcon(social.icon);
              return (
                <Button
                  key={social.platform}
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white"
                  asChild
                >
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.platform}
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                </Button>
              );
            })}
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 flex items-center justify-center gap-2">
            Made with <Heart className="w-4 h-4 text-red-500 fill-current" /> by John Doe
            <span className="mx-2">•</span>
            © {new Date().getFullYear()} All rights reserved
          </p>
        </div>
      </div>
    </footer>
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
