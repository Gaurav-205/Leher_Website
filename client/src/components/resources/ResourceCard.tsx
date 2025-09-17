import { BookOpen, Play, FileText, Image, Star } from 'lucide-react'
import { Resource } from '@services/resourceService'

interface ResourceCardProps {
  resource: Resource
  onView: (resourceId: string) => void
}

const ResourceCard = ({ resource, onView }: ResourceCardProps) => {
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
    <div
      className="bg-white/80 backdrop-blur-sm border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer group"
      onClick={() => onView(resource._id)}
    >
      {/* Thumbnail */}
      <div className="aspect-video bg-gray-100 flex items-center justify-center relative overflow-hidden">
        {resource.thumbnail ? (
          <img 
            src={resource.thumbnail} 
            alt={resource.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-center">
            <TypeIcon className="h-8 w-8 text-gray-400 mx-auto mb-1" />
            <p className="text-xs text-gray-500 capitalize">{resource.type}</p>
          </div>
        )}
        
        {/* Featured Badge */}
        {resource.isFeatured && (
          <div className="absolute top-2 left-2">
            <span className="inline-flex items-center px-2 py-1 bg-yellow-500 text-white text-xs font-medium rounded">
              <Star className="h-3 w-3 mr-1" />
              Featured
            </span>
          </div>
        )}
        
        {/* Type Badge */}
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-1 text-xs font-medium rounded ${getTypeColor(resource.type)}`}>
            {resource.type}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Category and Difficulty */}
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
            {resource.category.name}
          </span>
          <span className={`text-xs font-medium px-2 py-1 rounded ${getDifficultyColor(resource.difficulty)}`}>
            {resource.difficulty}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-medium text-gray-900 line-clamp-2">
          {resource.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2">
          {resource.description}
        </p>

        {/* Language */}
        <div className="flex items-center justify-end">
          <span className="text-xs text-gray-500">{resource.language}</span>
        </div>
      </div>
    </div>
  )
}

export default ResourceCard
