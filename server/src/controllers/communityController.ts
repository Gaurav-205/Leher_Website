import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import mongoose from 'mongoose'
import { CommunityPost } from '@models/CommunityPost'
import { CommunityComment } from '@models/CommunityComment'
import { User } from '@models/User'
import { AuthRequest } from '@middleware/auth'
import logger from '@utils/logger'

// @desc    Get all community posts
// @route   GET /api/community/posts
// @access  Public
export const getCommunityPosts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      category, 
      search, 
      sortBy = 'createdAt', 
      sortOrder = 'desc' 
    } = req.query

    // Build query
    let query: any = { isApproved: true }
    
    if (category) {
      query.category = category
    }
    
    if (search) {
      const searchString = String(search)
      query.$or = [
        { title: { $regex: searchString, $options: 'i' } },
        { content: { $regex: searchString, $options: 'i' } },
        { tags: { $in: [new RegExp(searchString, 'i')] } }
      ]
    }

    // Build sort object
    const sort: any = {}
    sort[sortBy as string] = sortOrder === 'desc' ? -1 : 1

    const posts = await CommunityPost.find(query)
      .populate('author', 'firstName lastName profile.avatar')
      .sort(sort)
      .limit(Number(limit) * 1)
      .skip((Number(page) - 1) * Number(limit))
      .select('-__v')

    const total = await CommunityPost.countDocuments(query)

    res.status(200).json({
      success: true,
      data: {
        posts,
        pagination: {
          currentPage: Number(page),
          totalPages: Math.ceil(total / Number(limit)),
          totalPosts: total,
          hasNext: Number(page) < Math.ceil(total / Number(limit)),
          hasPrev: Number(page) > 1
        }
      }
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Get single community post
// @route   GET /api/community/posts/:id
// @access  Public
export const getCommunityPost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params

    const post = await CommunityPost.findById(id)
      .populate('author', 'firstName lastName profile.avatar')
      .populate({
        path: 'comments',
        populate: {
          path: 'author',
          select: 'firstName lastName profile.avatar'
        },
        match: { isApproved: true, isDeleted: false },
        options: { sort: { createdAt: 1 } }
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

    res.status(200).json({
      success: true,
      data: post
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
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      })
      return
    }

    const { title, content, category, tags, images, isAnonymous } = req.body
    const userId = req.user?._id

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated'
      })
      return
    }

    const post = new CommunityPost({
      author: userId,
      title,
      content,
      category: category || 'general',
      tags: tags || [],
      images: images || [],
      isAnonymous: isAnonymous || false
    })

    await post.save()
    await post.populate('author', 'firstName lastName profile.avatar')

    res.status(201).json({
      success: true,
      data: post,
      message: 'Post created successfully'
    })

    logger.info(`New community post created by user ${userId}: ${post._id}`)
  } catch (error) {
    next(error)
  }
}

// @desc    Update community post
// @route   PUT /api/community/posts/:id
// @access  Private
export const updateCommunityPost = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      })
      return
    }

    const { id } = req.params
    const { title, content, category, tags, images, isAnonymous } = req.body
    const userId = req.user?._id

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated'
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

    // Check if user is the author or admin
    if (post.author.toString() !== userId && req.user?.role !== 'admin') {
      res.status(403).json({
        success: false,
        message: 'Not authorized to update this post'
      })
      return
    }

    // Update post
    post.title = title || post.title
    post.content = content || post.content
    post.category = category || post.category
    post.tags = tags || post.tags
    post.images = images || post.images
    post.isAnonymous = isAnonymous !== undefined ? isAnonymous : post.isAnonymous

    await post.save()
    await post.populate('author', 'firstName lastName profile.avatar')

    res.status(200).json({
      success: true,
      data: post,
      message: 'Post updated successfully'
    })

    logger.info(`Community post ${id} updated by user ${userId}`)
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

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated'
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

    // Check if user is the author or admin
    if (post.author.toString() !== userId && req.user?.role !== 'admin') {
      res.status(403).json({
        success: false,
        message: 'Not authorized to delete this post'
      })
      return
    }

    // Delete associated comments
    await CommunityComment.deleteMany({ post: id })

    // Delete the post
    await CommunityPost.findByIdAndDelete(id)

    res.status(200).json({
      success: true,
      message: 'Post deleted successfully'
    })

    logger.info(`Community post ${id} deleted by user ${userId}`)
  } catch (error) {
    next(error)
  }
}

