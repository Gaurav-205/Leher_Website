import { useState, useEffect } from 'react'
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
  Sparkles,
  Info,
  Stethoscope,
  MapPin,
  Users2
} from 'lucide-react'
import LeherNavigationMenu from '@components/ui/navigation-menu-demo'
import { ThemeToggle } from '@/components/ui/theme-toggle'

const FixedNavbar = () => {
  const { user, logout, isAuthenticated } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 50)
    }

    // Check initial scroll position
    handleScroll()
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
    { name: 'About Us', href: '/about', icon: Info, public: true },
    { name: 'Services', href: '/services', icon: Sparkles, public: true },
    { name: 'Experts', href: '/experts', icon: Stethoscope, public: true },
    { name: 'Centres', href: '/centres', icon: MapPin, public: true },
    { name: 'Partners', href: '/partners', icon: Users2, public: true },
    { name: 'Resources', href: '/app/resources', icon: BookOpen, public: false },
    { name: 'Chatbot', href: '/app/chatbot', icon: MessageCircle, public: false },
    { name: 'Community', href: '/app/community', icon: Users, public: false },
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
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
      isScrolled
        ? 'bg-white/95 dark:bg-[#0F0F23]/95 backdrop-blur-md border-b border-[#A8CFF1]/20 dark:border-[#A8CFF1]/30 shadow-lg'
        : 'bg-white/90 dark:bg-[#0F0F23]/90 backdrop-blur-sm border-b border-transparent shadow-none'
    }`}>
      <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex h-14 sm:h-16 justify-between items-center">
          {/* Left side - Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link to={isAuthenticated ? '/app' : '/'} className="flex items-center group transition-all duration-200 hover:scale-[1.02]">
              <img 
                src="/logo.png" 
                alt="Leher Logo" 
                className="h-8 w-8 sm:h-10 sm:w-10 object-contain transition-all duration-200 group-hover:scale-105"
                onError={(e) => {
                  // Fallback to Heart icon if image fails to load
                  e.currentTarget.style.display = 'none'
                  const nextElement = e.currentTarget.nextElementSibling as HTMLElement
                  if (nextElement) {
                    nextElement.style.display = 'flex'
                  }
                }}
              />
              <div className="h-8 w-8 sm:h-10 sm:w-10 bg-gradient-to-br from-[#2A3E66] to-[#00589F] rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:from-[#00589F] group-hover:to-[#45A1E7] transition-all duration-200 hidden">
                <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <span className={`ml-2 sm:ml-3 text-lg sm:text-xl font-bold transition-colors duration-200 group-hover:text-[#00589F] dark:group-hover:text-[#45A1E7] font-poppins ${
                isScrolled ? 'text-[#2A3E66] dark:text-[#A8CFF1]' : 'text-[#2A3E66] dark:text-[#A8CFF1]'
              }`}>
                Leher
              </span>
            </Link>
          </div>

          {/* Center - Desktop Navigation with shadcn Navigation Menu */}
          <div className="hidden lg:flex lg:items-center lg:flex-1 lg:justify-center">
            <LeherNavigationMenu isScrolled={isScrolled} />
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            {/* Theme Toggle - Hidden on mobile, shown in mobile menu */}
            <div className="hidden lg:block">
              <ThemeToggle />
            </div>
             {/* User Menu or Auth Buttons */}
             {isAuthenticated ? (
               <div className="relative">
                 <button
                   onClick={() => setShowUserMenu(!showUserMenu)}
                   className={`group flex items-center space-x-3 p-2 hover:bg-[#A8CFF1]/20 rounded-lg transition-all duration-200 ${
                     isScrolled ? 'text-[#2A3E66]' : 'text-[#2A3E66]'
                   }`}
                 >
                   <div className="h-8 w-8 bg-gradient-to-br from-[#2A3E66] to-[#00589F] dark:from-[#A8CFF1] dark:to-[#45A1E7] rounded-lg flex items-center justify-center">
                     <User className="h-4 w-4 text-white dark:text-[#0F0F23]" />
                   </div>
                   <div className="hidden md:block text-left">
                     <div className={`text-sm font-medium transition-colors duration-200 font-montserrat ${
                       isScrolled ? 'text-[#2A3E66] dark:text-[#A8CFF1]' : 'text-[#2A3E66] dark:text-[#A8CFF1]'
                     }`}>
                       {user?.firstName} {user?.lastName}
                     </div>
                     <div className="text-xs text-[#45A1E7] dark:text-[#B8B8B8]">
                       {user?.role}
                     </div>
                   </div>
                   <ChevronDown className={`h-4 w-4 group-hover:text-[#00589F] dark:group-hover:text-[#45A1E7] transition-colors duration-200 ${
                     isScrolled ? 'text-[#45A1E7] dark:text-[#B8B8B8]' : 'text-[#45A1E7] dark:text-[#B8B8B8]'
                   }`} />
                 </button>

                 {showUserMenu && (
                   <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#1A1A2E] rounded-xl shadow-lg border border-[#A8CFF1]/30 dark:border-[#A8CFF1]/30 z-50 overflow-hidden">
                     <div className="p-3">
                       <div className="px-3 py-2 border-b border-[#A8CFF1]/30 dark:border-[#A8CFF1]/30 mb-2">
                         <p className="text-sm font-medium text-[#2A3E66] dark:text-[#A8CFF1] font-montserrat">{user?.firstName} {user?.lastName}</p>
                         <p className="text-xs text-[#45A1E7] dark:text-[#B8B8B8] font-montserrat">{user?.email}</p>
                         <div className="mt-1">
                           <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-[#A8CFF1]/30 dark:bg-[#1A1A2E]/50 text-[#2A3E66] dark:text-[#A8CFF1] font-montserrat">
                             {user?.role}
                           </span>
                         </div>
                       </div>
                       <div className="space-y-1">
                         <Link
                           to="/app/profile"
                           className="flex items-center px-3 py-2 text-sm text-[#2A3E66] dark:text-[#A8CFF1] hover:bg-[#A8CFF1]/20 dark:hover:bg-[#1A1A2E]/50 rounded-lg transition-colors duration-200 font-montserrat"
                           onClick={() => setShowUserMenu(false)}
                         >
                           <User className="h-4 w-4 mr-3" />
                           Profile
                         </Link>
                         <Link
                           to="/app/settings"
                           className="flex items-center px-3 py-2 text-sm text-[#2A3E66] dark:text-[#A8CFF1] hover:bg-[#A8CFF1]/20 dark:hover:bg-[#1A1A2E]/50 rounded-lg transition-colors duration-200 font-montserrat"
                           onClick={() => setShowUserMenu(false)}
                         >
                           <Settings className="h-4 w-4 mr-3" />
                           Settings
                         </Link>
                         <button
                           onClick={handleLogout}
                           className="flex items-center w-full px-3 py-2 text-sm text-[#2A3E66] dark:text-[#A8CFF1] hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-700 dark:hover:text-red-400 rounded-lg transition-colors duration-200 font-montserrat"
                         >
                           <LogOut className="h-4 w-4 mr-3" />
                           Sign out
                         </button>
                       </div>
                     </div>
                   </div>
                 )}
              </div>
             ) : (
               <div className="flex items-center space-x-3">
                 <Link
                   to="/auth/login"
                   className={`hover:text-[#00589F] dark:hover:text-[#45A1E7] font-medium text-xs sm:text-sm transition-colors duration-200 font-montserrat px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg hover:bg-[#A8CFF1]/10 dark:hover:bg-[#1A1A2E]/30 ${
                     isScrolled ? 'text-[#2A3E66] dark:text-[#A8CFF1]' : 'text-[#2A3E66] dark:text-[#A8CFF1]'
                   }`}
                 >
                   Sign In
                 </Link>
                 <Link
                   to="/auth/register"
                   className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-[#2A3E66] to-[#00589F] dark:from-[#A8CFF1] dark:to-[#45A1E7] text-white dark:text-[#0F0F23] text-xs sm:text-sm font-medium rounded-lg hover:from-[#00589F] hover:to-[#45A1E7] dark:hover:from-[#45A1E7] dark:hover:to-[#B9A6DC] transition-all duration-200 font-montserrat shadow-sm hover:shadow-md hover:scale-105"
                 >
                   Get Started
                 </Link>
               </div>
             )}

             {/* Mobile menu button */}
             <button
               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
               className={`lg:hidden p-1.5 sm:p-2 rounded-lg hover:bg-[#A8CFF1]/20 dark:hover:bg-[#1A1A2E]/50 transition-colors duration-200 ${
                 isScrolled ? 'text-[#2A3E66] dark:text-[#A8CFF1]' : 'text-[#2A3E66] dark:text-[#A8CFF1]'
               }`}
             >
               {mobileMenuOpen ? (
                 <X className="h-4 w-4 sm:h-5 sm:w-5" />
               ) : (
                 <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
               )}
             </button>
          </div>
        </div>
      </div>

       {/* Mobile menu */}
       {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 dark:bg-[#0F0F23]/95 backdrop-blur-xl border-t border-[#A8CFF1]/30 dark:border-[#A8CFF1]/30 shadow-sm">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {filteredNavItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center px-3 py-3 rounded-lg text-sm font-medium transition-colors duration-200 font-montserrat ${
                    isActive(item.href)
                      ? 'text-[#00589F] dark:text-[#45A1E7] bg-[#A8CFF1]/20 dark:bg-[#1A1A2E]/50'
                      : 'text-[#2A3E66] dark:text-[#A8CFF1] hover:text-[#00589F] dark:hover:text-[#45A1E7] hover:bg-[#A8CFF1]/10 dark:hover:bg-[#1A1A2E]/30'
                  }`}
                >
                  <Icon className={`h-4 w-4 mr-3 ${
                    isActive(item.href) ? 'text-[#00589F] dark:text-[#45A1E7]' : 'text-[#45A1E7] dark:text-[#B8B8B8]'
                  }`} />
                  {item.name}
                </Link>
              )
            })}
            
            {/* Mobile Theme Toggle */}
            <div className="pt-4 border-t border-[#A8CFF1]/30 dark:border-[#A8CFF1]/30">
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-sm font-medium text-[#2A3E66] dark:text-[#A8CFF1] font-montserrat">
                  Theme
                </span>
                <ThemeToggle />
              </div>
            </div>
            
            {/* Mobile Auth Section */}
            {!isAuthenticated && (
              <div className="pt-4 border-t border-[#A8CFF1]/30 dark:border-[#A8CFF1]/30 space-y-2">
                <Link
                  to="/auth/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center px-4 py-3 text-[#2A3E66] dark:text-[#A8CFF1] hover:text-[#00589F] dark:hover:text-[#45A1E7] font-medium transition-colors duration-200 hover:bg-[#A8CFF1]/10 dark:hover:bg-[#1A1A2E]/30 rounded-lg font-montserrat"
                >
                  Sign In
                </Link>
                <Link
                  to="/auth/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center px-4 py-3 bg-gradient-to-r from-[#2A3E66] to-[#00589F] dark:from-[#A8CFF1] dark:to-[#45A1E7] text-white dark:text-[#0F0F23] font-medium hover:from-[#00589F] hover:to-[#45A1E7] dark:hover:from-[#45A1E7] dark:hover:to-[#B9A6DC] transition-all duration-200 rounded-lg font-montserrat"
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
