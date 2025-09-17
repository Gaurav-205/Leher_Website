import { Calendar, Clock, User, MapPin, Video, MessageSquare, X } from 'lucide-react'
import { Appointment } from '@services/appointmentService'

interface AppointmentCardProps {
  appointment: Appointment
  onCancel: (appointmentId: string) => void
}

const AppointmentCard = ({ appointment, onCancel }: AppointmentCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-yellow-100 text-yellow-800'
      case 'confirmed':
        return 'bg-blue-100 text-blue-800'
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      case 'no-show':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'individual':
        return 'bg-purple-100 text-purple-800'
      case 'group':
        return 'bg-indigo-100 text-indigo-800'
      case 'emergency':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
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

  const canCancel = appointment.status === 'scheduled' || appointment.status === 'confirmed'
  const isUpcoming = new Date(appointment.date) > new Date()

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {/* Header with status and type */}
          <div className="flex items-center space-x-3 mb-4">
            <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(appointment.status)}`}>
              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
            </span>
            <span className={`px-3 py-1 text-xs font-medium rounded-full ${getTypeColor(appointment.type)}`}>
              {appointment.type.charAt(0).toUpperCase() + appointment.type.slice(1)}
            </span>
            {appointment.duration && (
              <span className="text-sm text-gray-500">
                {appointment.duration} minutes
              </span>
            )}
          </div>

          {/* Date and Time */}
          <div className="flex items-center space-x-6 mb-4">
            <div className="flex items-center space-x-2 text-gray-600">
              <Calendar className="h-4 w-4" />
              <span className="text-sm font-medium">{formatDate(appointment.date)}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Clock className="h-4 w-4" />
              <span className="text-sm font-medium">{formatTime(appointment.time)}</span>
            </div>
          </div>

          {/* Counselor/Student Info */}
          <div className="flex items-center space-x-6 mb-4">
            {appointment.counselor && (
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Dr. {appointment.counselor.firstName} {appointment.counselor.lastName}
                  </p>
                  <p className="text-xs text-gray-500">Counselor</p>
                </div>
              </div>
            )}
            {appointment.student && (
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {appointment.student.firstName} {appointment.student.lastName}
                  </p>
                  <p className="text-xs text-gray-500">Student</p>
                </div>
              </div>
            )}
          </div>

          {/* Location or Meeting Link */}
          {(appointment.location || appointment.meetingLink) && (
            <div className="flex items-center space-x-2 mb-4">
              {appointment.meetingLink ? (
                <>
                  <Video className="h-4 w-4 text-gray-400" />
                  <a
                    href={appointment.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-800 underline"
                  >
                    Join Video Call
                  </a>
                </>
              ) : (
                <>
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{appointment.location}</span>
                </>
              )}
            </div>
          )}

          {/* Notes */}
          {appointment.notes && (
            <div className="mb-4">
              <div className="flex items-start space-x-2">
                <MessageSquare className="h-4 w-4 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-1">Notes</p>
                  <p className="text-sm text-gray-600">{appointment.notes}</p>
                </div>
              </div>
            </div>
          )}

          {/* Student Notes */}
          {appointment.studentNotes && (
            <div className="mb-4">
              <div className="flex items-start space-x-2">
                <MessageSquare className="h-4 w-4 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-1">Your Notes</p>
                  <p className="text-sm text-gray-600">{appointment.studentNotes}</p>
                </div>
              </div>
            </div>
          )}

          {/* Rating */}
          {appointment.rating && (
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-900 mb-1">Rating</p>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-lg ${
                      i < appointment.rating! ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  >
                    ★
                  </span>
                ))}
                <span className="text-sm text-gray-500 ml-2">({appointment.rating}/5)</span>
              </div>
            </div>
          )}

          {/* Feedback */}
          {appointment.feedback && (
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-900 mb-1">Feedback</p>
              <p className="text-sm text-gray-600">{appointment.feedback}</p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col space-y-2">
          {canCancel && isUpcoming && (
            <button
              onClick={() => onCancel(appointment._id)}
              className="inline-flex items-center px-3 py-1 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
            >
              <X className="h-4 w-4 mr-1" />
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default AppointmentCard
