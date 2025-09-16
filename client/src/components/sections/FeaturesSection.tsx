import { motion } from 'framer-motion'
import { 
  MessageCircle, 
  Calendar, 
  Users, 
  BookOpen, 
  Shield, 
  Heart,
  Brain,
  Globe,
  Lock,
  Clock,
  Award,
  Zap
} from 'lucide-react'

const FeaturesSection = () => {
  const features = [
    {
      icon: MessageCircle,
      title: 'AI-Powered Chatbot',
      description: 'Get instant mental health first-aid through our intelligent chatbot that understands your emotions and provides immediate support.',
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600'
    },
    {
      icon: Calendar,
      title: 'Confidential Appointments',
      description: 'Book secure sessions with qualified counselors and mental health professionals in your area.',
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600'
    },
    {
      icon: Users,
      title: 'Peer Support Forums',
      description: 'Connect with fellow students in moderated, safe discussion spaces where you can share experiences.',
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600'
    },
    {
      icon: BookOpen,
      title: 'Educational Resources',
      description: 'Access localized psychoeducational content in multiple languages including Hindi, English, and regional languages.',
      color: 'bg-orange-500',
      hoverColor: 'hover:bg-orange-600'
    },
    {
      icon: Shield,
      title: 'Privacy Protected',
      description: 'Your data is encrypted and your privacy is our top priority. All conversations are completely confidential.',
      color: 'bg-red-500',
      hoverColor: 'hover:bg-red-600'
    },
    {
      icon: Heart,
      title: 'Culturally Sensitive',
      description: 'Designed specifically for Indian students and educational context with cultural understanding.',
      color: 'bg-pink-500',
      hoverColor: 'hover:bg-pink-600'
    },
    {
      icon: Brain,
      title: 'Crisis Intervention',
      description: 'Advanced AI detects crisis situations and provides immediate intervention with professional support.',
      color: 'bg-indigo-500',
      hoverColor: 'hover:bg-indigo-600'
    },
    {
      icon: Globe,
      title: 'Multi-Language Support',
      description: 'Available in Hindi, English, Malayalam, Tamil, Telugu, Bengali, and other regional languages.',
      color: 'bg-teal-500',
      hoverColor: 'hover:bg-teal-600'
    },
    {
      icon: Lock,
      title: 'End-to-End Encryption',
      description: 'All your conversations and data are protected with military-grade encryption for maximum security.',
      color: 'bg-gray-500',
      hoverColor: 'hover:bg-gray-600'
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-prata font-bold text-gray-900 mb-6">
              Comprehensive Mental Health Support
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform addresses the unique mental health challenges faced by students 
              in Indian higher education institutions with cutting-edge technology and cultural sensitivity.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="card hover:shadow-xl transition-all duration-300 h-full">
                  <div className="flex items-center mb-4">
                    <div className={`inline-flex p-3 rounded-lg ${feature.color} ${feature.hoverColor} transition-colors duration-200 group-hover:scale-110`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-200">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
