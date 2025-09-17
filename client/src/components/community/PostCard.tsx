import { Heart, ThumbsDown, MessageSquare, Eye, Clock, Users, Reply } from 'lucide-react'
import { CommunityPost, CommunityCategory } from '@types'

interface PostCardProps {
  post: CommunityPost
  categories: CommunityCategory[]
  onLike: (postId: string) => void
  onDislike: (postId: string) => void
  onView: (postId: string) => void
  onComment?: (postId: string) => void
}

const PostCard = ({ post, categories, onLike, onDislike, onView, onComment }: PostCardProps) => {
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
    
    if (diffInSeconds < 60) return 'Just now'
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`
    return `${Math.floor(diffInSeconds / 86400)}d`
  }

  const getAuthorName = (post: CommunityPost) => {
    if (post.isAnonymous) return 'Anonymous'
    return `${post.author?.firstName || 'Unknown'} ${post.author?.lastName || 'User'}`
  }

  const getCategoryLabel = (categoryValue: string) => {
    const category = categories.find(cat => cat.value === categoryValue)
    return category?.label || categoryValue
  }

  return (
    <div
      className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200 cursor-pointer"
      onClick={() => onView(post._id)}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center mb-2 space-x-2">
            {post.isPinned && (
              <span className="inline-flex items-center px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">
                Pinned
              </span>
            )}
            <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
              {getCategoryLabel(post.category)}
            </span>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {post.title}
          </h3>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-3">
            {post.content}
          </p>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <div className="h-6 w-6 bg-blue-600 rounded-full flex items-center justify-center">
              <Users className="h-3 w-3 text-white" />
            </div>
            <span className="font-medium">{getAuthorName(post)}</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <MessageSquare className="h-4 w-4" />
            <span>{post.commentCount}</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <Eye className="h-4 w-4" />
            <span>{post.views}</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{formatTimeAgo(post.createdAt)}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onLike(post._id)
            }}
            className="flex items-center space-x-1 px-2 py-1 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
          >
            <Heart className="h-4 w-4" />
            <span className="text-sm">{post.likeCount}</span>
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation()
              onDislike(post._id)
            }}
            className="flex items-center space-x-1 px-2 py-1 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded transition-colors"
          >
            <ThumbsDown className="h-4 w-4" />
            <span className="text-sm">{post.dislikeCount}</span>
          </button>

          {onComment && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onComment(post._id)
              }}
              className="flex items-center space-x-1 px-2 py-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
            >
              <Reply className="h-4 w-4" />
              <span className="text-sm">Reply</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default PostCard
