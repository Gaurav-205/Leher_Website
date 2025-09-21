import { Link } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#A8CFF1]/10 via-white to-[#B9A6DC]/10 dark:from-[#0F0F23] dark:via-[#1A1A2E] dark:to-[#16213E]">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-prata font-bold text-[#00589F] dark:text-[#45A1E7]">404</h1>
          <h2 className="text-2xl font-prata font-semibold text-gray-900 dark:text-[#A8CFF1] mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 dark:text-[#B8B8B8] mb-8 font-montserrat">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            to="/app"
            className="btn-primary inline-flex items-center justify-center px-6 py-3"
          >
            <Home className="h-4 w-4 mr-2" />
            Go to Dashboard
          </Link>
          
          <div>
            <button
              onClick={() => window.history.back()}
              className="btn-outline inline-flex items-center justify-center px-6 py-3"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </button>
          </div>
        </div>

        <div className="mt-8 p-4 bg-[#A8CFF1]/20 dark:bg-[#A8CFF1]/10 rounded-lg">
          <p className="text-sm text-[#2A3E66] dark:text-[#A8CFF1] font-montserrat">
            Need help? Contact our support team or use the AI chatbot for assistance.
          </p>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
