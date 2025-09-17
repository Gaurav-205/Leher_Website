import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="h-6 w-6 bg-blue-600 rounded-lg flex items-center justify-center">
              <Heart className="h-4 w-4 text-white" />
            </div>
            <span className="ml-2 text-lg font-medium">
              Lehar
            </span>
          </div>
          <p className="text-gray-400 text-sm mb-6">
            Mental wellness support for students across India
          </p>
          <div className="flex justify-center space-x-6 mb-6">
            <Link to="/app/chatbot" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
              AI Chat
            </Link>
            <Link to="/app/community" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
              Community
            </Link>
            <Link to="/app/resources" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
              Resources
            </Link>
            <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
              Privacy
            </Link>
          </div>
          <div className="text-gray-500 text-xs">
            © {currentYear} Lehar. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer