import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { User, Calendar, Clock, Star, Edit, Save, X, Plus, Trash2 } from 'lucide-react'
import { counselorService, Counselor, Availability } from '@services/appointmentService'
import toast from 'react-hot-toast'

const CounselorProfile = () => {
  const [counselor, setCounselor] = useState<Counselor | null>(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState({
    specialization: [] as string[],
    experience: 0,
    languages: [] as string[],
    availability: [] as Availability[],
    bio: '',
    qualifications: [] as string[],
    consultationFee: 0,
    maxSessionsPerDay: 8
  })

  const specializations = [
    'anxiety', 'depression', 'stress-management', 'academic-pressure',
    'relationship-issues', 'career-guidance', 'addiction', 'trauma',
    'grief-counseling', 'family-therapy', 'group-therapy', 'crisis-intervention',
    'mindfulness', 'cognitive-behavioral-therapy', 'other'
  ]

  const languages = [
    'en', 'hi', 'ta', 'te', 'bn', 'mr', 'gu', 'kn', 'ml', 'pa', 'or', 'as', 'ne', 'ur', 'other'
  ]

  const daysOfWeek = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
  ]

  useEffect(() => {
    loadCounselorProfile()
  }, [])

  const loadCounselorProfile = async () => {
    try {
      setLoading(true)
      const response = await counselorService.getCounselorProfile()
      setCounselor(response.data)
      if (response.data) {
        setFormData({
          specialization: response.data.specialization,
          experience: response.data.experience,
          languages: response.data.languages,
          availability: response.data.availability,
          bio: response.data.bio,
          qualifications: response.data.qualifications,
          consultationFee: response.data.consultationFee || 0,
          maxSessionsPerDay: response.data.maxSessionsPerDay
        })
      }
    } catch (error: any) {
      if (error.response?.status === 404) {
        // No profile exists yet, show empty form
        setEditing(true)
      } else {
        toast.error('Failed to load counselor profile')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      setLoading(true)
      const response = await counselorService.createOrUpdateCounselorProfile(formData)
      setCounselor(response.data)
      setEditing(false)
      toast.success('Profile saved successfully')
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to save profile')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    if (counselor) {
      setFormData({
        specialization: counselor.specialization,
        experience: counselor.experience,
        languages: counselor.languages,
        availability: counselor.availability,
        bio: counselor.bio,
        qualifications: counselor.qualifications,
        consultationFee: counselor.consultationFee || 0,
        maxSessionsPerDay: counselor.maxSessionsPerDay
      })
    }
    setEditing(false)
  }

  const addAvailability = () => {
    setFormData(prev => ({
      ...prev,
      availability: [...prev.availability, {
        dayOfWeek: 0,
        startTime: '09:00',
        endTime: '17:00',
        isAvailable: true
      }]
    }))
  }

  const removeAvailability = (index: number) => {
    setFormData(prev => ({
      ...prev,
      availability: prev.availability.filter((_, i) => i !== index)
    }))
  }

  const updateAvailability = (index: number, field: keyof Availability, value: any) => {
    setFormData(prev => ({
      ...prev,
      availability: prev.availability.map((avail, i) => 
        i === index ? { ...avail, [field]: value } : avail
      )
    }))
  }

  const addQualification = () => {
    setFormData(prev => ({
      ...prev,
      qualifications: [...prev.qualifications, '']
    }))
  }

  const removeQualification = (index: number) => {
    setFormData(prev => ({
      ...prev,
      qualifications: prev.qualifications.filter((_, i) => i !== index)
    }))
  }

  const updateQualification = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      qualifications: prev.qualifications.map((qual, i) => 
        i === index ? value : qual
      )
    }))
  }

  const toggleSpecialization = (spec: string) => {
    setFormData(prev => ({
      ...prev,
      specialization: prev.specialization.includes(spec)
        ? prev.specialization.filter(s => s !== spec)
        : [...prev.specialization, spec]
    }))
  }

  const toggleLanguage = (lang: string) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.includes(lang)
        ? prev.languages.filter(l => l !== lang)
        : [...prev.languages, lang]
    }))
  }

  if (loading && !counselor) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-prata font-bold text-gray-900">Counselor Profile</h1>
          <p className="text-gray-600 mt-1">Manage your professional profile and availability</p>
        </div>
        {!editing && (
          <button
            onClick={() => setEditing(true)}
            className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </button>
        )}
      </div>

      {/* Profile Overview */}
      {counselor && !editing && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-start space-x-6">
            <div className="h-20 w-20 bg-primary-100 rounded-full flex items-center justify-center">
              <User className="h-10 w-10 text-primary-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                {counselor.userId.firstName} {counselor.userId.lastName}
              </h2>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                  <span className="text-sm font-medium">{counselor.rating.toFixed(1)}</span>
                </div>
                <span className="text-sm text-gray-600">{counselor.experience} years experience</span>
                <span className="text-sm text-gray-600">{counselor.totalSessions} sessions</span>
              </div>
              <p className="text-gray-700 mb-4">{counselor.bio}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {counselor.specialization.map(spec => (
                  <span
                    key={spec}
                    className="px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full"
                  >
                    {spec.replace('-', ' ')}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-600">Languages:</span>
                  <span className="ml-2 text-gray-900">{counselor.languages.join(', ')}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Max Sessions/Day:</span>
                  <span className="ml-2 text-gray-900">{counselor.maxSessionsPerDay}</span>
                </div>
                {counselor.consultationFee && (
                  <div>
                    <span className="font-medium text-gray-600">Consultation Fee:</span>
                    <span className="ml-2 text-gray-900">₹{counselor.consultationFee}</span>
                  </div>
                )}
                <div>
                  <span className="font-medium text-gray-600">Status:</span>
                  <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                    counselor.isAvailable 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {counselor.isAvailable ? 'Available' : 'Unavailable'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Edit Form */}
      {editing && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Basic Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Experience (Years)
                </label>
                <input
                  type="number"
                  value={formData.experience}
                  onChange={(e) => setFormData(prev => ({ ...prev, experience: parseInt(e.target.value) || 0 }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  min="0"
                  max="50"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Sessions Per Day
                </label>
                <input
                  type="number"
                  value={formData.maxSessionsPerDay}
                  onChange={(e) => setFormData(prev => ({ ...prev, maxSessionsPerDay: parseInt(e.target.value) || 8 }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  min="1"
                  max="12"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                rows={4}
                placeholder="Tell us about your background and approach to counseling..."
              />
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Consultation Fee (₹)
              </label>
              <input
                type="number"
                value={formData.consultationFee}
                onChange={(e) => setFormData(prev => ({ ...prev, consultationFee: parseInt(e.target.value) || 0 }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                min="0"
                placeholder="Optional"
              />
            </div>
          </div>

          {/* Specializations */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Specializations</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {specializations.map(spec => (
                <label key={spec} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.specialization.includes(spec)}
                    onChange={() => toggleSpecialization(spec)}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 capitalize">
                    {spec.replace('-', ' ')}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Languages</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {languages.map(lang => (
                <label key={lang} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.languages.includes(lang)}
                    onChange={() => toggleLanguage(lang)}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 uppercase">
                    {lang}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Qualifications */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Qualifications</h3>
              <button
                onClick={addQualification}
                className="inline-flex items-center px-3 py-1 bg-primary-600 text-white text-sm rounded-lg hover:bg-primary-700 transition-colors"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add
              </button>
            </div>
            <div className="space-y-3">
              {formData.qualifications.map((qual, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <input
                    type="text"
                    value={qual}
                    onChange={(e) => updateQualification(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter qualification"
                  />
                  <button
                    onClick={() => removeQualification(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Availability</h3>
              <button
                onClick={addAvailability}
                className="inline-flex items-center px-3 py-1 bg-primary-600 text-white text-sm rounded-lg hover:bg-primary-700 transition-colors"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Slot
              </button>
            </div>
            <div className="space-y-4">
              {formData.availability.map((avail, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <select
                      value={avail.dayOfWeek}
                      onChange={(e) => updateAvailability(index, 'dayOfWeek', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      {daysOfWeek.map((day, dayIndex) => (
                        <option key={dayIndex} value={dayIndex}>{day}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <input
                      type="time"
                      value={avail.startTime}
                      onChange={(e) => updateAvailability(index, 'startTime', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <input
                      type="time"
                      value={avail.endTime}
                      onChange={(e) => updateAvailability(index, 'endTime', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={avail.isAvailable}
                        onChange={(e) => updateAvailability(index, 'isAvailable', e.target.checked)}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Available</span>
                    </label>
                  </div>
                  <button
                    onClick={() => removeAvailability(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-4">
            <button
              onClick={handleCancel}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className="inline-flex items-center px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              Save Profile
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default CounselorProfile
