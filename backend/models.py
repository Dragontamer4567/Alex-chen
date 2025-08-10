from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional, Dict
from datetime import datetime
import uuid

# Profile Models
class ProfileSocial(BaseModel):
    github: str
    linkedin: str
    twitter: str

class Profile(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    title: str
    email: EmailStr
    phone: str
    location: str
    social: ProfileSocial
    skills: List[str]
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class ProfileUpdate(BaseModel):
    name: Optional[str] = None
    title: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    location: Optional[str] = None
    social: Optional[ProfileSocial] = None
    skills: Optional[List[str]] = None

# Service Models
class Service(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    features: List[str]
    order: int = 0
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class ServiceCreate(BaseModel):
    title: str
    description: str
    features: List[str]
    order: int = 0
    is_active: bool = True

class ServiceUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    features: Optional[List[str]] = None
    order: Optional[int] = None
    is_active: Optional[bool] = None

# Project Models
class Project(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    image: str
    technologies: List[str]
    results: List[str]
    live_url: str
    github_url: str
    order: int = 0
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class ProjectCreate(BaseModel):
    title: str
    description: str
    image: str
    technologies: List[str]
    results: List[str]
    live_url: str
    github_url: str
    order: int = 0
    is_active: bool = True

class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    image: Optional[str] = None
    technologies: Optional[List[str]] = None
    results: Optional[List[str]] = None
    live_url: Optional[str] = None
    github_url: Optional[str] = None
    order: Optional[int] = None
    is_active: Optional[bool] = None

# Testimonial Models
class Testimonial(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    position: str
    company: str
    content: str
    rating: int = Field(ge=1, le=5)
    order: int = 0
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class TestimonialCreate(BaseModel):
    name: str
    position: str
    company: str
    content: str
    rating: int = Field(ge=1, le=5)
    order: int = 0
    is_active: bool = True

class TestimonialUpdate(BaseModel):
    name: Optional[str] = None
    position: Optional[str] = None
    company: Optional[str] = None
    content: Optional[str] = None
    rating: Optional[int] = Field(None, ge=1, le=5)
    order: Optional[int] = None
    is_active: Optional[bool] = None

# Contact Models
class Contact(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    company: Optional[str] = None
    message: str
    is_read: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)

class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    company: Optional[str] = None
    message: str

class ContactUpdate(BaseModel):
    is_read: bool

# Response Models
class APIResponse(BaseModel):
    success: bool
    message: str
    data: Optional[Dict] = None

class ErrorResponse(BaseModel):
    success: bool = False
    message: str
    error: Optional[str] = None