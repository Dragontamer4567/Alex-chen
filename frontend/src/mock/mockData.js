// Mock data for the portfolio website
export const personalInfo = {
  name: "Alex Chen",
  title: "Frontend Developer",
  email: "alex.chen@email.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  social: {
    github: "https://github.com/alexchen",
    linkedin: "https://linkedin.com/in/alexchen",
    twitter: "https://twitter.com/alexchen"
  }
};

export const services = [
  {
    id: 1,
    title: "React Development",
    description: "Building scalable, performant web applications using React, Next.js, and modern JavaScript frameworks.",
    features: ["Custom React Components", "State Management", "Performance Optimization", "SEO Implementation"]
  },
  {
    id: 2,
    title: "UI/UX Implementation",
    description: "Translating designs into pixel-perfect, responsive user interfaces with attention to detail and accessibility.",
    features: ["Responsive Design", "CSS3 & Animations", "Design Systems", "Cross-browser Compatibility"]
  },
  {
    id: 3,
    title: "Frontend Architecture",
    description: "Establishing robust frontend architecture and development workflows for scalable web applications.",
    features: ["Code Architecture", "Build Optimization", "Testing Setup", "CI/CD Integration"]
  }
];

export const projects = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "A modern e-commerce platform built with React and Next.js, featuring real-time inventory, payment processing, and admin dashboard.",
    image: "/api/placeholder/400/300",
    technologies: ["React", "Next.js", "TypeScript", "Stripe API"],
    results: ["40% increase in conversion rate", "50ms faster page load times", "99.9% uptime achieved"],
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    id: 2,
    title: "SaaS Dashboard",
    description: "Comprehensive analytics dashboard for a B2B SaaS platform with real-time data visualization and user management.",
    image: "/api/placeholder/400/300",
    technologies: ["React", "D3.js", "Material-UI", "WebSocket"],
    results: ["Reduced data loading time by 60%", "Improved user engagement by 35%", "Mobile-responsive design"],
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    id: 3,
    title: "Portfolio Website",
    description: "A minimalist portfolio website for a creative agency, showcasing their work with smooth animations and perfect typography.",
    image: "/api/placeholder/400/300",
    technologies: ["React", "Framer Motion", "Tailwind CSS", "Headless CMS"],
    results: ["Improved bounce rate by 45%", "Increased client inquiries by 30%", "Perfect Lighthouse scores"],
    liveUrl: "#",
    githubUrl: "#"
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "Product Manager",
    company: "TechCorp Inc.",
    content: "Alex delivered an exceptional frontend solution that exceeded our expectations. The attention to detail and performance optimization was outstanding.",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    position: "CTO",
    company: "StartupXYZ",
    content: "Working with Alex was a game-changer for our platform. His expertise in React and modern frontend technologies helped us scale efficiently.",
    rating: 5
  },
  {
    id: 3,
    name: "Emily Watson",
    position: "Design Director",
    company: "Creative Studio",
    content: "Alex perfectly translated our designs into code. The final product was pixel-perfect and performed beautifully across all devices.",
    rating: 5
  }
];

export const skills = [
  "React", "TypeScript", "Next.js", "JavaScript", "HTML5", "CSS3", 
  "Tailwind CSS", "Sass", "Redux", "Context API", "React Router",
  "Webpack", "Vite", "Jest", "React Testing Library", "Git", "Figma"
];

// Mock form submission
export const submitContactForm = async (formData) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Form submitted:', formData);
      resolve({ success: true, message: 'Thank you for your message! I\'ll get back to you soon.' });
    }, 1000);
  });
};