import { Github, Linkedin, Twitter, Mail, Send } from 'lucide-react';

interface FooterSectionProps {
  email: string;
  setEmail: (email: string) => void;
  handleNewsletterSubmit: (e: React.FormEvent) => void;
}

export function FooterSection({ email, setEmail, handleNewsletterSubmit }: FooterSectionProps) {
  return (
    <footer className="bg-neutral-09 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Logo & Newsletter */}
          <div className="space-y-6">
            <div className="text-h2 font-bold text-primary">LS</div>
            <div>
              <h3 className="text-h3 text-card-foreground mb-3">Đăng ký nhận bản tin</h3>
              <form onSubmit={handleNewsletterSubmit} className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Email của bạn"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-custom input-md flex-1"
                  required
                />
                <button type="submit" className="btn-custom btn-m bg-primary text-white">
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

          {/* Middle Column - Navigation Links */}
          <div>
            <h3 className="text-h3 text-card-foreground mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="text-b16-reg text-neutral-04 hover:text-primary">Home</a></li>
              <li><a href="#projects" className="text-b16-reg text-neutral-04 hover:text-primary">Projects</a></li>
              <li><a href="#about" className="text-b16-reg text-neutral-04 hover:text-primary">About</a></li>
              <li><a href="#contact" className="text-b16-reg text-neutral-04 hover:text-primary">Contact</a></li>
            </ul>
          </div>

          {/* Right Column - Social Links */}
          <div>
            <h3 className="text-h3 text-card-foreground mb-4">Connect</h3>
            <div className="flex space-x-3">
              <a href="#" className="p-2 bg-neutral-08 rounded-lg hover:bg-primary hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-neutral-08 rounded-lg hover:bg-primary hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-neutral-08 rounded-lg hover:bg-primary hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-neutral-08 rounded-lg hover:bg-primary hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-b14-reg text-neutral-04">
            © 2024 LE SY THAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
