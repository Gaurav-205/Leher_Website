import mongoose, { Document, Schema } from 'mongoose'

export interface ICommunityComment extends Document {
  post: mongoose.Types.ObjectId
  author: mongoose.Types.ObjectId
  content: string
  parentComment?: mongoose.Types.ObjectId // For nested replies
  replies: mongoose.Types.ObjectId[]
  likes: mongoose.Types.ObjectId[]
  dislikes: mongoose.Types.ObjectId[]
  isEdited: boolean
  editedAt?: Date
  isDeleted: boolean
  deletedAt?: Date
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
  replyCount: number
  isLikedByUser(userId: string): boolean
  isDislikedByUser(userId: string): boolean
}

const CommunityCommentSchema = new Schema<ICommunityComment>({
  post: {
    type: Schema.Types.ObjectId,
    ref: 'CommunityPost',
    required: [true, 'Comment must belong to a post']
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Comment author is required']
  },
  content: {
    type: String,
    required: [true, 'Comment content is required'],
    trim: true,
    maxlength: [1000, 'Comment cannot exceed 1000 characters']
  },
  parentComment: {
    type: Schema.Types.ObjectId,
    ref: 'CommunityComment',
    default: null
  },
  replies: [{
    type: Schema.Types.ObjectId,
    ref: 'CommunityComment'
  }],
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  dislikes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  isEdited: {
    type: Boolean,
    default: false
  },
  editedAt: {
    type: Date
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  deletedAt: {
    type: Date
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
    default: true
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
CommunityCommentSchema.index({ post: 1, createdAt: 1 })
CommunityCommentSchema.index({ author: 1, createdAt: -1 })
CommunityCommentSchema.index({ parentComment: 1, createdAt: 1 })
CommunityCommentSchema.index({ isApproved: 1, isDeleted: 1 })

// Virtual for like count
CommunityCommentSchema.virtual('likeCount').get(function() {
  return this.likes.length
})

// Virtual for dislike count
CommunityCommentSchema.virtual('dislikeCount').get(function() {
  return this.dislikes.length
})

// Virtual for reply count
CommunityCommentSchema.virtual('replyCount').get(function() {
  return this.replies.length
})

// Method to check if user liked the comment
CommunityCommentSchema.methods.isLikedByUser = function(userId: string): boolean {
  return this.likes.some((like: mongoose.Types.ObjectId) => like.toString() === userId)
}

// Method to check if user disliked the comment
CommunityCommentSchema.methods.isDislikedByUser = function(userId: string): boolean {
  return this.dislikes.some((dislike: mongoose.Types.ObjectId) => dislike.toString() === userId)
}

// Pre-save middleware to update editedAt when content changes
CommunityCommentSchema.pre('save', function(next) {
  if (this.isModified('content') && !this.isNew) {
    this.isEdited = true
    this.editedAt = new Date()
  }
  next()
})

// Ensure virtual fields are serialized
CommunityCommentSchema.set('toJSON', { virtuals: true })
CommunityCommentSchema.set('toObject', { virtuals: true })

export const CommunityComment = mongoose.model<ICommunityComment>('CommunityComment', CommunityCommentSchema)



