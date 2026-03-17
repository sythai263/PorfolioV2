'use client';

import { useState } from 'react';
import { Menu, X, Globe, Moon, Sun } from 'lucide-react';

interface NavbarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export function Navbar({ isDarkMode, toggleDarkMode }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="text-h2 font-bold text-primary">LS</div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-b16-reg hover:text-primary transition-colors">Home</a>
            <a href="#projects" className="text-b16-reg hover:text-primary transition-colors">Projects</a>
            <a href="#about" className="text-b16-reg hover:text-primary transition-colors">About</a>
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 text-neutral-04 hover:text-foreground transition-colors">
              <Globe className="w-5 h-5" />
            </button>
            <button 
              onClick={toggleDarkMode}
              className="p-2 text-neutral-04 hover:text-foreground transition-colors"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button className="btn-custom btn-m bg-primary text-white">
              Hire Me
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-neutral-04 hover:text-foreground"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <a href="#home" className="block text-b16-reg hover:text-primary">Home</a>
            <a href="#projects" className="block text-b16-reg hover:text-primary">Projects</a>
            <a href="#about" className="block text-b16-reg hover:text-primary">About</a>
            <div className="flex space-x-4 pt-4">
              <button className="p-2 text-neutral-04 hover:text-foreground">
                <Globe className="w-5 h-5" />
              </button>
              <button 
                onClick={toggleDarkMode}
                className="p-2 text-neutral-04 hover:text-foreground"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button className="btn-custom btn-m bg-primary text-white">
                Hire Me
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
