// Shared constants between client and server

export const USER_ROLES = {
  STUDENT: 'student',
  COUNSELOR: 'counselor',
  ADMIN: 'admin',
  MODERATOR: 'moderator'
} as const

export const APPOINTMENT_TYPES = {
  INDIVIDUAL: 'individual',
  GROUP: 'group',
  EMERGENCY: 'emergency'
} as const

export const APPOINTMENT_STATUS = {
  SCHEDULED: 'scheduled',
  CONFIRMED: 'confirmed',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  NO_SHOW: 'no-show'
} as const

export const RESOURCE_TYPES = {
  ARTICLE: 'article',
  VIDEO: 'video',
  AUDIO: 'audio',
  WORKSHEET: 'worksheet',
  INFOGRAPHIC: 'infographic'
} as const

export const RESOURCE_DIFFICULTY = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced'
} as const

export const CRISIS_SEVERITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical'
} as const

export const SENTIMENT_TYPES = {
  POSITIVE: 'positive',
  NEGATIVE: 'negative',
  NEUTRAL: 'neutral'
} as const

export const URGENCY_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRISIS: 'crisis'
} as const

export const LANGUAGES = {
  ENGLISH: 'en',
  HINDI: 'hi',
  MALAYALAM: 'ml',
  TAMIL: 'ta',
  TELUGU: 'te',
  BENGALI: 'bn',
  GUJARATI: 'gu',
  KANNADA: 'kn',
  MARATHI: 'mr',
  PUNJABI: 'pa',
  URDU: 'ur'
} as const

export const TIMEZONES = {
  IST: 'Asia/Kolkata',
  UTC: 'UTC'
} as const

export const GENDER_OPTIONS = {
  MALE: 'male',
  FEMALE: 'female',
  OTHER: 'other',
  PREFER_NOT_TO_SAY: 'prefer-not-to-say'
} as const

export const INSTITUTION_TYPES = {
  SCHOOL: 'school',
  COLLEGE: 'college',
  UNIVERSITY: 'university'
} as const

export const FORUM_CATEGORIES = {
  STRESS_MANAGEMENT: 'stress-management',
  ANXIETY: 'anxiety',
  DEPRESSION: 'depression',
  RELATIONSHIPS: 'relationships',
  ACADEMIC_PRESSURE: 'academic-pressure',
  GENERAL_DISCUSSION: 'general-discussion',
  CRISIS_SUPPORT: 'crisis-support'
} as const

export const RESOURCE_CATEGORIES = {
  ANXIETY: 'anxiety',
  DEPRESSION: 'depression',
  STRESS_MANAGEMENT: 'stress-management',
  RELATIONSHIPS: 'relationships',
  SELF_HELP: 'self-help',
  CRISIS_SUPPORT: 'crisis-support',
  MINDFULNESS: 'mindfulness',
  SLEEP: 'sleep',
  NUTRITION: 'nutrition'
} as const

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    PROFILE: '/api/auth/profile',
    FORGOT_PASSWORD: '/api/auth/forgot-password',
    RESET_PASSWORD: '/api/auth/reset-password'
  },
  USERS: '/api/users',
  CHATBOT: '/api/chatbot',
  APPOINTMENTS: '/api/appointments',
  FORUMS: '/api/forums',
  RESOURCES: '/api/resources',
  ADMIN: '/api/admin',
  INSTITUTIONS: '/api/institutions'
} as const

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
} as const

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100
} as const

export const FILE_UPLOAD = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
  ALLOWED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.gif', '.pdf']
} as const

export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 8,
  NAME_MAX_LENGTH: 50,
  BIO_MAX_LENGTH: 500,
  PHONE_PATTERN: /^[0-9]{10}$/,
  EMAIL_PATTERN: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
} as const

export const RATE_LIMITS = {
  WINDOW_MS: 15 * 60 * 1000, // 15 minutes
  MAX_REQUESTS: 100,
  LOGIN_MAX_ATTEMPTS: 5,
  LOGIN_LOCKOUT_TIME: 15 * 60 * 1000 // 15 minutes
} as const

export const SESSION = {
  DEFAULT_EXPIRE: '7d',
  REFRESH_EXPIRE: '30d',
  VERIFICATION_EXPIRE: '24h',
  PASSWORD_RESET_EXPIRE: '10m'
} as const
