import { useState, useEffect } from 'react'
import { MessageSquare, Plus, Users, TrendingUp } from 'lucide-react'
import { communityService } from '@services/communityService'
import { CommunityPost, CommunityCategory } from '@types'
import NewPostModal from '@components/community/NewPostModal'
import PostCard from '@components/community/PostCard'
import CommentModal from '@components/community/CommentModal'

const CommunityPage = () => {
  const [posts, setPosts] = useState<CommunityPost[]>([])
  const [categories, setCategories] = useState<CommunityCategory[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showNewPostModal, setShowNewPostModal] = useState(false)
  const [showCommentModal, setShowCommentModal] = useState(false)
  const [selectedPost, setSelectedPost] = useState<CommunityPost | null>(null)

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
      } else {
        console.error('Failed to like post:', response)
      }
    } catch (err) {
      console.error('Error liking post:', err)
      setError('Failed to like post. Please try again.')
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
      } else {
        console.error('Failed to dislike post:', response)
      }
    } catch (err) {
      console.error('Error disliking post:', err)
      setError('Failed to dislike post. Please try again.')
    }
  }

  const handleViewPost = (postId: string) => {
    // Navigate to post detail page or open modal
    console.log('View post:', postId)
  }

  const handleCommentPost = (postId: string) => {
    // Find the post and open comment modal
    const post = posts.find(p => p._id === postId)
    if (post) {
      setSelectedPost(post)
      setShowCommentModal(true)
    }
  }

  const handleNewPostSuccess = () => {
    // Refresh posts to show the new post
    loadData()
  }

  const handleCommentAdded = () => {
    // Refresh posts to show updated comment counts
    loadData()
  }


  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="h-full w-full flex flex-col">
          <div className="flex-shrink-0 px-6 py-4 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Users className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-light text-gray-900">Community</h1>
                  <p className="text-lg text-gray-600">Connect with fellow students</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading community posts...</p>
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
              <div className="h-8 w-8 bg-red-600 rounded-lg flex items-center justify-center">
                <Users className="h-4 w-4 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-light text-gray-900">Community</h1>
                <p className="text-lg text-gray-600">Connect with fellow students</p>
              </div>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="h-16 w-16 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-8 w-8 text-red-600" />
              </div>
              <p className="text-red-600 mb-4 text-lg font-light">{error}</p>
              <button 
                onClick={loadData}
                className="inline-flex items-center px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors duration-200"
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="h-full w-full flex flex-col">
        {/* Header */}
        <div className="flex-shrink-0 px-6 py-4 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Users className="h-4 w-4 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-light text-gray-900">Community</h1>
                <p className="text-lg text-gray-600">Connect, share, and support each other</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* New Post Button */}
              <button 
                onClick={() => setShowNewPostModal(true)}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Post
              </button>
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
                  All Topics
                </button>
                {categories.map((category) => (
                  <button
                    key={category.value}
                    onClick={() => setSelectedCategory(category.value)}
                    className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                      selectedCategory === category.value 
                        ? 'bg-blue-600 text-white' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Posts Area */}
          <div className="flex-1 flex flex-col min-h-0 bg-white/80 backdrop-blur-sm">
            <div className="flex-shrink-0 px-4 py-3 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-light text-gray-900 flex items-center">
                  <MessageSquare className="h-4 w-4 mr-2 text-blue-600" />
                  Community Posts
                </h2>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">{posts.length} posts</span>
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              <div className="p-4">
                {posts.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="h-16 w-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <MessageSquare className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-light text-gray-900 mb-2">No posts found</h3>
                    <p className="text-lg text-gray-600 mb-6">Be the first to start a discussion!</p>
                    <button 
                      onClick={() => setShowNewPostModal(true)}
                      className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Create First Post
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {posts.map((post) => (
                      <PostCard
                        key={post._id}
                        post={post}
                        categories={categories}
                        onLike={handleLikePost}
                        onDislike={handleDislikePost}
                        onView={handleViewPost}
                        onComment={handleCommentPost}
                      />
                    ))}
                  </div>
                )}
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

        {/* Comment Modal */}
        {selectedPost && (
          <CommentModal
            isOpen={showCommentModal}
            onClose={() => {
              setShowCommentModal(false)
              setSelectedPost(null)
            }}
            post={selectedPost}
            onCommentAdded={handleCommentAdded}
          />
        )}
      </div>
    </div>
  )
}

export default CommunityPage
