// A/B Testing service for landing page variants
interface ABTest {
  id: string
  name: string
  variants: ABTestVariant[]
  trafficAllocation: number // 0-1, percentage of users to include
  isActive: boolean
  startDate: Date
  endDate?: Date
}

interface ABTestVariant {
  id: string
  name: string
  weight: number // 0-1, relative weight for traffic allocation
  config: Record<string, any>
}

interface ABTestResult {
  testId: string
  variantId: string
  userId?: string
  sessionId: string
  timestamp: Date
}

class ABTestingService {
  private tests: Map<string, ABTest> = new Map()
  private userVariants: Map<string, string> = new Map() // userId -> variantId
  private sessionVariants: Map<string, string> = new Map() // sessionId -> variantId
  private results: ABTestResult[] = []

  constructor() {
    this.initializeDefaultTests()
    this.loadUserVariants()
  }

  // Initialize default A/B tests
  private initializeDefaultTests() {
    // Hero Section CTA Test
    this.addTest({
      id: 'hero_cta_test',
      name: 'Hero Section CTA Button Test',
      trafficAllocation: 0.5, // 50% of users
      isActive: true,
      startDate: new Date(),
      variants: [
        {
          id: 'control',
          name: 'Original CTA',
          weight: 0.5,
          config: {
            primaryButtonText: 'Get Started Free',
            secondaryButtonText: 'Watch Demo',
            primaryButtonStyle: 'gradient',
            heroTitle: 'Mental Wellness Made Simple'
          }
        },
        {
          id: 'variant_a',
          name: 'Urgency CTA',
          weight: 0.5,
          config: {
            primaryButtonText: 'Start Your Journey Today',
            secondaryButtonText: 'See How It Works',
            primaryButtonStyle: 'solid',
            heroTitle: 'Transform Your Mental Health Today'
          }
        }
      ]
    })

    // Testimonials Layout Test
    this.addTest({
      id: 'testimonials_layout_test',
      name: 'Testimonials Layout Test',
      trafficAllocation: 0.3, // 30% of users
      isActive: true,
      startDate: new Date(),
      variants: [
        {
          id: 'control',
          name: '3D Testimonials',
          weight: 0.5,
          config: {
            layout: '3d',
            animationSpeed: 'normal',
            showAvatars: true
          }
        },
        {
          id: 'variant_a',
          name: 'Grid Layout',
          weight: 0.5,
          config: {
            layout: 'grid',
            animationSpeed: 'fast',
            showAvatars: false
          }
        }
      ]
    })

    // Features Section Test
    this.addTest({
      id: 'features_section_test',
      name: 'Features Section Layout Test',
      trafficAllocation: 0.4, // 40% of users
      isActive: true,
      startDate: new Date(),
      variants: [
        {
          id: 'control',
          name: '3-Column Grid',
          weight: 0.5,
          config: {
            layout: 'grid',
            columns: 3,
            showIcons: true,
            animationType: 'fade'
          }
        },
        {
          id: 'variant_a',
          name: 'Carousel Layout',
          weight: 0.5,
          config: {
            layout: 'carousel',
            columns: 1,
            showIcons: false,
            animationType: 'slide'
          }
        }
      ]
    })
  }

  // Add a new A/B test
  addTest(test: ABTest) {
    this.tests.set(test.id, test)
  }

  // Get variant for a specific test
  getVariant(testId: string, userId?: string, sessionId?: string): string | null {
    const test = this.tests.get(testId)
    if (!test || !test.isActive) return null

    // Check if user is in traffic allocation
    const userHash = this.hashUserId(userId || sessionId || 'anonymous')
    if (userHash > test.trafficAllocation) return null

    // Check if user already has a variant assigned
    const key = userId || sessionId || 'anonymous'
    if (this.userVariants.has(key)) {
      return this.userVariants.get(key)!
    }

    // Assign variant based on weights
    const variant = this.selectVariant(test.variants)
    this.userVariants.set(key, variant.id)
    this.saveUserVariants()

    // Track assignment
    this.trackAssignment(testId, variant.id, userId, sessionId)

    return variant.id
  }

