import mongoose, { Document, Schema } from 'mongoose'

export interface IAppointment extends Document {
  studentId: mongoose.Types.ObjectId
  counselorId: mongoose.Types.ObjectId
  date: Date
  time: string
  duration: number // in minutes
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

const AppointmentSchema = new Schema<IAppointment>({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Student ID is required']
  },
  counselorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Counselor ID is required']
  },
  date: {
    type: Date,
    required: [true, 'Appointment date is required']
  },
  time: {
    type: String,
    required: [true, 'Appointment time is required'],
    match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please provide a valid time format (HH:MM)']
  },
  duration: {
    type: Number,
    required: [true, 'Duration is required'],
    min: [15, 'Minimum duration is 15 minutes'],
    max: [180, 'Maximum duration is 180 minutes'],
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
    maxlength: [1000, 'Notes cannot exceed 1000 characters']
  },
  meetingLink: {
    type: String,
    match: [/^https?:\/\/.+/, 'Please provide a valid meeting link']
  },
  location: {
    type: String,
    maxlength: [200, 'Location cannot exceed 200 characters']
  },
  studentNotes: {
    type: String,
    maxlength: [500, 'Student notes cannot exceed 500 characters']
  },
  counselorNotes: {
    type: String,
    maxlength: [1000, 'Counselor notes cannot exceed 1000 characters']
  },
  rating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5']
  },
  feedback: {
    type: String,
    maxlength: [1000, 'Feedback cannot exceed 1000 characters']
  }
}, {
  timestamps: true
})

// Indexes for efficient querying
AppointmentSchema.index({ studentId: 1, date: 1 })
AppointmentSchema.index({ counselorId: 1, date: 1 })
AppointmentSchema.index({ date: 1, time: 1 })
AppointmentSchema.index({ status: 1 })

// Virtual for checking if appointment is in the past
AppointmentSchema.virtual('isPast').get(function() {
  const appointmentDateTime = new Date(`${this.date.toISOString().split('T')[0]}T${this.time}`)
  return appointmentDateTime < new Date()
})

// Virtual for checking if appointment is today
AppointmentSchema.virtual('isToday').get(function() {
  const today = new Date()
  const appointmentDate = new Date(this.date)
  return appointmentDate.toDateString() === today.toDateString()
})

// Ensure virtual fields are serialized
AppointmentSchema.set('toJSON', { virtuals: true })
AppointmentSchema.set('toObject', { virtuals: true })

export const Appointment = mongoose.model<IAppointment>('Appointment', AppointmentSchema)