// @desc    Toggle post like
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

    const post = await CommunityPost.findById(id)
    if (!post) {
      res.status(404).json({
        success: false,
        message: 'Post not found'
      })
      return
    }

    const isLiked = post.likes.some(like => like.toString() === userId)
    const isDisliked = post.dislikes.some(dislike => dislike.toString() === userId)

    if (isLiked) {
      // Remove like
      post.likes = post.likes.filter(like => like.toString() !== userId)
    } else {
      // Add like and remove dislike if exists
      post.likes.push(new mongoose.Types.ObjectId(userId))
      if (isDisliked) {
        post.dislikes = post.dislikes.filter(dislike => dislike.toString() !== userId)
      }
    }

    await post.save()

    res.status(200).json({
      success: true,
      data: {
        isLiked: !isLiked,
        likeCount: post.likeCount,
        dislikeCount: post.dislikeCount
      }
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Toggle post dislike
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

    const post = await CommunityPost.findById(id)
    if (!post) {
      res.status(404).json({
        success: false,
        message: 'Post not found'
      })
      return
    }

    const isDisliked = post.dislikes.some(dislike => dislike.toString() === userId)
    const isLiked = post.likes.some(like => like.toString() === userId)

    if (isDisliked) {
      // Remove dislike
      post.dislikes = post.dislikes.filter(dislike => dislike.toString() !== userId)
    } else {
      // Add dislike and remove like if exists
      post.dislikes.push(new mongoose.Types.ObjectId(userId))
      if (isLiked) {
        post.likes = post.likes.filter(like => like.toString() !== userId)
      }
    }

    await post.save()

    res.status(200).json({
      success: true,
      data: {
        isDisliked: !isDisliked,
        likeCount: post.likeCount,
        dislikeCount: post.dislikeCount
      }
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
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      })
      return
    }

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

    res.status(200).json({
      success: true,
      message: 'Post reported successfully'
    })

    logger.warn(`Community post ${id} reported by user ${userId}: ${reason}`)
  } catch (error) {
    next(error)
  }
}

// @desc    Get community categories
// @route   GET /api/community/categories
// @access  Public
export const getCommunityCategories = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const categories = [
      { value: 'general', label: 'General', description: 'General discussions and topics' },
      { value: 'mental-health', label: 'Mental Health', description: 'Mental health discussions and support' },
      { value: 'academic-stress', label: 'Academic Stress', description: 'Academic pressure and stress management' },
      { value: 'relationships', label: 'Relationships', description: 'Relationship advice and discussions' },
      { value: 'career', label: 'Career', description: 'Career guidance and professional development' },
      { value: 'wellness', label: 'Wellness', description: 'Health and wellness tips' },
      { value: 'success-stories', label: 'Success Stories', description: 'Inspiring success stories and achievements' },
      { value: 'questions', label: 'Questions', description: 'Questions and answers' },
      { value: 'resources', label: 'Resources', description: 'Helpful resources and tools' }
    ]

    res.status(200).json({
      success: true,
      data: categories
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Create comment
// @route   POST /api/community/posts/:postId/comments
// @access  Private
export const createComment = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      })
      return
    }

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

    // Check if post exists
    const post = await CommunityPost.findById(postId)
    if (!post) {
      res.status(404).json({
        success: false,
        message: 'Post not found'
      })
      return
    }

    const comment = new CommunityComment({
      post: postId,
      author: userId,
      content,
      parentComment: parentComment || undefined
    })

    await comment.save()
    await comment.populate('author', 'firstName lastName profile.avatar')

    // Add comment to post
    post.comments.push(comment._id as any)
    await post.save()

    // If this is a reply, add to parent comment
    if (parentComment) {
      const parent = await CommunityComment.findById(parentComment)
      if (parent) {
        parent.replies.push(comment._id as any)
        await parent.save()
      }
    }

    res.status(201).json({
      success: true,
      data: comment,
      message: 'Comment created successfully'
    })

    logger.info(`New comment created by user ${userId} on post ${postId}`)
  } catch (error) {
    next(error)
  }
}

