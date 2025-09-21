// Analytics service for tracking user behavior and performance
interface AnalyticsEvent {
  event: string
  category: string
  action: string
  label?: string
  value?: number
  custom_parameters?: Record<string, any>
}

interface PageViewEvent {
  page_title: string
  page_location: string
  page_path: string
  custom_parameters?: Record<string, any>
}

class AnalyticsService {
  private isInitialized = false
  private sessionId: string
  private userId?: string
  private events: AnalyticsEvent[] = []

  constructor() {
    this.sessionId = this.generateSessionId()
    this.initialize()
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private initialize() {
    // Initialize analytics when DOM is ready
    if (typeof window !== 'undefined') {
      this.isInitialized = true
      this.trackPageView()
      this.setupPerformanceTracking()
      this.setupErrorTracking()
    }
  }

  // Track page views
  trackPageView(pageData?: Partial<PageViewEvent>) {
    if (!this.isInitialized) return

    const defaultPageData: PageViewEvent = {
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname,
      ...pageData
    }

    // Send to analytics service (replace with your preferred analytics)
    this.sendToAnalytics('page_view', defaultPageData)
    
    // Track in console for development
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Page View:', defaultPageData)
    }
  }

  // Track custom events
  trackEvent(eventData: AnalyticsEvent) {
    if (!this.isInitialized) return

    const enrichedEvent = {
      ...eventData,
      session_id: this.sessionId,
      user_id: this.userId,
      timestamp: new Date().toISOString(),
      user_agent: navigator.userAgent,
      screen_resolution: `${screen.width}x${screen.height}`,
      viewport_size: `${window.innerWidth}x${window.innerHeight}`,
      referrer: document.referrer
    }

    this.events.push(enrichedEvent)
    this.sendToAnalytics('event', enrichedEvent)

    // Track in console for development
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Event:', enrichedEvent)
    }
  }

  // Track user interactions
  trackUserInteraction(element: string, action: string, details?: any) {
    this.trackEvent({
      event: 'user_interaction',
      category: 'engagement',
      action,
      label: element,
      custom_parameters: details
    })
  }

  // Track conversion events
  trackConversion(conversionType: string, value?: number, details?: any) {
    this.trackEvent({
      event: 'conversion',
      category: 'business',
      action: conversionType,
      value,
      custom_parameters: details
    })
  }

  // Track performance metrics
  trackPerformance(metric: string, value: number, details?: any) {
    this.trackEvent({
      event: 'performance',
      category: 'technical',
      action: metric,
      value,
      custom_parameters: details
    })
  }

  // Track errors
  trackError(error: Error, context?: string) {
    this.trackEvent({
      event: 'error',
      category: 'technical',
      action: 'javascript_error',
      label: error.message,
      custom_parameters: {
        error_stack: error.stack,
        context,
        url: window.location.href
      }
    })
  }

  // Set user ID for tracking
  setUserId(userId: string) {
    this.userId = userId
  }

  // Setup performance tracking
  private setupPerformanceTracking() {
    // Track Core Web Vitals
    if ('web-vital' in window) {
      // This would integrate with web-vitals library
      // import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'
    }

    // Track page load time
    window.addEventListener('load', () => {
      const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart
      this.trackPerformance('page_load_time', loadTime)
    })

    // Track first paint
    if ('performance' in window && 'getEntriesByType' in performance) {
      const paintEntries = performance.getEntriesByType('paint')
      paintEntries.forEach(entry => {
        this.trackPerformance(entry.name, entry.startTime)
      })
    }
  }

  // Setup error tracking
  private setupErrorTracking() {
    window.addEventListener('error', (event) => {
      this.trackError(new Error(event.message), 'global_error')
    })

    window.addEventListener('unhandledrejection', (event) => {
      this.trackError(new Error(event.reason), 'unhandled_promise_rejection')
    })
  }

  // Send data to analytics service
  private sendToAnalytics(type: string, data: any) {
    // Replace with your analytics service (Google Analytics, Mixpanel, etc.)
    // Example for Google Analytics 4:
    if (typeof gtag !== 'undefined') {
      gtag('event', type, data)
    }

    // Example for custom analytics endpoint:
    // fetch('/api/analytics', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ type, data })
    // }).catch(console.error)
  }

  // Get analytics data for debugging
  getAnalyticsData() {
    return {
      sessionId: this.sessionId,
      userId: this.userId,
      events: this.events,
      isInitialized: this.isInitialized
    }
  }
}

// Create singleton instance
export const analytics = new AnalyticsService()

// Hook for React components
export const useAnalytics = () => {
  return {
    trackEvent: analytics.trackEvent.bind(analytics),
    trackUserInteraction: analytics.trackUserInteraction.bind(analytics),
    trackConversion: analytics.trackConversion.bind(analytics),
    trackPageView: analytics.trackPageView.bind(analytics),
    setUserId: analytics.setUserId.bind(analytics)
  }
}

export default analytics
