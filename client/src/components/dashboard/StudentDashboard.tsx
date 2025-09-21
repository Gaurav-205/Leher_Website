import { motion } from 'framer-motion'
import { useAuthStore } from '@store/authStore'
import { 
  MessageCircle, 
  Users, 
  BookOpen, 
  ArrowRight, 
  Phone, 
  TrendingUp, 
  Calendar
} from 'lucide-react'
import { Link } from 'react-router-dom'
import WellnessWidget from './WellnessWidget'

const StudentDashboard = () => {
  const { user } = useAuthStore()

  const quickActions = [
    {
      title: 'AI Chatbot',
      description: 'Get instant support',
      icon: MessageCircle,
      href: '/app/chatbot',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Book Appointment',
      description: 'Schedule with counselor',
      icon: Calendar,
      href: '/app/appointments',
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50',
      iconColor: 'text-emerald-600'
    },
    {
      title: 'Community',
      description: 'Connect with peers',
      icon: Users,
      href: '/app/community',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    },
    {
      title: 'Resources',
      description: 'Educational materials',
      icon: BookOpen,
      href: '/app/resources',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600'
    }
  ]

  const stats = [
    { 
      label: 'AI Sessions', 
      value: '12', 
      icon: MessageCircle, 
      color: 'text-blue-600', 
      bgColor: 'bg-blue-100',
      change: '+3 this week',
      changeType: 'positive'
    },
    { 
      label: 'Community Posts', 
      value: '8', 
      icon: Users, 
      color: 'text-purple-600', 
      bgColor: 'bg-purple-100',
      change: '+2 this week',
      changeType: 'positive'
    },
    { 
      label: 'Resources Viewed', 
      value: '24', 
      icon: BookOpen, 
      color: 'text-orange-600', 
      bgColor: 'bg-orange-100',
      change: '+5 this week',
      changeType: 'positive'
    },
    { 
      label: 'Wellness Score', 
      value: '85%', 
      icon: TrendingUp, 
      color: 'text-green-600', 
      bgColor: 'bg-green-100',
      change: '+5% this week',
      changeType: 'positive'
    }
  ]

  const recentActivities = [
    {
      id: 1,
      title: 'AI Chatbot Session',
      description: 'Last session: 2 hours ago',
      icon: MessageCircle,
      href: '/app/chatbot',
      color: 'bg-blue-100',
      iconColor: 'text-blue-600',
      time: '2h ago',
      status: 'completed'
    },
    {
      id: 2,
      title: 'Community Discussion',
      description: 'New replies in "Stress Management"',
      icon: Users,
      href: '/app/community',
      color: 'bg-purple-100',
      iconColor: 'text-purple-600',
      time: '4h ago',
      status: 'active'
    },
    {
      id: 3,
      title: 'Resource Bookmark',
      description: 'Saved "Mindfulness Techniques"',
      icon: BookOpen,
      href: '/app/resources',
      color: 'bg-orange-100',
      iconColor: 'text-orange-600',
      time: '1d ago',
      status: 'completed'
    },
    {
      id: 4,
      title: 'Appointment Scheduled',
      description: 'Session with Dr. Kavita tomorrow',
      icon: Calendar,
      href: '/app/appointments',
      color: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
      time: '2d ago',
      status: 'upcoming'
    }
  ]

  const upcomingEvents = [
    {
      id: 1,
      title: 'Appointment with Dr. Kavita',
      time: 'Tomorrow, 2:00 PM',
      type: 'appointment',
      icon: Calendar,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    {
      id: 2,
      title: 'Community Meetup',
      time: 'Friday, 6:00 PM',
      type: 'event',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Good morning, {user?.firstName}
              </h1>
              <p className="text-gray-500 mt-1">
                How are you feeling today?
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm text-gray-500">Online</span>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {quickActions.map((action, index) => {
              const Icon = action.icon
              return (
                <motion.div
                  key={action.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Link
                    to={action.href}
                    className="group block p-4 bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-200"
                  >
                    <div className={`flex items-center justify-center w-10 h-10 ${action.bgColor} rounded-lg mb-3`}>
                      <Icon className={`h-5 w-5 ${action.iconColor}`} />
                    </div>
                    <h3 className="text-sm font-medium text-gray-900 mb-1">
                      {action.title}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {action.description}
                    </p>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white rounded-lg p-4 border border-gray-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-2 ${stat.bgColor} rounded-lg`}>
                      <Icon className={`h-4 w-4 ${stat.color}`} />
                    </div>
                    <span className="text-xs text-green-600 font-medium">{stat.change}</span>
                  </div>
                  <div className="text-2xl font-semibold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming Events */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming</h2>
              <div className="space-y-3">
                {upcomingEvents.map((event, index) => {
                  const Icon = event.icon
                  return (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center py-3 border-b border-gray-100 last:border-b-0"
                    >
                      <Icon className="h-4 w-4 text-gray-400 mr-3" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{event.title}</p>
                        <p className="text-xs text-gray-500">{event.time}</p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </motion.div>

          {/* Wellness Widget */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-1"
          >
            <WellnessWidget />
          </motion.div>
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-6"
        >
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
              <Link
                to="/app/activity"
                className="text-sm text-gray-500 hover:text-gray-700 flex items-center"
              >
                View All
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            <div className="space-y-3">
              {recentActivities.map((activity, index) => {
                const Icon = activity.icon
                return (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Link
                      to={activity.href}
                      className="flex items-center py-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors rounded-lg px-2 -mx-2"
                    >
                      <Icon className="h-4 w-4 text-gray-400 mr-3" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900">
                            {activity.title}
                          </p>
                          <span className="text-xs text-gray-500">{activity.time}</span>
                        </div>
                        <p className="text-xs text-gray-500 truncate">
                          {activity.description}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.div>

        {/* Emergency Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-6"
        >
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Need Immediate Help?
              </h3>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/app/chatbot"
                  className="inline-flex items-center justify-center px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors duration-200"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Crisis Chat
                </Link>
                <a
                  href="tel:108"
                  className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Emergency: 108
                </a>
                <a
                  href="tel:1800-599-0019"
                  className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  KIRAN Helpline
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default StudentDashboard
