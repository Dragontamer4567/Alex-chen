import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button 
              onClick={() => scrollToSection('hero')}
              className="text-2xl font-light text-black tracking-wide hover:opacity-70 transition-opacity duration-200"
            >
              Alex Chen
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-12">
            <button onClick={() => scrollToSection('about')} className="nav-link">About</button>
            <button onClick={() => scrollToSection('services')} className="nav-link">Services</button>
            <button onClick={() => scrollToSection('projects')} className="nav-link">Work</button>
            <button onClick={() => scrollToSection('testimonials')} className="nav-link">Reviews</button>
            <button onClick={() => scrollToSection('contact')} className="nav-link">Contact</button>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button 
              onClick={() => scrollToSection('contact')}
              className="btn-primary"
            >
              Hire Me
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-black hover:opacity-70 transition-opacity duration-200"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
            <nav className="px-8 py-6 space-y-4">
              <button onClick={() => scrollToSection('about')} className="mobile-nav-link">About</button>
              <button onClick={() => scrollToSection('services')} className="mobile-nav-link">Services</button>
              <button onClick={() => scrollToSection('projects')} className="mobile-nav-link">Work</button>
              <button onClick={() => scrollToSection('testimonials')} className="mobile-nav-link">Reviews</button>
              <button onClick={() => scrollToSection('contact')} className="mobile-nav-link">Contact</button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="btn-primary w-full mt-4"
              >
                Hire Me
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;