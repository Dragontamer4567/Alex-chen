# Backend Integration Contracts

## Overview
This document outlines the API contracts and integration plan to convert the frontend portfolio from mock data to a fully functional backend-powered application.

## Current Mock Data (frontend/src/mock/mockData.js)

### 1. Personal Information
```javascript
personalInfo = {
  name, title, email, phone, location, social: { github, linkedin, twitter }
}
```

### 2. Services (3 items)
```javascript
services = [
  { id, title, description, features[] }
]
```

### 3. Projects (3 items)
```javascript
projects = [
  { id, title, description, image, technologies[], results[], liveUrl, githubUrl }
]
```

### 4. Testimonials (3 items)
```javascript
testimonials = [
  { id, name, position, company, content, rating }
]
```

### 5. Skills Array
```javascript
skills = ["React", "TypeScript", "Next.js", ...]
```

### 6. Contact Form Submission
```javascript
submitContactForm(formData) -> { success, message }
```

## Backend API Endpoints to Implement

### 1. Personal Information
- `GET /api/profile` - Get personal information and skills
- `PUT /api/profile` - Update personal information (admin only)

### 2. Services Management
- `GET /api/services` - Get all services
- `POST /api/services` - Add new service (admin only)
- `PUT /api/services/:id` - Update service (admin only)
- `DELETE /api/services/:id` - Delete service (admin only)

### 3. Projects Portfolio
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Add new project (admin only)
- `PUT /api/projects/:id` - Update project (admin only)
- `DELETE /api/projects/:id` - Delete project (admin only)

### 4. Testimonials
- `GET /api/testimonials` - Get all testimonials
- `POST /api/testimonials` - Add new testimonial (admin only)
- `PUT /api/testimonials/:id` - Update testimonial (admin only)
- `DELETE /api/testimonials/:id` - Delete testimonial (admin only)

### 5. Contact Form
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contact submissions (admin only)

## MongoDB Models

### Profile Model
```javascript
{
  _id: ObjectId,
  name: String,
  title: String,
  email: String,
  phone: String,
  location: String,
  social: {
    github: String,
    linkedin: String,
    twitter: String
  },
  skills: [String],
  createdAt: Date,
  updatedAt: Date
}
```

### Service Model
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  features: [String],
  order: Number,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Project Model
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  image: String,
  technologies: [String],
  results: [String],
  liveUrl: String,
  githubUrl: String,
  order: Number,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Testimonial Model
```javascript
{
  _id: ObjectId,
  name: String,
  position: String,
  company: String,
  content: String,
  rating: Number,
  order: Number,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Contact Model
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  company: String,
  message: String,
  isRead: Boolean,
  createdAt: Date
}
```

## Frontend Integration Changes

### 1. API Service Layer
Create `frontend/src/services/api.js` with:
- HTTP client configuration using axios
- API endpoint functions for each resource
- Error handling and response formatting

### 2. Component Updates Required

**Portfolio.jsx**
- Remove mock data imports
- Add API calls in useEffect hooks
- Add loading states

**Contact.jsx**
- Replace mock submitContactForm with real API call
- Add proper error handling and success feedback

### 3. State Management
- Add loading states for each section
- Add error handling for failed API calls
- Maintain responsive design during loading

## Initial Data Seeding

The backend will include a seed script to populate initial data based on the current mock data:
- 1 profile record
- 3 services records  
- 3 projects records
- 3 testimonials records

## Error Handling Strategy

### Backend
- Consistent error response format: `{ success: false, message: string, error?: details }`
- Proper HTTP status codes
- Input validation with meaningful error messages

### Frontend
- Toast notifications for user feedback
- Graceful fallbacks for failed API calls
- Loading skeletons during data fetching

## Security Considerations

- CORS configuration for frontend domain
- Input validation and sanitization
- Rate limiting for contact form submissions
- Basic admin endpoints (future enhancement)

## Implementation Order

1. **Backend Models & APIs** - Create MongoDB models and basic CRUD endpoints
2. **Data Seeding** - Populate database with initial mock data
3. **Frontend API Integration** - Replace mock calls with real API calls
4. **Error Handling** - Add loading states and error boundaries
5. **Testing** - Verify all functionality works end-to-end