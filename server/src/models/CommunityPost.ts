import mongoose, { Document, Schema } from 'mongoose'

export interface ICommunityPost extends Document {
  author: mongoose.Types.ObjectId
  title: string
  content: string
  category: 'general' | 'mental-health' | 'academic-stress' | 'relationships' | 'career' | 'wellness' | 'success-stories' | 'questions' | 'resources'
  tags: string[]
  images?: string[]
  isAnonymous: boolean
  isPinned: boolean
  isLocked: boolean
  likes: mongoose.Types.ObjectId[]
  dislikes: mongoose.Types.ObjectId[]
  comments: mongoose.Types.ObjectId[]
  views: number
  shares: number
  isReported: boolean
  reportReason?: string
  isApproved: boolean
  approvedBy?: mongoose.Types.ObjectId
  approvedAt?: Date
  createdAt: Date
  updatedAt: Date
  // Virtuals
  likeCount: number
  dislikeCount: number
  commentCount: number
  isLikedByUser(userId: string): boolean
  isDislikedByUser(userId: string): boolean
}

const CommunityPostSchema = new Schema<ICommunityPost>({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Post author is required']
  },
  title: {
    type: String,
    required: [true, 'Post title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  content: {
    type: String,
    required: [true, 'Post content is required'],
    trim: true,
    maxlength: [5000, 'Content cannot exceed 5000 characters']
  },
  category: {
    type: String,
    required: [true, 'Post category is required'],
    enum: {
      values: ['general', 'mental-health', 'academic-stress', 'relationships', 'career', 'wellness', 'success-stories', 'questions', 'resources'],
      message: 'Invalid post category'
    },
    default: 'general'
  },
  tags: [{
    type: String,
    trim: true,
    maxlength: [30, 'Tag cannot exceed 30 characters']
  }],
  images: [{
    type: String,
    validate: {
      validator: function(v: string) {
        return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(v)
      },
      message: 'Invalid image URL'
    }
  }],
  isAnonymous: {
    type: Boolean,
    default: false
  },
  isPinned: {
    type: Boolean,
    default: false
  },
  isLocked: {
    type: Boolean,
    default: false
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  dislikes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'CommunityComment'
  }],
  views: {
    type: Number,
    default: 0,
    min: 0
  },
  shares: {
    type: Number,
    default: 0,
    min: 0
  },
  isReported: {
    type: Boolean,
    default: false
  },
  reportReason: {
    type: String,
    maxlength: [500, 'Report reason cannot exceed 500 characters']
  },
  isApproved: {
    type: Boolean,
    default: true // Auto-approve for now, can be changed to false for moderation
  },
  approvedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  approvedAt: {
    type: Date
  }
}, {
  timestamps: true
})

// Indexes for efficient querying
CommunityPostSchema.index({ author: 1, createdAt: -1 })
CommunityPostSchema.index({ category: 1, createdAt: -1 })
CommunityPostSchema.index({ tags: 1 })
CommunityPostSchema.index({ isPinned: -1, createdAt: -1 })
CommunityPostSchema.index({ isApproved: 1, createdAt: -1 })
CommunityPostSchema.index({ likes: 1 })
CommunityPostSchema.index({ title: 'text', content: 'text', tags: 'text' })

// Virtual for like count
CommunityPostSchema.virtual('likeCount').get(function() {
  return this.likes.length
})

// Virtual for dislike count
CommunityPostSchema.virtual('dislikeCount').get(function() {
  return this.dislikes.length
})

// Virtual for comment count
CommunityPostSchema.virtual('commentCount').get(function() {
  return this.comments.length
})

// Method to check if user liked the post
CommunityPostSchema.methods.isLikedByUser = function(userId: string): boolean {
  return this.likes.some((like: mongoose.Types.ObjectId) => like.toString() === userId)
}

// Method to check if user disliked the post
CommunityPostSchema.methods.isDislikedByUser = function(userId: string): boolean {
  return this.dislikes.some((dislike: mongoose.Types.ObjectId) => dislike.toString() === userId)
}

// Ensure virtual fields are serialized
CommunityPostSchema.set('toJSON', { virtuals: true })
CommunityPostSchema.set('toObject', { virtuals: true })

export const CommunityPost = mongoose.model<ICommunityPost>('CommunityPost', CommunityPostSchema)



