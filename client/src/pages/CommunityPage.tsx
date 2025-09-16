import { useState, useEffect } from 'react'
import { MessageSquare, Plus } from 'lucide-react'
import { communityService } from '@services/communityService'
import { CommunityPost, CommunityCategory } from '@types'
import NewPostModal from '@components/community/NewPostModal'
import PostCard from '@components/community/PostCard'

const CommunityPage = () => {
  const [posts, setPosts] = useState<CommunityPost[]>([])
  const [categories, setCategories] = useState<CommunityCategory[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showNewPostModal, setShowNewPostModal] = useState(false)

  useEffect(() => {
    loadData()
  }, [selectedCategory])

  const loadData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Load posts and categories in parallel
      const [postsResponse, categoriesResponse] = await Promise.all([
        communityService.getPosts({
          category: selectedCategory || undefined,
          limit: 20,
          sortBy: 'createdAt',
          sortOrder: 'desc'
        }),
        communityService.getCategories()
      ])

      if (postsResponse.success && postsResponse.data) {
        setPosts(postsResponse.data.posts || [])
      }
      
      if (categoriesResponse.success && categoriesResponse.data) {
        setCategories(categoriesResponse.data || [])
      }
    } catch (err) {
      console.error('Error loading community data:', err)
      setError('Failed to load community posts. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleLikePost = async (postId: string) => {
    try {
      const response = await communityService.likePost(postId)
      if (response.success && response.data) {
        // Update the post in the local state
        setPosts(prevPosts => 
          prevPosts.map(post => 
            post._id === postId 
              ? { 
                  ...post, 
                  likeCount: response.data.likeCount,
                  dislikeCount: response.data.dislikeCount,
                  likes: response.data.isLiked 
                    ? [...post.likes, 'current-user'] // You'd get the actual user ID
                    : post.likes.filter(id => id !== 'current-user')
                }
              : post
          )
        )
      }
    } catch (err) {
      console.error('Error liking post:', err)
    }
  }

  const handleDislikePost = async (postId: string) => {
    try {
      const response = await communityService.dislikePost(postId)
      if (response.success && response.data) {
        // Update the post in the local state
        setPosts(prevPosts => 
          prevPosts.map(post => 
            post._id === postId 
              ? { 
                  ...post, 
                  likeCount: response.data.likeCount,
                  dislikeCount: response.data.dislikeCount,
                  dislikes: response.data.isDisliked 
                    ? [...post.dislikes, 'current-user'] // You'd get the actual user ID
                    : post.dislikes.filter(id => id !== 'current-user')
                }
              : post
          )
        )
      }
    } catch (err) {
      console.error('Error disliking post:', err)
    }
  }

  const handleViewPost = (postId: string) => {
    // Navigate to post detail page or open modal
    console.log('View post:', postId)
  }

  const handleNewPostSuccess = () => {
    // Refresh posts to show the new post
    loadData()
  }


  if (loading) {
    return (
      <div className="h-[calc(100vh-64px)] w-full bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-hidden">
        <div className="h-full w-full flex flex-col">
          <div className="flex-shrink-0 px-4 py-3 border-b border-gray-200 bg-white/90 backdrop-blur-sm">
            <h1 className="text-xl font-prata font-bold text-gray-900">Community</h1>
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
            <h1 className="text-xl font-prata font-bold text-gray-900">Community</h1>
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
              <h1 className="text-xl font-prata font-bold text-gray-900">Community</h1>
            </div>
            <button 
              onClick={() => setShowNewPostModal(true)}
              className="inline-flex items-center px-3 py-1.5 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors duration-200"
            >
              <Plus className="h-4 w-4 mr-1" />
              New Post
            </button>
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
                    All Topics
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.value}
                      onClick={() => setSelectedCategory(category.value)}
                      className={`w-full text-left px-3 py-2 text-xs rounded transition-colors duration-200 ${
                        selectedCategory === category.value 
                          ? 'bg-primary-100 text-primary-800' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Posts List - Takes most space */}
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex-1 bg-white overflow-hidden">
              <div className="h-full flex flex-col">
                <div className="flex-shrink-0 px-4 py-3 border-b border-gray-200">
                  <h2 className="text-sm font-semibold text-gray-900">Community Posts</h2>
                </div>
                <div className="flex-1 overflow-y-auto min-h-0">
                  <div className="p-4">
                    {posts.length === 0 ? (
                      <div className="text-center py-8">
                        <MessageSquare className="h-8 w-8 text-gray-400 mx-auto mb-3" />
                        <p className="text-sm text-gray-600">No posts found. Be the first to start a discussion!</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {posts.map((post) => (
                          <PostCard
                            key={post._id}
                            post={post}
                            categories={categories}
                            onLike={handleLikePost}
                            onDislike={handleDislikePost}
                            onView={handleViewPost}
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

        {/* New Post Modal */}
        <NewPostModal
          isOpen={showNewPostModal}
          onClose={() => setShowNewPostModal(false)}
          onSuccess={handleNewPostSuccess}
        />
      </div>
    </div>
  )
}

export default CommunityPage
