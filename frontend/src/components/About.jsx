import React from 'react';
import { Code, Palette, Zap, Users } from 'lucide-react';

const About = ({ profile }) => {
  // Fallback skills if profile not loaded
  const skills = profile?.skills || [
    "React", "TypeScript", "Next.js", "JavaScript", "HTML5", "CSS3",
    "Tailwind CSS", "Sass", "Redux", "Context API", "React Router",
    "Webpack", "Vite", "Jest", "React Testing Library", "Git", "Figma"
  ];

  return (
    <section id="about" className="section-padding bg-gray-50">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="hero-medium">
                Crafting digital experiences with precision and passion
              </h2>
              <div className="space-y-4">
                <p className="body-large text-gray-600">
                  With over 5 years of experience in frontend development, I specialize in 
                  creating modern, responsive web applications that deliver exceptional user experiences.
                </p>
                <p className="body-regular text-gray-600">
                  My approach combines technical expertise with design sensibility, ensuring 
                  every project not only functions flawlessly but also captivates users. 
                  I believe in clean code, pixel-perfect implementation, and continuous learning.
                </p>
              </div>
            </div>

            {/* Values */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-black flex items-center justify-center">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="heading-3 mb-2">Clean Code</h3>
                  <p className="body-small text-gray-600">Maintainable, scalable solutions</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 bg-black flex items-center justify-center">
                  <Palette className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="heading-3 mb-2">Design Focus</h3>
                  <p className="body-small text-gray-600">Pixel-perfect implementations</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 bg-black flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="heading-3 mb-2">Performance</h3>
                  <p className="body-small text-gray-600">Fast, optimized applications</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 bg-black flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="heading-3 mb-2">Collaboration</h3>
                  <p className="body-small text-gray-600">Clear communication always</p>
                </div>
              </div>
            </div>
          </div>

          {/* Skills & Image */}
          <div className="space-y-8">
            {/* Professional Image */}
            <div className="aspect-[4/5] bg-gray-200 overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-24 h-24 bg-gray-400 rounded-full mx-auto"></div>
                  <p className="text-gray-500 text-sm">About Photo</p>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-6">
              <h3 className="heading-2">Technical Skills</h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <span 
                    key={index}
                    className="px-4 py-2 bg-white border border-gray-200 text-sm text-gray-700 hover:border-black transition-colors duration-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;