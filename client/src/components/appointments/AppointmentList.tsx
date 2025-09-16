import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, User, MapPin, Video, MessageSquare, Star, MoreVertical, Edit, Trash2, Eye } from 'lucide-react'
import { appointmentService, Appointment } from '@services/appointmentService'
import toast from 'react-hot-toast'

interface AppointmentListProps {
  refreshTrigger?: number
}

const AppointmentList = ({ refreshTrigger }: AppointmentListProps) => {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'completed' | 'cancelled'>('all')

  useEffect(() => {
    loadAppointments()
  }, [refreshTrigger])

  const loadAppointments = async () => {
    try {
      setLoading(true)
      const response = await appointmentService.getAppointments()
      setAppointments(response.data.appointments || [])
    } catch (error: any) {
      toast.error('Failed to load appointments')
      console.error('Error loading appointments:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCancelAppointment = async (appointmentId: string) => {
    if (!confirm('Are you sure you want to cancel this appointment?')) return

    try {
      await appointmentService.cancelAppointment(appointmentId)
      toast.success('Appointment cancelled successfully')
      loadAppointments()
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to cancel appointment')
    }
  }

  const handleViewDetails = async (appointmentId: string) => {
    try {
      const response = await appointmentService.getAppointment(appointmentId)
      setSelectedAppointment(response.data || null)
      setShowDetails(true)
    } catch (error: any) {
      toast.error('Failed to load appointment details')
    }
  }

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

  const filteredAppointments = appointments.filter(appointment => {
    if (filter === 'all') return true
    if (filter === 'upcoming') return ['scheduled', 'confirmed'].includes(appointment.status)
    return appointment.status === filter
  })

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

  const isUpcoming = (appointment: Appointment) => {
    const appointmentDate = new Date(`${appointment.date}T${appointment.time}`)
    return appointmentDate > new Date() && ['scheduled', 'confirmed'].includes(appointment.status)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {[
          { key: 'all', label: 'All' },
          { key: 'upcoming', label: 'Upcoming' },
          { key: 'completed', label: 'Completed' },
          { key: 'cancelled', label: 'Cancelled' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key as any)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              filter === tab.key
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {filteredAppointments.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments found</h3>
            <p className="text-gray-600">
              {filter === 'all' 
                ? "You don't have any appointments yet. Book your first appointment to get started."
                : `No ${filter} appointments found.`
              }
            </p>
          </div>
        ) : (
          filteredAppointments.map((appointment) => (
            <motion.div
              key={appointment._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="h-6 w-6 text-primary-600" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {appointment.counselor?.firstName} {appointment.counselor?.lastName}
                      </h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(appointment.status)}`}>
                        {appointment.status}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(appointment.type)}`}>
                        {appointment.type}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-600 mb-3">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(appointment.date)}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {formatTime(appointment.time)}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {appointment.duration} minutes
                      </div>
                    </div>

                    {appointment.notes && (
                      <p className="text-sm text-gray-600 mb-3">
                        <strong>Notes:</strong> {appointment.notes}
                      </p>
                    )}

                    {appointment.meetingLink && (
                      <div className="flex items-center text-sm text-primary-600 mb-2">
                        <Video className="h-4 w-4 mr-1" />
                        <a href={appointment.meetingLink} target="_blank" rel="noopener noreferrer" className="hover:underline">
                          Join Meeting
                        </a>
                      </div>
                    )}

                    {appointment.location && (
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        {appointment.location}
                      </div>
                    )}

                    {appointment.rating && (
                      <div className="flex items-center text-sm text-yellow-600">
                        <Star className="h-4 w-4 mr-1 fill-current" />
                        Rated {appointment.rating}/5
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {isUpcoming(appointment) && (
                    <button
                      onClick={() => handleCancelAppointment(appointment._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Cancel appointment"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                  
                  <button
                    onClick={() => handleViewDetails(appointment._id)}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    title="View details"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Appointment Details Modal */}
      {showDetails && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">Appointment Details</h3>
                <button
                  onClick={() => setShowDetails(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Counselor</label>
                    <p className="text-gray-900">
                      {selectedAppointment.counselor?.firstName} {selectedAppointment.counselor?.lastName}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Date & Time</label>
                    <p className="text-gray-900">
                      {formatDate(selectedAppointment.date)} at {formatTime(selectedAppointment.time)}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Duration</label>
                    <p className="text-gray-900">{selectedAppointment.duration} minutes</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Type</label>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(selectedAppointment.type)}`}>
                      {selectedAppointment.type}
                    </span>
                  </div>
                </div>

                {/* Status */}
                <div>
                  <label className="text-sm font-medium text-gray-500">Status</label>
                  <div className="mt-1">
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(selectedAppointment.status)}`}>
                      {selectedAppointment.status}
                    </span>
                  </div>
                </div>

                {/* Notes */}
                {selectedAppointment.notes && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Notes</label>
                    <p className="text-gray-900 mt-1">{selectedAppointment.notes}</p>
                  </div>
                )}

                {/* Student Notes */}
                {selectedAppointment.studentNotes && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Your Notes</label>
                    <p className="text-gray-900 mt-1">{selectedAppointment.studentNotes}</p>
                  </div>
                )}

                {/* Counselor Notes */}
                {selectedAppointment.counselorNotes && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Counselor Notes</label>
                    <p className="text-gray-900 mt-1">{selectedAppointment.counselorNotes}</p>
                  </div>
                )}

                {/* Meeting Link */}
                {selectedAppointment.meetingLink && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Meeting Link</label>
                    <div className="mt-1">
                      <a
                        href={selectedAppointment.meetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-700 underline"
                      >
                        {selectedAppointment.meetingLink}
                      </a>
                    </div>
                  </div>
                )}

                {/* Location */}
                {selectedAppointment.location && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Location</label>
                    <p className="text-gray-900 mt-1">{selectedAppointment.location}</p>
                  </div>
                )}

                {/* Rating */}
                {selectedAppointment.rating && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Your Rating</label>
                    <div className="flex items-center mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-5 w-5 ${
                            star <= selectedAppointment.rating!
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-gray-900">{selectedAppointment.rating}/5</span>
                    </div>
                    {selectedAppointment.feedback && (
                      <p className="text-gray-900 mt-2">{selectedAppointment.feedback}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default AppointmentList
