import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Search, Star } from 'lucide-react'
import { appointmentService, Appointment } from '@services/appointmentService'
import AppointmentCard from './AppointmentCard'
import toast from 'react-hot-toast'

interface SimpleAppointmentListProps {
  refreshTrigger?: number
}

// Dummy appointments data
const dummyAppointments = [
  {
    _id: '1',
    student: {
      _id: 'student1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com'
    },
    counselor: {
      _id: 'counselor1',
      firstName: 'Dr. Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@example.com'
    },
    date: '2024-01-20',
    time: '10:00',
    duration: 60,
    type: 'individual',
    status: 'scheduled',
    notes: 'Discussion about academic stress and anxiety management techniques.',
    studentNotes: 'Feeling overwhelmed with final exams approaching.',
    counselorNotes: '',
    meetingLink: 'https://meet.google.com/abc-defg-hij',
    location: 'Room 201, Counseling Center',
    rating: null,
    feedback: '',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    _id: '2',
    student: {
      _id: 'student1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com'
    },
    counselor: {
      _id: 'counselor2',
      firstName: 'Dr. Rajesh',
      lastName: 'Kumar',
      email: 'rajesh.kumar@example.com'
    },
    date: '2024-01-18',
    time: '14:00',
    duration: 60,
    type: 'individual',
    status: 'completed',
    notes: 'Career guidance session focusing on post-graduation plans.',
    studentNotes: 'Need help deciding between job and higher studies.',
    counselorNotes: 'Student shows strong analytical skills, recommended exploring both options.',
    meetingLink: '',
    location: 'Room 105, Counseling Center',
    rating: 5,
    feedback: 'Very helpful session. Dr. Kumar provided excellent guidance and helped clarify my career path.',
    createdAt: '2024-01-10T14:00:00Z',
    updatedAt: '2024-01-18T15:00:00Z'
  },
  {
    _id: '3',
    student: {
      _id: 'student1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com'
    },
    counselor: {
      _id: 'counselor3',
      firstName: 'Dr. Priya',
      lastName: 'Sharma',
      email: 'priya.sharma@example.com'
    },
    date: '2024-01-25',
    time: '16:00',
    duration: 60,
    type: 'individual',
    status: 'scheduled',
    notes: 'Follow-up session for trauma recovery progress.',
    studentNotes: 'Feeling much better after the previous sessions.',
    counselorNotes: '',
    meetingLink: 'https://meet.google.com/xyz-uvwx-rst',
    location: 'Room 203, Counseling Center',
    rating: null,
    feedback: '',
    createdAt: '2024-01-12T16:00:00Z',
    updatedAt: '2024-01-12T16:00:00Z'
  }
]

const SimpleAppointmentList = ({ refreshTrigger }: SimpleAppointmentListProps) => {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'completed' | 'cancelled'>('all')
  const [searchTerm, setSearchTerm] = useState('')

  const fetchAppointments = async () => {
    try {
      setLoading(true)
      const response = await appointmentService.getAppointments()
      setAppointments(response.data.appointments)
    } catch (error) {
      console.error('Error fetching appointments:', error)
      // Fallback to dummy data if API fails
      setAppointments(dummyAppointments as Appointment[])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAppointments()
  }, [refreshTrigger])

  const handleCancelAppointment = async (appointmentId: string) => {
    if (!confirm('Are you sure you want to cancel this appointment?')) return

    try {
      await appointmentService.cancelAppointment(appointmentId)
      
      setAppointments(prev => 
        prev.map(apt => 
          apt._id === appointmentId 
            ? { ...apt, status: 'cancelled' }
            : apt
        )
      )
      toast.success('Appointment cancelled successfully')
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to cancel appointment'
      toast.error(errorMessage)
    }
  }

  const handleViewDetails = (appointment: any) => {
    setSelectedAppointment(appointment)
    setShowDetails(true)
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
    // Filter by status
    let statusMatch = true
    if (filter === 'all') statusMatch = true
    else if (filter === 'upcoming') statusMatch = ['scheduled', 'confirmed'].includes(appointment.status)
    else statusMatch = appointment.status === filter

    // Filter by search term
    const searchMatch = searchTerm === '' || 
      appointment.counselor?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.counselor?.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.notes?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.studentNotes?.toLowerCase().includes(searchTerm.toLowerCase())

    return statusMatch && searchMatch
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


  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col min-h-0">
      {/* Compact Filter and Search */}
      <div className="flex-shrink-0 px-4 py-2 border-b border-gray-200 bg-gray-50">
        <div className="flex gap-2">
          {/* Search Bar */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-7 pr-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
          
          {/* Filter Tabs */}
          <div className="flex space-x-0.5 bg-white p-0.5 rounded border border-gray-300">
            {[
              { key: 'all', label: 'All' },
              { key: 'upcoming', label: 'Up' },
              { key: 'completed', label: 'Done' },
              { key: 'cancelled', label: 'Cancel' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key as any)}
                className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
                  filter === tab.key
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Appointments List - Scrollable */}
      <div className="flex-1 overflow-y-auto min-h-0">
        <div className="p-4 space-y-2">
          {filteredAppointments.length === 0 ? (
            <div className="text-center py-6">
              <Calendar className="h-6 w-6 text-gray-400 mx-auto mb-2" />
              <h3 className="text-xs font-medium text-gray-900 mb-1">No appointments found</h3>
              <p className="text-xs text-gray-600">
                {filter === 'all' 
                  ? "Book your first appointment to get started."
                  : `No ${filter} appointments found.`
                }
              </p>
            </div>
          ) : (
            filteredAppointments.map((appointment) => (
              <AppointmentCard
                key={appointment._id}
                appointment={appointment}
                onCancel={handleCancelAppointment}
                onViewDetails={handleViewDetails}
              />
            ))
          )}
        </div>
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
                            star <= (selectedAppointment.rating || 0)
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

export default SimpleAppointmentList

