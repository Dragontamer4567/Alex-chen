import React from 'react';
import { ArrowRight, Check } from 'lucide-react';

const Services = ({ services = [] }) => {
  const scrollToContact = () => {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  };

  if (!services.length) {
    return (
      <section id="services" className="section-padding">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <div className="text-center">
            <div className="loading-dots text-xl mb-4">Loading services...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="section-padding">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="hero-medium mb-6">
            Frontend Development Services
          </h2>
          <p className="body-large text-gray-600">
            I offer comprehensive frontend development services to help businesses 
            create exceptional digital experiences that engage users and drive results.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {services.map((service) => (
            <div key={service.id} className="service-card">
              <div className="p-8 space-y-6">
                <div className="space-y-4">
                  <h3 className="heading-2">{service.title}</h3>
                  <p className="body-regular text-gray-600">
                    {service.description}
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-3">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Check className="w-4 h-4 text-black flex-shrink-0" />
                      <span className="body-small text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={scrollToContact}
                  className="btn-icon group"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4 transition-transform duration-200" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gray-50 p-12">
          <h3 className="heading-1 mb-4">Ready to start your project?</h3>
          <p className="body-large text-gray-600 mb-8 max-w-2xl mx-auto">
            Let's discuss how I can help bring your vision to life with modern, 
            performant frontend solutions.
          </p>
          <button 
            onClick={scrollToContact}
            className="btn-primary"
          >
            Start a Conversation
            <ArrowRight className="ml-2 w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;