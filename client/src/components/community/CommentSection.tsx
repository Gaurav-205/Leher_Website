import { useState } from 'react'
import { MessageSquare, Reply, Heart, ThumbsDown, Clock, Users } from 'lucide-react'
import { CommunityComment } from '@types'

interface CommentSectionProps {
  comments: CommunityComment[]
  onReply: (parentCommentId: string, content: string) => void
  onLike: (commentId: string) => void
  onDislike: (commentId: string) => void
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
    } catch (error) {
      console.error('Error replying to comment:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const maxLevel = 3 // Maximum nesting level
  const isMaxLevel = level >= maxLevel

  return (
    <div className={`${level > 0 ? 'ml-6 border-l-2 border-gray-200 pl-4' : ''}`}>
      {/* Main Comment */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-3">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
              <Users className="h-4 w-4 text-white" />
            </div>
            <div>
              <span className="font-medium text-gray-900">
                {comment.author?.firstName || 'Unknown'} {comment.author?.lastName || 'User'}
              </span>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Clock className="h-3 w-3" />
                <span>{formatTimeAgo(comment.createdAt)}</span>
                {comment.isEdited && (
                  <span className="text-xs text-gray-400">(edited)</span>
                )}
              </div>
            </div>
          </div>
        </div>

        <p className="text-gray-700 mb-3">{comment.content}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onLike(comment._id)}
              className="flex items-center space-x-1 text-gray-600 hover:text-red-500 hover:bg-red-50 px-2 py-1 rounded transition-colors"
            >
              <Heart className="h-4 w-4" />
              <span className="text-sm">{comment.likeCount}</span>
            </button>
            
            <button
              onClick={() => onDislike(comment._id)}
              className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 hover:bg-gray-100 px-2 py-1 rounded transition-colors"
            >
              <ThumbsDown className="h-4 w-4" />
              <span className="text-sm">{comment.dislikeCount}</span>
            </button>

            {!isMaxLevel && (
              <button
                onClick={() => setShowReplyForm(!showReplyForm)}
                className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded transition-colors"
              >
                <Reply className="h-4 w-4" />
                <span className="text-sm">Reply</span>
              </button>
            )}
          </div>

          {comment.replyCount > 0 && (
            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <MessageSquare className="h-4 w-4" />
              <span>{comment.replyCount} {comment.replyCount === 1 ? 'reply' : 'replies'}</span>
            </div>
          )}
        </div>
      </div>

      {/* Reply Form */}
      {showReplyForm && !isMaxLevel && (
        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reply to {comment.author?.firstName || 'Unknown'} {comment.author?.lastName || 'User'}
            </label>
            <textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Write your reply..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleReply}
              disabled={!replyContent.trim() || isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Posting...' : 'Post Reply'}
            </button>
            <button
              onClick={() => {
                setShowReplyForm(false)
                setReplyContent('')
              }}
              className="px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Nested Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="space-y-3">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply._id}
              comment={reply}
              onReply={onReply}
              onLike={onLike}
              onDislike={onDislike}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  )
}

const CommentSection = ({ comments, onReply, onLike, onDislike }: CommentSectionProps) => {
  const [newComment, setNewComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleNewComment = async () => {
    if (!newComment.trim()) return
    
    setIsSubmitting(true)
    try {
      await onReply('', newComment) // Empty string means it's a top-level comment
      setNewComment('')
    } catch (error) {
      console.error('Error posting comment:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* New Comment Form */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Add a Comment</h3>
        <div className="mb-3">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your thoughts..."
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>
        <button
          onClick={handleNewComment}
          disabled={!newComment.trim() || isSubmitting}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Posting...' : 'Post Comment'}
        </button>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <MessageSquare className="h-5 w-5 mr-2 text-blue-600" />
          Comments ({comments.length})
        </h3>
        
        {comments.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <MessageSquare className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p>No comments yet. Be the first to share your thoughts!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => (
              <CommentItem
                key={comment._id}
                comment={comment}
                onReply={onReply}
                onLike={onLike}
                onDislike={onDislike}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default CommentSection
