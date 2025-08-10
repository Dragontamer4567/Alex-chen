from fastapi import APIRouter, HTTPException, status
from typing import List
import logging
from models import (
    Profile, ProfileUpdate, Service, ServiceCreate, ServiceUpdate,
    Project, ProjectCreate, ProjectUpdate, Testimonial, TestimonialCreate, 
    TestimonialUpdate, Contact, ContactCreate, ContactUpdate, APIResponse
)
from database import (
    get_profile, upsert_profile, get_documents, get_document,
    create_document, update_document, delete_document
)

logger = logging.getLogger(__name__)
router = APIRouter()

# Profile Routes
@router.get("/profile", response_model=Profile)
async def get_profile_data():
    """Get profile information"""
    try:
        profile = await get_profile()
        if not profile:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Profile not found"
            )
        return profile
    except Exception as e:
        logger.error(f"Error fetching profile: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch profile"
        )

@router.put("/profile", response_model=Profile)
async def update_profile_data(profile_update: ProfileUpdate):
    """Update profile information"""
    try:
        # Get existing profile
        existing_profile = await get_profile()
        if not existing_profile:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Profile not found"
            )
        
        # Update only provided fields
        update_data = profile_update.dict(exclude_unset=True)
        updated_profile = await upsert_profile(update_data)
        
        return updated_profile
    except Exception as e:
        logger.error(f"Error updating profile: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update profile"
        )

# Services Routes
@router.get("/services", response_model=List[Service])
async def get_services():
    """Get all active services"""
    try:
        services = await get_documents(
            "services", 
            {"is_active": True},
            [("order", 1)]
        )
        return services
    except Exception as e:
        logger.error(f"Error fetching services: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch services"
        )

@router.post("/services", response_model=Service)
async def create_service(service: ServiceCreate):
    """Create a new service"""
    try:
        service_data = service.dict()
        created_service = await create_document("services", service_data)
        return created_service
    except Exception as e:
        logger.error(f"Error creating service: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create service"
        )

@router.put("/services/{service_id}", response_model=Service)
async def update_service(service_id: str, service_update: ServiceUpdate):
    """Update a service"""
    try:
        update_data = service_update.dict(exclude_unset=True)
        updated_service = await update_document("services", service_id, update_data)
        
        if not updated_service:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Service not found"
            )
        
        return updated_service
    except Exception as e:
        logger.error(f"Error updating service: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update service"
        )

@router.delete("/services/{service_id}", response_model=APIResponse)
async def delete_service(service_id: str):
    """Delete a service"""
    try:
        deleted = await delete_document("services", service_id)
        
        if not deleted:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Service not found"
            )
        
        return APIResponse(success=True, message="Service deleted successfully")
    except Exception as e:
        logger.error(f"Error deleting service: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to delete service"
        )

# Projects Routes
@router.get("/projects", response_model=List[Project])
async def get_projects():
    """Get all active projects"""
    try:
        projects = await get_documents(
            "projects",
            {"is_active": True},
            [("order", 1)]
        )
        return projects
    except Exception as e:
        logger.error(f"Error fetching projects: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch projects"
        )

@router.post("/projects", response_model=Project)
async def create_project(project: ProjectCreate):
    """Create a new project"""
    try:
        project_data = project.dict()
        created_project = await create_document("projects", project_data)
        return created_project
    except Exception as e:
        logger.error(f"Error creating project: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create project"
        )

@router.put("/projects/{project_id}", response_model=Project)
async def update_project(project_id: str, project_update: ProjectUpdate):
    """Update a project"""
    try:
        update_data = project_update.dict(exclude_unset=True)
        updated_project = await update_document("projects", project_id, update_data)
        
        if not updated_project:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Project not found"
            )
        
        return updated_project
    except Exception as e:
        logger.error(f"Error updating project: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update project"
        )

@router.delete("/projects/{project_id}", response_model=APIResponse)
async def delete_project(project_id: str):
    """Delete a project"""
    try:
        deleted = await delete_document("projects", project_id)
        
        if not deleted:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Project not found"
            )
        
        return APIResponse(success=True, message="Project deleted successfully")
    except Exception as e:
        logger.error(f"Error deleting project: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to delete project"
        )

# Testimonials Routes
@router.get("/testimonials", response_model=List[Testimonial])
async def get_testimonials():
    """Get all active testimonials"""
    try:
        testimonials = await get_documents(
            "testimonials",
            {"is_active": True},
            [("order", 1)]
        )
        return testimonials
    except Exception as e:
        logger.error(f"Error fetching testimonials: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch testimonials"
        )

@router.post("/testimonials", response_model=Testimonial)
async def create_testimonial(testimonial: TestimonialCreate):
    """Create a new testimonial"""
    try:
        testimonial_data = testimonial.dict()
        created_testimonial = await create_document("testimonials", testimonial_data)
        return created_testimonial
    except Exception as e:
        logger.error(f"Error creating testimonial: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create testimonial"
        )

@router.put("/testimonials/{testimonial_id}", response_model=Testimonial)
async def update_testimonial(testimonial_id: str, testimonial_update: TestimonialUpdate):
    """Update a testimonial"""
    try:
        update_data = testimonial_update.dict(exclude_unset=True)
        updated_testimonial = await update_document("testimonials", testimonial_id, update_data)
        
        if not updated_testimonial:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Testimonial not found"
            )
        
        return updated_testimonial
    except Exception as e:
        logger.error(f"Error updating testimonial: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update testimonial"
        )

@router.delete("/testimonials/{testimonial_id}", response_model=APIResponse)
async def delete_testimonial(testimonial_id: str):
    """Delete a testimonial"""
    try:
        deleted = await delete_document("testimonials", testimonial_id)
        
        if not deleted:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Testimonial not found"
            )
        
        return APIResponse(success=True, message="Testimonial deleted successfully")
    except Exception as e:
        logger.error(f"Error deleting testimonial: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to delete testimonial"
        )

# Contact Routes
@router.post("/contact", response_model=APIResponse)
async def submit_contact_form(contact: ContactCreate):
    """Submit contact form"""
    try:
        contact_data = contact.dict()
        created_contact = await create_document("contacts", contact_data)
        
        return APIResponse(
            success=True,
            message="Thank you for your message! I'll get back to you soon.",
            data={"contact_id": created_contact["id"]}
        )
    except Exception as e:
        logger.error(f"Error submitting contact form: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to submit contact form"
        )

@router.get("/contact", response_model=List[Contact])
async def get_contact_submissions():
    """Get all contact submissions (admin only)"""
    try:
        contacts = await get_documents(
            "contacts",
            sort_dict=[("created_at", -1)]
        )
        return contacts
    except Exception as e:
        logger.error(f"Error fetching contact submissions: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch contact submissions"
        )

@router.put("/contact/{contact_id}", response_model=Contact)
async def mark_contact_as_read(contact_id: str, contact_update: ContactUpdate):
    """Mark contact as read"""
    try:
        update_data = contact_update.dict(exclude_unset=True)
        updated_contact = await update_document("contacts", contact_id, update_data)
        
        if not updated_contact:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Contact not found"
            )
        
        return updated_contact
    except Exception as e:
        logger.error(f"Error updating contact: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update contact"
        )