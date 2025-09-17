import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  MessageCircle, 
  Calendar, 
  Users, 
  BookOpen,
  Clock,
  ArrowRight
} from 'lucide-react'

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: 'chatbot',
      title: 'AI Chatbot Session',
      description: 'Last session: 2 hours ago',
      icon: MessageCircle,
      href: '/app/chatbot',
      color: 'bg-blue-100',
      iconColor: 'text-blue-600',
      action: 'Continue'
    },
    {
      id: 2,
      type: 'community',
      title: 'Community Discussion',
      description: 'New replies in "Stress Management"',
      icon: Users,
      href: '/app/community',
      color: 'bg-purple-100',
      iconColor: 'text-purple-600',
      action: 'Join'
    },
    {
      id: 3,
      type: 'resource',
      title: 'New Resource Available',
      description: 'Meditation Techniques for Students',
      icon: BookOpen,
      href: '/app/resources',
      color: 'bg-orange-100',
      iconColor: 'text-orange-600',
      action: 'Read'
    }
  ]

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-900">
          Recent Activity
        </h2>
        <Link
          to="/app/activity"
          className="text-blue-600 hover:text-blue-700 text-sm font-semibold flex items-center"
        >
          View All
          <ArrowRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
      
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
        <div className="space-y-4">
          {activities.map((activity, index) => {
            const Icon = activity.icon
            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  to={activity.href}
                  className="group flex items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200"
                >
                  <div className={`h-12 w-12 ${activity.color} rounded-xl flex items-center justify-center mr-4 flex-shrink-0`}>
                    <Icon className={`h-6 w-6 ${activity.iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {activity.title}
                    </p>
                    <p className="text-sm text-gray-600 truncate">
                      {activity.description}
                    </p>
                  </div>
                  <div className="ml-4 text-blue-600 group-hover:text-blue-700 text-sm font-medium flex items-center">
                    {activity.action}
                    <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default RecentActivity
