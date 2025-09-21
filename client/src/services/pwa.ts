// PWA service for managing Progressive Web App features
interface PWAInstallPrompt {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

class PWAService {
  private deferredPrompt: PWAInstallPrompt | null = null
  private isInstalled = false
  private isStandalone = false
  private registration: ServiceWorkerRegistration | null = null

  constructor() {
    this.initialize()
  }

  private initialize() {
    if (typeof window === 'undefined') return

    // Check if app is already installed
    this.isInstalled = window.matchMedia('(display-mode: standalone)').matches ||
                      (window.navigator as any).standalone === true

    // Check if running in standalone mode
    this.isStandalone = window.matchMedia('(display-mode: standalone)').matches

    // Listen for beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (e) => {
      console.log('PWA: Install prompt available')
      e.preventDefault()
      this.deferredPrompt = e as PWAInstallPrompt
      this.dispatchEvent('install-prompt-available')
    })

    // Listen for appinstalled event
    window.addEventListener('appinstalled', () => {
      console.log('PWA: App installed successfully')
      this.isInstalled = true
      this.deferredPrompt = null
      this.dispatchEvent('app-installed')
    })

    // Register service worker
    this.registerServiceWorker()

    // Setup update handling
    this.setupUpdateHandling()
  }

  // Register service worker
  private async registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      try {
        this.registration = await navigator.serviceWorker.register('/sw.js')
        console.log('PWA: Service Worker registered successfully', this.registration.scope)

        // Listen for updates
        this.registration.addEventListener('updatefound', () => {
          const newWorker = this.registration!.installing
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                console.log('PWA: New content available')
                this.dispatchEvent('update-available')
              }
            })
          }
        })

      } catch (error) {
        console.error('PWA: Service Worker registration failed', error)
      }
    }
  }

  // Setup update handling
  private setupUpdateHandling() {
    if (this.registration) {
      this.registration.addEventListener('updatefound', () => {
        const newWorker = this.registration!.installing
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              this.dispatchEvent('update-available')
            }
          })
        }
      })
    }
  }

  // Show install prompt
  async showInstallPrompt(): Promise<boolean> {
    if (!this.deferredPrompt) {
      console.log('PWA: Install prompt not available')
      return false
    }

    try {
      await this.deferredPrompt.prompt()
      const choiceResult = await this.deferredPrompt.userChoice
      
      if (choiceResult.outcome === 'accepted') {
        console.log('PWA: User accepted install prompt')
        this.dispatchEvent('install-prompt-accepted')
        return true
      } else {
        console.log('PWA: User dismissed install prompt')
        this.dispatchEvent('install-prompt-dismissed')
        return false
      }
    } catch (error) {
      console.error('PWA: Error showing install prompt', error)
      return false
    }
  }

  // Check if install prompt is available
  canInstall(): boolean {
    return this.deferredPrompt !== null && !this.isInstalled
  }

  // Check if app is installed
  isAppInstalled(): boolean {
    return this.isInstalled
  }

  // Check if running in standalone mode
  isRunningStandalone(): boolean {
    return this.isStandalone
  }

  // Update service worker
  async updateServiceWorker(): Promise<void> {
    if (this.registration && this.registration.waiting) {
      this.registration.waiting.postMessage({ type: 'SKIP_WAITING' })
      
      // Reload page after update
      window.location.reload()
    }
  }

  // Get service worker registration
  getRegistration(): ServiceWorkerRegistration | null {
    return this.registration
  }

  // Check if service worker is supported
  isServiceWorkerSupported(): boolean {
    return 'serviceWorker' in navigator
  }

  // Check if PWA features are supported
  isPWASupported(): boolean {
    return this.isServiceWorkerSupported() && 'PushManager' in window
  }

  // Request notification permission
  async requestNotificationPermission(): Promise<NotificationPermission> {
    if (!('Notification' in window)) {
      console.log('PWA: Notifications not supported')
      return 'denied'
    }

    if (Notification.permission === 'granted') {
      return 'granted'
    }

    if (Notification.permission === 'denied') {
      return 'denied'
    }

    const permission = await Notification.requestPermission()
    return permission
  }

  // Show notification
  async showNotification(title: string, options?: NotificationOptions): Promise<void> {
    if (Notification.permission === 'granted' && this.registration) {
      await this.registration.showNotification(title, {
        icon: '/icons/icon-192x192.png',
        badge: '/icons/badge-72x72.png',
        ...options
      })
    }
  }

  // Subscribe to push notifications
  async subscribeToPush(): Promise<PushSubscription | null> {
    if (!this.registration || !('PushManager' in window)) {
      console.log('PWA: Push notifications not supported')
      return null
    }

    try {
      const subscription = await this.registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(
          'BEl62iUYgUivxIkv69yViEuiBIa40HI0lF5HvQn9Y4Q' // Replace with your VAPID key
        )
      })

      console.log('PWA: Push subscription successful', subscription)
      return subscription
    } catch (error) {
      console.error('PWA: Push subscription failed', error)
      return null
    }
  }

  // Convert VAPID key
  private urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - base64String.length % 4) % 4)
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/')

    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
  }

  // Get app info
  getAppInfo() {
    return {
      isInstalled: this.isInstalled,
      isStandalone: this.isStandalone,
      canInstall: this.canInstall(),
      isServiceWorkerSupported: this.isServiceWorkerSupported(),
      isPWASupported: this.isPWASupported(),
      hasServiceWorker: !!this.registration
    }
  }

  // Dispatch custom events
  private dispatchEvent(eventName: string, detail?: any) {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(`pwa-${eventName}`, { detail }))
    }
  }

  // Listen for PWA events
  addEventListener(eventName: string, callback: (event: CustomEvent) => void) {
    if (typeof window !== 'undefined') {
      window.addEventListener(`pwa-${eventName}`, callback as EventListener)
    }
  }

  // Remove PWA event listeners
  removeEventListener(eventName: string, callback: (event: CustomEvent) => void) {
    if (typeof window !== 'undefined') {
      window.removeEventListener(`pwa-${eventName}`, callback as EventListener)
    }
  }
}

// Create singleton instance
export const pwa = new PWAService()

// Hook for React components
export const usePWA = () => {
  return {
    showInstallPrompt: pwa.showInstallPrompt.bind(pwa),
    canInstall: pwa.canInstall.bind(pwa),
    isAppInstalled: pwa.isAppInstalled.bind(pwa),
    isRunningStandalone: pwa.isRunningStandalone.bind(pwa),
    updateServiceWorker: pwa.updateServiceWorker.bind(pwa),
    requestNotificationPermission: pwa.requestNotificationPermission.bind(pwa),
    showNotification: pwa.showNotification.bind(pwa),
    subscribeToPush: pwa.subscribeToPush.bind(pwa),
    getAppInfo: pwa.getAppInfo.bind(pwa),
    addEventListener: pwa.addEventListener.bind(pwa),
    removeEventListener: pwa.removeEventListener.bind(pwa)
  }
}

export default pwa
