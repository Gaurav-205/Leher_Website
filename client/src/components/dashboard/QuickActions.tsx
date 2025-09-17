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
      title: 'Community',
      description: 'Connect with peers',
      icon: Users,
      href: '/app/community',
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
    },
    {
      title: 'Profile',
      description: 'Manage your account',
      icon: Heart,
      href: '/app/profile',
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
      gradient: 'from-green-500 to-green-600'
    }
  ]

  return (
    <div className="mb-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">
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
                className="group block p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full"
              >
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${action.gradient} mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">
                  {action.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {action.description}
                </p>
                <div className="flex items-center text-blue-600 text-sm font-semibold group-hover:text-blue-700">
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
