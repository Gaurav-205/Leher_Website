import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, User, X, Check, Search } from 'lucide-react'
import { appointmentService, Counselor, AvailableSlot } from '@services/appointmentService'
import CounselorCard from './CounselorCard'
import toast from 'react-hot-toast'

interface SimpleAppointmentBookingProps {
  onClose: () => void
  onSuccess: () => void
}

// Dummy counselors data
const dummyCounselors: Counselor[] = [
  {
    _id: '1',
    userId: {
      _id: 'user1',
      firstName: 'Dr. Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@example.com',
    },
    specialization: ['anxiety', 'depression', 'stress-management'],
    experience: 8,
    languages: ['en', 'hi'],
    availability: [
      { dayOfWeek: 1, startTime: '09:00', endTime: '17:00', isAvailable: true },
      { dayOfWeek: 2, startTime: '09:00', endTime: '17:00', isAvailable: true },
      { dayOfWeek: 3, startTime: '09:00', endTime: '17:00', isAvailable: true },
      { dayOfWeek: 4, startTime: '09:00', endTime: '17:00', isAvailable: true },
      { dayOfWeek: 5, startTime: '09:00', endTime: '17:00', isAvailable: true }
    ],
    rating: 4.8,
    totalSessions: 245,
    bio: 'Experienced counselor specializing in anxiety and depression. I help students navigate academic stress and personal challenges with evidence-based approaches.',
    qualifications: ['PhD in Clinical Psychology', 'Licensed Clinical Psychologist', 'CBT Certified'],
    isAvailable: true,
    consultationFee: 1500,
    maxSessionsPerDay: 8,
    currentSessionsToday: 3
  },
  {
    _id: '2',
    userId: {
      _id: 'user2',
      firstName: 'Dr. Rajesh',
      lastName: 'Kumar',
      email: 'rajesh.kumar@example.com',
    },
    specialization: ['academic-pressure', 'career-guidance', 'relationship-issues'],
    experience: 12,
    languages: ['en', 'hi', 'ta'],
    availability: [
      { dayOfWeek: 1, startTime: '10:00', endTime: '18:00', isAvailable: true },
      { dayOfWeek: 2, startTime: '10:00', endTime: '18:00', isAvailable: true },
      { dayOfWeek: 3, startTime: '10:00', endTime: '18:00', isAvailable: true },
      { dayOfWeek: 4, startTime: '10:00', endTime: '18:00', isAvailable: true },
      { dayOfWeek: 6, startTime: '09:00', endTime: '15:00', isAvailable: true }
    ],
    rating: 4.9,
    totalSessions: 320,
    bio: 'Career counselor with extensive experience helping students with academic pressure and career decisions. Fluent in multiple Indian languages.',
    qualifications: ['MSc in Counseling Psychology', 'Career Guidance Specialist', 'NLP Practitioner'],
    isAvailable: true,
    consultationFee: 1200,
    maxSessionsPerDay: 6,
    currentSessionsToday: 2
  },
  {
    _id: '3',
    userId: {
      _id: 'user3',
      firstName: 'Dr. Priya',
      lastName: 'Sharma',
      email: 'priya.sharma@example.com',
    },
    specialization: ['trauma', 'grief-counseling', 'family-therapy'],
    experience: 6,
    languages: ['en', 'hi', 'bn'],
    availability: [
      { dayOfWeek: 1, startTime: '14:00', endTime: '20:00', isAvailable: true },
      { dayOfWeek: 2, startTime: '14:00', endTime: '20:00', isAvailable: true },
      { dayOfWeek: 3, startTime: '14:00', endTime: '20:00', isAvailable: true },
      { dayOfWeek: 4, startTime: '14:00', endTime: '20:00', isAvailable: true },
      { dayOfWeek: 5, startTime: '14:00', endTime: '20:00', isAvailable: true }
    ],
    rating: 4.7,
    totalSessions: 180,
    bio: 'Specialized in trauma recovery and grief counseling. I provide a safe space for students dealing with difficult life experiences.',
    qualifications: ['MA in Clinical Psychology', 'Trauma-Informed Care Certified', 'Grief Counseling Specialist'],
    isAvailable: true,
    consultationFee: 1800,
    maxSessionsPerDay: 5,
    currentSessionsToday: 1
  }
]

