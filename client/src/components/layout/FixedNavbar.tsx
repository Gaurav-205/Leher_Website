import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@store/authStore'
import { 
  Menu, 
  User, 
  Settings, 
  LogOut,
  MessageCircle,
  Users,
  BookOpen,
  Calendar,
  Shield,
  X,
  Heart,
  ChevronDown,
  Sparkles
} from 'lucide-react'

const FixedNavbar = () => {
  const { user, logout, isAuthenticated } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
    setShowUserMenu(false)
  }

  const navigationItems = [
    { 
      name: 'Home', 
      href: isAuthenticated ? '/app' : '/', 
      icon: Heart, 
      public: true 
    },
    { name: 'Chatbot', href: '/app/chatbot', icon: MessageCircle, public: false },
    { name: 'Community', href: '/app/community', icon: Users, public: false },
    { name: 'Resources', href: '/app/resources', icon: BookOpen, public: false },
    { name: 'Appointments', href: '/app/appointments', icon: Calendar, public: false },
  ]

  if (user?.role === 'admin') {
    navigationItems.push({ name: 'Admin', href: '/admin', icon: Shield, public: false })
  }

  if (user?.role === 'counselor') {
    navigationItems.push({ name: 'Dashboard', href: '/counselor', icon: Shield, public: false })
  }

  if (user?.role === 'moderator') {
    navigationItems.push({ name: 'Moderation', href: '/moderator', icon: Shield, public: false })
  }

  const filteredNavItems = navigationItems.filter(item => 
    item.public || isAuthenticated
  )

  const isActive = (href: string) => {
    if (href === '/' || href === '/app') {
      // For home link, check if we're on the appropriate home page
      if (isAuthenticated) {
        return location.pathname === '/app' || location.pathname === '/app/'
      } else {
        return location.pathname === '/'
      }
    }
    return location.pathname.startsWith(href)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          {/* Left side - Logo */}
          <div className="flex items-center">
            <Link to={isAuthenticated ? '/app' : '/'} className="flex items-center group">
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Heart className="h-4 w-4 text-white" />
              </div>
              <span className="ml-2 text-lg font-medium text-gray-900">
                Lehar
              </span>
            </Link>
          </div>

          {/* Center - Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            {filteredNavItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center text-sm font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'text-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon className={`h-4 w-4 mr-2 ${
                    isActive(item.href) ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700'
                  }`} />
                  {item.name}
                </Link>
              )
            })}
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center space-x-4">
            {/* User Menu or Auth Buttons */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="group flex items-center space-x-2 p-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                >
                  <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <span className="hidden md:block text-sm font-medium text-gray-900">
                    {user?.firstName} {user?.lastName}
                  </span>
                  <ChevronDown className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors duration-200" />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50 overflow-hidden">
                    <div className="p-2">
                      <div className="px-3 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{user?.firstName} {user?.lastName}</p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                      </div>
                      <Link
                        to="/app/profile"
                        className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <User className="h-4 w-4 mr-3" />
                        Profile
                      </Link>
                      <Link
                        to="/app/settings"
                        className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <Settings className="h-4 w-4 mr-3" />
                        Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                      >
                        <LogOut className="h-4 w-4 mr-3" />
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/auth/login"
                  className="text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors duration-200"
                >
                  Sign In
                </Link>
                <Link
                  to="/auth/register"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {filteredNavItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`group flex items-center px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className={`h-5 w-5 mr-3 ${
                    isActive(item.href) ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700'
                  }`} />
                  {item.name}
                </Link>
              )
            })}
            
            {/* Mobile Auth Section */}
            {!isAuthenticated && (
              <div className="pt-4 border-t border-gray-200 space-y-2">
                <Link
                  to="/auth/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center px-4 py-3 text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200"
                >
                  Sign In
                </Link>
                <Link
                  to="/auth/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center px-4 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors duration-200"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default FixedNavbar
