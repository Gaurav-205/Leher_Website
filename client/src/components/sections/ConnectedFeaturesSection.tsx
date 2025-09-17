import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Bot, Users, BookOpen, ArrowRight } from 'lucide-react'

type Feature = {
  id: string
  title: string
  description: string
  ctaLabel: string
  to: string
  Icon: any
}

const features: Feature[] = [
  {
    id: 'ai',
    title: 'AI Assistant',
    description: '24/7 mental health support with crisis detection',
    ctaLabel: 'Chat now',
    to: '/app/chatbot',
    Icon: Bot
  },
  {
    id: 'community',
    title: 'Peer Support',
    description: 'Anonymous forums for stigma-free connections',
    ctaLabel: 'Join community',
    to: '/app/community',
    Icon: Users
  },
  {
    id: 'resources',
    title: 'Resources',
    description: 'Curated mental health content and tools',
    ctaLabel: 'Explore resources',
    to: '/app/resources',
    Icon: BookOpen
  }
]

const ConnectedFeaturesSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl font-light text-gray-900 mb-4">
            How we help
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Simple tools designed to support your mental wellness journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.Icon
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4 group-hover:bg-blue-200 transition-colors duration-200">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {feature.description}
                </p>
                <Link
                  to={feature.to}
                  className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                >
                  {feature.ctaLabel}
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ConnectedFeaturesSection


