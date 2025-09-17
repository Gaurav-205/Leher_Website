import { useState, useEffect } from 'react'
import { X, Calendar, Clock, User, MapPin, MessageSquare } from 'lucide-react'
import { appointmentService, Counselor, CreateAppointmentData } from '@services/appointmentService'
import toast from 'react-hot-toast'

interface BookAppointmentModalProps {
  isOpen: boolean
  onClose: () => void
  onAppointmentBooked: (appointment: any) => void
}

const BookAppointmentModal = ({ isOpen, onClose, onAppointmentBooked }: BookAppointmentModalProps) => {
  const [counselors, setCounselors] = useState<Counselor[]>([])
  const [selectedCounselor, setSelectedCounselor] = useState<Counselor | null>(null)
  const [availableSlots, setAvailableSlots] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1) // 1: Select counselor, 2: Select date/time, 3: Confirm details

  const [formData, setFormData] = useState<CreateAppointmentData>({
    counselorId: '',
    date: '',
    time: '',
    duration: 60,
    type: 'individual',
    notes: '',
    location: ''
  })

  useEffect(() => {
    if (isOpen) {
      loadCounselors()
    }
  }, [isOpen])

  const loadCounselors = async () => {
    try {
      setLoading(true)
      const response = await appointmentService.getAvailableCounselors()
      if (response.success && response.data) {
        setCounselors(response.data)
      }
    } catch (error) {
      console.error('Error loading counselors:', error)
      toast.error('Failed to load counselors')
    } finally {
      setLoading(false)
    }
  }

  const handleCounselorSelect = (counselor: Counselor) => {
    setSelectedCounselor(counselor)
    setFormData(prev => ({ ...prev, counselorId: counselor.userId._id }))
    setStep(2)
  }

  const handleDateChange = async (date: string) => {
    setFormData(prev => ({ ...prev, date }))
    
    if (selectedCounselor) {
      try {
        const response = await appointmentService.getCounselorAvailability(selectedCounselor._id, date)
        if (response.success && response.data) {
          // Generate time slots based on availability
          const slotsSet = new Set<string>()
          response.data.forEach(availability => {
            if (availability.isAvailable) {
              const startHour = parseInt(availability.startTime.split(':')[0])
              const endHour = parseInt(availability.endTime.split(':')[0])
              
              for (let hour = startHour; hour < endHour; hour++) {
                slotsSet.add(`${hour.toString().padStart(2, '0')}:00`)
                slotsSet.add(`${hour.toString().padStart(2, '0')}:30`)
              }
            }
          })
          // Convert Set to Array and sort
          const uniqueSlots = Array.from(slotsSet).sort()
          setAvailableSlots(uniqueSlots)
        }
      } catch (error) {
        console.error('Error loading availability:', error)
        toast.error('Failed to load available time slots')
      }
    }
  }

  const handleTimeSelect = (time: string) => {
    setFormData(prev => ({ ...prev, time }))
    setStep(3)
  }

  const handleSubmit = async () => {
    try {
      setLoading(true)
      console.log('Creating appointment with data:', formData)
      const response = await appointmentService.createAppointment(formData)
      if (response.success && response.data) {
        onAppointmentBooked(response.data)
        onClose()
        resetForm()
      }
    } catch (error: any) {
      console.error('Error creating appointment:', error)
      console.error('Error response:', error.response?.data)
      const errorMessage = error.response?.data?.message || 'Failed to book appointment'
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      counselorId: '',
      date: '',
      time: '',
      duration: 60,
      type: 'individual',
      notes: '',
      location: ''
    })
    setSelectedCounselor(null)
    setAvailableSlots([])
    setStep(1)
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Book Appointment</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= stepNumber
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div
                    className={`w-16 h-1 mx-2 ${
                      step > stepNumber ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>Select Counselor</span>
            <span>Choose Time</span>
            <span>Confirm Details</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 1 && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Select a Counselor</h3>
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent mx-auto"></div>
                  <p className="text-gray-600 mt-2">Loading counselors...</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {counselors.map((counselor) => (
                    <div
                      key={counselor._id}
                      onClick={() => handleCounselorSelect(counselor)}
                      className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">
                            Dr. {counselor.userId?.firstName} {counselor.userId?.lastName}
                          </h4>
                          <p className="text-sm text-gray-600 mb-2">{counselor.bio}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>{counselor.experience} years experience</span>
                            <span>Rating: {counselor.rating}/5</span>
                            {counselor.consultationFee && (
                              <span>${counselor.consultationFee}/session</span>
                            )}
                          </div>
                          <div className="mt-2">
                            <span className="text-xs text-gray-500">Specializations: </span>
                            <span className="text-xs text-blue-600">
                              {counselor.specialization.join(', ')}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Select Date & Time</h3>
              
              {/* Date Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleDateChange(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  max={new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Time Selection */}
              {formData.date && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Available Time Slots
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {availableSlots.map((slot, index) => (
                      <button
                        key={`${slot}-${index}`}
                        onClick={() => handleTimeSelect(slot)}
                        className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                      >
                        {formatTime(slot)}
                      </button>
                    ))}
                  </div>
                  {availableSlots.length === 0 && (
                    <p className="text-gray-500 text-sm">No available time slots for this date</p>
                  )}
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Details</h3>
              
              {/* Appointment Summary */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Appointment Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-gray-400" />
                    <span>Dr. {selectedCounselor?.userId?.firstName} {selectedCounselor?.userId?.lastName}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>{new Date(formData.date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span>{formatTime(formData.time)} ({formData.duration} minutes)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400">Type:</span>
                    <span className="capitalize">{formData.type}</span>
                  </div>
                </div>
              </div>

              {/* Additional Details */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration (minutes)
                  </label>
                  <select
                    value={formData.duration}
                    onChange={(e) => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value={30}>30 minutes</option>
                    <option value={45}>45 minutes</option>
                    <option value={60}>60 minutes</option>
                    <option value={90}>90 minutes</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Session Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as any }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="individual">Individual Session</option>
                    <option value="group">Group Session</option>
                    <option value="emergency">Emergency Session</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location (optional)
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="Enter location or leave blank for online session"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes (optional)
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Any specific concerns or topics you'd like to discuss..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200">
          <button
            onClick={() => setStep(step > 1 ? step - 1 : 1)}
            disabled={step === 1}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Back
          </button>
          
          <div className="flex space-x-3">
            <button
              onClick={handleClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            
            {step < 3 ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={!formData.counselorId || (step === 2 && (!formData.date || !formData.time))}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Booking...' : 'Book Appointment'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookAppointmentModal
