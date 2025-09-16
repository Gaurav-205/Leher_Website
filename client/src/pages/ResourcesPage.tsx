import { useState, useEffect } from 'react'
import { Search, Filter, BookOpen, Play, FileText, Image } from 'lucide-react'
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
      // Use dummy data if API fails
      setResources([
        {
          _id: '1',
          title: 'Understanding Anxiety: A Complete Guide',
          description: 'A comprehensive guide to understanding anxiety disorders and coping strategies.',
          content: '',
          type: 'article',
          category: { _id: '1', name: 'Anxiety', description: '', isActive: true, createdAt: '', updatedAt: '' },
          language: 'English',
          difficulty: 'beginner',
          duration: 15,
          thumbnail: '/api/placeholder/300/200',
          tags: ['anxiety', 'mental-health'],
          isPublished: true,
          isFeatured: false,
          views: 1250,
          downloads: 340,
          likes: [],
          author: { _id: '1', firstName: 'Dr.', lastName: 'Smith' },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          likeCount: 45
        },
        {
          _id: '2',
          title: 'Meditation Techniques for Stress Relief',
          description: 'Learn effective meditation techniques to manage stress and anxiety.',
          content: '',
          type: 'video',
          category: { _id: '2', name: 'Stress Management', description: '', isActive: true, createdAt: '', updatedAt: '' },
          language: 'Hindi',
          difficulty: 'intermediate',
          duration: 20,
          thumbnail: '/api/placeholder/300/200',
          tags: ['meditation', 'stress'],
          isPublished: true,
          isFeatured: true,
          views: 890,
          downloads: 120,
          likes: [],
          author: { _id: '2', firstName: 'Dr.', lastName: 'Patel' },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          likeCount: 32
        },
        {
          _id: '3',
          title: 'Building Resilience Worksheet',
          description: 'Interactive worksheet to help build emotional resilience and coping skills.',
          content: '',
          type: 'worksheet',
          category: { _id: '3', name: 'Self-Help', description: '', isActive: true, createdAt: '', updatedAt: '' },
          language: 'English',
          difficulty: 'beginner',
          duration: 30,
          thumbnail: '/api/placeholder/300/200',
          tags: ['resilience', 'worksheet'],
          isPublished: true,
          isFeatured: false,
          views: 650,
          downloads: 280,
          likes: [],
          author: { _id: '3', firstName: 'Dr.', lastName: 'Johnson' },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          likeCount: 28
        }
      ] as Resource[])
    } finally {
      setLoading(false)
    }
  }

  const handleLikeResource = async (resourceId: string) => {
    try {
      const response = await resourceService.likeResource(resourceId)
      if (response.success && response.data) {
        setResources(prevResources => 
          prevResources.map(resource => 
            resource._id === resourceId 
              ? { 
                  ...resource, 
                  likeCount: response.data.likeCount,
                  likes: response.data.isLiked 
                    ? [...resource.likes, 'current-user']
                    : resource.likes.filter(id => id !== 'current-user')
                }
              : resource
          )
        )
      }
    } catch (err) {
      console.error('Error liking resource:', err)
      toast.error('Failed to like resource')
    }
  }

  const handleDownloadResource = async (resourceId: string) => {
    try {
      const response = await resourceService.downloadResource(resourceId)
      if (response.success && response.data) {
        // Update download count
        setResources(prevResources => 
          prevResources.map(resource => 
            resource._id === resourceId 
              ? { ...resource, downloads: response.data.downloadCount }
              : resource
          )
        )
        toast.success('Resource downloaded successfully!')
      }
    } catch (err) {
      console.error('Error downloading resource:', err)
      toast.error('Failed to download resource')
    }
  }

  const handleViewResource = (resourceId: string) => {
    // Navigate to resource detail page or open modal
    console.log('View resource:', resourceId)
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
      <div className="h-[calc(100vh-64px)] w-full bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-hidden">
        <div className="h-full w-full flex flex-col">
          <div className="flex-shrink-0 px-4 py-3 border-b border-gray-200 bg-white/90 backdrop-blur-sm">
            <h1 className="text-xl font-prata font-bold text-gray-900">Resources</h1>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="h-[calc(100vh-64px)] w-full bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-hidden">
        <div className="h-full w-full flex flex-col">
          <div className="flex-shrink-0 px-4 py-3 border-b border-gray-200 bg-white/90 backdrop-blur-sm">
            <h1 className="text-xl font-prata font-bold text-gray-900">Resources</h1>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <p className="text-red-600 mb-4 text-sm">{error}</p>
              <button 
                onClick={loadData}
                className="px-4 py-2 bg-primary-600 text-white text-sm rounded-lg hover:bg-primary-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-[calc(100vh-64px)] w-full bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-hidden">
      <div className="h-full w-full flex flex-col">
        {/* Compact Header */}
        <div className="flex-shrink-0 px-4 py-3 border-b border-gray-200 bg-white/90 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-prata font-bold text-gray-900">Resources</h1>
            </div>
            <div className="flex items-center space-x-2">
              {/* Search */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-48 pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              {/* Type Filter */}
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {resourceTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Main Content - Single Frame */}
        <div className="flex-1 flex overflow-hidden min-h-0">
          {/* Categories Sidebar */}
          <div className="w-64 flex-shrink-0 bg-white border-r border-gray-200 overflow-hidden">
            <div className="h-full flex flex-col">
              <div className="flex-shrink-0 px-4 py-3 border-b border-gray-200">
                <h2 className="text-sm font-semibold text-gray-900">Categories</h2>
              </div>
              <div className="flex-1 overflow-y-auto min-h-0">
                <div className="p-3 space-y-1">
                  <button
                    onClick={() => setSelectedCategory('')}
                    className={`w-full text-left px-3 py-2 text-xs rounded transition-colors duration-200 ${
                      selectedCategory === '' 
                        ? 'bg-primary-100 text-primary-800' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    All Resources
                  </button>
                  {categories && categories.length > 0 && categories.map((category) => (
                    <button
                      key={category._id}
                      onClick={() => setSelectedCategory(category._id)}
                      className={`w-full text-left px-3 py-2 text-xs rounded transition-colors duration-200 ${
                        selectedCategory === category._id 
                          ? 'bg-primary-100 text-primary-800' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Resources Grid - Takes most space */}
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex-1 bg-white overflow-hidden">
              <div className="h-full flex flex-col">
                <div className="flex-shrink-0 px-4 py-3 border-b border-gray-200">
                  <h2 className="text-sm font-semibold text-gray-900">
                    {selectedCategory && categories ? 
                      (categories.find(cat => cat._id === selectedCategory)?.name || 'Selected') + ' Resources' : 
                      'All Resources'
                    }
                  </h2>
                </div>
                <div className="flex-1 overflow-y-auto min-h-0">
                  <div className="p-4">
                    {!resources || resources.length === 0 ? (
                      <div className="text-center py-8">
                        <BookOpen className="h-8 w-8 text-gray-400 mx-auto mb-3" />
                        <p className="text-sm text-gray-600">No resources found. Try adjusting your filters.</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                        {resources.map((resource) => (
                          <ResourceCard
                            key={resource._id}
                            resource={resource}
                            onView={handleViewResource}
                            onLike={handleLikeResource}
                            onDownload={handleDownloadResource}
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
      </div>
    </div>
  )
}

export default ResourcesPage
