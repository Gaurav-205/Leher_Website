import { motion } from 'framer-motion'
import { User, Star, Clock, Languages, Award } from 'lucide-react'
import { Counselor } from '@services/appointmentService'

interface CounselorCardProps {
  counselor: Counselor
  onSelect: (counselor: Counselor) => void
  isSelected?: boolean
}

const CounselorCard = ({ counselor, onSelect, isSelected = false }: CounselorCardProps) => {
  const getSpecializationColor = (spec: string) => {
    const colors = {
      'anxiety': 'bg-blue-100 text-blue-800',
      'depression': 'bg-purple-100 text-purple-800',
      'stress-management': 'bg-green-100 text-green-800',
      'academic-pressure': 'bg-yellow-100 text-yellow-800',
      'career-guidance': 'bg-indigo-100 text-indigo-800',
      'relationship-issues': 'bg-pink-100 text-pink-800',
      'trauma': 'bg-red-100 text-red-800',
      'grief-counseling': 'bg-gray-100 text-gray-800',
      'family-therapy': 'bg-teal-100 text-teal-800'
    }
    return colors[spec as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getLanguageName = (code: string) => {
    const languages = {
      'en': 'English',
      'hi': 'Hindi',
      'ta': 'Tamil',
      'te': 'Telugu',
      'bn': 'Bengali',
      'gu': 'Gujarati',
      'kn': 'Kannada',
      'mr': 'Marathi',
      'pa': 'Punjabi',
      'ur': 'Urdu',
      'ml': 'Malayalam'
    }
    return languages[code as keyof typeof languages] || code
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(counselor)}
      className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-200 ${
        isSelected 
          ? 'border-primary-500 bg-primary-50 shadow-lg' 
          : 'border-gray-200 hover:border-primary-300 hover:shadow-md'
      }`}
    >
      <div className="flex items-start space-x-4">
        <div className={`h-16 w-16 rounded-full flex items-center justify-center flex-shrink-0 ${
          isSelected ? 'bg-primary-200' : 'bg-primary-100'
        }`}>
          <User className={`h-8 w-8 ${isSelected ? 'text-primary-700' : 'text-primary-600'}`} />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">
                {counselor.userId.firstName} {counselor.userId.lastName}
              </h3>
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                {counselor.bio}
              </p>
            </div>
            {isSelected && (
              <div className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                Selected
              </div>
            )}
          </div>

          {/* Specializations */}
          <div className="flex flex-wrap gap-2 mb-3">
            {counselor.specialization.slice(0, 3).map(spec => (
              <span
                key={spec}
                className={`px-3 py-1 text-xs font-medium rounded-full ${getSpecializationColor(spec)}`}
              >
                {spec.replace('-', ' ')}
              </span>
            ))}
            {counselor.specialization.length > 3 && (
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
                +{counselor.specialization.length - 3} more
              </span>
            )}
          </div>

          {/* Stats and Info */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center text-gray-600">
              <Star className="h-4 w-4 mr-2 text-yellow-500 fill-current" />
              <span className="font-medium">{counselor.rating.toFixed(1)}</span>
              <span className="ml-1">({counselor.totalSessions} sessions)</span>
            </div>
            
            <div className="flex items-center text-gray-600">
              <Clock className="h-4 w-4 mr-2" />
              <span>{counselor.experience} years exp.</span>
            </div>
            
            <div className="flex items-center text-gray-600">
              <Languages className="h-4 w-4 mr-2" />
              <span>{counselor.languages.map(getLanguageName).join(', ')}</span>
            </div>
            
            <div className="flex items-center text-gray-600">
              <Award className="h-4 w-4 mr-2" />
              <span>₹{counselor.consultationFee}/session</span>
            </div>
          </div>

          {/* Availability Status */}
          <div className="mt-3 flex items-center justify-between">
            <div className={`flex items-center text-sm ${
              counselor.isAvailable ? 'text-green-600' : 'text-red-600'
            }`}>
              <div className={`h-2 w-2 rounded-full mr-2 ${
                counselor.isAvailable ? 'bg-green-500' : 'bg-red-500'
              }`} />
              {counselor.isAvailable ? 'Available' : 'Unavailable'}
            </div>
            
            {counselor.isAvailable && (
              <div className="text-sm text-gray-500">
                {counselor.currentSessionsToday}/{counselor.maxSessionsPerDay} sessions today
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default CounselorCard
