// Performance monitoring service
interface PerformanceMetric {
  name: string
  value: number
  timestamp: number
  type: 'navigation' | 'paint' | 'measure' | 'custom'
  metadata?: Record<string, any>
}

interface WebVitalsMetric {
  name: 'CLS' | 'FID' | 'FCP' | 'LCP' | 'TTFB'
  value: number
  delta: number
  id: string
  navigationType: string
}

class PerformanceService {
  private metrics: PerformanceMetric[] = []
  private observers: PerformanceObserver[] = []
  private isInitialized = false

  constructor() {
    this.initialize()
  }

  private initialize() {
    if (typeof window === 'undefined') return

    this.isInitialized = true
    this.setupPerformanceObservers()
    this.trackNavigationTiming()
    this.trackPaintTiming()
    this.trackResourceTiming()
    this.trackLongTasks()
  }

  // Setup Performance Observers
  private setupPerformanceObservers() {
    // Paint Timing Observer
    if ('PerformanceObserver' in window) {
      try {
        const paintObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            this.recordMetric({
              name: entry.name,
              value: entry.startTime,
              timestamp: Date.now(),
              type: 'paint',
              metadata: {
                entryType: entry.entryType,
                duration: entry.duration
              }
            })
          }
        })
        paintObserver.observe({ entryTypes: ['paint'] })
        this.observers.push(paintObserver)
      } catch (error) {
        console.warn('Paint timing observer not supported:', error)
      }

      // Navigation Timing Observer
      try {
        const navigationObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            this.recordMetric({
              name: entry.name,
              value: entry.startTime,
              timestamp: Date.now(),
              type: 'navigation',
              metadata: {
                entryType: entry.entryType,
                duration: entry.duration,
                transferSize: (entry as any).transferSize,
                encodedBodySize: (entry as any).encodedBodySize,
                decodedBodySize: (entry as any).decodedBodySize
              }
            })
          }
        })
        navigationObserver.observe({ entryTypes: ['navigation'] })
        this.observers.push(navigationObserver)
      } catch (error) {
        console.warn('Navigation timing observer not supported:', error)
      }

      // Resource Timing Observer
      try {
        const resourceObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            const resourceEntry = entry as PerformanceResourceTiming
            this.recordMetric({
              name: `resource_${resourceEntry.name}`,
              value: resourceEntry.duration,
              timestamp: Date.now(),
              type: 'measure',
              metadata: {
                entryType: 'resource',
                initiatorType: resourceEntry.initiatorType,
                transferSize: resourceEntry.transferSize,
                encodedBodySize: resourceEntry.encodedBodySize,
                decodedBodySize: resourceEntry.decodedBodySize,
                domainLookupStart: resourceEntry.domainLookupStart,
                domainLookupEnd: resourceEntry.domainLookupEnd,
                connectStart: resourceEntry.connectStart,
                connectEnd: resourceEntry.connectEnd,
                requestStart: resourceEntry.requestStart,
                responseStart: resourceEntry.responseStart,
                responseEnd: resourceEntry.responseEnd
              }
            })
          }
        })
        resourceObserver.observe({ entryTypes: ['resource'] })
        this.observers.push(resourceObserver)
      } catch (error) {
        console.warn('Resource timing observer not supported:', error)
      }

      // Long Task Observer
      try {
        const longTaskObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            this.recordMetric({
              name: 'long_task',
              value: entry.duration,
              timestamp: Date.now(),
              type: 'measure',
              metadata: {
                entryType: 'longtask',
                startTime: entry.startTime,
                duration: entry.duration
              }
            })
          }
        })
        longTaskObserver.observe({ entryTypes: ['longtask'] })
        this.observers.push(longTaskObserver)
      } catch (error) {
        console.warn('Long task observer not supported:', error)
      }
    }
  }

  // Track Navigation Timing
  private trackNavigationTiming() {
    if ('performance' in window && 'getEntriesByType' in performance) {
      const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[]
      
      if (navigationEntries.length > 0) {
        const nav = navigationEntries[0]
        
        // Core Web Vitals related metrics
        const metrics = [
          { name: 'TTFB', value: nav.responseStart - nav.requestStart },
          { name: 'DOM_LOAD', value: nav.domContentLoadedEventEnd - nav.navigationStart },
          { name: 'PAGE_LOAD', value: nav.loadEventEnd - nav.navigationStart },
          { name: 'DNS_LOOKUP', value: nav.domainLookupEnd - nav.domainLookupStart },
          { name: 'TCP_CONNECT', value: nav.connectEnd - nav.connectStart },
          { name: 'REQUEST_RESPONSE', value: nav.responseEnd - nav.requestStart }
        ]

        metrics.forEach(metric => {
          this.recordMetric({
            name: metric.name,
            value: metric.value,
            timestamp: Date.now(),
            type: 'navigation',
            metadata: {
              url: window.location.href,
              userAgent: navigator.userAgent
            }
          })
        })
      }
    }
  }

  // Track Paint Timing
  private trackPaintTiming() {
    if ('performance' in window && 'getEntriesByType' in performance) {
      const paintEntries = performance.getEntriesByType('paint')
      
      paintEntries.forEach(entry => {
        this.recordMetric({
          name: entry.name.toUpperCase(),
          value: entry.startTime,
          timestamp: Date.now(),
          type: 'paint',
          metadata: {
            entryType: entry.entryType,
            duration: entry.duration
          }
        })
      })
    }
  }

  // Track Resource Timing
  private trackResourceTiming() {
    if ('performance' in window && 'getEntriesByType' in performance) {
      const resourceEntries = performance.getEntriesByType('resource') as PerformanceResourceTiming[]
      
      // Group resources by type
      const resourceTypes: Record<string, number[]> = {}
      
      resourceEntries.forEach(entry => {
        if (!resourceTypes[entry.initiatorType]) {
          resourceTypes[entry.initiatorType] = []
        }
        resourceTypes[entry.initiatorType].push(entry.duration)
      })

      // Record summary metrics
      Object.entries(resourceTypes).forEach(([type, durations]) => {
        const avgDuration = durations.reduce((a, b) => a + b, 0) / durations.length
        const maxDuration = Math.max(...durations)
        const minDuration = Math.min(...durations)

        this.recordMetric({
          name: `RESOURCE_${type.toUpperCase()}_AVG`,
          value: avgDuration,
          timestamp: Date.now(),
          type: 'measure',
          metadata: {
            resourceType: type,
            count: durations.length,
            maxDuration,
            minDuration
          }
        })
      })
    }
  }

  // Track Long Tasks
  private trackLongTasks() {
    // Long tasks are already tracked by the observer
    // This method can be used for additional long task analysis
  }

  // Record a custom metric
  recordMetric(metric: PerformanceMetric) {
    this.metrics.push(metric)
    
    // Send to analytics if available
    if (typeof window !== 'undefined' && (window as any).analytics) {
      (window as any).analytics.trackEvent({
        event: 'performance_metric',
        category: 'performance',
        action: metric.name,
        value: Math.round(metric.value),
        custom_parameters: {
          metric_type: metric.type,
          timestamp: metric.timestamp,
          ...metric.metadata
        }
      })
    }

    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Performance Metric:', metric)
    }
  }

  // Measure custom performance
  measure(name: string, startMark?: string, endMark?: string): number | null {
    if (!('performance' in window)) return null

    try {
      if (startMark && endMark) {
        performance.measure(name, startMark, endMark)
        const measure = performance.getEntriesByName(name)[0]
        if (measure) {
          this.recordMetric({
            name: `CUSTOM_${name}`,
            value: measure.duration,
            timestamp: Date.now(),
            type: 'measure',
            metadata: {
              startMark,
              endMark
            }
          })
          return measure.duration
        }
      } else {
        performance.mark(`${name}_start`)
        return 0
      }
    } catch (error) {
      console.warn('Performance measurement failed:', error)
    }

    return null
  }

  // Mark performance point
  mark(name: string) {
    if ('performance' in window && 'mark' in performance) {
      performance.mark(name)
    }
  }

  // Get all metrics
  getMetrics(): PerformanceMetric[] {
    return [...this.metrics]
  }

  // Get metrics by type
  getMetricsByType(type: PerformanceMetric['type']): PerformanceMetric[] {
    return this.metrics.filter(metric => metric.type === type)
  }

  // Get metrics by name
  getMetricsByName(name: string): PerformanceMetric[] {
    return this.metrics.filter(metric => metric.name === name)
  }

  // Get performance summary
  getPerformanceSummary() {
    const navigationMetrics = this.getMetricsByType('navigation')
    const paintMetrics = this.getMetricsByType('paint')
    const resourceMetrics = this.getMetricsByType('measure')

    return {
      navigation: navigationMetrics.reduce((acc, metric) => {
        acc[metric.name] = metric.value
        return acc
      }, {} as Record<string, number>),
      paint: paintMetrics.reduce((acc, metric) => {
        acc[metric.name] = metric.value
        return acc
      }, {} as Record<string, number>),
      resources: resourceMetrics.length,
      totalMetrics: this.metrics.length,
      timestamp: Date.now()
    }
  }

  // Clear metrics
  clearMetrics() {
    this.metrics = []
  }

  // Cleanup observers
  cleanup() {
    this.observers.forEach(observer => observer.disconnect())
    this.observers = []
  }

  // Check if performance monitoring is supported
  isSupported(): boolean {
    return this.isInitialized && 'performance' in window
  }
}

// Create singleton instance
export const performanceMonitor = new PerformanceService()

// Hook for React components
export const usePerformance = () => {
  return {
    recordMetric: performanceMonitor.recordMetric.bind(performanceMonitor),
    measure: performanceMonitor.measure.bind(performanceMonitor),
    mark: performanceMonitor.mark.bind(performanceMonitor),
    getMetrics: performanceMonitor.getMetrics.bind(performanceMonitor),
    getPerformanceSummary: performanceMonitor.getPerformanceSummary.bind(performanceMonitor),
    isSupported: performanceMonitor.isSupported.bind(performanceMonitor)
  }
}

export default performanceMonitor
