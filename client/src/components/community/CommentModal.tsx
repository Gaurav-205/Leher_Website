import { useState, useEffect } from 'react'
import { X, Send, Users, MessageSquare, Heart, ThumbsDown, Reply, Clock } from 'lucide-react'
import { CommunityPost, CommunityComment } from '@types'
import { communityService } from '@services/communityService'
import toast from 'react-hot-toast'

interface CommentModalProps {
  isOpen: boolean
  onClose: () => void
  post: CommunityPost
  onCommentAdded: () => void
}

interface CommentItemProps {
  comment: CommunityComment
  onReply: (parentCommentId: string, content: string) => void
  onLike: (commentId: string) => void
  onDislike: (commentId: string) => void
  level?: number
}

const CommentItem = ({ comment, onReply, onLike, onDislike, level = 0 }: CommentItemProps) => {
  const [showReplyForm, setShowReplyForm] = useState(false)
  const [replyContent, setReplyContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
    
    if (diffInSeconds < 60) return 'Just now'
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`
    return `${Math.floor(diffInSeconds / 86400)}d`
  }

  const handleReply = async () => {
    if (!replyContent.trim()) return
    
    setIsSubmitting(true)
    try {
      await onReply(comment._id, replyContent)
      setReplyContent('')
      setShowReplyForm(false)
      toast.success('Reply posted successfully!')
    } catch (error) {
      console.error('Error replying to comment:', error)
      toast.error('Failed to post reply')
    } finally {
      setIsSubmitting(false)
    }
  }

  const maxLevel = 2 // Maximum nesting level for modal
  const isMaxLevel = level >= maxLevel

  return (
    <div className={`${level > 0 ? 'ml-4 border-l-2 border-gray-200 pl-3' : ''}`}>
      {/* Comment */}
      <div className="bg-gray-50 rounded-lg p-3 mb-2">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className="h-6 w-6 bg-blue-600 rounded-full flex items-center justify-center">
              <Users className="h-3 w-3 text-white" />
            </div>
            <div>
              <span className="font-medium text-gray-900 text-sm">
                {comment.author?.firstName || 'Unknown'} {comment.author?.lastName || 'User'}
              </span>
              <div className="flex items-center space-x-1 text-xs text-gray-500">
                <Clock className="h-3 w-3" />
                <span>{formatTimeAgo(comment.createdAt)}</span>
                {comment.isEdited && (
                  <span className="text-xs text-gray-400">(edited)</span>
                )}
              </div>
            </div>
          </div>
        </div>

        <p className="text-gray-700 text-sm mb-2">{comment.content}</p>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => onLike(comment._id)}
            className="flex items-center space-x-1 text-gray-600 hover:text-red-500 hover:bg-red-50 px-2 py-1 rounded text-xs transition-colors"
          >
            <Heart className="h-3 w-3" />
            <span>{comment.likeCount}</span>
          </button>
          
          <button
            onClick={() => onDislike(comment._id)}
            className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 hover:bg-gray-100 px-2 py-1 rounded text-xs transition-colors"
          >
            <ThumbsDown className="h-3 w-3" />
            <span>{comment.dislikeCount}</span>
          </button>

          {!isMaxLevel && (
            <button
              onClick={() => setShowReplyForm(!showReplyForm)}
              className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded text-xs transition-colors"
            >
              <Reply className="h-3 w-3" />
              <span>Reply</span>
            </button>
          )}
        </div>
      </div>

      {/* Reply Form */}
      {showReplyForm && !isMaxLevel && (
        <div className="mb-3 p-3 bg-white border border-gray-200 rounded-lg">
          <div className="mb-2">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Reply to {comment.author?.firstName || 'Unknown'} {comment.author?.lastName || 'User'}
            </label>
            <textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Write your reply..."
              rows={2}
              className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleReply}
              disabled={!replyContent.trim() || isSubmitting}
              className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Posting...' : 'Post Reply'}
            </button>
            <button
              onClick={() => {
                setShowReplyForm(false)
                setReplyContent('')
              }}
              className="px-3 py-1 text-gray-600 bg-white border border-gray-300 rounded text-xs hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Nested Replies */}
      {comment.replies && Array.isArray(comment.replies) && comment.replies.length > 0 && (
        <div className="space-y-2">
          {comment.replies
            .filter(reply => reply && (typeof reply === 'object' ? reply._id : true)) // Filter out invalid replies
            .map((reply, index) => {
              // Handle both string IDs and populated comment objects
              const replyData = typeof reply === 'string' 
                ? { _id: reply, content: 'Loading...', author: { firstName: 'Loading', lastName: '...' } } as CommunityComment
                : reply as CommunityComment
              
              return (
                <CommentItem
                  key={replyData._id}
                  comment={replyData}
                  onReply={onReply}
                  onLike={onLike}
                  onDislike={onDislike}
                  level={level + 1}
                />
              )
            })}
        </div>
      )}
    </div>
  )
}

const CommentModal = ({ isOpen, onClose, post, onCommentAdded }: CommentModalProps) => {
  const [newComment, setNewComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [comments, setComments] = useState<CommunityComment[]>([])

  // Load comments when modal opens
  useEffect(() => {
    if (isOpen) {
      loadComments()
    }
  }, [isOpen, post._id])

  const handleNewComment = async () => {
    if (!newComment.trim()) return
    
    setIsSubmitting(true)
    try {
      const response = await communityService.createComment(post._id, {
        content: newComment,
        parentComment: undefined
      })
      
      if (response.success) {
        setNewComment('')
        onCommentAdded()
        toast.success('Comment posted successfully!')
        // Reload comments
        loadComments()
      }
    } catch (error) {
      console.error('Error posting comment:', error)
      toast.error('Failed to post comment')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReply = async (parentCommentId: string, content: string) => {
    try {
      const response = await communityService.createComment(post._id, {
        content,
        parentComment: parentCommentId || undefined
      })
      
      if (response.success) {
        onCommentAdded()
        loadComments()
      }
    } catch (error) {
      console.error('Error creating reply:', error)
      throw error
    }
  }

  const handleLikeComment = async (commentId: string) => {
    try {
      const response = await communityService.likeComment(commentId)
      if (response.success) {
        loadComments()
      } else {
        console.error('Failed to like comment:', response)
        toast.error('Failed to like comment')
      }
    } catch (error) {
      console.error('Error liking comment:', error)
      toast.error('Failed to like comment')
    }
  }

  const handleDislikeComment = async (commentId: string) => {
    try {
      const response = await communityService.dislikeComment(commentId)
      if (response.success) {
        loadComments()
      } else {
        console.error('Failed to dislike comment:', response)
        toast.error('Failed to dislike comment')
      }
    } catch (error) {
      console.error('Error disliking comment:', error)
      toast.error('Failed to dislike comment')
    }
  }

  const loadComments = async () => {
    try {
      const response = await communityService.getPost(post._id)
      if (response.success && response.data) {
        // The API returns the post directly in response.data
        const postData = response.data
        
        // Check if comments are populated or just IDs
        const commentsData = Array.isArray(postData.comments) 
          ? postData.comments.filter(comment => typeof comment === 'object') as CommunityComment[]
          : []
        
        setComments(commentsData)
      } else {
        console.error('Failed to load comments:', response)
        toast.error('Failed to load comments')
      }
    } catch (error) {
      console.error('Error loading comments:', error)
      toast.error('Failed to load comments')
    }
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <MessageSquare className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Comments</h2>
                  <p className="text-sm text-gray-600">{post.title}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* New Comment Form */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Add a Comment
              </label>
              <div className="flex space-x-2">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share your thoughts..."
                  rows={3}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
                <button
                  onClick={handleNewComment}
                  disabled={!newComment.trim() || isSubmitting}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {isSubmitting ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Comments List */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900">
                Comments ({comments.length})
              </h3>
              
              {comments.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <MessageSquare className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                  <p className="text-sm">No comments yet. Be the first to share your thoughts!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {comments
                    .filter(comment => comment && comment._id) // Filter out invalid comments
                    .map((comment, index) => (
                      <CommentItem
                        key={comment._id}
                        comment={comment}
                        onReply={handleReply}
                        onLike={handleLikeComment}
                        onDislike={handleDislikeComment}
                      />
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CommentModal
