import { motion } from 'framer-motion'
import { Heart, ThumbsDown, MessageSquare, Eye, Clock, Users } from 'lucide-react'
import { CommunityPost, CommunityCategory } from '@types'

interface PostCardProps {
  post: CommunityPost
  categories: CommunityCategory[]
  onLike: (postId: string) => void
  onDislike: (postId: string) => void
  onView: (postId: string) => void
}

const PostCard = ({ post, categories, onLike, onDislike, onView }: PostCardProps) => {
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
    return `${post.author.firstName} ${post.author.lastName}`
  }

  const getCategoryLabel = (categoryValue: string) => {
    const category = categories.find(cat => cat.value === categoryValue)
    return category?.label || categoryValue
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.002 }}
      className="bg-white border rounded-lg p-3 hover:shadow-sm transition-all duration-200 cursor-pointer"
      onClick={() => onView(post._id)}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center mb-1">
            {post.isPinned && (
              <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-1.5 py-0.5 rounded-full mr-2">
                Pinned
              </span>
            )}
            <span className="bg-primary-100 text-primary-800 text-xs font-medium px-1.5 py-0.5 rounded-full">
              {getCategoryLabel(post.category)}
            </span>
          </div>
          
          <h3 className="text-sm font-semibold text-gray-900 mb-1 hover:text-primary-600 transition-colors truncate">
            {post.title}
          </h3>
          
          <p className="text-gray-600 text-xs mb-2 line-clamp-2">
            {post.content}
          </p>
          
          <div className="flex items-center justify-between text-xs text-gray-600">
            <div className="flex items-center space-x-3">
              <span className="flex items-center">
                <Users className="h-3 w-3 mr-0.5" />
                {getAuthorName(post)}
              </span>
              <span className="flex items-center">
                <MessageSquare className="h-3 w-3 mr-0.5" />
                {post.commentCount}
              </span>
              <span className="flex items-center">
                <Eye className="h-3 w-3 mr-0.5" />
                {post.views}
              </span>
              <span className="flex items-center">
                <Clock className="h-3 w-3 mr-0.5" />
                {formatTimeAgo(post.createdAt)}
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onLike(post._id)
                }}
                className="flex items-center text-gray-600 hover:text-red-600 transition-colors"
              >
                <Heart className="h-3 w-3 mr-0.5" />
                {post.likeCount}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onDislike(post._id)
                }}
                className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ThumbsDown className="h-3 w-3 mr-0.5" />
                {post.dislikeCount}
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default PostCard
