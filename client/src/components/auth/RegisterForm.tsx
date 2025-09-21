import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuthStore } from '@store/authStore'
import { Eye, EyeOff, Mail, Lock, User, Building, AlertCircle, Check, Heart, Sparkles, ArrowRight } from 'lucide-react'
import toast from 'react-hot-toast'

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    educationLevel: '',
    agreeToTerms: false
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const { register } = useAuthStore()
  const navigate = useNavigate()

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters'
    } else if (formData.firstName.trim().length > 50) {
      newErrors.firstName = 'First name must be less than 50 characters'
    } else if (!/^[a-zA-Z\s]+$/.test(formData.firstName.trim())) {
      newErrors.firstName = 'First name can only contain letters and spaces'
    }

    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters'
    } else if (formData.lastName.trim().length > 50) {
      newErrors.lastName = 'Last name must be less than 50 characters'
    } else if (!/^[a-zA-Z\s]+$/.test(formData.lastName.trim())) {
      newErrors.lastName = 'Last name can only contain letters and spaces'
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email address'
    } else if (formData.email.length > 254) {
      newErrors.email = 'Email address is too long'
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    // Education level validation (optional but if provided, should be valid)
    if (formData.educationLevel && formData.educationLevel.trim().length > 0) {
      const validEducationLevels = ['high-school', 'undergraduate', 'postgraduate', 'phd', 'working-professional', 'other']
      if (!validEducationLevels.includes(formData.educationLevel)) {
        newErrors.educationLevel = 'Please select a valid education level'
      }
    }

    // Terms agreement validation
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsLoading(true)
    try {
      await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        educationLevel: formData.educationLevel,
        agreeToTerms: formData.agreeToTerms
      })
      navigate('/app')
    } catch (error: any) {
      // Error is handled by the store
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const passwordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (/[a-z]/.test(password)) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/\d/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++
    return strength
  }

  const strength = passwordStrength(formData.password)
  const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong']
  const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500']

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="bg-white dark:bg-[#1A1A2E] rounded-xl shadow-lg border border-[#A8CFF1]/20 dark:border-[#A8CFF1]/30 p-8 backdrop-blur-sm">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="h-12 w-12 bg-gradient-to-br from-[#2A3E66] to-[#00589F] dark:from-[#A8CFF1] dark:to-[#45A1E7] rounded-lg flex items-center justify-center mx-auto mb-4">
            <User className="h-6 w-6 text-white dark:text-[#0F0F23]" />
          </div>
          <h1 className="text-2xl font-bold text-[#2A3E66] dark:text-[#A8CFF1] mb-2 font-poppins">
            Create Account
          </h1>
          <p className="text-lg text-[#45A1E7] dark:text-[#B8B8B8] font-montserrat">
            Join thousands of students on their wellness journey
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-[#2A3E66] dark:text-[#A8CFF1] mb-2 font-montserrat">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-[#16213E] text-[#2A3E66] dark:text-[#A8CFF1] placeholder-[#45A1E7] dark:placeholder-[#B8B8B8] focus:outline-none focus:ring-2 focus:ring-[#00589F] dark:focus:ring-[#45A1E7] focus:border-[#00589F] dark:focus:border-[#45A1E7] transition-colors duration-200 ${
                  errors.firstName ? 'border-red-300 dark:border-red-500/50 focus:ring-red-500 focus:border-red-500' : 'border-[#A8CFF1]/30 dark:border-[#A8CFF1]/30 hover:border-[#45A1E7] dark:hover:border-[#A8CFF1]/50'
                }`}
                placeholder="First name"
              />
              {errors.firstName && (
                <div className="flex items-center mt-2 text-sm text-red-600">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.firstName}
                </div>
              )}
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-[#2A3E66] dark:text-[#A8CFF1] mb-2 font-montserrat">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-[#16213E] text-[#2A3E66] dark:text-[#A8CFF1] placeholder-[#45A1E7] dark:placeholder-[#B8B8B8] focus:outline-none focus:ring-2 focus:ring-[#00589F] dark:focus:ring-[#45A1E7] focus:border-[#00589F] dark:focus:border-[#45A1E7] transition-colors duration-200 ${
                  errors.lastName ? 'border-red-300 dark:border-red-500/50 focus:ring-red-500 focus:border-red-500' : 'border-[#A8CFF1]/30 dark:border-[#A8CFF1]/30 hover:border-[#45A1E7] dark:hover:border-[#A8CFF1]/50'
                }`}
                placeholder="Last name"
              />
              {errors.lastName && (
                <div className="flex items-center mt-2 text-sm text-red-600">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.lastName}
                </div>
              )}
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#2A3E66] dark:text-[#A8CFF1] mb-2 font-montserrat">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-[#45A1E7] dark:text-[#B8B8B8]" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg bg-white dark:bg-[#16213E] text-[#2A3E66] dark:text-[#A8CFF1] placeholder-[#45A1E7] dark:placeholder-[#B8B8B8] focus:outline-none focus:ring-2 focus:ring-[#00589F] dark:focus:ring-[#45A1E7] focus:border-[#00589F] dark:focus:border-[#45A1E7] transition-colors duration-200 ${
                  errors.email ? 'border-red-300 dark:border-red-500/50 focus:ring-red-500 focus:border-red-500' : 'border-[#A8CFF1]/30 dark:border-[#A8CFF1]/30 hover:border-[#45A1E7] dark:hover:border-[#A8CFF1]/50'
                }`}
                placeholder="Enter your email"
              />
            </div>
            {errors.email && (
              <div className="flex items-center mt-2 text-sm text-red-600">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.email}
              </div>
            )}
          </div>

          {/* Education Level Field */}
          <div>
            <label htmlFor="educationLevel" className="block text-sm font-medium text-[#2A3E66] dark:text-[#A8CFF1] mb-2 font-montserrat">
              Education Level
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Building className="h-5 w-5 text-[#45A1E7] dark:text-[#B8B8B8]" />
              </div>
              <select
                id="educationLevel"
                name="educationLevel"
                value={formData.educationLevel}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg bg-white dark:bg-[#16213E] text-[#2A3E66] dark:text-[#A8CFF1] focus:outline-none focus:ring-2 focus:ring-[#00589F] dark:focus:ring-[#45A1E7] focus:border-[#00589F] dark:focus:border-[#45A1E7] transition-colors duration-200 ${
                  errors.educationLevel ? 'border-red-300 dark:border-red-500/50 focus:ring-red-500 focus:border-red-500' : 'border-[#A8CFF1]/30 dark:border-[#A8CFF1]/30 hover:border-[#45A1E7] dark:hover:border-[#A8CFF1]/50'
                }`}
              >
                <option value="">Select your education level</option>
                <option value="high-school">High School (10th/12th)</option>
                <option value="undergraduate">Undergraduate (Bachelor's)</option>
                <option value="postgraduate">Postgraduate (Master's)</option>
                <option value="phd">PhD/Doctorate</option>
                <option value="working-professional">Working Professional</option>
                <option value="other">Other</option>
              </select>
            </div>
            {errors.educationLevel && (
              <div className="flex items-center mt-2 text-sm text-red-600">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.educationLevel}
              </div>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#2A3E66] dark:text-[#A8CFF1] mb-2 font-montserrat">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-[#45A1E7] dark:text-[#B8B8B8]" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full pl-10 pr-12 py-3 border rounded-lg bg-white dark:bg-[#16213E] text-[#2A3E66] dark:text-[#A8CFF1] placeholder-[#45A1E7] dark:placeholder-[#B8B8B8] focus:outline-none focus:ring-2 focus:ring-[#00589F] dark:focus:ring-[#45A1E7] focus:border-[#00589F] dark:focus:border-[#45A1E7] transition-colors duration-200 ${
                  errors.password ? 'border-red-300 dark:border-red-500/50 focus:ring-red-500 focus:border-red-500' : 'border-[#A8CFF1]/30 dark:border-[#A8CFF1]/30 hover:border-[#45A1E7] dark:hover:border-[#A8CFF1]/50'
                }`}
                placeholder="Create a password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-[#A8CFF1]/10 dark:hover:bg-[#1A1A2E]/50 rounded-r-lg transition-colors duration-200"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-[#45A1E7] hover:text-[#2A3E66] dark:hover:text-[#A8CFF1]" />
                ) : (
                  <Eye className="h-5 w-5 text-[#45A1E7] hover:text-[#2A3E66] dark:hover:text-[#A8CFF1]" />
                )}
              </button>
            </div>
            
            {/* Password Strength */}
            {formData.password && (
              <div className="mt-3">
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-[#A8CFF1]/20 dark:bg-[#1A1A2E]/50 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-200 ${strengthColors[strength - 1] || 'bg-gray-300'}`}
                      style={{ width: `${(strength / 5) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-[#45A1E7] dark:text-[#B8B8B8] font-medium font-montserrat">
                    {strength > 0 ? strengthLabels[strength - 1] : ''}
                  </span>
                </div>
              </div>
            )}
            
            {errors.password && (
              <div className="flex items-center mt-2 text-sm text-red-600">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.password}
              </div>
            )}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#2A3E66] dark:text-[#A8CFF1] mb-2 font-montserrat">
              Confirm Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-[#45A1E7] dark:text-[#B8B8B8]" />
              </div>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full pl-10 pr-12 py-3 border rounded-lg bg-white dark:bg-[#16213E] text-[#2A3E66] dark:text-[#A8CFF1] placeholder-[#45A1E7] dark:placeholder-[#B8B8B8] focus:outline-none focus:ring-2 focus:ring-[#00589F] dark:focus:ring-[#45A1E7] focus:border-[#00589F] dark:focus:border-[#45A1E7] transition-colors duration-200 ${
                  errors.confirmPassword ? 'border-red-300 dark:border-red-500/50 focus:ring-red-500 focus:border-red-500' : 'border-[#A8CFF1]/30 dark:border-[#A8CFF1]/30 hover:border-[#45A1E7] dark:hover:border-[#A8CFF1]/50'
                }`}
                placeholder="Confirm your password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-[#A8CFF1]/10 dark:hover:bg-[#1A1A2E]/50 rounded-r-lg transition-colors duration-200"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5 text-[#45A1E7] hover:text-[#2A3E66] dark:hover:text-[#A8CFF1]" />
                ) : (
                  <Eye className="h-5 w-5 text-[#45A1E7] hover:text-[#2A3E66] dark:hover:text-[#A8CFF1]" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <div className="flex items-center mt-2 text-sm text-red-600">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.confirmPassword}
              </div>
            )}
          </div>

          {/* Terms and Conditions */}
          <div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="agreeToTerms"
                  name="agreeToTerms"
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors duration-200"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="agreeToTerms" className="text-[#2A3E66] dark:text-[#A8CFF1] font-medium font-montserrat">
                  I agree to the{' '}
                  <Link to="/terms" className="text-[#00589F] dark:text-[#45A1E7] hover:text-[#2A3E66] dark:hover:text-[#A8CFF1] font-medium transition-colors duration-200 font-montserrat">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-[#00589F] dark:text-[#45A1E7] hover:text-[#2A3E66] dark:hover:text-[#A8CFF1] font-medium transition-colors duration-200 font-montserrat">
                    Privacy Policy
                  </Link>
                </label>
              </div>
            </div>
            {errors.agreeToTerms && (
              <div className="flex items-center mt-2 text-sm text-red-600">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.agreeToTerms}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-6 bg-gradient-to-r from-[#2A3E66] to-[#00589F] dark:from-[#A8CFF1] dark:to-[#45A1E7] text-white dark:text-[#0F0F23] font-semibold rounded-xl hover:from-[#00589F] hover:to-[#45A1E7] dark:hover:from-[#45A1E7] dark:hover:to-[#B9A6DC] focus:outline-none focus:ring-2 focus:ring-[#45A1E7] dark:focus:ring-[#A8CFF1] focus:ring-offset-2 dark:focus:ring-offset-[#0F0F23] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center font-montserrat"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Account...
              </>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        {/* Sign In Link */}
        <div className="mt-8 text-center">
          <p className="text-sm text-[#45A1E7] dark:text-[#B8B8B8] font-montserrat">
            Already have an account?{' '}
            <Link
              to="/auth/login"
              className="font-medium text-[#00589F] dark:text-[#45A1E7] hover:text-[#2A3E66] dark:hover:text-[#A8CFF1] transition-colors duration-200"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default RegisterForm