  // Get variant configuration
  getVariantConfig(testId: string, variantId: string): Record<string, any> | null {
    const test = this.tests.get(testId)
    if (!test) return null

    const variant = test.variants.find(v => v.id === variantId)
    return variant?.config || null
  }

  // Select variant based on weights
  private selectVariant(variants: ABTestVariant[]): ABTestVariant {
    const random = Math.random()
    let cumulativeWeight = 0

    for (const variant of variants) {
      cumulativeWeight += variant.weight
      if (random <= cumulativeWeight) {
        return variant
      }
    }

    return variants[0] // Fallback
  }

  // Hash user ID for consistent assignment
  private hashUserId(userId: string): number {
    let hash = 0
    for (let i = 0; i < userId.length; i++) {
      const char = userId.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32-bit integer
    }
    return Math.abs(hash) / 2147483647 // Normalize to 0-1
  }

  // Track variant assignment
  private trackAssignment(testId: string, variantId: string, userId?: string, sessionId?: string) {
    const result: ABTestResult = {
      testId,
      variantId,
      userId,
      sessionId: sessionId || 'anonymous',
      timestamp: new Date()
    }

    this.results.push(result)
    
    // Send to analytics
    if (typeof window !== 'undefined' && (window as any).analytics) {
      (window as any).analytics.trackEvent({
        event: 'ab_test_assignment',
        category: 'experimentation',
        action: 'variant_assigned',
        label: `${testId}_${variantId}`,
        custom_parameters: {
          test_id: testId,
          variant_id: variantId,
          user_id: userId
        }
      })
    }
  }

  // Track conversion for A/B test
  trackConversion(testId: string, conversionType: string, value?: number) {
    const key = this.getCurrentUserKey()
    const variantId = this.userVariants.get(key)
    
    if (variantId) {
      const result: ABTestResult = {
        testId,
        variantId,
        userId: key !== 'anonymous' ? key : undefined,
        sessionId: key,
        timestamp: new Date()
      }

      // Send to analytics
      if (typeof window !== 'undefined' && (window as any).analytics) {
        (window as any).analytics.trackEvent({
          event: 'ab_test_conversion',
          category: 'experimentation',
          action: conversionType,
          label: `${testId}_${variantId}`,
          value,
          custom_parameters: {
            test_id: testId,
            variant_id: variantId,
            conversion_type: conversionType
          }
        })
      }
    }
  }

  // Get current user key
  private getCurrentUserKey(): string {
    // Try to get from auth store or session
    if (typeof window !== 'undefined') {
      const authData = localStorage.getItem('auth-storage')
      if (authData) {
        try {
          const parsed = JSON.parse(authData)
          return parsed.state?.user?.id || 'anonymous'
        } catch {
          return 'anonymous'
        }
      }
    }
    return 'anonymous'
  }

  // Load user variants from localStorage
  private loadUserVariants() {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('ab-test-variants')
        if (stored) {
          this.userVariants = new Map(JSON.parse(stored))
        }
      } catch (error) {
        console.warn('Failed to load A/B test variants:', error)
      }
    }
  }

  // Save user variants to localStorage
  private saveUserVariants() {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('ab-test-variants', JSON.stringify([...this.userVariants]))
      } catch (error) {
        console.warn('Failed to save A/B test variants:', error)
      }
    }
  }

  // Get test results
  getTestResults(testId?: string): ABTestResult[] {
    if (testId) {
      return this.results.filter(r => r.testId === testId)
    }
    return this.results
  }

  // Get active tests
  getActiveTests(): ABTest[] {
    return Array.from(this.tests.values()).filter(test => test.isActive)
  }

  // End a test
  endTest(testId: string) {
    const test = this.tests.get(testId)
    if (test) {
      test.isActive = false
      test.endDate = new Date()
    }
  }
}

// Create singleton instance
export const abTesting = new ABTestingService()

// Hook for React components
export const useABTesting = () => {
  return {
    getVariant: abTesting.getVariant.bind(abTesting),
    getVariantConfig: abTesting.getVariantConfig.bind(abTesting),
    trackConversion: abTesting.trackConversion.bind(abTesting),
    getTestResults: abTesting.getTestResults.bind(abTesting),
    getActiveTests: abTesting.getActiveTests.bind(abTesting)
  }
}

export default abTesting
