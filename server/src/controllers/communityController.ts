import { Request, Response, NextFunction } from 'express'
import { CommunityPost } from '@models/CommunityPost'
import { CommunityComment } from '@models/CommunityComment'
import { User } from '@models/User'
import mongoose from 'mongoose'

interface AuthRequest extends Request {
  user?: {
    _id: string
    role: string
  }
}

// @desc    Get all community posts with pagination and filtering
// @route   GET /api/community/posts
// @access  Public
export const getCommunityPosts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      tags,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query

    const skip = (Number(page) - 1) * Number(limit)
    const query: any = { isApproved: true }

    // Filter by category
    if (category) {
      query.category = category
    }

    // Filter by tags
    if (tags) {
      const tagArray = Array.isArray(tags) ? tags : [tags]
      query.tags = { $in: tagArray }
    }

    // Search functionality
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search as string, 'i')] } }
      ]
    }

    // Sort options
    const sortOptions: any = {}
    if (sortBy === 'popular') {
      sortOptions.likeCount = -1
      sortOptions.commentCount = -1
      sortOptions.createdAt = -1
    } else if (sortBy === 'trending') {
      sortOptions.views = -1
      sortOptions.likeCount = -1
      sortOptions.createdAt = -1
    } else {
      sortOptions[sortBy as string] = sortOrder === 'desc' ? -1 : 1
    }

    // Always prioritize pinned posts
    sortOptions.isPinned = -1

    const posts = await CommunityPost.find(query)
      .populate('author', 'firstName lastName profile.avatar')
      .populate('comments', '_id')
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit))

    const totalPosts = await CommunityPost.countDocuments(query)

    res.json({
      success: true,
      data: {
        posts,
        pagination: {
          currentPage: Number(page),
          totalPages: Math.ceil(totalPosts / Number(limit)),
          totalPosts,
          hasNext: skip + posts.length < totalPosts,
          hasPrev: Number(page) > 1
        }
      }
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Get single community post with comments
// @route   GET /api/community/posts/:id
// @access  Public
export const getCommunityPost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params
    const { page = 1, limit = 20 } = req.query

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: 'Invalid post ID'
      })
      return
    }

    const skip = (Number(page) - 1) * Number(limit)

    const post = await CommunityPost.findById(id)
      .populate('author', 'firstName lastName profile.avatar')
      .populate({
        path: 'comments',
        match: { isApproved: true, isDeleted: false, parentComment: null },
        populate: {
          path: 'author',
          select: 'firstName lastName profile.avatar'
        },
        options: {
          sort: { createdAt: -1 },
          skip,
          limit: Number(limit)
        }
      })

    if (!post) {
      res.status(404).json({
        success: false,
        message: 'Post not found'
      })
      return
    }

    // Increment view count
    post.views += 1
    await post.save()

    // Get total comments count
    const totalComments = await CommunityComment.countDocuments({
      post: id,
      isApproved: true,
      isDeleted: false,
      parentComment: null
    })

    res.json({
      success: true,
      data: {
        post,
        pagination: {
          currentPage: Number(page),
          totalPages: Math.ceil(totalComments / Number(limit)),
          totalComments,
          hasNext: skip + post.comments.length < totalComments,
          hasPrev: Number(page) > 1
        }
      }
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Create new community post
// @route   POST /api/community/posts
// @access  Private
export const createCommunityPost = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?._id
    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated'
      })
      return
    }

    const {
      title,
      content,
      category,
      tags = [],
      images = [],
      isAnonymous = false
    } = req.body

    const post = new CommunityPost({
      author: userId,
      title,
      content,
      category,
      tags,
      images,
      isAnonymous
    })

    await post.save()
    await post.populate('author', 'firstName lastName profile.avatar')

    res.status(201).json({
      success: true,
      data: post,
      message: 'Post created successfully'
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Update community post
// @route   PUT /api/community/posts/:id
// @access  Private
export const updateCommunityPost = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params
    const userId = req.user?._id
    const userRole = req.user?.role

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated'
      })
      return
    }

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: 'Invalid post ID'
      })
      return
    }

    const post = await CommunityPost.findById(id)
    if (!post) {
      res.status(404).json({
        success: false,
        message: 'Post not found'
      })
      return
    }

    // Check if user is author or admin/moderator
    if (post.author.toString() !== userId && (!userRole || !['admin', 'moderator'].includes(userRole))) {
      res.status(403).json({
        success: false,
        message: 'Not authorized to update this post'
      })
      return
    }

    const {
      title,
      content,
      category,
      tags,
      images,
      isAnonymous
    } = req.body

    // Update fields
    if (title !== undefined) post.title = title
    if (content !== undefined) post.content = content
    if (category !== undefined) post.category = category
    if (tags !== undefined) post.tags = tags
    if (images !== undefined) post.images = images
    if (isAnonymous !== undefined) post.isAnonymous = isAnonymous

    await post.save()
    await post.populate('author', 'firstName lastName profile.avatar')

    res.json({
      success: true,
      data: post,
      message: 'Post updated successfully'
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Delete community post
// @route   DELETE /api/community/posts/:id
// @access  Private
export const deleteCommunityPost = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params
    const userId = req.user?._id
    const userRole = req.user?.role

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated'
      })
      return
    }

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: 'Invalid post ID'
      })
      return
    }

    const post = await CommunityPost.findById(id)
    if (!post) {
      res.status(404).json({
        success: false,
        message: 'Post not found'
      })
      return
    }

    // Check if user is author or admin/moderator
    if (post.author.toString() !== userId && (!userRole || !['admin', 'moderator'].includes(userRole))) {
      res.status(403).json({
        success: false,
        message: 'Not authorized to delete this post'
      })
      return
    }

    // Delete associated comments
    await CommunityComment.deleteMany({ post: id })

    await CommunityPost.findByIdAndDelete(id)

    res.json({
      success: true,
      message: 'Post deleted successfully'
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Like/Unlike community post
// @route   POST /api/community/posts/:id/like
// @access  Private
export const togglePostLike = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params
    const userId = req.user?._id

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated'
      })
      return
    }

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: 'Invalid post ID'
      })
      return
    }

    const post = await CommunityPost.findById(id)
    if (!post) {
      res.status(404).json({
        success: false,
        message: 'Post not found'
      })
      return
    }

    const isLiked = post.isLikedByUser(userId)
    const isDisliked = post.isDislikedByUser(userId)

    if (isLiked) {
      // Remove like
      post.likes = post.likes.filter(like => like.toString() !== userId)
    } else {
      // Add like and remove dislike if exists
      post.likes.push(new mongoose.Types.ObjectId(userId))
      post.dislikes = post.dislikes.filter(dislike => dislike.toString() !== userId)
    }

    await post.save()

    res.json({
      success: true,
      data: {
        isLiked: !isLiked,
        likeCount: post.likeCount,
        dislikeCount: post.dislikeCount
      },
      message: isLiked ? 'Post unliked' : 'Post liked'
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Dislike/Undislike community post
// @route   POST /api/community/posts/:id/dislike
// @access  Private
export const togglePostDislike = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params
    const userId = req.user?._id

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated'
      })
      return
    }

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: 'Invalid post ID'
      })
      return
    }

    const post = await CommunityPost.findById(id)
    if (!post) {
      res.status(404).json({
        success: false,
        message: 'Post not found'
      })
      return
    }

    const isDisliked = post.isDislikedByUser(userId)
    const isLiked = post.isLikedByUser(userId)

    if (isDisliked) {
      // Remove dislike
      post.dislikes = post.dislikes.filter(dislike => dislike.toString() !== userId)
    } else {
      // Add dislike and remove like if exists
      post.dislikes.push(new mongoose.Types.ObjectId(userId))
      post.likes = post.likes.filter(like => like.toString() !== userId)
    }

    await post.save()

    res.json({
      success: true,
      data: {
        isDisliked: !isDisliked,
        likeCount: post.likeCount,
        dislikeCount: post.dislikeCount
      },
      message: isDisliked ? 'Post undisliked' : 'Post disliked'
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Report community post
// @route   POST /api/community/posts/:id/report
// @access  Private
export const reportCommunityPost = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params
    const { reason } = req.body
    const userId = req.user?._id

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated'
      })
      return
    }

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: 'Invalid post ID'
      })
      return
    }

    const post = await CommunityPost.findById(id)
    if (!post) {
      res.status(404).json({
        success: false,
        message: 'Post not found'
      })
      return
    }

    post.isReported = true
    post.reportReason = reason

    await post.save()

    res.json({
      success: true,
      message: 'Post reported successfully'
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Get community post categories
// @route   GET /api/community/categories
// @access  Public
export const getCommunityCategories = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const categories = [
      { value: 'general', label: 'General Discussion', description: 'General topics and discussions' },
      { value: 'mental-health', label: 'Mental Health', description: 'Mental health support and discussions' },
      { value: 'academic-stress', label: 'Academic Stress', description: 'Academic pressure and stress management' },
      { value: 'relationships', label: 'Relationships', description: 'Relationship advice and support' },
      { value: 'career', label: 'Career Guidance', description: 'Career advice and professional development' },
      { value: 'wellness', label: 'Wellness', description: 'Health and wellness tips' },
      { value: 'success-stories', label: 'Success Stories', description: 'Share your achievements and success stories' },
      { value: 'questions', label: 'Questions', description: 'Ask questions and get answers' },
      { value: 'resources', label: 'Resources', description: 'Share helpful resources and tools' }
    ]

    res.json({
      success: true,
      data: categories
    })
  } catch (error) {
    next(error)
  }
}

