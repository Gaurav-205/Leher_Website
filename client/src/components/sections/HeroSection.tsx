import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-light text-gray-900 mb-6 leading-tight"
        >
          Mental Wellness
          <span className="block text-blue-600 font-normal">Made Simple</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Professional support, AI assistance, and community connection for your mental health journey.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <Link
            to="/auth/register"
            className="group inline-flex items-center px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
          >
            Get Started
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
          <Link
            to="/auth/login"
            className="inline-flex items-center px-8 py-3 text-gray-700 font-medium rounded-lg border border-gray-300 hover:border-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
          >
            Sign In
          </Link>
        </motion.div>

        {/* Simple Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-3 gap-8 max-w-2xl mx-auto text-center"
        >
          <div>
            <div className="text-2xl font-semibold text-gray-900 mb-1">10K+</div>
            <div className="text-sm text-gray-600">Students</div>
          </div>
          <div>
            <div className="text-2xl font-semibold text-gray-900 mb-1">500+</div>
            <div className="text-sm text-gray-600">Resources</div>
          </div>
          <div>
            <div className="text-2xl font-semibold text-gray-900 mb-1">95%</div>
            <div className="text-sm text-gray-600">Success Rate</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection
