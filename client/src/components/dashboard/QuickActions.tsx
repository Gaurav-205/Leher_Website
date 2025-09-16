import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  MessageCircle, 
  Calendar, 
  Users, 
  BookOpen, 
  Heart,
  ArrowRight
} from 'lucide-react'

const QuickActions = () => {
  const actions = [
    {
      title: 'AI Chatbot',
      description: 'Get instant mental health support',
      icon: MessageCircle,
      href: '/app/chatbot',
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Book Appointment',
      description: 'Schedule with a counselor',
      icon: Calendar,
      href: '/app/appointments',
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
      gradient: 'from-green-500 to-green-600'
    },
    {
      title: 'Support Forums',
      description: 'Connect with peers',
      icon: Users,
      href: '/app/forums',
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Resources',
      description: 'Educational materials',
      icon: BookOpen,
      href: '/app/resources',
      color: 'bg-orange-500',
      hoverColor: 'hover:bg-orange-600',
      gradient: 'from-orange-500 to-orange-600'
    }
  ]

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-prata font-semibold text-gray-900 mb-6">
        Quick Actions
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {actions.map((action, index) => {
          const Icon = action.icon
          return (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link
                to={action.href}
                className="block p-6 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group h-full"
              >
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${action.gradient} mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">
                  {action.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {action.description}
                </p>
                <div className="flex items-center text-primary-600 text-sm font-medium group-hover:text-primary-700">
                  <span>Get Started</span>
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default QuickActions
