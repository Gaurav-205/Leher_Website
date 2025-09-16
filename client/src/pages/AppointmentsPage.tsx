import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, User, Plus, AlertTriangle, Search, Filter } from 'lucide-react'
import AppointmentBooking from '@components/appointments/AppointmentBooking'
import AppointmentList from '@components/appointments/AppointmentList'

const AppointmentsPage = () => {
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleBookingSuccess = () => {
    setRefreshTrigger(prev => prev + 1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-prata font-bold text-gray-900 mb-2">
                Appointments
              </h1>
              <p className="text-lg text-gray-600">
                Schedule and manage your counseling sessions
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <button
                onClick={() => setShowBookingModal(true)}
                className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors duration-200"
              >
                <Plus className="h-5 w-5 mr-2" />
                Book Appointment
              </button>
            </div>
          </div>
        </motion.div>

        {/* Emergency Support Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-6 text-white">
            <div className="flex items-center">
              <div className="h-12 w-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-1">Emergency Support Available</h3>
                <p className="text-red-100 text-sm">
                  Need immediate help? Our crisis support team is available 24/7.
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm text-red-100 mb-1">Emergency: 108</div>
                <div className="text-sm text-red-100">KIRAN: 1800-599-0019</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Upcoming</p>
                <p className="text-2xl font-bold text-gray-900">-</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">-</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                <User className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Sessions</p>
                <p className="text-2xl font-bold text-gray-900">-</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-4 gap-8"
        >
          {/* Appointments List */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Your Appointments</h2>
                <p className="text-gray-600 mt-1">Manage your scheduled counseling sessions</p>
              </div>
              <div className="p-6">
                <AppointmentList refreshTrigger={refreshTrigger} />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => setShowBookingModal(true)}
                  className="w-full flex items-center justify-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Book New Appointment
                </button>
                
                <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  <Search className="h-4 w-4 mr-2" />
                  Find Counselors
                </button>
                
                <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter Appointments
                </button>
              </div>
            </div>

            {/* Help & Support */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Help & Support</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">How to Book</h4>
                  <p className="text-sm text-gray-600">
                    Choose a counselor, select your preferred date and time, and provide any relevant notes.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Cancellation Policy</h4>
                  <p className="text-sm text-gray-600">
                    You can cancel appointments up to 2 hours before the scheduled time.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Need Help?</h4>
                  <p className="text-sm text-gray-600">
                    Contact our support team if you have any questions about your appointments.
                  </p>
                </div>
              </div>
            </div>

            {/* Emergency Resources */}
            <div className="bg-red-50 rounded-xl border border-red-200 p-6">
              <h3 className="text-lg font-semibold text-red-900 mb-4">Emergency Resources</h3>
              <div className="space-y-3">
                <div className="text-sm">
                  <div className="font-medium text-red-900">Emergency Services</div>
                  <div className="text-red-700">108</div>
                </div>
                <div className="text-sm">
                  <div className="font-medium text-red-900">KIRAN Helpline</div>
                  <div className="text-red-700">1800-599-0019</div>
                </div>
                <div className="text-sm">
                  <div className="font-medium text-red-900">National Suicide Prevention</div>
                  <div className="text-red-700">9152987821</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Booking Modal */}
        {showBookingModal && (
          <AppointmentBooking
            onClose={() => setShowBookingModal(false)}
            onSuccess={handleBookingSuccess}
          />
        )}
      </div>
    </div>
  )
}

export default AppointmentsPage