import { motion } from 'framer-motion'
import { Calendar, Clock, User, Video, Trash2, Eye } from 'lucide-react'
import { Appointment } from '@services/appointmentService'

interface AppointmentCardProps {
  appointment: Appointment
  onCancel: (id: string) => void
  onViewDetails: (appointment: Appointment) => void
}

const AppointmentCard = ({ appointment, onCancel, onViewDetails }: AppointmentCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'confirmed':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'no-show':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }


  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
  }

  const isUpcoming = () => {
    const appointmentDate = new Date(`${appointment.date}T${appointment.time}`)
    return appointmentDate > new Date() && ['scheduled', 'confirmed'].includes(appointment.status)
  }

  const isToday = () => {
    const appointmentDate = new Date(`${appointment.date}T${appointment.time}`)
    const today = new Date()
    return appointmentDate.toDateString() === today.toDateString()
  }


  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.002 }}
      className={`bg-white border rounded p-3 transition-all duration-200 ${
        isToday() ? 'border-primary-300 shadow-sm' : 'border-gray-200 hover:shadow-sm'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 flex-1 min-w-0">
          <div className={`h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 ${
            isToday() ? 'bg-primary-100' : 'bg-gray-100'
          }`}>
            <User className={`h-3 w-3 ${isToday() ? 'text-primary-600' : 'text-gray-600'}`} />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-1 mb-0.5">
              <h3 className="text-xs font-semibold text-gray-900 truncate">
                {appointment.counselor?.firstName} {appointment.counselor?.lastName}
              </h3>
              <span className={`px-1.5 py-0.5 text-xs font-medium rounded-full ${getStatusColor(appointment.status)}`}>
                {appointment.status}
              </span>
              {isToday() && (
                <span className="px-1.5 py-0.5 text-xs font-medium rounded-full bg-primary-100 text-primary-800">
                  Today
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-3 text-xs text-gray-600">
              <div className="flex items-center">
                <Calendar className="h-3 w-3 mr-0.5" />
                {formatDate(appointment.date)}
              </div>
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-0.5" />
                {formatTime(appointment.time)}
              </div>
              {appointment.meetingLink && (
                <div className="flex items-center text-primary-600">
                  <Video className="h-3 w-3 mr-0.5" />
                  <a 
                    href={appointment.meetingLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:underline"
                  >
                    Join
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-0.5 ml-2">
          {isUpcoming() && (
            <button
              onClick={() => onCancel(appointment._id)}
              className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
              title="Cancel appointment"
            >
              <Trash2 className="h-3 w-3" />
            </button>
          )}
          
          <button
            onClick={() => onViewDetails(appointment)}
            className="p-1 text-gray-600 hover:bg-gray-100 rounded transition-colors"
            title="View details"
          >
            <Eye className="h-3 w-3" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default AppointmentCard
