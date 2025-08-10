import React from 'react';
import { personalInfo } from '../mock/mockData';
import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand & Description */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <button 
                  onClick={scrollToTop}
                  className="text-2xl font-light text-white hover:opacity-70 transition-opacity duration-200"
                >
                  {personalInfo.name}
                </button>
                <p className="body-regular text-gray-400 mt-4 max-w-md">
                  Frontend Developer specializing in React and modern web technologies. 
                  Creating digital experiences that matter.
                </p>
              </div>
              
              {/* Social Links */}
              <div className="flex items-center space-x-4">
                <a 
                  href={personalInfo.social.github} 
                  className="footer-social-link" 
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a 
                  href={personalInfo.social.linkedin} 
                  className="footer-social-link" 
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a 
                  href={personalInfo.social.twitter} 
                  className="footer-social-link" 
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a 
                  href={`mailto:${personalInfo.email}`} 
                  className="footer-social-link" 
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h3 className="heading-3 text-white">Quick Links</h3>
              <nav className="space-y-3">
                <button onClick={() => scrollToSection('about')} className="footer-link">
                  About
                </button>
                <button onClick={() => scrollToSection('services')} className="footer-link">
                  Services
                </button>
                <button onClick={() => scrollToSection('projects')} className="footer-link">
                  Work
                </button>
                <button onClick={() => scrollToSection('testimonials')} className="footer-link">
                  Reviews
                </button>
              </nav>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <h3 className="heading-3 text-white">Get In Touch</h3>
              <div className="space-y-3">
                <a 
                  href={`mailto:${personalInfo.email}`} 
                  className="footer-link"
                >
                  {personalInfo.email}
                </a>
                <a 
                  href={`tel:${personalInfo.phone}`} 
                  className="footer-link"
                >
                  {personalInfo.phone}
                </a>
                <span className="block text-gray-400 text-sm">
                  {personalInfo.location}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <span>&copy; {currentYear} {personalInfo.name}. All rights reserved.</span>
            </div>
            
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>and React</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;