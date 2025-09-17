import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Users, MessageSquare, Eye, Clock, Heart, ThumbsDown } from 'lucide-react'
import { communityService } from '@services/communityService'
import { CommunityPost, CommunityComment } from '@types'
import CommentSection from '@components/community/CommentSection'

const PostDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [post, setPost] = useState<CommunityPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (id) {
      loadPost()
    }
  }, [id])

  const loadPost = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await communityService.getPost(id!)
      if (response.success && response.data) {
        setPost(response.data.post)
      } else {
        setError('Post not found')
      }
    } catch (err) {
      console.error('Error loading post:', err)
      setError('Failed to load post')
    } finally {
      setLoading(false)
    }
  }

  const handleReply = async (parentCommentId: string, content: string) => {
    try {
      const response = await communityService.createComment(id!, {
        content,
        parentComment: parentCommentId || undefined
      })
      
      if (response.success) {
        // Reload the post to get updated comments
        await loadPost()
      }
    } catch (error) {
      console.error('Error creating comment:', error)
      throw error
    }
  }

  const handleLikeComment = async (commentId: string) => {
    try {
      await communityService.likeComment(commentId)
      // Reload the post to get updated comment data
      await loadPost()
    } catch (error) {
      console.error('Error liking comment:', error)
    }
  }

  const handleDislikeComment = async (commentId: string) => {
    try {
      await communityService.dislikeComment(commentId)
      // Reload the post to get updated comment data
      await loadPost()
    } catch (error) {
      console.error('Error disliking comment:', error)
    }
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
    
    if (diffInSeconds < 60) return 'Just now'
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`
    return `${Math.floor(diffInSeconds / 86400)}d`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h1>
            <p className="text-gray-600 mb-6">{error || 'The post you\'re looking for doesn\'t exist.'}</p>
            <button
              onClick={() => navigate('/community')}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Community
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/community')}
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Community
        </button>

        {/* Post Header */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center mb-3 space-x-2">
                <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                  {post.category}
                </span>
                {post.isPinned && (
                  <span className="inline-flex items-center px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">
                    Pinned
                  </span>
                )}
              </div>
              
              <h1 className="text-2xl font-bold text-gray-900 mb-4">{post.title}</h1>
              
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center space-x-1">
                  <div className="h-6 w-6 bg-blue-600 rounded-full flex items-center justify-center">
                    <Users className="h-3 w-3 text-white" />
                  </div>
                  <span className="font-medium">{post.author?.firstName || 'Unknown'} {post.author?.lastName || 'User'}</span>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{formatTimeAgo(post.createdAt)}</span>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Eye className="h-4 w-4" />
                  <span>{post.views} views</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{post.content}</p>
          </div>
          
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-1 text-gray-600 hover:text-red-500 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors">
                <Heart className="h-4 w-4" />
                <span className="text-sm font-medium">{post.likeCount}</span>
              </button>
              
              <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors">
                <ThumbsDown className="h-4 w-4" />
                <span className="text-sm font-medium">{post.dislikeCount}</span>
              </button>
            </div>
            
            <div className="flex items-center space-x-1 text-sm text-gray-600">
              <MessageSquare className="h-4 w-4" />
              <span>{post.commentCount} {post.commentCount === 1 ? 'comment' : 'comments'}</span>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <CommentSection
          comments={post.comments || []}
          onReply={handleReply}
          onLike={handleLikeComment}
          onDislike={handleDislikeComment}
        />
      </div>
    </div>
  )
}

export default PostDetailPage
