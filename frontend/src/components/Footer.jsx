import React from 'react';
import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react';

const Footer = ({ profile }) => {
  const currentYear = new Date().getFullYear();

  // Fallback data if profile not loaded
  const footerData = {
    name: profile?.name || 'Alex Chen',
    email: profile?.email || 'alex.chen@email.com',
    phone: profile?.phone || '+1 (555) 123-4567',
    location: profile?.location || 'San Francisco, CA',
    social: profile?.social || {
      github: 'https://github.com/alexchen',
      linkedin: 'https://linkedin.com/in/alexchen',
      twitter: 'https://twitter.com/alexchen'
    }
  };

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
                  {footerData.name}
                </button>
                <p className="body-regular text-gray-400 mt-4 max-w-md">
                  Frontend Developer specializing in React and modern web technologies. 
                  Creating digital experiences that matter.
                </p>
              </div>
              
              {/* Social Links */}
              <div className="flex items-center space-x-4">
                <a 
                  href={footerData.social.github} 
                  className="footer-social-link" 
                  aria-label="GitHub"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a 
                  href={footerData.social.linkedin} 
                  className="footer-social-link" 
                  aria-label="LinkedIn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a 
                  href={footerData.social.twitter} 
                  className="footer-social-link" 
                  aria-label="Twitter"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a 
                  href={`mailto:${footerData.email}`} 
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
                  href={`mailto:${footerData.email}`} 
                  className="footer-link"
                >
                  {footerData.email}
                </a>
                <a 
                  href={`tel:${footerData.phone}`} 
                  className="footer-link"
                >
                  {footerData.phone}
                </a>
                <span className="block text-gray-400 text-sm">
                  {footerData.location}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <span>&copy; {currentYear} {footerData.name}. All rights reserved.</span>
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