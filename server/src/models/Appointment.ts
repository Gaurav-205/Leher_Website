import mongoose, { Document, Schema } from 'mongoose'

export interface IAppointment extends Document {
  studentId: mongoose.Types.ObjectId
  counselorId: mongoose.Types.ObjectId
  date: Date
  time: string
  duration: number
  type: 'individual' | 'group' | 'emergency'
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no-show'
  notes?: string
  meetingLink?: string
  location?: string
  studentNotes?: string
  counselorNotes?: string
  rating?: number
  feedback?: string
  createdAt: Date
  updatedAt: Date
}

const appointmentSchema = new Schema<IAppointment>({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  counselorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true,
    match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
  },
  duration: {
    type: Number,
    required: true,
    min: 15,
    max: 180,
    default: 60
  },
  type: {
    type: String,
    enum: ['individual', 'group', 'emergency'],
    default: 'individual'
  },
  status: {
    type: String,
    enum: ['scheduled', 'confirmed', 'completed', 'cancelled', 'no-show'],
    default: 'scheduled'
  },
  notes: {
    type: String,
    maxlength: 1000
  },
  meetingLink: {
    type: String
  },
  location: {
    type: String,
    maxlength: 200
  },
  studentNotes: {
    type: String,
    maxlength: 500
  },
  counselorNotes: {
    type: String,
    maxlength: 1000
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  feedback: {
    type: String,
    maxlength: 1000
  }
}, {
  timestamps: true
})

// Indexes for better performance
appointmentSchema.index({ studentId: 1, date: 1 })
appointmentSchema.index({ counselorId: 1, date: 1 })
appointmentSchema.index({ date: 1, time: 1 })
appointmentSchema.index({ status: 1 })

// Prevent double booking
appointmentSchema.index(
  { counselorId: 1, date: 1, time: 1 },
  { 
    unique: true,
    partialFilterExpression: { 
      status: { $in: ['scheduled', 'confirmed'] } 
    }
  }
)

export const Appointment = mongoose.model<IAppointment>('Appointment', appointmentSchema)
