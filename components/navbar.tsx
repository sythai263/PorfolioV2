'use client';

import { useState } from 'react';
import { Menu, X, Mail, Sun, Moon, Cloud } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';

interface NavbarProps { }

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');

  const navLinks = ['Home', 'Projects', 'Gallery'];

  return (
    <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 transition-colors duration-300">
      {/* Main Pill Container */}
      <nav className="w-full max-w-5xl flex items-center justify-between p-2 px-3 md:px-6
        bg-card/90 backdrop-blur-md rounded-pill border border-border shadow-sm transition-all">

        {/* Left: Logo Section */}
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-colors
            bg-primary/10 border border-primary/20">
            {/* Logo Icon */}
            <div className="w-7 h-7 bg-primary rounded-md rotate-45 flex items-center justify-center shadow-sm">
              <div className="w-3 h-3 bg-card rounded-full"></div>
            </div>
          </div>
          <div className="hidden sm:block leading-tight">
            <p className="text-[10px] font-bold tracking-widest uppercase text-foreground">Company</p>
            <p className="text-[7px] uppercase text-primary">Tagline goes here</p>
          </div>
        </div>

        {/* Center: Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => setActiveTab(link)}
              className={`px-8 py-3 rounded-pill text-b16-semi transition-all duration-300 ${activeTab === link
                ? 'bg-primary/10 text-primary shadow-sm'
                : 'text-neutral-04 hover:text-primary'
                }`}
            >
              {link}
            </button>
          ))}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle Switch */}
          <ThemeToggle />

          {/* Mail Icon Button */}
          <button className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all 
            bg-primary/10 border border-transparent text-primary hover:bg-primary/20 hover:border-primary/20">
            <Mail size={20} fill="currentColor" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-20 left-4 right-4 rounded-[24px] p-6 shadow-xl border md:hidden flex flex-col gap-4 animate-in fade-in zoom-in duration-200
          bg-card border-border">
          {navLinks.map((link) => (
            <button
              key={link}
              className={`text-left text-b18-semi px-4 py-3 rounded-[16px] transition-colors ${activeTab === link
                ? 'bg-primary/10 text-primary'
                : 'text-neutral-04 hover:text-foreground'
                }`}
              onClick={() => {
                setActiveTab(link);
                setIsMenuOpen(false);
              }}
            >
              {link}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}