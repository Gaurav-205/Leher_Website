import mongoose, { Document, Schema } from 'mongoose'

export interface IChatMessage extends Document {
  role: 'user' | 'assistant'
  content: string
  encryptedContent?: string // For sensitive messages
  timestamp: Date
  isCrisis?: boolean
  crisisSeverity?: 'low' | 'medium' | 'high' | 'critical'
  crisisConfidence?: number
  crisisKeywords?: string[]
  isEncrypted?: boolean
  encryptionMetadata?: {
    iv: string
    salt: string
    timestamp: number
  }
}

export interface IChat extends Document {
  userId: mongoose.Types.ObjectId
  messages: IChatMessage[]
  sessionId: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const ChatMessageSchema = new Schema<IChatMessage>({
  role: {
    type: String,
    enum: ['user', 'assistant'],
    required: true
  },
  content: {
    type: String,
    required: true,
    maxlength: [4000, 'Message content cannot exceed 4000 characters']
  },
  encryptedContent: {
    type: String,
    required: false
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  isCrisis: {
    type: Boolean,
    default: false
  },
  crisisSeverity: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'low'
  },
  crisisConfidence: {
    type: Number,
    min: 0,
    max: 1,
    default: 0
  },
  crisisKeywords: [{
    type: String
  }],
  isEncrypted: {
    type: Boolean,
    default: false
  },
  encryptionMetadata: {
    iv: String,
    salt: String,
    timestamp: Number
  }
})

const ChatSchema = new Schema<IChat>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  messages: [ChatMessageSchema],
  sessionId: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

// Indexes for efficient querying
ChatSchema.index({ userId: 1, createdAt: -1 })
ChatSchema.index({ sessionId: 1 }, { unique: true })

export const Chat = mongoose.model<IChat>('Chat', ChatSchema)

