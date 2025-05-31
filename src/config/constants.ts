export const APP_NAME = 'DreamNest'

// Theme Colors
export const COLORS = {
  primary: '#5EEAD4',
  secondary: '#FF6EC7',
  background: {
    start: '#001F54',
    end: '#6A0572'
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#5EEAD4',
    muted: 'rgba(255, 255, 255, 0.8)'
  },
  input: {
    background: '#FFFFFF',
    text: '#000000',
    placeholder: '#6B7280',
    border: '#D1D5DB'
  }
}

// Animation Durations
export const ANIMATION = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  pageTransition: 1
}

// Validation Rules
export const VALIDATION = {
  username: {
    minLength: 3,
    maxLength: 30,
    pattern: /^[a-zA-Z0-9_]+$/
  },
  password: {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumber: true,
    requireSpecial: true
  }
}

// API Endpoints
export const API_ENDPOINTS = {
  auth: {
    login: '/api/auth/login',
    register: '/api/auth/register',
    logout: '/api/auth/logout'
  },
  dreams: {
    list: '/api/dreams',
    create: '/api/dreams',
    delete: (id: string) => `/api/dreams/${id}`
  }
}

// Routes
export const ROUTES = {
  home: '/',
  login: '/login',
  register: '/register',
  dreams: '/dreams'
}

// Local Storage Keys
export const STORAGE_KEYS = {
  user: 'user',
  theme: 'theme',
  token: 'token'
}

// Error Messages
export const ERROR_MESSAGES = {
  auth: {
    invalidCredentials: 'Invalid email/username or password',
    userNotFound: 'User not found',
    userExists: 'User already exists',
    weakPassword: 'Password does not meet requirements',
    invalidEmail: 'Please enter a valid email address'
  },
  dreams: {
    createFailed: 'Failed to create dream',
    deleteFailed: 'Failed to delete dream',
    loadFailed: 'Failed to load dreams'
  }
} 