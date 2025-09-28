import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@store/authStore'
import SEOHead from '@components/seo/SEOHead'
import HeroSection from '@components/sections/HeroSection'
import Footer from '@components/sections/Footer'

const LoadingSpinner = ({ message }: { message: string }) => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#A8CFF1]/10 via-white to-[#B9A6DC]/10">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2A3E66] mx-auto mb-4"></div>
      <p className="text-[#45A1E7]">{message}</p>
    </div>
  </div>
)

const LandingPage = () => {
  const { isAuthenticated, user, isLoading } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate('/app', { replace: true })
    }
  }, [isAuthenticated, user, navigate])

  if (isLoading) return <LoadingSpinner message="Loading..." />
  if (isAuthenticated) return <LoadingSpinner message="Redirecting to dashboard..." />

  return (
    <div className="min-h-screen">
      <SEOHead />
      <HeroSection />
      <Footer />
    </div>
  )
}

export default LandingPage
