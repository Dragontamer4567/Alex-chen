import React from 'react';
import { testimonials } from '../mock/mockData';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  return (
    <section id="testimonials" className="section-padding">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="hero-medium mb-6">
            Client Testimonials
          </h2>
          <p className="body-large text-gray-600">
            Here's what clients say about working with me and the results we've achieved together.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="p-8 space-y-6 h-full flex flex-col">
                {/* Quote Icon */}
                <div className="flex-shrink-0">
                  <Quote className="w-8 h-8 text-gray-300" />
                </div>

                {/* Content */}
                <div className="flex-grow space-y-4">
                  <p className="body-regular text-gray-700 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-1 flex-shrink-0">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-black text-black" />
                  ))}
                </div>

                {/* Author */}
                <div className="flex-shrink-0 pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-4">
                    {/* Avatar placeholder */}
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0"></div>
                    <div>
                      <h4 className="heading-3">{testimonial.name}</h4>
                      <p className="body-small text-gray-600">
                        {testimonial.position} at {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-16 border-t border-gray-200">
          <div className="text-center">
            <div className="text-3xl font-light text-black mb-2">50+</div>
            <div className="text-sm text-gray-600">Projects Completed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-light text-black mb-2">5+</div>
            <div className="text-sm text-gray-600">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-light text-black mb-2">95%</div>
            <div className="text-sm text-gray-600">Client Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-light text-black mb-2">24h</div>
            <div className="text-sm text-gray-600">Response Time</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;