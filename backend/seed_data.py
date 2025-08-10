from database import get_database, create_document, upsert_profile
from models import Profile, Service, Project, Testimonial
from datetime import datetime
import asyncio
import logging

logger = logging.getLogger(__name__)

# Initial seed data based on mock data
PROFILE_DATA = {
    "id": "profile-1",
    "name": "Alex Chen",
    "title": "Frontend Developer",
    "email": "alex.chen@email.com",
    "phone": "+1 (555) 123-4567",
    "location": "San Francisco, CA",
    "social": {
        "github": "https://github.com/alexchen",
        "linkedin": "https://linkedin.com/in/alexchen",
        "twitter": "https://twitter.com/alexchen"
    },
    "skills": [
        "React", "TypeScript", "Next.js", "JavaScript", "HTML5", "CSS3",
        "Tailwind CSS", "Sass", "Redux", "Context API", "React Router",
        "Webpack", "Vite", "Jest", "React Testing Library", "Git", "Figma"
    ]
}

SERVICES_DATA = [
    {
        "id": "service-1",
        "title": "React Development",
        "description": "Building scalable, performant web applications using React, Next.js, and modern JavaScript frameworks.",
        "features": ["Custom React Components", "State Management", "Performance Optimization", "SEO Implementation"],
        "order": 1,
        "is_active": True
    },
    {
        "id": "service-2", 
        "title": "UI/UX Implementation",
        "description": "Translating designs into pixel-perfect, responsive user interfaces with attention to detail and accessibility.",
        "features": ["Responsive Design", "CSS3 & Animations", "Design Systems", "Cross-browser Compatibility"],
        "order": 2,
        "is_active": True
    },
    {
        "id": "service-3",
        "title": "Frontend Architecture",
        "description": "Establishing robust frontend architecture and development workflows for scalable web applications.",
        "features": ["Code Architecture", "Build Optimization", "Testing Setup", "CI/CD Integration"],
        "order": 3,
        "is_active": True
    }
]

PROJECTS_DATA = [
    {
        "id": "project-1",
        "title": "E-commerce Platform",
        "description": "A modern e-commerce platform built with React and Next.js, featuring real-time inventory, payment processing, and admin dashboard.",
        "image": "/api/placeholder/400/300",
        "technologies": ["React", "Next.js", "TypeScript", "Stripe API"],
        "results": ["40% increase in conversion rate", "50ms faster page load times", "99.9% uptime achieved"],
        "live_url": "#",
        "github_url": "#",
        "order": 1,
        "is_active": True
    },
    {
        "id": "project-2",
        "title": "SaaS Dashboard", 
        "description": "Comprehensive analytics dashboard for a B2B SaaS platform with real-time data visualization and user management.",
        "image": "/api/placeholder/400/300",
        "technologies": ["React", "D3.js", "Material-UI", "WebSocket"],
        "results": ["Reduced data loading time by 60%", "Improved user engagement by 35%", "Mobile-responsive design"],
        "live_url": "#",
        "github_url": "#",
        "order": 2,
        "is_active": True
    },
    {
        "id": "project-3",
        "title": "Portfolio Website",
        "description": "A minimalist portfolio website for a creative agency, showcasing their work with smooth animations and perfect typography.",
        "image": "/api/placeholder/400/300", 
        "technologies": ["React", "Framer Motion", "Tailwind CSS", "Headless CMS"],
        "results": ["Improved bounce rate by 45%", "Increased client inquiries by 30%", "Perfect Lighthouse scores"],
        "live_url": "#",
        "github_url": "#",
        "order": 3,
        "is_active": True
    }
]

TESTIMONIALS_DATA = [
    {
        "id": "testimonial-1",
        "name": "Sarah Johnson",
        "position": "Product Manager",
        "company": "TechCorp Inc.",
        "content": "Alex delivered an exceptional frontend solution that exceeded our expectations. The attention to detail and performance optimization was outstanding.",
        "rating": 5,
        "order": 1,
        "is_active": True
    },
    {
        "id": "testimonial-2",
        "name": "Michael Rodriguez", 
        "position": "CTO",
        "company": "StartupXYZ",
        "content": "Working with Alex was a game-changer for our platform. His expertise in React and modern frontend technologies helped us scale efficiently.",
        "rating": 5,
        "order": 2,
        "is_active": True
    },
    {
        "id": "testimonial-3",
        "name": "Emily Watson",
        "position": "Design Director", 
        "company": "Creative Studio",
        "content": "Alex perfectly translated our designs into code. The final product was pixel-perfect and performed beautifully across all devices.",
        "rating": 5,
        "order": 3,
        "is_active": True
    }
]

async def seed_database():
    """Seed the database with initial data"""
    try:
        logger.info("Starting database seeding...")
        
        # Seed Profile
        logger.info("Seeding profile data...")
        profile_data = PROFILE_DATA.copy()
        profile_data["created_at"] = datetime.utcnow()
        profile_data["updated_at"] = datetime.utcnow()
        await upsert_profile(profile_data)
        logger.info("Profile data seeded successfully")
        
        # Seed Services
        logger.info("Seeding services data...")
        for service_data in SERVICES_DATA:
            service_data = service_data.copy()
            service_data["created_at"] = datetime.utcnow()
            service_data["updated_at"] = datetime.utcnow()
            await create_document("services", service_data)
        logger.info(f"Seeded {len(SERVICES_DATA)} services")
        
        # Seed Projects
        logger.info("Seeding projects data...")
        for project_data in PROJECTS_DATA:
            project_data = project_data.copy() 
            project_data["created_at"] = datetime.utcnow()
            project_data["updated_at"] = datetime.utcnow()
            await create_document("projects", project_data)
        logger.info(f"Seeded {len(PROJECTS_DATA)} projects")
        
        # Seed Testimonials
        logger.info("Seeding testimonials data...")
        for testimonial_data in TESTIMONIALS_DATA:
            testimonial_data = testimonial_data.copy()
            testimonial_data["created_at"] = datetime.utcnow()
            testimonial_data["updated_at"] = datetime.utcnow() 
            await create_document("testimonials", testimonial_data)
        logger.info(f"Seeded {len(TESTIMONIALS_DATA)} testimonials")
        
        logger.info("Database seeding completed successfully!")
        
    except Exception as e:
        logger.error(f"Error seeding database: {e}")
        raise

async def check_and_seed():
    """Check if data exists and seed if needed"""
    try:
        from database import get_profile, get_documents
        
        # Check if profile exists
        profile = await get_profile()
        if not profile:
            logger.info("No existing data found, seeding database...")
            await seed_database()
        else:
            logger.info("Database already contains data, skipping seed")
            
    except Exception as e:
        logger.error(f"Error checking/seeding database: {e}")
        raise

if __name__ == "__main__":
    # Run seeding directly
    import os
    from dotenv import load_dotenv
    
    load_dotenv()
    asyncio.run(seed_database())