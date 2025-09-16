import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, User, Search, Filter, ArrowLeft, Check } from 'lucide-react'
import { appointmentService, Counselor, AvailableSlot } from '@services/appointmentService'
import toast from 'react-hot-toast'

interface AppointmentBookingProps {
  onClose: () => void
  onSuccess: () => void
}

const AppointmentBooking = ({ onClose, onSuccess }: AppointmentBookingProps) => {
  const [step, setStep] = useState(1)
  const [counselors, setCounselors] = useState<Counselor[]>([])
  const [selectedCounselor, setSelectedCounselor] = useState<Counselor | null>(null)
  const [availableSlots, setAvailableSlots] = useState<AvailableSlot[]>([])
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [appointmentType, setAppointmentType] = useState<'individual' | 'group' | 'emergency'>('individual')
  const [notes, setNotes] = useState('')
  const [studentNotes, setStudentNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSpecialization, setSelectedSpecialization] = useState('')

  // Load counselors on component mount
  useEffect(() => {
    loadCounselors()
  }, [])

  // Load available slots when counselor and date are selected
  useEffect(() => {
    if (selectedCounselor && selectedDate) {
      loadAvailableSlots()
    }
  }, [selectedCounselor, selectedDate])

  const loadCounselors = async () => {
    try {
      setLoading(true)
      const response = await appointmentService.getAvailableCounselors()
      console.log('Counselors API Response:', response)
      console.log('Counselors Data:', response.data)
      console.log('Number of counselors received:', response.data?.length || 0)
      setCounselors(response.data || [])
    } catch (error: any) {
      toast.error('Failed to load counselors')
      console.error('Error loading counselors:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadAvailableSlots = async () => {
    if (!selectedCounselor) return

    try {
      setLoading(true)
      const response = await appointmentService.getAvailableSlots(selectedCounselor.userId._id, selectedDate)
      setAvailableSlots(response.data?.availableSlots || [])
    } catch (error: any) {
      toast.error('Failed to load available slots')
      console.error('Error loading slots:', error)
    } finally {
      setLoading(false)
    }
  }

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
      await appointmentService.createAppointment({
        counselorId: selectedCounselor.userId._id,
        date: selectedDate,
        time: selectedTime,
        duration: 60,
        type: appointmentType,
        notes: notes,
        studentNotes: studentNotes
      })

      toast.success('Appointment booked successfully!')
      onSuccess()
      onClose()
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to book appointment')
      console.error('Error booking appointment:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredCounselors = counselors.filter(counselor => {
    console.log('Filtering counselor:', counselor)
    console.log('Counselor userId:', counselor.userId)
    
    const matchesSearch = counselor.userId?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         counselor.userId?.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         counselor.specialization.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesSpecialization = !selectedSpecialization || counselor.specialization.includes(selectedSpecialization)
    
    return matchesSearch && matchesSpecialization
  })

  const getMinDate = () => {
    const today = new Date()
    return today.toISOString().split('T')[0]
  }

  const getMaxDate = () => {
    const maxDate = new Date()
    maxDate.setDate(maxDate.getDate() + 30) // Allow booking up to 30 days in advance
    return maxDate.toISOString().split('T')[0]
  }

  const getSpecializations = () => {
    const allSpecs = counselors.flatMap(c => c.specialization)
    return [...new Set(allSpecs)]
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
                  <ArrowLeft className="h-5 w-5" />
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
              ×
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
                  {stepNumber === 4 && 'Details'}
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
                  <div className="flex gap-4 mb-6">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search counselors..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    <div className="relative">
                      <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <select
                        value={selectedSpecialization}
                        onChange={(e) => setSelectedSpecialization(e.target.value)}
                        className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white"
                      >
                        <option value="">All Specializations</option>
                        {getSpecializations().map(spec => (
                          <option key={spec} value={spec}>
                            {spec.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Counselors List */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredCounselors.map((counselor) => (
                      <motion.div
                        key={counselor._id}
                        whileHover={{ scale: 1.02 }}
                        className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 hover:shadow-md transition-all cursor-pointer"
                        onClick={() => handleCounselorSelect(counselor)}
                      >
                        <div className="flex items-start space-x-4">
                          <div className="h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <User className="h-6 w-6 text-primary-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-900">
                              {counselor.userId.firstName} {counselor.userId.lastName}
                            </h4>
                            <p className="text-sm text-gray-600 mb-2">{counselor.bio.substring(0, 100)}...</p>
                            <div className="flex flex-wrap gap-1 mb-2">
                              {counselor.specialization.slice(0, 3).map(spec => (
                                <span
                                  key={spec}
                                  className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full"
                                >
                                  {spec.replace('-', ' ')}
                                </span>
                              ))}
                              {counselor.specialization.length > 3 && (
                                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                  +{counselor.specialization.length - 3} more
                                </span>
                              )}
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <span className="text-sm text-gray-600">
                                  ⭐ {counselor.rating.toFixed(1)} ({counselor.totalSessions} sessions)
                                </span>
                              </div>
                              <span className="text-sm font-medium text-primary-600">
                                {counselor.experience} years exp
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {filteredCounselors.length === 0 && (
                    <div className="text-center py-8">
                      <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">No counselors found matching your criteria.</p>
                    </div>
                  )}
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
                  
                  {loading ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                    </div>
                  ) : (
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
                          <div className="font-medium">{slot.time}</div>
                          <div className="text-xs text-gray-500">{slot.duration} min</div>
                        </button>
                      ))}
                    </div>
                  )}

                  {availableSlots.length === 0 && !loading && (
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

            {/* Step 4: Appointment Details */}
            {step === 4 && selectedCounselor && selectedDate && selectedTime && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Appointment Details</h3>
                  
                  {/* Appointment Summary */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <h4 className="font-medium text-gray-900 mb-2">Appointment Summary</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        {selectedCounselor.userId.firstName} {selectedCounselor.userId.lastName}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        {new Date(selectedDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        {selectedTime} (60 minutes)
                      </div>
                    </div>
                  </div>

                  {/* Appointment Type */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Appointment Type
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {(['individual', 'group', 'emergency'] as const).map((type) => (
                        <button
                          key={type}
                          onClick={() => setAppointmentType(type)}
                          className={`p-3 border rounded-lg text-center transition-colors ${
                            appointmentType === type
                              ? 'border-primary-500 bg-primary-50 text-primary-700'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          <div className="font-medium capitalize">{type}</div>
                        </button>
                      ))}
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

                  {/* Student Notes */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Personal Notes (Private)
                    </label>
                    <textarea
                      value={studentNotes}
                      onChange={(e) => setStudentNotes(e.target.value)}
                      placeholder="Personal notes that only you can see..."
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

export default AppointmentBooking