// @desc    Update comment
// @route   PUT /api/community/comments/:id
// @access  Private
export const updateComment = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      })
      return
    }

    const { id } = req.params
    const { content } = req.body
    const userId = req.user?._id

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated'
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

    // Check if user is the author or admin
    if (comment.author.toString() !== userId && req.user?.role !== 'admin') {
      res.status(403).json({
        success: false,
        message: 'Not authorized to update this comment'
      })
      return
    }

    comment.content = content
    await comment.save()
    await comment.populate('author', 'firstName lastName profile.avatar')

    res.status(200).json({
      success: true,
      data: comment,
      message: 'Comment updated successfully'
    })

    logger.info(`Comment ${id} updated by user ${userId}`)
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

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated'
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

    // Check if user is the author or admin
    if (comment.author.toString() !== userId && req.user?.role !== 'admin') {
      res.status(403).json({
        success: false,
        message: 'Not authorized to delete this comment'
      })
      return
    }

    // Soft delete - mark as deleted
    comment.isDeleted = true
    comment.deletedAt = new Date()
    await comment.save()

    res.status(200).json({
      success: true,
      message: 'Comment deleted successfully'
    })

    logger.info(`Comment ${id} deleted by user ${userId}`)
  } catch (error) {
    next(error)
  }
}

// @desc    Toggle comment like
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

    const comment = await CommunityComment.findById(id)
    if (!comment) {
      res.status(404).json({
        success: false,
        message: 'Comment not found'
      })
      return
    }

    const isLiked = comment.likes.some(like => like.toString() === userId)
    const isDisliked = comment.dislikes.some(dislike => dislike.toString() === userId)

    if (isLiked) {
      // Remove like
      comment.likes = comment.likes.filter(like => like.toString() !== userId)
    } else {
      // Add like and remove dislike if exists
      comment.likes.push(new mongoose.Types.ObjectId(userId))
      if (isDisliked) {
        comment.dislikes = comment.dislikes.filter(dislike => dislike.toString() !== userId)
      }
    }

    await comment.save()

    res.status(200).json({
      success: true,
      data: {
        isLiked: !isLiked,
        likeCount: comment.likeCount,
        dislikeCount: comment.dislikeCount
      }
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Toggle comment dislike
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

    const comment = await CommunityComment.findById(id)
    if (!comment) {
      res.status(404).json({
        success: false,
        message: 'Comment not found'
      })
      return
    }

    const isDisliked = comment.dislikes.some(dislike => dislike.toString() === userId)
    const isLiked = comment.likes.some(like => like.toString() === userId)

    if (isDisliked) {
      // Remove dislike
      comment.dislikes = comment.dislikes.filter(dislike => dislike.toString() !== userId)
    } else {
      // Add dislike and remove like if exists
      comment.dislikes.push(new mongoose.Types.ObjectId(userId))
      if (isLiked) {
        comment.likes = comment.likes.filter(like => like.toString() !== userId)
      }
    }

    await comment.save()

    res.status(200).json({
      success: true,
      data: {
        isDisliked: !isDisliked,
        likeCount: comment.likeCount,
        dislikeCount: comment.dislikeCount
      }
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
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      })
      return
    }

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

    res.status(200).json({
      success: true,
      message: 'Comment reported successfully'
    })

    logger.warn(`Comment ${id} reported by user ${userId}: ${reason}`)
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

    const replies = await CommunityComment.find({ 
      parentComment: id, 
      isApproved: true, 
      isDeleted: false 
    })
      .populate('author', 'firstName lastName profile.avatar')
      .sort({ createdAt: 1 })
      .limit(Number(limit) * 1)
      .skip((Number(page) - 1) * Number(limit))

    const total = await CommunityComment.countDocuments({ 
      parentComment: id, 
      isApproved: true, 
      isDeleted: false 
    })

    res.status(200).json({
      success: true,
      data: {
        replies,
        pagination: {
          currentPage: Number(page),
          totalPages: Math.ceil(total / Number(limit)),
          totalReplies: total,
          hasNext: Number(page) < Math.ceil(total / Number(limit)),
          hasPrev: Number(page) > 1
        }
      }
    })
  } catch (error) {
    next(error)
  }
}