import mongoose, { Document, Schema } from 'mongoose'

export interface IAvailability {
  dayOfWeek: number // 0-6 (Sunday-Saturday)
  startTime: string
  endTime: string
  isAvailable: boolean
}

export interface ICounselor extends Document {
  userId: mongoose.Types.ObjectId
  specialization: string[]
  experience: number // in years
  languages: string[]
  availability: IAvailability[]
  rating: number
  totalSessions: number
  bio: string
  qualifications: string[]
  isAvailable: boolean
  consultationFee?: number
  maxSessionsPerDay: number
  currentSessionsToday: number
  createdAt: Date
  updatedAt: Date
}

const AvailabilitySchema = new Schema<IAvailability>({
  dayOfWeek: {
    type: Number,
    required: true,
    min: 0,
    max: 6
  },
  startTime: {
    type: String,
    required: true,
    match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please provide a valid start time format (HH:MM)']
  },
  endTime: {
    type: String,
    required: true,
    match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please provide a valid end time format (HH:MM)']
  },
  isAvailable: {
    type: Boolean,
    default: true
  }
})

const CounselorSchema = new Schema<ICounselor>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  specialization: [{
    type: String,
    required: true,
    enum: [
      'anxiety',
      'depression',
      'stress-management',
      'academic-pressure',
      'relationship-issues',
      'career-guidance',
      'addiction',
      'trauma',
      'grief-counseling',
      'family-therapy',
      'group-therapy',
      'crisis-intervention',
      'mindfulness',
      'cognitive-behavioral-therapy',
      'other'
    ]
  }],
  experience: {
    type: Number,
    required: [true, 'Experience is required'],
    min: [0, 'Experience cannot be negative'],
    max: [50, 'Experience cannot exceed 50 years']
  },
  languages: [{
    type: String,
    required: true,
    enum: ['en', 'hi', 'ta', 'te', 'bn', 'mr', 'gu', 'kn', 'ml', 'pa', 'or', 'as', 'ne', 'ur', 'other']
  }],
  availability: [AvailabilitySchema],
  rating: {
    type: Number,
    default: 0,
    min: [0, 'Rating cannot be negative'],
    max: [5, 'Rating cannot exceed 5']
  },
  totalSessions: {
    type: Number,
    default: 0,
    min: [0, 'Total sessions cannot be negative']
  },
  bio: {
    type: String,
    required: [true, 'Bio is required'],
    maxlength: [1000, 'Bio cannot exceed 1000 characters']
  },
  qualifications: [{
    type: String,
    required: true,
    maxlength: [200, 'Qualification cannot exceed 200 characters']
  }],
  isAvailable: {
    type: Boolean,
    default: true
  },
  consultationFee: {
    type: Number,
    min: [0, 'Consultation fee cannot be negative']
  },
  maxSessionsPerDay: {
    type: Number,
    default: 8,
    min: [1, 'Maximum sessions per day must be at least 1'],
    max: [12, 'Maximum sessions per day cannot exceed 12']
  },
  currentSessionsToday: {
    type: Number,
    default: 0,
    min: [0, 'Current sessions today cannot be negative']
  }
}, {
  timestamps: true
})

// Indexes for efficient querying
CounselorSchema.index({ userId: 1 }, { unique: true })
CounselorSchema.index({ specialization: 1 })
CounselorSchema.index({ languages: 1 })
CounselorSchema.index({ isAvailable: 1 })
CounselorSchema.index({ rating: -1 })

// Virtual for checking if counselor is available today
CounselorSchema.virtual('isAvailableToday').get(function() {
  if (!this.isAvailable) return false
  
  const today = new Date().getDay()
  const todayAvailability = this.availability.find(avail => avail.dayOfWeek === today)
  
  if (!todayAvailability || !todayAvailability.isAvailable) return false
  
  // Check if counselor hasn't exceeded daily session limit
  return this.currentSessionsToday < this.maxSessionsPerDay
})

// Virtual for getting next available slot
CounselorSchema.virtual('nextAvailableSlot').get(function() {
  if (!this.isAvailable) return null
  
  const today = new Date()
  const todayAvailability = this.availability.find(avail => avail.dayOfWeek === today.getDay())
  
  if (!todayAvailability || !todayAvailability.isAvailable) return null
  
  const currentTime = today.toTimeString().slice(0, 5)
  if (currentTime < todayAvailability.startTime) {
    return `${today.toISOString().split('T')[0]}T${todayAvailability.startTime}`
  }
  
  return null
})

// Ensure virtual fields are serialized
CounselorSchema.set('toJSON', { virtuals: true })
CounselorSchema.set('toObject', { virtuals: true })

export const Counselor = mongoose.model<ICounselor>('Counselor', CounselorSchema)
