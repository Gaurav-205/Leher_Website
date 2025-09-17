import mongoose, { Document, Schema } from 'mongoose'

export interface IAvailability {
  dayOfWeek: number // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  startTime: string
  endTime: string
  isAvailable: boolean
}

export interface ICounselor extends Document {
  userId: mongoose.Types.ObjectId
  specialization: string[]
  experience: number
  languages: string[]
  availability: IAvailability[]
  rating: number
  totalSessions: number
  bio: string
  qualifications: string[]
  isAvailable: boolean
  consultationFee?: number
  currentSessionsToday: number
  createdAt: Date
  updatedAt: Date
}

const availabilitySchema = new Schema<IAvailability>({
  dayOfWeek: {
    type: Number,
    required: true,
    min: 0,
    max: 6
  },
  startTime: {
    type: String,
    required: true,
    match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
  },
  endTime: {
    type: String,
    required: true,
    match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
  },
  isAvailable: {
    type: Boolean,
    default: true
  }
})

const counselorSchema = new Schema<ICounselor>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  specialization: [{
    type: String,
    required: true
  }],
  experience: {
    type: Number,
    required: true,
    min: 0,
    max: 50
  },
  languages: [{
    type: String,
    required: true
  }],
  availability: [availabilitySchema],
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  totalSessions: {
    type: Number,
    default: 0,
    min: 0
  },
  bio: {
    type: String,
    required: true,
    maxlength: 1000
  },
  qualifications: [{
    type: String,
    required: true,
    maxlength: 200
  }],
  isAvailable: {
    type: Boolean,
    default: true
  },
  consultationFee: {
    type: Number,
    min: 0
  },
  currentSessionsToday: {
    type: Number,
    default: 0,
    min: 0
  }
}, {
  timestamps: true
})

// Indexes for better performance
counselorSchema.index({ userId: 1 })
counselorSchema.index({ specialization: 1 })
counselorSchema.index({ isAvailable: 1 })
counselorSchema.index({ rating: -1 })

export const Counselor = mongoose.model<ICounselor>('Counselor', counselorSchema)
