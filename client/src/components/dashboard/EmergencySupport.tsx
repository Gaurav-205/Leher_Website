import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Heart, 
  MessageCircle, 
  Phone,
  AlertTriangle,
  Shield
} from 'lucide-react'

const EmergencySupport = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl p-6 mb-8"
    >
      <div className="flex items-start">
        <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
          <Heart className="h-6 w-6 text-red-600" />
        </div>
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <h3 className="text-lg font-semibold text-red-900 mr-2">
              Need Immediate Help?
            </h3>
            <AlertTriangle className="h-5 w-5 text-red-600" />
          </div>
          <p className="text-red-700 mb-4 leading-relaxed">
            If you're experiencing a mental health crisis, please contact emergency services immediately. 
            Our crisis support team is available 24/7 to provide immediate assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/app/chatbot"
              className="inline-flex items-center justify-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors duration-200"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Start Crisis Chat
            </Link>
            <a
              href="tel:108"
              className="inline-flex items-center justify-center px-4 py-2 border border-red-600 text-red-600 text-sm font-medium rounded-lg hover:bg-red-50 transition-colors duration-200"
            >
              <Phone className="h-4 w-4 mr-2" />
              Call Emergency: 108
            </a>
            <a
              href="tel:1800-599-0019"
              className="inline-flex items-center justify-center px-4 py-2 border border-red-600 text-red-600 text-sm font-medium rounded-lg hover:bg-red-50 transition-colors duration-200"
            >
              <Phone className="h-4 w-4 mr-2" />
              KIRAN Helpline
            </a>
          </div>
          <div className="mt-4 p-3 bg-white/50 rounded-lg border border-red-200">
            <div className="flex items-center">
              <Shield className="h-4 w-4 text-red-600 mr-2" />
              <span className="text-sm text-red-800">
                <strong>Remember:</strong> You are not alone. Help is always available.
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default EmergencySupport
