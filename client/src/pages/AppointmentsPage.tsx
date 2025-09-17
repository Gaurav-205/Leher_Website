import { useState, useEffect } from 'react'
import { Calendar, Clock, User, Plus, Filter, Search } from 'lucide-react'
import { appointmentService, Appointment, Counselor } from '@services/appointmentService'
import AppointmentCard from '@components/appointments/AppointmentCard'
import BookAppointmentModal from '@components/appointments/BookAppointmentModal'
import toast from 'react-hot-toast'

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showBookModal, setShowBookModal] = useState(false)
  const [filterStatus, setFilterStatus] = useState('')
  const [filterType, setFilterType] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    loadAppointments()
  }, [filterStatus, filterType])

  const loadAppointments = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const params: any = {}
      if (filterStatus) params.status = filterStatus
      if (filterType) params.type = filterType
      
      const response = await appointmentService.getAppointments(params)
      if (response.success && response.data) {
        setAppointments(response.data.appointments)
      }
    } catch (err) {
      console.error('Error loading appointments:', err)
      setError('Failed to load appointments. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleBookAppointment = () => {
    setShowBookModal(true)
  }

  const handleAppointmentBooked = (newAppointment: Appointment) => {
    setAppointments(prev => [newAppointment, ...prev])
    setShowBookModal(false)
    toast.success('Appointment booked successfully!')
  }

  const handleCancelAppointment = async (appointmentId: string) => {
    try {
      await appointmentService.cancelAppointment(appointmentId)
      setAppointments(prev => 
        prev.map(apt => 
          apt._id === appointmentId 
            ? { ...apt, status: 'cancelled' as const }
            : apt
        )
      )
      toast.success('Appointment cancelled successfully!')
    } catch (err) {
      console.error('Error cancelling appointment:', err)
      toast.error('Failed to cancel appointment')
    }
  }

  const filteredAppointments = appointments.filter(appointment => {
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase()
      const counselorName = appointment.counselor 
        ? `${appointment.counselor.firstName} ${appointment.counselor.lastName}`.toLowerCase()
        : ''
      const studentName = appointment.student 
        ? `${appointment.student.firstName} ${appointment.student.lastName}`.toLowerCase()
        : ''
      
      return counselorName.includes(searchLower) || 
             studentName.includes(searchLower) ||
             appointment.notes?.toLowerCase().includes(searchLower)
    }
    return true
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="h-full w-full flex flex-col">
          <div className="flex-shrink-0 px-6 py-4 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Calendar className="h-4 w-4 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-light text-gray-900">Appointments</h1>
                <p className="text-lg text-gray-600">Manage your therapy sessions</p>
              </div>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading appointments...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="h-full w-full flex flex-col">
          <div className="flex-shrink-0 px-6 py-4 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Calendar className="h-4 w-4 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-light text-gray-900">Appointments</h1>
                <p className="text-lg text-gray-600">Manage your therapy sessions</p>
              </div>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="h-16 w-16 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-light text-gray-900 mb-2">Error loading appointments</h3>
              <p className="text-lg text-gray-600 mb-6">{error}</p>
              <button 
                onClick={loadAppointments}
                className="inline-flex items-center px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors duration-200"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="h-full w-full flex flex-col">
        {/* Header */}
        <div className="flex-shrink-0 px-6 py-4 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Calendar className="h-4 w-4 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-light text-gray-900">Appointments</h1>
                <p className="text-lg text-gray-600">Manage your therapy sessions</p>
              </div>
            </div>
            <button
              onClick={handleBookAppointment}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <Plus className="h-4 w-4 mr-2" />
              Book Appointment
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex-shrink-0 px-6 py-4 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search appointments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Status</option>
              <option value="scheduled">Scheduled</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Types</option>
              <option value="individual">Individual</option>
              <option value="group">Group</option>
              <option value="emergency">Emergency</option>
            </select>
          </div>
        </div>

        {/* Appointments List */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            {filteredAppointments.length === 0 ? (
              <div className="text-center py-12">
                <div className="h-16 w-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-light text-gray-900 mb-2">No appointments found</h3>
                <p className="text-lg text-gray-600 mb-6">
                  {searchQuery || filterStatus || filterType 
                    ? 'Try adjusting your search or filters'
                    : 'Book your first appointment to get started'
                  }
                </p>
                {!searchQuery && !filterStatus && !filterType && (
                  <button
                    onClick={handleBookAppointment}
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Book Appointment
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredAppointments.map((appointment) => (
                  <AppointmentCard
                    key={appointment._id}
                    appointment={appointment}
                    onCancel={handleCancelAppointment}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Book Appointment Modal */}
      {showBookModal && (
        <BookAppointmentModal
          isOpen={showBookModal}
          onClose={() => setShowBookModal(false)}
          onAppointmentBooked={handleAppointmentBooked}
        />
      )}
    </div>
  )
}

export default AppointmentsPage
