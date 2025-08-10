import React, { useState } from 'react';
import { personalInfo, submitContactForm } from '../mock/mockData';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await submitContactForm(formData);
      
      if (response.success) {
        toast({
          title: "Message sent!",
          description: response.message,
        });
        setFormData({ name: '', email: '', company: '', message: '' });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding bg-gray-50">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="hero-medium mb-6">
            Let's Work Together
          </h2>
          <p className="body-large text-gray-600">
            Ready to bring your project to life? I'd love to hear about your ideas 
            and discuss how we can create something exceptional together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="heading-1">Get In Touch</h3>
              <p className="body-regular text-gray-600">
                I'm always interested in new opportunities and exciting projects. 
                Whether you need a complete frontend solution or want to discuss 
                a specific challenge, let's start a conversation.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-black flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="heading-3">Email</h4>
                  <a href={`mailto:${personalInfo.email}`} className="body-regular text-gray-600 hover:text-black transition-colors duration-200">
                    {personalInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-black flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="heading-3">Phone</h4>
                  <a href={`tel:${personalInfo.phone}`} className="body-regular text-gray-600 hover:text-black transition-colors duration-200">
                    {personalInfo.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-black flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="heading-3">Location</h4>
                  <span className="body-regular text-gray-600">{personalInfo.location}</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h4 className="heading-3">Connect With Me</h4>
              <div className="flex space-x-4">
                <a href={personalInfo.social.github} className="social-link" aria-label="GitHub">
                  <Github className="w-5 h-5" />
                </a>
                <a href={personalInfo.social.linkedin} className="social-link" aria-label="LinkedIn">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href={personalInfo.social.twitter} className="social-link" aria-label="Twitter">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-white p-6 border border-gray-200">
              <h4 className="heading-3 mb-2">Quick Response</h4>
              <p className="body-small text-gray-600">
                I typically respond to all inquiries within 24 hours. 
                For urgent projects, feel free to call directly.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 border border-gray-200">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="heading-3">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="contact-input"
                    placeholder="Your full name"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="heading-3">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="contact-input"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="company" className="heading-3">Company</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="contact-input"
                  placeholder="Your company name (optional)"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="heading-3">Project Details *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="contact-input resize-none"
                  placeholder="Tell me about your project, timeline, and any specific requirements..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
                <Send className="ml-2 w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;