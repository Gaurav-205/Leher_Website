import { motion } from 'framer-motion'
import { 
  Users, 
  MessageCircle, 
  Calendar, 
  BookOpen, 
  Heart,
  TrendingUp,
  Clock,
  Shield
} from 'lucide-react'

const StatsCards = () => {
  const stats = [
    { 
      label: 'Active Sessions', 
      value: '24/7', 
      icon: Clock,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      description: 'Always available'
    },
    { 
      label: 'Counselors Available', 
      value: '50+', 
      icon: Heart,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      description: 'Professional support'
    },
    { 
      label: 'Students Helped', 
      value: '10K+', 
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      description: 'Across India'
    },
    { 
      label: 'Privacy Protected', 
      value: '100%', 
      icon: Shield,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      description: 'End-to-end encryption'
    }
  ]

  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`inline-flex p-4 ${stat.bgColor} rounded-2xl mb-4`}>
                <Icon className={`h-8 w-8 ${stat.color}`} />
              </div>
              <div className={`text-3xl font-bold ${stat.color} mb-2`}>
                {stat.value}
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-2">
                {stat.label}
              </div>
              <div className="text-sm text-gray-600">
                {stat.description}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default StatsCards