const SimpleAppointmentBooking = ({ onClose, onSuccess }: SimpleAppointmentBookingProps) => {
  const [step, setStep] = useState(1)
  const [counselors, setCounselors] = useState<Counselor[]>(dummyCounselors)
  const [selectedCounselor, setSelectedCounselor] = useState<Counselor | null>(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [specializationFilter, setSpecializationFilter] = useState<string>('')

  // Generate available time slots for selected date
  const generateTimeSlots = (counselor: Counselor, date: string): AvailableSlot[] => {
    const appointmentDate = new Date(date)
    const dayOfWeek = appointmentDate.getDay()
    
    const dayAvailability = counselor.availability.find(avail => avail.dayOfWeek === dayOfWeek)
    if (!dayAvailability || !dayAvailability.isAvailable) {
      return []
    }

    const slots: AvailableSlot[] = []
    const startTime = dayAvailability.startTime
    const endTime = dayAvailability.endTime
    const slotDuration = 60

    // Convert time strings to minutes
    const timeToMinutes = (time: string) => {
      const [hours, minutes] = time.split(':').map(Number)
      return (hours || 0) * 60 + (minutes || 0)
    }

    const minutesToTime = (minutes: number) => {
      const hours = Math.floor(minutes / 60)
      const mins = minutes % 60
      return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`
    }

    const startMinutes = timeToMinutes(startTime)
    const endMinutes = timeToMinutes(endTime)

    // Generate slots every hour
    for (let minutes = startMinutes; minutes + slotDuration <= endMinutes; minutes += slotDuration) {
      const slotTime = minutesToTime(minutes)
      
      // Randomly make some slots unavailable for realism
      const isAvailable = Math.random() > 0.3
      
      slots.push({
        time: slotTime,
        duration: slotDuration,
        available: isAvailable
      })
    }

    return slots
  }

  const availableSlots = selectedCounselor && selectedDate 
    ? generateTimeSlots(selectedCounselor, selectedDate)
    : []

  // Filter counselors based on search and specialization
  const filteredCounselors = counselors.filter(counselor => {
    const matchesSearch = searchTerm === '' || 
      counselor.userId.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      counselor.userId.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      counselor.bio.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesSpecialization = specializationFilter === '' || 
      counselor.specialization.includes(specializationFilter)
    
    return matchesSearch && matchesSpecialization && counselor.isAvailable
  })

  const specializations = Array.from(new Set(counselors.flatMap(c => c.specialization)))

  // Fetch counselors from API
  const fetchCounselors = async () => {
    try {
      const response = await appointmentService.getAvailableCounselors()
      setCounselors(response.data || counselors)
    } catch (error) {
      console.error('Error fetching counselors:', error)
      // Keep dummy data as fallback
    }
  }

  useEffect(() => {
    fetchCounselors()
  }, [])

  const handleCounselorSelect = (counselor: Counselor) => {
    setSelectedCounselor(counselor)
    setStep(2)
  }

  const handleDateSelect = (date: string) => {
    setSelectedDate(date)
    setStep(3)
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
    setStep(4)
  }

  const handleBookAppointment = async () => {
    if (!selectedCounselor || !selectedDate || !selectedTime) return

    try {
      setLoading(true)
      
      // Use real API call
      const appointmentData = {
        counselorId: selectedCounselor._id,
        date: selectedDate,
        time: selectedTime,
        duration: 60,
        type: 'individual' as const,
        notes: notes,
        studentNotes: notes
      }
      
      await appointmentService.createAppointment(appointmentData)
      
      toast.success('Appointment booked successfully!')
      onSuccess()
      onClose()
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to book appointment'
      toast.error(errorMessage)
      console.error('Error booking appointment:', error)
    } finally {
      setLoading(false)
    }
  }

  const getMinDate = () => {
    const today = new Date()
    return today.toISOString().split('T')[0]
  }

  const getMaxDate = () => {
    const maxDate = new Date()
    maxDate.setDate(maxDate.getDate() + 14) // Allow booking up to 14 days in advance
    return maxDate.toISOString().split('T')[0]
  }

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {step > 1 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  ←
                </button>
              )}
              <h2 className="text-2xl font-prata font-bold text-gray-900">
                Book Appointment
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* Progress Steps */}
          <div className="flex items-center mt-4 space-x-4">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= stepNumber 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step > stepNumber ? <Check className="h-4 w-4" /> : stepNumber}
                </div>
                <span className={`ml-2 text-sm ${
                  step >= stepNumber ? 'text-primary-600 font-medium' : 'text-gray-500'
                }`}>
                  {stepNumber === 1 && 'Counselor'}
                  {stepNumber === 2 && 'Date'}
                  {stepNumber === 3 && 'Time'}
                  {stepNumber === 4 && 'Confirm'}
                </span>
                {stepNumber < 4 && (
                  <div className={`w-8 h-0.5 ml-4 ${
                    step > stepNumber ? 'bg-primary-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <AnimatePresence mode="wait">
            {/* Step 1: Select Counselor */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose a Counselor</h3>
                  
                  {/* Search and Filter */}
                  <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search counselors..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    
                    <div className="sm:w-48">
                      <select
                        value={specializationFilter}
                        onChange={(e) => setSpecializationFilter(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">All Specializations</option>
                        {specializations.map(spec => (
                          <option key={spec} value={spec}>
                            {spec.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {filteredCounselors.length === 0 ? (
                      <div className="text-center py-8">
                        <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">No counselors found matching your criteria.</p>
                      </div>
                    ) : (
                      filteredCounselors.map((counselor) => (
                        <CounselorCard
                          key={counselor._id}
                          counselor={counselor}
                          onSelect={handleCounselorSelect}
                          isSelected={selectedCounselor?._id === counselor._id}
                        />
                      ))
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Select Date */}
            {step === 2 && selectedCounselor && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Select Date</h3>
                  <p className="text-gray-600 mb-6">
                    Choose a date for your appointment with {selectedCounselor.userId.firstName} {selectedCounselor.userId.lastName}
                  </p>
                  
                  <div className="max-w-md">
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => handleDateSelect(e.target.value)}
                      min={getMinDate()}
                      max={getMaxDate()}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Select Time */}
            {step === 3 && selectedCounselor && selectedDate && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Select Time</h3>
                  <p className="text-gray-600 mb-6">
                    Available time slots for {new Date(selectedDate).toLocaleDateString()}
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {availableSlots.map((slot) => (
                      <button
                        key={slot.time}
                        onClick={() => handleTimeSelect(slot.time)}
                        className={`p-3 border rounded-lg text-center transition-colors ${
                          slot.available
                            ? 'border-primary-300 hover:bg-primary-50 hover:border-primary-400'
                            : 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                        }`}
                        disabled={!slot.available}
                      >
                        <div className="font-medium">{formatTime(slot.time)}</div>
                        <div className="text-xs text-gray-500">{slot.duration} min</div>
                      </button>
                    ))}
                  </div>

                  {availableSlots.length === 0 && (
                    <div className="text-center py-8">
                      <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">No available time slots for this date.</p>
                      <button
                        onClick={() => setStep(2)}
                        className="mt-4 text-primary-600 hover:text-primary-700 font-medium"
                      >
                        Choose a different date
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Step 4: Confirmation */}
            {step === 4 && selectedCounselor && selectedDate && selectedTime && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Confirm Appointment</h3>
                  
                  {/* Appointment Summary */}
                  <div className="bg-gray-50 rounded-lg p-6 mb-6">
                    <h4 className="font-medium text-gray-900 mb-4">Appointment Summary</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-3 text-gray-500" />
                        <span className="text-gray-600">Counselor:</span>
                        <span className="ml-2 font-medium text-gray-900">
                          {selectedCounselor.userId.firstName} {selectedCounselor.userId.lastName}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-3 text-gray-500" />
                        <span className="text-gray-600">Date:</span>
                        <span className="ml-2 font-medium text-gray-900">
                          {new Date(selectedDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-3 text-gray-500" />
                        <span className="text-gray-600">Time:</span>
                        <span className="ml-2 font-medium text-gray-900">
                          {formatTime(selectedTime)} (60 minutes)
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-gray-600">Fee:</span>
                        <span className="ml-2 font-medium text-gray-900">
                          ₹{selectedCounselor.consultationFee}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Notes (Optional)
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Any specific topics or concerns you'd like to discuss..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      rows={3}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex justify-between">
          <button
            onClick={onClose}
            className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
          
          {step === 4 && (
            <button
              onClick={handleBookAppointment}
              disabled={loading}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Booking...' : 'Book Appointment'}
            </button>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default SimpleAppointmentBooking

