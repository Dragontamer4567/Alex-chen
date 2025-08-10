import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_BASE = `${BACKEND_URL}/api`;

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.data || error.message);
    
    // Handle common errors
    if (error.response?.status === 404) {
      throw new Error('Resource not found');
    } else if (error.response?.status === 500) {
      throw new Error('Server error occurred');
    } else if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout');
    } else if (!error.response) {
      throw new Error('Network error - please check your connection');
    }
    
    throw error;
  }
);

// API Service Functions
export const portfolioAPI = {
  // Profile API
  getProfile: async () => {
    try {
      const response = await apiClient.get('/profile');
      return response.data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
  },

  updateProfile: async (profileData) => {
    try {
      const response = await apiClient.put('/profile', profileData);
      return response.data;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  },

  // Services API
  getServices: async () => {
    try {
      const response = await apiClient.get('/services');
      return response.data;
    } catch (error) {
      console.error('Error fetching services:', error);
      throw error;
    }
  },

  createService: async (serviceData) => {
    try {
      const response = await apiClient.post('/services', serviceData);
      return response.data;
    } catch (error) {
      console.error('Error creating service:', error);
      throw error;
    }
  },

  updateService: async (serviceId, serviceData) => {
    try {
      const response = await apiClient.put(`/services/${serviceId}`, serviceData);
      return response.data;
    } catch (error) {
      console.error('Error updating service:', error);
      throw error;
    }
  },

  deleteService: async (serviceId) => {
    try {
      const response = await apiClient.delete(`/services/${serviceId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting service:', error);
      throw error;
    }
  },

  // Projects API
  getProjects: async () => {
    try {
      const response = await apiClient.get('/projects');
      return response.data;
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  },

  createProject: async (projectData) => {
    try {
      const response = await apiClient.post('/projects', projectData);
      return response.data;
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  },

  updateProject: async (projectId, projectData) => {
    try {
      const response = await apiClient.put(`/projects/${projectId}`, projectData);
      return response.data;
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  },

  deleteProject: async (projectId) => {
    try {
      const response = await apiClient.delete(`/projects/${projectId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  },

  // Testimonials API
  getTestimonials: async () => {
    try {
      const response = await apiClient.get('/testimonials');
      return response.data;
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      throw error;
    }
  },

  createTestimonial: async (testimonialData) => {
    try {
      const response = await apiClient.post('/testimonials', testimonialData);
      return response.data;
    } catch (error) {
      console.error('Error creating testimonial:', error);
      throw error;
    }
  },

  updateTestimonial: async (testimonialId, testimonialData) => {
    try {
      const response = await apiClient.put(`/testimonials/${testimonialId}`, testimonialData);
      return response.data;
    } catch (error) {
      console.error('Error updating testimonial:', error);
      throw error;
    }
  },

  deleteTestimonial: async (testimonialId) => {
    try {
      const response = await apiClient.delete(`/testimonials/${testimonialId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      throw error;
    }
  },

  // Contact API
  submitContactForm: async (contactData) => {
    try {
      const response = await apiClient.post('/contact', contactData);
      return response.data;
    } catch (error) {
      console.error('Error submitting contact form:', error);
      throw error;
    }
  },

  getContactSubmissions: async () => {
    try {
      const response = await apiClient.get('/contact');
      return response.data;
    } catch (error) {
      console.error('Error fetching contact submissions:', error);
      throw error;
    }
  },

  markContactAsRead: async (contactId) => {
    try {
      const response = await apiClient.put(`/contact/${contactId}`, { is_read: true });
      return response.data;
    } catch (error) {
      console.error('Error marking contact as read:', error);
      throw error;
    }
  },

  // Health check
  healthCheck: async () => {
    try {
      const response = await apiClient.get('/health');
      return response.data;
    } catch (error) {
      console.error('Health check failed:', error);
      throw error;
    }
  }
};

export default portfolioAPI;