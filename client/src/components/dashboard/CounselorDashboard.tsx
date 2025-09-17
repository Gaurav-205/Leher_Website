import { motion } from 'framer-motion'
import { useAuthStore } from '@store/authStore'
import { Heart, MessageCircle, Users, BookOpen, ArrowRight, Clock, Shield, AlertTriangle, Phone, TrendingUp, Calendar, UserCheck, BarChart3 } from 'lucide-react'
import { Link } from 'react-router-dom'

const CounselorDashboard = () => {
  const { user } = useAuthStore()

  const quickActions = [
    {
      title: 'AI Chatbot',
      description: 'Monitor AI sessions',
      icon: MessageCircle,
      href: '/app/chatbot',
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600'
    },
    {
      title: 'Community',
      description: 'Moderate discussions',
      icon: Users,
      href: '/app/community',
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600'
    },
    {
      title: 'Resources',
      description: 'Manage content',
      icon: BookOpen,
      href: '/app/resources',
      color: 'bg-orange-500',
      hoverColor: 'hover:bg-orange-600'
    },
    {
      title: 'Profile',
      description: 'Update your profile',
      icon: UserCheck,
      href: '/app/profile',
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600'
    }
  ]

  const stats = [
    { label: 'Active Sessions', value: '8', icon: MessageCircle, color: 'text-blue-600', bgColor: 'bg-blue-100' },
    { label: 'Students Helped', value: '156', icon: Users, color: 'text-purple-600', bgColor: 'bg-purple-100' },
    { label: 'Resources Created', value: '12', icon: BookOpen, color: 'text-orange-600', bgColor: 'bg-orange-100' },
    { label: 'Rating', value: '4.8', icon: TrendingUp, color: 'text-green-600', bgColor: 'bg-green-100' }
  ]

  const recentActivities = [
    {
      id: 1,
      title: 'Crisis Alert',
      description: 'Student needs immediate attention',
      icon: AlertTriangle,
      href: '/app/chatbot',
      color: 'bg-red-100',
      iconColor: 'text-red-600'
    },
    {
      id: 2,
      title: 'Community Post',
      description: 'New post requires moderation',
      icon: Users,
      href: '/app/community',
      color: 'bg-purple-100',
      iconColor: 'text-purple-600'
    },
    {
      id: 3,
      title: 'Resource Review',
      description: 'Pending resource approval',
      icon: BookOpen,
      href: '/app/resources',
      color: 'bg-orange-100',
      iconColor: 'text-orange-600'
    }
  ]

  return (
    <div className="h-[calc(100vh-64px)] w-full bg-gradient-to-br from-green-50 via-white to-emerald-50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>
      
      <div className="relative z-10 h-full w-full flex flex-col">
        {/* Welcome Header */}
        <div className="flex-shrink-0 px-6 py-4 border-b border-gray-200/50 bg-white/80 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                <UserCheck className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600">
                  Welcome, Dr. {user?.lastName}!
                </h1>
                <p className="text-sm text-gray-600">
                  Ready to support students on their mental wellness journey today?
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden min-h-0">
          {/* Left Panel - Quick Actions & Stats */}
          <div className="w-80 flex-shrink-0 bg-white/80 backdrop-blur-xl border-r border-gray-200/50 overflow-hidden">
            <div className="h-full flex flex-col">
              {/* Quick Actions */}
              <div className="flex-shrink-0 p-4 border-b border-gray-200/50">
                <h2 className="text-sm font-semibold text-gray-900 mb-3">Quick Actions</h2>
                <div className="grid grid-cols-2 gap-3">
                  {quickActions.map((action, index) => {
                    const Icon = action.icon
                    return (
                      <Link
                        key={action.title}
                        to={action.href}
                        className="p-3 bg-white/50 border border-gray-200/50 rounded-xl hover:shadow-lg transition-all duration-300 group transform hover:-translate-y-0.5"
                      >
                        <div className={`inline-flex p-2 rounded-lg ${action.color} mb-2 group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="h-4 w-4 text-white" />
                        </div>
                        <h3 className="text-xs font-semibold text-gray-900 mb-1 group-hover:text-green-600 transition-colors duration-300">
                          {action.title}
                        </h3>
                        <p className="text-xs text-gray-600">
                          {action.description}
                        </p>
                      </Link>
                    )
                  })}
                </div>
              </div>

              {/* Stats */}
              <div className="flex-shrink-0 p-4 border-b border-gray-200/50">
                <h2 className="text-sm font-semibold text-gray-900 mb-3">Your Performance</h2>
                <div className="grid grid-cols-2 gap-3">
                  {stats.map((stat, index) => {
                    const Icon = stat.icon
                    return (
                      <div key={stat.label} className="text-center p-3 bg-white/50 border border-gray-200/50 rounded-xl">
                        <div className={`inline-flex p-2 ${stat.bgColor} rounded-lg mb-2`}>
                          <Icon className={`h-4 w-4 ${stat.color}`} />
                        </div>
                        <div className={`text-lg font-bold ${stat.color} mb-1`}>
                          {stat.value}
                        </div>
                        <div className="text-xs text-gray-600 font-medium">
                          {stat.label}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Crisis Management */}
              <div className="flex-1 p-4 bg-gradient-to-br from-red-50 to-orange-50">
                <h3 className="text-sm font-semibold text-red-900 mb-3 flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Crisis Management
                </h3>
                <div className="space-y-2 text-sm">
                  <Link
                    to="/app/chatbot"
                    className="block w-full bg-gradient-to-r from-red-500 to-orange-500 text-white text-center py-2 rounded-xl hover:from-red-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Monitor Crisis
                  </Link>
                  <a
                    href="tel:108"
                    className="block w-full bg-white/70 text-red-900 text-center py-2 rounded-xl hover:bg-white transition-all duration-300 border border-red-200/50"
                  >
                    Emergency: 108
                  </a>
                  <a
                    href="tel:1800-599-0019"
                    className="block w-full bg-white/70 text-red-900 text-center py-2 rounded-xl hover:bg-white transition-all duration-300 border border-red-200/50"
                  >
                    KIRAN: 1800-599-0019
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Recent Activity */}
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex-1 bg-white/80 backdrop-blur-xl overflow-hidden">
              <div className="h-full flex flex-col">
                <div className="flex-shrink-0 px-6 py-4 border-b border-gray-200/50">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
                    <Link
                      to="/app/activity"
                      className="text-sm text-green-600 hover:text-green-700 flex items-center font-medium"
                    >
                      View All
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto min-h-0">
                  <div className="p-6">
                    <div className="space-y-4">
                      {recentActivities.map((activity, index) => {
                        const Icon = activity.icon
                        return (
                          <motion.div
                            key={activity.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                          >
                            <Link
                              to={activity.href}
                              className="flex items-center p-4 bg-white/50 border border-gray-200/50 rounded-xl hover:shadow-lg transition-all duration-300 group transform hover:-translate-y-0.5"
                            >
                              <div className={`h-10 w-10 ${activity.color} rounded-xl flex items-center justify-center mr-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                                <Icon className={`h-5 w-5 ${activity.iconColor}`} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-gray-900 truncate group-hover:text-green-600 transition-colors duration-300">
                                  {activity.title}
                                </p>
                                <p className="text-sm text-gray-600 truncate">
                                  {activity.description}
                                </p>
                              </div>
                              <ArrowRight className="h-4 w-4 text-gray-400 ml-2 group-hover:text-green-600 transition-colors duration-300" />
                            </Link>
                          </motion.div>
                        )
                      })}
                    </div>
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

export default CounselorDashboard
