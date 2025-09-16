import { motion } from 'framer-motion'
import { Users, MessageCircle, Calendar, BookOpen, Heart, TrendingUp } from 'lucide-react'

const StatsSection = () => {
  const stats = [
    {
      icon: Users,
      value: '10,000+',
      label: 'Students Helped',
      description: 'Active users across India',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: MessageCircle,
      value: '50,000+',
      label: 'Chat Sessions',
      description: 'AI-powered conversations',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: Calendar,
      value: '2,500+',
      label: 'Appointments',
      description: 'Professional counseling sessions',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      icon: BookOpen,
      value: '500+',
      label: 'Resources',
      description: 'Educational materials available',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      icon: Heart,
      value: '24/7',
      label: 'Support Available',
      description: 'Round-the-clock assistance',
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      icon: TrendingUp,
      value: '95%',
      label: 'Satisfaction Rate',
      description: 'User satisfaction score',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100'
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-prata font-bold text-gray-900 mb-4">
              Trusted by Students Across India
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform has made a real difference in the lives of thousands of students, 
              providing them with the support they need to thrive academically and personally.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className={`inline-flex p-4 rounded-full ${stat.bgColor} mb-6`}>
                    <Icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                  <div className={`text-4xl font-bold ${stat.color} mb-2`}>
                    {stat.value}
                  </div>
                  <div className="text-xl font-semibold text-gray-900 mb-2">
                    {stat.label}
                  </div>
                  <div className="text-gray-600">
                    {stat.description}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default StatsSection