// ==================== COMMENT MANAGEMENT ====================

// @desc    Create new comment on a post
// @route   POST /api/community/posts/:postId/comments
// @access  Private
export const createComment = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { postId } = req.params
    const { content, parentComment } = req.body
    const userId = req.user?._id

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated'
      })
      return
    }

    if (!postId || !mongoose.Types.ObjectId.isValid(postId)) {
      res.status(400).json({
        success: false,
        message: 'Invalid post ID'
      })
      return
    }

    // Check if post exists
    const post = await CommunityPost.findById(postId)
    if (!post) {
      res.status(404).json({
        success: false,
        message: 'Post not found'
      })
      return
    }

    // If replying to a comment, validate parent comment
    if (parentComment) {
      if (!mongoose.Types.ObjectId.isValid(parentComment)) {
        res.status(400).json({
          success: false,
          message: 'Invalid parent comment ID'
        })
        return
      }

      const parentCommentDoc = await CommunityComment.findById(parentComment)
      if (!parentCommentDoc || parentCommentDoc.post.toString() !== postId) {
        res.status(404).json({
          success: false,
          message: 'Parent comment not found or does not belong to this post'
        })
        return
      }
    }

    const comment = new CommunityComment({
      post: postId,
      author: userId,
      content,
      parentComment: parentComment || null
    })

    await comment.save()
    await comment.populate('author', 'firstName lastName profile.avatar')

    // If this is a reply, add it to parent comment's replies
    if (parentComment) {
      await CommunityComment.findByIdAndUpdate(parentComment, {
        $push: { replies: comment._id }
      })
    }

    // Update post comment count
    await CommunityPost.findByIdAndUpdate(postId, {
      $inc: { commentCount: 1 }
    })

    res.status(201).json({
      success: true,
      data: comment,
      message: 'Comment created successfully'
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Update comment
// @route   PUT /api/community/comments/:id
// @access  Private
export const updateComment = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params
    const { content } = req.body
    const userId = req.user?._id
    const userRole = req.user?.role

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated'
      })
      return
    }

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: 'Invalid comment ID'
      })
      return
    }

    const comment = await CommunityComment.findById(id)
    if (!comment) {
      res.status(404).json({
        success: false,
        message: 'Comment not found'
      })
      return
    }

    // Check if user is author or admin/moderator
    if (comment.author.toString() !== userId && (!userRole || !['admin', 'moderator'].includes(userRole))) {
      res.status(403).json({
        success: false,
        message: 'Not authorized to update this comment'
      })
      return
    }

    comment.content = content
    await comment.save()
    await comment.populate('author', 'firstName lastName profile.avatar')

    res.json({
      success: true,
      data: comment,
      message: 'Comment updated successfully'
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Delete comment
// @route   DELETE /api/community/comments/:id
// @access  Private
export const deleteComment = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params
    const userId = req.user?._id
    const userRole = req.user?.role

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated'
      })
      return
    }

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: 'Invalid comment ID'
      })
      return
    }

    const comment = await CommunityComment.findById(id)
    if (!comment) {
      res.status(404).json({
        success: false,
        message: 'Comment not found'
      })
      return
    }

    // Check if user is author or admin/moderator
    if (comment.author.toString() !== userId && (!userRole || !['admin', 'moderator'].includes(userRole))) {
      res.status(403).json({
        success: false,
        message: 'Not authorized to delete this comment'
      })
      return
    }

    // Soft delete the comment
    comment.isDeleted = true
    comment.deletedAt = new Date()
    await comment.save()

    // Update post comment count
    await CommunityPost.findByIdAndUpdate(comment.post, {
      $inc: { commentCount: -1 }
    })

    res.json({
      success: true,
      message: 'Comment deleted successfully'
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Like/Unlike comment
// @route   POST /api/community/comments/:id/like
// @access  Private
export const toggleCommentLike = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params
    const userId = req.user?._id

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated'
      })
      return
    }

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: 'Invalid comment ID'
      })
      return
    }

    const comment = await CommunityComment.findById(id)
    if (!comment) {
      res.status(404).json({
        success: false,
        message: 'Comment not found'
      })
      return
    }

    const isLiked = comment.isLikedByUser(userId)
    const isDisliked = comment.isDislikedByUser(userId)

    if (isLiked) {
      // Remove like
      comment.likes = comment.likes.filter(like => like.toString() !== userId)
    } else {
      // Add like and remove dislike if exists
      comment.likes.push(new mongoose.Types.ObjectId(userId))
      comment.dislikes = comment.dislikes.filter(dislike => dislike.toString() !== userId)
    }

    await comment.save()

    res.json({
      success: true,
      data: {
        isLiked: !isLiked,
        likeCount: comment.likeCount,
        dislikeCount: comment.dislikeCount
      },
      message: isLiked ? 'Comment unliked' : 'Comment liked'
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Dislike/Undislike comment
// @route   POST /api/community/comments/:id/dislike
// @access  Private
export const toggleCommentDislike = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params
    const userId = req.user?._id

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated'
      })
      return
    }

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: 'Invalid comment ID'
      })
      return
    }

    const comment = await CommunityComment.findById(id)
    if (!comment) {
      res.status(404).json({
        success: false,
        message: 'Comment not found'
      })
      return
    }

    const isDisliked = comment.isDislikedByUser(userId)
    const isLiked = comment.isLikedByUser(userId)

    if (isDisliked) {
      // Remove dislike
      comment.dislikes = comment.dislikes.filter(dislike => dislike.toString() !== userId)
    } else {
      // Add dislike and remove like if exists
      comment.dislikes.push(new mongoose.Types.ObjectId(userId))
      comment.likes = comment.likes.filter(like => like.toString() !== userId)
    }

    await comment.save()

    res.json({
      success: true,
      data: {
        isDisliked: !isDisliked,
        likeCount: comment.likeCount,
        dislikeCount: comment.dislikeCount
      },
      message: isDisliked ? 'Comment undisliked' : 'Comment disliked'
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Report comment
// @route   POST /api/community/comments/:id/report
// @access  Private
export const reportComment = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params
    const { reason } = req.body
    const userId = req.user?._id

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated'
      })
      return
    }

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: 'Invalid comment ID'
      })
      return
    }

    const comment = await CommunityComment.findById(id)
    if (!comment) {
      res.status(404).json({
        success: false,
        message: 'Comment not found'
      })
      return
    }

    comment.isReported = true
    comment.reportReason = reason

    await comment.save()

    res.json({
      success: true,
      message: 'Comment reported successfully'
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Get comment replies
// @route   GET /api/community/comments/:id/replies
// @access  Public
export const getCommentReplies = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params
    const { page = 1, limit = 10 } = req.query

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: 'Invalid comment ID'
      })
      return
    }

    const skip = (Number(page) - 1) * Number(limit)

    const comment = await CommunityComment.findById(id)
    if (!comment) {
      res.status(404).json({
        success: false,
        message: 'Comment not found'
      })
      return
    }

    const replies = await CommunityComment.find({
      parentComment: id,
      isApproved: true,
      isDeleted: false
    })
      .populate('author', 'firstName lastName profile.avatar')
      .sort({ createdAt: 1 })
      .skip(skip)
      .limit(Number(limit))

    const totalReplies = await CommunityComment.countDocuments({
      parentComment: id,
      isApproved: true,
      isDeleted: false
    })

    res.json({
      success: true,
      data: {
        replies,
        pagination: {
          currentPage: Number(page),
          totalPages: Math.ceil(totalReplies / Number(limit)),
          totalReplies,
          hasNext: skip + replies.length < totalReplies,
          hasPrev: Number(page) > 1
        }
      }
    })
  } catch (error) {
    next(error)
  }
}