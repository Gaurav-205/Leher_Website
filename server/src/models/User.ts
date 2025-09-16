import mongoose, { Document, Schema } from 'mongoose'
import bcrypt from 'bcryptjs'

export interface IUser extends Document {
  email: string
  password: string
  firstName: string
  lastName: string
  role: 'student' | 'counselor' | 'admin' | 'moderator'
  educationLevel?: 'high-school' | 'undergraduate' | 'postgraduate' | 'phd' | 'working-professional' | 'other'
  institution?: mongoose.Types.ObjectId
  profile?: {
    dateOfBirth?: Date
    gender?: 'male' | 'female' | 'other' | 'prefer-not-to-say'
    phoneNumber?: string
    emergencyContact?: {
      name: string
      relationship: string
      phoneNumber: string
      email?: string
    }
    preferredLanguage: string
    timezone: string
    avatar?: string
    bio?: string
    interests?: string[]
    mentalHealthHistory?: {
      hasHistory: boolean
      currentTreatment?: string
      medications?: string[]
      previousCounseling?: boolean
      crisisHistory?: boolean
    }
  }
  isVerified: boolean
  lastLogin?: Date
  createdAt: Date
  updatedAt: Date
  matchPassword(enteredPassword: string): Promise<boolean>
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false
  },
  firstName: {
    type: String,
    required: [true, 'Please add a first name'],
    trim: true,
    maxlength: [50, 'First name cannot be more than 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Please add a last name'],
    trim: true,
    maxlength: [50, 'Last name cannot be more than 50 characters']
  },
  role: {
    type: String,
    enum: ['student', 'counselor', 'admin', 'moderator'],
    default: 'student'
  },
  educationLevel: {
    type: String,
    enum: ['high-school', 'undergraduate', 'postgraduate', 'phd', 'working-professional', 'other'],
    required: false
  },
  institution: {
    type: Schema.Types.ObjectId,
    ref: 'Institution',
    required: false
  },
  profile: {
    dateOfBirth: Date,
    gender: {
      type: String,
      enum: ['male', 'female', 'other', 'prefer-not-to-say']
    },
    phoneNumber: {
      type: String,
      match: [/^[0-9]{10}$/, 'Please add a valid phone number']
    },
    emergencyContact: {
      name: String,
      relationship: String,
      phoneNumber: String,
      email: String
    },
    preferredLanguage: {
      type: String,
      default: 'en'
    },
    timezone: {
      type: String,
      default: 'Asia/Kolkata'
    },
    avatar: String,
    bio: {
      type: String,
      maxlength: [500, 'Bio cannot be more than 500 characters']
    },
    interests: [String],
    mentalHealthHistory: {
      hasHistory: {
        type: Boolean,
        default: false
      },
      currentTreatment: String,
      medications: [String],
      previousCounseling: {
        type: Boolean,
        default: false
      },
      crisisHistory: {
        type: Boolean,
        default: false
      }
    }
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  lastLogin: Date
}, {
  timestamps: true
})

// Encrypt password using bcrypt
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_ROUNDS || '12'))
  this.password = await bcrypt.hash(this.password, salt)
})

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function(enteredPassword: string): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password)
}

// Create and export model
export const User = mongoose.model<IUser>('User', UserSchema)
