import React from 'react';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';

const Hero = () => {
  const scrollToContact = () => {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToWork = () => {
    document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="pt-32 pb-20 px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="hero-large leading-tight">
                Frontend Developer
                <br />
                <span className="text-gray-600">Building Digital Experiences</span>
              </h1>
              <p className="body-large text-gray-600 max-w-lg">
                I craft responsive, user-centric web applications that blend 
                functionality with exceptional design. Specializing in React, 
                TypeScript, and modern frontend technologies.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={scrollToContact} className="btn-primary">
                Work With Me
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
              <button onClick={scrollToWork} className="btn-secondary">
                View My Work
              </button>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-6 pt-4">
              <a href="#" className="social-link" aria-label="GitHub">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="social-link" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="social-link" aria-label="Email">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Professional Image Placeholder */}
          <div className="relative">
            <div className="aspect-square bg-gray-100 rounded-none overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-200 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto"></div>
                  <p className="text-gray-500 text-sm">Professional Photo</p>
                </div>
              </div>
            </div>
            
            {/* Trust Indicators */}
            <div className="absolute -bottom-8 -left-8 bg-white border border-gray-200 p-6 shadow-sm">
              <div className="text-center">
                <div className="text-2xl font-light text-black">5+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
            </div>
            
            <div className="absolute -top-8 -right-8 bg-white border border-gray-200 p-6 shadow-sm">
              <div className="text-center">
                <div className="text-2xl font-light text-black">50+</div>
                <div className="text-sm text-gray-600">Projects Completed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;