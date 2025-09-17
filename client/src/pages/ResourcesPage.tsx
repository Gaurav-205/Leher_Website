import { useState, useEffect } from 'react'
import { Search, Filter, BookOpen, Play, FileText, Image, TrendingUp, Star, AlertCircle, RefreshCw } from 'lucide-react'
import { resourceService, Resource, ResourceCategory } from '@services/resourceService'
import ResourceCard from '@components/resources/ResourceCard'
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
    if (!resource) return

    if (resource.type === 'video') {
      // For YouTube videos, extract the video ID and create embedded player
      if (resource.fileUrl && resource.fileUrl.includes('youtube.com')) {
        const videoId = extractYouTubeVideoId(resource.fileUrl)
        if (videoId) {
          // Open video in a modal or new page with embedded player
          openVideoPlayer(videoId, resource.title)
        }
      } else {
        // For local videos, play directly
        openVideoPlayer(resource.fileUrl, resource.title)
      }
    } else {
      // For other resource types, open in new tab or modal
      if (resource.fileUrl) {
        window.open(resource.fileUrl, '_blank')
      }
    }
  }

  const extractYouTubeVideoId = (url: string): string | null => {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/
    const match = url.match(regex)
    return match ? match[1] : null
  }

  const openVideoPlayer = (videoId: string, title: string) => {
    // Create a modal or navigate to video player page
    // For now, we'll open in a new tab with embedded player
    let embedUrl: string
    
    if (videoId.startsWith('http')) {
      // If it's a full URL, extract the video ID and create embed URL
      const extractedId = extractYouTubeVideoId(videoId)
      embedUrl = extractedId ? `https://www.youtube.com/embed/${extractedId}` : videoId
    } else {
      // If it's just a video ID, create embed URL
      embedUrl = `https://www.youtube.com/embed/${videoId}`
    }
    
    const playerWindow = window.open('', '_blank', 'width=900,height=700')
    if (playerWindow) {
      playerWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>${title}</title>
          <style>
            body { 
              margin: 0; 
              padding: 20px; 
              background: #000; 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            }
            .container { 
              max-width: 900px; 
              margin: 0 auto; 
              background: #1a1a1a;
              border-radius: 8px;
              overflow: hidden;
            }
            h1 { 
              color: white; 
              text-align: center; 
              margin: 0;
              padding: 20px;
              background: #2a2a2a;
              font-size: 18px;
              font-weight: 600;
            }
            .video-container {
              position: relative;
              width: 100%;
              height: 0;
              padding-bottom: 56.25%; /* 16:9 aspect ratio */
            }
            iframe { 
              position: absolute;
              top: 0;
              left: 0;
              width: 100%; 
              height: 100%; 
              border: none; 
            }
            .error-message {
              color: #ff6b6b;
              text-align: center;
              padding: 40px;
              background: #2a2a2a;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>${title}</h1>
            <div class="video-container">
              <iframe 
                src="${embedUrl}" 
                frameborder="0" 
                allowfullscreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                onerror="this.parentElement.innerHTML='<div class=\\"error-message\\">Video could not be loaded. Please try again later.</div>'"
              ></iframe>
            </div>
          </div>
        </body>
        </html>
      `)
    }
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
    </div>
  )
}

export default ResourcesPage
