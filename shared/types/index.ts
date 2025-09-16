// Shared types between client and server

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
  errors?: Record<string, string[]>
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

export interface User {
  _id: string
  email: string
  firstName: string
  lastName: string
  role: 'student' | 'counselor' | 'admin' | 'moderator'
  institution?: Institution
  profile?: UserProfile
  isVerified: boolean
  createdAt: string
  updatedAt: string
}

export interface UserProfile {
  dateOfBirth?: string
  gender?: 'male' | 'female' | 'other' | 'prefer-not-to-say'
  phoneNumber?: string
  emergencyContact?: EmergencyContact
  preferredLanguage: string
  timezone: string
  avatar?: string
  bio?: string
  interests?: string[]
  mentalHealthHistory?: MentalHealthHistory
}

export interface EmergencyContact {
  name: string
  relationship: string
  phoneNumber: string
  email?: string
}

export interface MentalHealthHistory {
  hasHistory: boolean
  currentTreatment?: string
  medications?: string[]
  previousCounseling?: boolean
  crisisHistory?: boolean
}

export interface Institution {
  _id: string
  name: string
  type: 'school' | 'college' | 'university'
  location: {
    state: string
    city: string
    address: string
  }
  contact: {
    email: string
    phone: string
    website?: string
  }
  isActive: boolean
}

export interface ChatMessage {
  _id: string
  userId: string
  message: string
  isFromUser: boolean
  timestamp: string
  sessionId: string
  metadata?: {
    sentiment?: 'positive' | 'negative' | 'neutral'
    urgency?: 'low' | 'medium' | 'high' | 'crisis'
    category?: string
  }
}

export interface Appointment {
  _id: string
  studentId: string
  counselorId: string
  date: string
  time: string
  duration: number
  type: 'individual' | 'group' | 'emergency'
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no-show'
  notes?: string
  meetingLink?: string
  location?: string
  createdAt: string
  updatedAt: string
}

export interface ForumPost {
  _id: string
  authorId: string
  author: User
  title: string
  content: string
  category: ForumCategory
  tags: string[]
  isAnonymous: boolean
  likes: number
  replies: ForumReply[]
  isPinned: boolean
  isLocked: boolean
  createdAt: string
  updatedAt: string
}

export interface ForumReply {
  _id: string
  postId: string
  authorId: string
  author: User
  content: string
  isAnonymous: boolean
  likes: number
  parentReplyId?: string
  replies: ForumReply[]
  createdAt: string
  updatedAt: string
}

export interface ForumCategory {
  _id: string
  name: string
  description: string
  color: string
  icon: string
  isActive: boolean
}

export interface Resource {
  _id: string
  title: string
  description: string
  content: string
  type: 'article' | 'video' | 'audio' | 'worksheet' | 'infographic'
  category: ResourceCategory
  language: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  duration?: number
  tags: string[]
  author: string
  isPublished: boolean
  views: number
  likes: number
  fileUrl?: string
  thumbnailUrl?: string
  createdAt: string
  updatedAt: string
}

export interface ResourceCategory {
  _id: string
  name: string
  description: string
  icon: string
  color: string
  isActive: boolean
}

export interface Analytics {
  totalUsers: number
  activeUsers: number
  totalSessions: number
  crisisInterventions: number
  appointmentBookings: number
  forumPosts: number
  resourceViews: number
  userEngagement: {
    daily: number[]
    weekly: number[]
    monthly: number[]
  }
  popularResources: Resource[]
  commonIssues: {
    issue: string
    count: number
  }[]
  demographics: {
    ageGroups: { range: string; count: number }[]
    institutions: { name: string; count: number }[]
    languages: { language: string; count: number }[]
  }
}

export interface CrisisAlert {
  _id: string
  userId: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  trigger: string
  message: string
  location?: {
    latitude: number
    longitude: number
  }
  isResolved: boolean
  assignedCounselor?: string
  response?: string
  createdAt: string
  resolvedAt?: string
}
