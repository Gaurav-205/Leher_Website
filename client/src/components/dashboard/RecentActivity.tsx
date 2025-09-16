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
      type: 'appointment',
      title: 'Upcoming Appointment',
      description: 'Tomorrow at 2:00 PM',
      icon: Calendar,
      href: '/app/appointments',
      color: 'bg-green-100',
      iconColor: 'text-green-600',
      action: 'View'
    },
    {
      id: 3,
      type: 'forum',
      title: 'Forum Discussion',
      description: 'New replies in "Stress Management"',
      icon: Users,
      href: '/app/forums',
      color: 'bg-purple-100',
      iconColor: 'text-purple-600',
      action: 'Join'
    },
    {
      id: 4,
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
        <h2 className="text-2xl font-prata font-semibold text-gray-900">
          Recent Activity
        </h2>
        <Link
          to="/app/activity"
          className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center"
        >
          View All
          <ArrowRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
      
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
              <div className="flex items-center p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
                <div className={`h-10 w-10 ${activity.color} rounded-full flex items-center justify-center mr-4 flex-shrink-0`}>
                  <Icon className={`h-5 w-5 ${activity.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {activity.title}
                  </p>
                  <p className="text-sm text-gray-600 truncate">
                    {activity.description}
                  </p>
                </div>
                <Link
                  to={activity.href}
                  className="ml-4 text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center"
                >
                  {activity.action}
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default RecentActivity
