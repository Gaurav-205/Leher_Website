import { motion } from 'framer-motion'
import { useAuthStore } from '@store/authStore'
import { Heart, MessageCircle, Calendar, Users, BookOpen, ArrowRight, Clock, Shield, AlertTriangle, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  const { user } = useAuthStore()

  const quickActions = [
    {
      title: 'AI Chatbot',
      description: 'Get instant support',
      icon: MessageCircle,
      href: '/app/chatbot',
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600'
    },
    {
      title: 'Appointments',
      description: 'Book with counselor',
      icon: Calendar,
      href: '/app/appointments',
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600'
    },
    {
      title: 'Community',
      description: 'Connect with peers',
      icon: Users,
      href: '/app/community',
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600'
    },
    {
      title: 'Resources',
      description: 'Educational materials',
      icon: BookOpen,
      href: '/app/resources',
      color: 'bg-orange-500',
      hoverColor: 'hover:bg-orange-600'
    }
  ]

  const stats = [
    { label: 'Active Sessions', value: '24/7', icon: Clock, color: 'text-blue-600', bgColor: 'bg-blue-100' },
    { label: 'Counselors', value: '50+', icon: Heart, color: 'text-red-600', bgColor: 'bg-red-100' },
    { label: 'Students Helped', value: '10K+', icon: Users, color: 'text-green-600', bgColor: 'bg-green-100' },
    { label: 'Privacy', value: '100%', icon: Shield, color: 'text-purple-600', bgColor: 'bg-purple-100' }
  ]

  const recentActivities = [
    {
      id: 1,
      title: 'AI Chatbot Session',
      description: 'Last session: 2 hours ago',
      icon: MessageCircle,
      href: '/app/chatbot',
      color: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      id: 2,
      title: 'Upcoming Appointment',
      description: 'Tomorrow at 2:00 PM',
      icon: Calendar,
      href: '/app/appointments',
      color: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      id: 3,
      title: 'Community Discussion',
      description: 'New replies in "Stress Management"',
      icon: Users,
      href: '/app/community',
      color: 'bg-purple-100',
      iconColor: 'text-purple-600'
    }
  ]

  return (
    <div className="h-[calc(100vh-64px)] w-full bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-hidden">
      <div className="h-full w-full flex flex-col">
        {/* Compact Welcome Header */}
        <div className="flex-shrink-0 px-4 py-3 border-b border-gray-200 bg-white/90 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-prata font-bold text-gray-900">
                Welcome back, {user?.firstName}!
              </h1>
              <p className="text-sm text-gray-600">
                How are you feeling today? Lehar is here to support you.
              </p>
            </div>
            <div className="h-8 w-8 bg-primary-100 rounded-full flex items-center justify-center">
              <Heart className="h-4 w-4 text-primary-600" />
            </div>
          </div>
        </div>

        {/* Main Content - Single Frame */}
        <div className="flex-1 flex overflow-hidden min-h-0">
          {/* Left Panel - Quick Actions & Stats */}
          <div className="w-80 flex-shrink-0 bg-white border-r border-gray-200 overflow-hidden">
            <div className="h-full flex flex-col">
              {/* Quick Actions */}
              <div className="flex-shrink-0 p-3 border-b border-gray-200">
                <h2 className="text-sm font-semibold text-gray-900 mb-2">Quick Actions</h2>
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.map((action, index) => {
                    const Icon = action.icon
                    return (
                      <Link
                        key={action.title}
                        to={action.href}
                        className="p-2 bg-white border rounded-lg hover:shadow-sm transition-all duration-200 group"
                      >
                        <div className={`inline-flex p-1.5 rounded ${action.color} mb-1 group-hover:scale-105 transition-transform`}>
                          <Icon className="h-3 w-3 text-white" />
                        </div>
                        <h3 className="text-xs font-semibold text-gray-900 mb-0.5 group-hover:text-primary-600 transition-colors">
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
              <div className="flex-shrink-0 p-3 border-b border-gray-200">
                <h2 className="text-sm font-semibold text-gray-900 mb-2">Platform Stats</h2>
                <div className="grid grid-cols-2 gap-2">
                  {stats.map((stat, index) => {
                    const Icon = stat.icon
                    return (
                      <div key={stat.label} className="text-center p-2 bg-gray-50 rounded-lg">
                        <div className={`inline-flex p-1 ${stat.bgColor} rounded mb-1`}>
                          <Icon className={`h-3 w-3 ${stat.color}`} />
                        </div>
                        <div className={`text-sm font-bold ${stat.color} mb-0.5`}>
                          {stat.value}
                        </div>
                        <div className="text-xs text-gray-600">
                          {stat.label}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Emergency Support */}
              <div className="flex-1 p-3 bg-red-50">
                <h3 className="text-xs font-semibold text-red-900 mb-2 flex items-center">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Emergency Support
                </h3>
                <div className="space-y-1.5 text-xs">
                  <Link
                    to="/app/chatbot"
                    className="block w-full bg-red-600 text-white text-center py-1.5 rounded hover:bg-red-700 transition-colors"
                  >
                    Crisis Chat
                  </Link>
                  <a
                    href="tel:108"
                    className="block w-full bg-white/70 text-red-900 text-center py-1.5 rounded hover:bg-white transition-colors"
                  >
                    Emergency: 108
                  </a>
                  <a
                    href="tel:1800-599-0019"
                    className="block w-full bg-white/70 text-red-900 text-center py-1.5 rounded hover:bg-white transition-colors"
                  >
                    KIRAN: 1800-599-0019
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Recent Activity */}
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex-1 bg-white overflow-hidden">
              <div className="h-full flex flex-col">
                <div className="flex-shrink-0 px-4 py-3 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-semibold text-gray-900">Recent Activity</h2>
                    <Link
                      to="/app/activity"
                      className="text-xs text-primary-600 hover:text-primary-700 flex items-center"
                    >
                      View All
                      <ArrowRight className="h-3 w-3 ml-0.5" />
                    </Link>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto min-h-0">
                  <div className="p-4">
                    <div className="space-y-2">
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
                              className="flex items-center p-3 bg-white border rounded-lg hover:shadow-sm transition-all duration-200"
                            >
                              <div className={`h-6 w-6 ${activity.color} rounded-full flex items-center justify-center mr-3 flex-shrink-0`}>
                                <Icon className={`h-3 w-3 ${activity.iconColor}`} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-medium text-gray-900 truncate">
                                  {activity.title}
                                </p>
                                <p className="text-xs text-gray-600 truncate">
                                  {activity.description}
                                </p>
                              </div>
                              <ArrowRight className="h-3 w-3 text-gray-400 ml-2" />
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

export default HomePage
