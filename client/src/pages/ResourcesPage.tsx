import { useState, useEffect } from 'react'
import { Search, Filter, BookOpen, Play, FileText, Image, TrendingUp, Star, AlertCircle, RefreshCw } from 'lucide-react'
import { resourceService, Resource, ResourceCategory } from '@services/resourceService'
import ResourceCard from '@components/resources/ResourceCard'
import VideoPlayerModal from '@components/resources/VideoPlayerModal'
import toast from 'react-hot-toast'

const ResourcesPage = () => {
  const [resources, setResources] = useState<Resource[]>([])
  const [categories, setCategories] = useState<ResourceCategory[]>([
    { _id: '1', name: 'Anxiety', description: 'Resources for anxiety management', isActive: true, createdAt: '', updatedAt: '' },
    { _id: '2', name: 'Depression', description: 'Resources for depression support', isActive: true, createdAt: '', updatedAt: '' },
    { _id: '3', name: 'Stress Management', description: 'Stress relief techniques', isActive: true, createdAt: '', updatedAt: '' },
    { _id: '4', name: 'Relationships', description: 'Relationship guidance', isActive: true, createdAt: '', updatedAt: '' },
    { _id: '5', name: 'Self-Help', description: 'Self-improvement resources', isActive: true, createdAt: '', updatedAt: '' },
    { _id: '6', name: 'Crisis Support', description: 'Emergency support resources', isActive: true, createdAt: '', updatedAt: '' }
  ])
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedType, setSelectedType] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Video player state
  const [showVideoPlayer, setShowVideoPlayer] = useState(false)
  const [currentVideo, setCurrentVideo] = useState<{
    url: string
    title: string
    description?: string
    isYouTube?: boolean
  } | null>(null)

  useEffect(() => {
    loadData()
  }, [selectedCategory, selectedType, searchQuery])

  const loadData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Load resources and categories in parallel
      const [resourcesResponse, categoriesResponse] = await Promise.all([
        resourceService.getResources({
          category: selectedCategory || undefined,
          type: selectedType || undefined,
          search: searchQuery || undefined,
          limit: 20,
          sortBy: 'createdAt',
          sortOrder: 'desc'
        }),
        resourceService.getCategories()
      ])

      if (resourcesResponse.success && resourcesResponse.data) {
        setResources(resourcesResponse.data.resources || [])
      }
      
      if (categoriesResponse.success && categoriesResponse.data) {
        setCategories(categoriesResponse.data || [])
      }
    } catch (err) {
      console.error('Error loading resources data:', err)
      setError('Failed to load resources. Please try again.')
    } finally {
      setLoading(false)
    }
  }


  const handleViewResource = (resourceId: string) => {
    const resource = resources.find(r => r._id === resourceId)
    if (!resource) {
      toast.error('Resource not found')
      return
    }

    if (resource.type === 'video') {
      // Handle video playback
      if (resource.fileUrl) {
        let videoUrl = resource.fileUrl
        let isYouTubeVideo = false
        
        // Check if it's a YouTube URL and convert to embed format
        if (resource.fileUrl.includes('youtube.com') || resource.fileUrl.includes('youtu.be')) {
          const videoId = extractYouTubeVideoId(resource.fileUrl)
          if (videoId) {
            videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`
            isYouTubeVideo = true
          } else {
            toast.error('Invalid YouTube URL format')
            return
          }
        }
        
        // Open video in modal
        setCurrentVideo({
          url: videoUrl,
          title: resource.title,
          description: resource.description,
          isYouTube: isYouTubeVideo
        })
        setShowVideoPlayer(true)
      } else {
        toast.error('Video URL not available')
      }
    } else {
      // For other resource types, open in new tab
      if (resource.fileUrl) {
        window.open(resource.fileUrl, '_blank')
      } else {
        toast.error('Resource file not available')
      }
    }
  }

  const extractYouTubeVideoId = (url: string): string | null => {
    // Handle various YouTube URL formats
    const patterns = [
      /(?:youtube\.com\/watch\?v=)([^&\n?#]+)/,
      /(?:youtu\.be\/)([^&\n?#]+)/,
      /(?:youtube\.com\/embed\/)([^&\n?#]+)/,
      /(?:youtube\.com\/v\/)([^&\n?#]+)/
    ]
    
    for (const pattern of patterns) {
      const match = url.match(pattern)
      if (match && match[1]) {
        return match[1]
      }
    }
    
    return null
  }


  const resourceTypes = [
    { value: '', label: 'All Types' },
    { value: 'article', label: 'Articles' },
    { value: 'video', label: 'Videos' },
    { value: 'worksheet', label: 'Worksheets' },
    { value: 'audio', label: 'Audio' },
    { value: 'infographic', label: 'Infographics' }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="h-full w-full flex flex-col">
          <div className="flex-shrink-0 px-6 py-4 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen className="h-4 w-4 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-light text-gray-900">Resources</h1>
                <p className="text-lg text-gray-600">Mental health resources and tools</p>
              </div>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading resources...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="h-full w-full flex flex-col">
          <div className="flex-shrink-0 px-6 py-4 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen className="h-4 w-4 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-light text-gray-900">Resources</h1>
                <p className="text-lg text-gray-600">Mental health resources and tools</p>
              </div>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="h-16 w-16 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-lg font-light text-gray-900 mb-2">Error loading resources</h3>
              <p className="text-gray-600 mb-6">{error}</p>
              <button 
                onClick={loadData}
                className="inline-flex items-center px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors duration-200"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="h-full w-full flex flex-col">
        {/* Header */}
        <div className="flex-shrink-0 px-4 py-3 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen className="h-4 w-4 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-light text-gray-900">Resources</h1>
                <p className="text-lg text-gray-600">Mental health resources and tools</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-48 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              {/* Type Filter */}
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Types</option>
                {resourceTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden min-h-0">
          {/* Categories Sidebar */}
          <div className="w-64 flex-shrink-0 bg-white/80 backdrop-blur-sm border-r border-gray-200 flex flex-col">
            <div className="flex-shrink-0 px-4 py-3 border-b border-gray-200">
              <h2 className="text-xl font-light text-gray-900 flex items-center">
                <TrendingUp className="h-4 w-4 mr-2 text-blue-600" />
                Categories
              </h2>
            </div>
            <div className="flex-1 overflow-y-auto">
              <div className="p-3 space-y-1">
                <button
                  onClick={() => setSelectedCategory('')}
                  className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                    selectedCategory === '' 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  All Resources
                </button>
                {categories && categories.length > 0 && categories.map((category) => (
                  <button
                    key={category._id}
                    onClick={() => setSelectedCategory(category._id)}
                    className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                      selectedCategory === category._id 
                        ? 'bg-blue-600 text-white' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Resources Area */}
          <div className="flex-1 flex flex-col min-h-0 bg-white/80 backdrop-blur-sm">
            <div className="flex-shrink-0 px-4 py-3 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-light text-gray-900 flex items-center">
                  <BookOpen className="h-4 w-4 mr-2 text-blue-600" />
                  {selectedCategory && categories ? 
                    (categories.find(cat => cat._id === selectedCategory)?.name || 'Selected') + ' Resources' : 
                    'All Resources'
                  }
                </h2>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">{resources.length} resources</span>
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              <div className="p-4">
                {!resources || resources.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="h-16 w-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <BookOpen className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-light text-gray-900 mb-2">No resources found</h3>
                    <p className="text-lg text-gray-600 mb-6">Try adjusting your search or filters</p>
                    <button 
                      onClick={() => {
                        setSearchQuery('')
                        setSelectedCategory('')
                        setSelectedType('')
                      }}
                      className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      Clear Filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                    {resources.map((resource) => (
                      <ResourceCard
                        key={resource._id}
                        resource={resource}
                        onView={handleViewResource}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Player Modal */}
      {currentVideo && (
        <VideoPlayerModal
          isOpen={showVideoPlayer}
          onClose={() => {
            setShowVideoPlayer(false)
            setCurrentVideo(null)
          }}
          videoUrl={currentVideo.url}
          title={currentVideo.title}
          description={currentVideo.description}
          isYouTube={currentVideo.isYouTube}
        />
      )}
    </div>
  )
}

export default ResourcesPage
