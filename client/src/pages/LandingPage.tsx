import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@store/authStore'
import HeroSection from '@components/sections/HeroSection'
import StatisticsSection from '@components/sections/StatisticsSection'
import ConnectedFeaturesSection from '@components/sections/ConnectedFeaturesSection'
import TestimonialsSection from '@components/sections/TestimonialsSection'
import CallToActionSection from '@components/sections/CallToActionSection'
import Footer from '@components/sections/Footer'

const LandingPage = () => {
  const { isAuthenticated, user, isLoading } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    // If user is authenticated, redirect to dashboard
    if (isAuthenticated && user) {
      navigate('/app', { replace: true })
    }
  }, [isAuthenticated, user, navigate])

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Show loading or nothing while redirecting
  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting to dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <HeroSection />
      <StatisticsSection />
      <ConnectedFeaturesSection />
      <TestimonialsSection />
      <CallToActionSection />
      <Footer />
    </div>
  )
}

export default LandingPage
