import { motion } from 'framer-motion'
import { BookOpen, Play, FileText, Image, Download, Heart, Eye, Clock } from 'lucide-react'
import { Resource } from '@services/resourceService'

interface ResourceCardProps {
  resource: Resource
  onView: (resourceId: string) => void
  onLike: (resourceId: string) => void
  onDownload: (resourceId: string) => void
}

const ResourceCard = ({ resource, onView, onLike, onDownload }: ResourceCardProps) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return Play
      case 'article':
        return FileText
      case 'worksheet':
        return BookOpen
      case 'audio':
        return Play
      case 'infographic':
        return Image
      default:
        return FileText
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video':
        return 'bg-red-100 text-red-800'
      case 'article':
        return 'bg-blue-100 text-blue-800'
      case 'worksheet':
        return 'bg-green-100 text-green-800'
      case 'audio':
        return 'bg-purple-100 text-purple-800'
      case 'infographic':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800'
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800'
      case 'advanced':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const TypeIcon = getTypeIcon(resource.type)

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white border rounded-lg p-3 hover:shadow-md transition-all duration-200 cursor-pointer"
      onClick={() => onView(resource._id)}
    >
      {/* Thumbnail */}
      <div className="aspect-video bg-gray-100 rounded-lg mb-2 flex items-center justify-center relative overflow-hidden">
        {resource.thumbnail ? (
          <img 
            src={resource.thumbnail} 
            alt={resource.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <TypeIcon className="h-8 w-8 text-gray-400" />
        )}
        <div className="absolute top-1 right-1">
          <span className={`px-1.5 py-0.5 text-xs font-medium rounded ${getTypeColor(resource.type)}`}>
            {resource.type}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2">
        {/* Category and Difficulty */}
        <div className="flex items-center justify-between">
          <span className="bg-primary-100 text-primary-800 text-xs font-medium px-1.5 py-0.5 rounded-full">
            {resource.category.name}
          </span>
          <span className={`text-xs font-medium px-1.5 py-0.5 rounded-full ${getDifficultyColor(resource.difficulty)}`}>
            {resource.difficulty}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 hover:text-primary-600 transition-colors">
          {resource.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-gray-600 line-clamp-2">
          {resource.description}
        </p>

        {/* Meta Info */}
        <div className="flex items-center justify-between text-xs text-gray-600">
          <div className="flex items-center space-x-2">
            {resource.duration && (
              <span className="flex items-center">
                <Clock className="h-3 w-3 mr-0.5" />
                {resource.duration}m
              </span>
            )}
            <span className="flex items-center">
              <Eye className="h-3 w-3 mr-0.5" />
              {resource.views}
            </span>
          </div>
          <span className="text-xs text-gray-500">{resource.language}</span>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-1">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onLike(resource._id)
            }}
            className="flex items-center text-gray-600 hover:text-red-600 transition-colors"
          >
            <Heart className="h-3 w-3 mr-0.5" />
            <span className="text-xs">{resource.likeCount}</span>
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation()
              onDownload(resource._id)
            }}
            className="flex items-center text-gray-600 hover:text-primary-600 transition-colors"
          >
            <Download className="h-3 w-3 mr-0.5" />
            <span className="text-xs">Download</span>
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default ResourceCard
