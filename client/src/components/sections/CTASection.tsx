import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Heart, Shield, Users, MessageCircle } from 'lucide-react'

const CTASection = () => {
  const benefits = [
    '24/7 AI-powered mental health support',
    'Confidential counselor appointments',
    'Multi-language support (Hindi, English, Regional)',
    'Peer-to-peer support communities',
    'Institution-specific customization',
    'Anonymous analytics for policy planning'
  ]

  return (
    <section className="py-20 bg-primary-600 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-prata font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-primary-100 mb-8 leading-relaxed">
              Join thousands of students who have found support, community, and 
              professional help through our platform. Your mental health matters, 
              and we're here to support you every step of the way.
            </p>

            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-center"
                >
                  <div className="h-6 w-6 bg-green-400 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-primary-100">{benefit}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/auth/register"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-primary-600 bg-white rounded-lg hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Create Your Account
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/auth/login"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white border-2 border-white rounded-lg hover:bg-white hover:text-primary-600 transition-all duration-200"
              >
                Sign In
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="text-center">
                <div className="h-24 w-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-2xl font-prata font-bold text-white mb-4">
                  Lehar Platform
                </h3>
                <div className="text-primary-100 mb-6 space-y-2">
                  <p className="font-semibold">Digital Mental Health Support</p>
                  <p>Comprehensive Student Wellness Platform</p>
                  <p>Supporting Students Across India</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4 border border-white/20">
                  <p className="text-sm text-white">
                    <strong>Open Source & Scalable</strong><br />
                    Ensuring every student has access to timely psychological support
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 h-8 w-8 bg-yellow-400 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 h-6 w-6 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 -right-8 h-4 w-4 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default CTASection
