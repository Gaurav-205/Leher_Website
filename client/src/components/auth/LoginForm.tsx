import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuthStore } from '@store/authStore'
import { Eye, EyeOff, Mail, Lock, AlertCircle, Heart, Sparkles, ArrowRight, Users, Shield, GraduationCap, UserCheck } from 'lucide-react'
import toast from 'react-hot-toast'

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'student' as 'student' | 'counselor' | 'admin' | 'moderator',
    rememberMe: false
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const { login } = useAuthStore()
  const navigate = useNavigate()

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email address'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 1) {
      newErrors.password = 'Password cannot be empty'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsLoading(true)
    try {
      await login({ 
        email: formData.email, 
        password: formData.password, 
        userType: formData.userType,
        rememberMe: formData.rememberMe 
      })
      
      // Navigate based on user type
      switch (formData.userType) {
        case 'admin':
          navigate('/admin')
          break
        case 'counselor':
          navigate('/counselor')
          break
        case 'moderator':
          navigate('/moderator')
          break
        default:
          navigate('/app')
          break
      }
    } catch (error: any) {
      // Error is handled by the store
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

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
            <Heart className="h-6 w-6 text-white dark:text-[#0F0F23]" />
          </div>
          <h1 className="text-2xl font-bold text-[#2A3E66] dark:text-[#A8CFF1] mb-2 font-poppins">
            Welcome Back
          </h1>
          <p className="text-lg text-[#45A1E7] dark:text-[#B8B8B8] font-montserrat">
            Sign in to your account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
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
              <div className="flex items-center mt-2 text-sm text-red-600 dark:text-red-400">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.email}
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
                placeholder="Enter your password"
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
            {errors.password && (
              <div className="flex items-center mt-2 text-sm text-red-600">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.password}
              </div>
            )}
          </div>

          {/* User Type Selection */}
          <div>
            <label className="block text-sm font-medium text-[#2A3E66] dark:text-[#A8CFF1] mb-3 font-montserrat">
              Login as
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: 'student', label: 'Student', icon: GraduationCap },
                { value: 'counselor', label: 'Counselor', icon: Users },
                { value: 'admin', label: 'Admin', icon: Shield },
                { value: 'moderator', label: 'Moderator', icon: UserCheck }
              ].map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, userType: value as any }))}
                  className={`relative p-3 rounded-lg border transition-colors duration-200 ${
                    formData.userType === value
                      ? 'border-[#00589F] bg-[#A8CFF1]/10 dark:bg-[#1A1A2E]/50 text-[#2A3E66] dark:text-[#A8CFF1]'
                      : 'border-[#A8CFF1]/30 dark:border-[#A8CFF1]/20 bg-white dark:bg-[#16213E] hover:border-[#45A1E7] dark:hover:border-[#A8CFF1]/50 hover:bg-[#A8CFF1]/5 dark:hover:bg-[#1A1A2E]/30 text-[#2A3E66] dark:text-[#A8CFF1]'
                  }`}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <Icon className={`h-5 w-5 ${formData.userType === value ? 'text-[#00589F] dark:text-[#45A1E7]' : 'text-[#45A1E7] dark:text-[#B8B8B8]'}`} />
                    <span className="text-xs font-medium">
                      {label}
                    </span>
                  </div>
                  {formData.userType === value && (
                    <div className="absolute -top-1 -right-1 h-3 w-3 bg-[#00589F] dark:bg-[#45A1E7] rounded-full flex items-center justify-center">
                      <div className="h-1.5 w-1.5 bg-white rounded-full"></div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors duration-200"
              />
              <label htmlFor="rememberMe" className="ml-2 block text-sm text-[#2A3E66] dark:text-[#A8CFF1] font-medium font-montserrat">
                Remember me
              </label>
            </div>
            <Link
              to="/auth/forgot-password"
              className="text-sm text-[#00589F] dark:text-[#45A1E7] hover:text-[#2A3E66] dark:hover:text-[#A8CFF1] font-medium transition-colors duration-200 font-montserrat"
            >
              Forgot password?
            </Link>
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
                Signing In...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="mt-8 text-center">
          <p className="text-sm text-[#45A1E7] dark:text-[#B8B8B8] font-montserrat">
            Don't have an account?{' '}
            <Link
              to="/auth/register"
              className="font-medium text-[#00589F] dark:text-[#45A1E7] hover:text-[#2A3E66] dark:hover:text-[#A8CFF1] transition-colors duration-200"
            >
              Sign up for free
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default LoginForm
