import mongoose, { Document, Schema } from 'mongoose'

export interface IInstitution extends Document {
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
  createdAt: Date
  updatedAt: Date
}

const InstitutionSchema = new Schema<IInstitution>({
  name: {
    type: String,
    required: [true, 'Please add institution name'],
    trim: true,
    maxlength: [200, 'Institution name cannot be more than 200 characters']
  },
  type: {
    type: String,
    enum: ['school', 'college', 'university'],
    required: [true, 'Please add institution type']
  },
  location: {
    state: {
      type: String,
      required: [true, 'Please add state'],
      trim: true
    },
    city: {
      type: String,
      required: [true, 'Please add city'],
      trim: true
    },
    address: {
      type: String,
      required: [true, 'Please add address'],
      trim: true
    }
  },
  contact: {
    email: {
      type: String,
      required: [true, 'Please add contact email'],
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email'
      ]
    },
    phone: {
      type: String,
      required: [true, 'Please add contact phone'],
      match: [/^[0-9]{10}$/, 'Please add a valid phone number']
    },
    website: {
      type: String,
      match: [
        /^https?:\/\/.+/,
        'Please add a valid website URL'
      ]
    }
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

// Create and export model
export const Institution = mongoose.model<IInstitution>('Institution', InstitutionSchema)
