import React, { useState, useEffect } from 'react';
import Header from './Header';
import Hero from './Hero';
import About from './About';
import Services from './Services';
import Projects from './Projects';
import Testimonials from './Testimonials';
import Contact from './Contact';
import Footer from './Footer';
import { portfolioAPI } from '../services/api';

const Portfolio = () => {
  const [portfolioData, setPortfolioData] = useState({
    profile: null,
    services: [],
    projects: [],
    testimonials: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadPortfolioData();
  }, []);

  const loadPortfolioData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Load all portfolio data concurrently
      const [profile, services, projects, testimonials] = await Promise.all([
        portfolioAPI.getProfile(),
        portfolioAPI.getServices(),
        portfolioAPI.getProjects(),
        portfolioAPI.getTestimonials()
      ]);

      setPortfolioData({
        profile,
        services,
        projects,
        testimonials
      });

    } catch (err) {
      console.error('Error loading portfolio data:', err);
      setError('Failed to load portfolio data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="loading-dots text-2xl">Loading...</div>
          <p className="text-gray-600">Fetching portfolio data</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md">
          <div className="text-red-600 text-2xl">⚠️ Error</div>
          <p className="text-gray-700">{error}</p>
          <button 
            onClick={loadPortfolioData}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header profile={portfolioData.profile} />
      <main>
        <Hero profile={portfolioData.profile} />
        <About profile={portfolioData.profile} />
        <Services services={portfolioData.services} />
        <Projects projects={portfolioData.projects} />
        <Testimonials testimonials={portfolioData.testimonials} />
        <Contact profile={portfolioData.profile} />
      </main>
      <Footer profile={portfolioData.profile} />
    </div>
  );
};

export default Portfolio;