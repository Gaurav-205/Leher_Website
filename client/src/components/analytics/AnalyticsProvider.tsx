import { useEffect, ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuthStore } from '@store/authStore'
import { analytics } from '@services/analytics'

interface AnalyticsProviderProps {
  children: ReactNode
}

const AnalyticsProvider = ({ children }: AnalyticsProviderProps) => {
  const location = useLocation()
  const { user, isAuthenticated } = useAuthStore()

  // Track page views on route changes
  useEffect(() => {
    analytics.trackPageView({
      page_path: location.pathname,
      page_title: document.title
    })
  }, [location])

  // Set user ID when authenticated
  useEffect(() => {
    if (isAuthenticated && user?._id) {
      analytics.setUserId(user._id)
    }
  }, [isAuthenticated, user])

  // Track authentication events
  useEffect(() => {
    if (isAuthenticated) {
      analytics.trackEvent({
        event: 'user_login',
        category: 'authentication',
        action: 'login_success',
        custom_parameters: {
          user_role: user?.role,
          login_method: 'email'
        }
      })
    }
  }, [isAuthenticated, user])

  return <>{children}</>
}

export default AnalyticsProvider
