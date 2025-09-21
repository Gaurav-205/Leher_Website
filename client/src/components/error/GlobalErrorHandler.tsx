import { useEffect } from 'react'
import { analytics } from '@services/analytics'

const GlobalErrorHandler = () => {
  useEffect(() => {
    // Handle unhandled promise rejections
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('Unhandled promise rejection:', event.reason)
      
      analytics.trackError(
        new Error(`Unhandled Promise Rejection: ${event.reason}`),
        'unhandled_promise_rejection'
      )

      // Prevent the default browser behavior
      event.preventDefault()
    }

    // Handle global JavaScript errors
    const handleError = (event: ErrorEvent) => {
      console.error('Global error:', event.error)
      
      analytics.trackError(
        event.error || new Error(event.message),
        'global_error'
      )
    }

    // Handle resource loading errors
    const handleResourceError = (event: Event) => {
      const target = event.target as HTMLElement
      if (target && (target.tagName === 'IMG' || target.tagName === 'SCRIPT' || target.tagName === 'LINK')) {
        console.error('Resource loading error:', target)
        
        analytics.trackError(
          new Error(`Resource loading failed: ${target.tagName} - ${(target as any).src || (target as any).href}`),
          'resource_error'
        )
      }
    }

    // Add event listeners
    window.addEventListener('unhandledrejection', handleUnhandledRejection)
    window.addEventListener('error', handleError)
    window.addEventListener('error', handleResourceError, true)

    // Cleanup function
    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
      window.removeEventListener('error', handleError)
      window.removeEventListener('error', handleResourceError, true)
    }
  }, [])

  return null // This component doesn't render anything
}

export default GlobalErrorHandler
