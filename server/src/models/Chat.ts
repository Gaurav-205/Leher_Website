import mongoose, { Document, Schema } from 'mongoose'

export interface IChatMessage extends Document {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  isCrisis?: boolean
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
  timestamp: {
    type: Date,
    default: Date.now
  },
  isCrisis: {
    type: Boolean,
    default: false
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

