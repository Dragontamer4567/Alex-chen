import React from 'react';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';

const Projects = ({ projects = [] }) => {
  if (!projects.length) {
    return (
      <section id="projects" className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <div className="text-center">
            <div className="loading-dots text-xl mb-4">Loading projects...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="section-padding bg-gray-50">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="hero-medium mb-6">
            Selected Work
          </h2>
          <p className="body-large text-gray-600">
            A showcase of recent projects demonstrating my expertise in 
            frontend development, from concept to deployment.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="space-y-16">
          {projects.map((project, index) => (
            <div key={project.id} className="project-showcase">
              <div className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}>
                {/* Project Image */}
                <div className={`relative ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="aspect-[4/3] bg-gray-200 overflow-hidden hover-lift">
                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center">
                      <div className="text-center space-y-4">
                        <div className="w-16 h-16 bg-gray-400 mx-auto"></div>
                        <p className="text-gray-500 text-sm">Project Screenshot</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Project Links Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-80 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                    <div className="flex space-x-4">
                      <a href={project.live_url || project.liveUrl} className="text-white hover:text-gray-300 p-3 bg-white/20 backdrop-blur-sm" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-6 h-6" />
                      </a>
                      <a href={project.github_url || project.githubUrl} className="text-white hover:text-gray-300 p-3 bg-white/20 backdrop-blur-sm" target="_blank" rel="noopener noreferrer">
                        <Github className="w-6 h-6" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Project Content */}
                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <div className="space-y-4">
                    <h3 className="heading-1">{project.title}</h3>
                    <p className="body-large text-gray-600">
                      {project.description}
                    </p>
                  </div>

                  {/* Technologies */}
                  <div className="space-y-3">
                    <h4 className="heading-3">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="px-3 py-1 bg-black text-white text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Results */}
                  <div className="space-y-3">
                    <h4 className="heading-3">Key Results</h4>
                    <ul className="space-y-2">
                      {project.results.map((result, resultIndex) => (
                        <li key={resultIndex} className="flex items-start space-x-2">
                          <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0 text-black" />
                          <span className="body-regular text-gray-600">{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Project Links */}
                  <div className="flex space-x-4 pt-4">
                    <a href={project.live_url || project.liveUrl} className="btn-secondary" target="_blank" rel="noopener noreferrer">
                      View Live Site
                      <ExternalLink className="ml-2 w-4 h-4" />
                    </a>
                    <a href={project.github_url || project.githubUrl} className="btn-icon" target="_blank" rel="noopener noreferrer">
                      View Code
                      <Github className="ml-2 w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* More Projects CTA */}
        <div className="text-center pt-16">
          <p className="body-large text-gray-600 mb-6">
            Interested in seeing more of my work?
          </p>
          <a href="#" className="btn-primary">
            View All Projects
            <ArrowRight className="ml-2 w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;