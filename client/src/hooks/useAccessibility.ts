import { useEffect, useRef, useState } from 'react'

// Hook for managing focus
export const useFocusManagement = () => {
  const focusRef = useRef<HTMLElement | null>(null)

  const setFocus = (element: HTMLElement | null) => {
    focusRef.current = element
    if (element) {
      element.focus()
    }
  }

  const trapFocus = (container: HTMLElement) => {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    
    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus()
            e.preventDefault()
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus()
            e.preventDefault()
          }
        }
      }
    }

    container.addEventListener('keydown', handleTabKey)
    
    return () => {
      container.removeEventListener('keydown', handleTabKey)
    }
  }

  return { setFocus, trapFocus, focusRef }
}

// Hook for keyboard navigation
export const useKeyboardNavigation = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsRef = useRef<HTMLElement[]>([])

  const registerItem = (element: HTMLElement | null) => {
    if (element && !itemsRef.current.includes(element)) {
      itemsRef.current.push(element)
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    const items = itemsRef.current.filter(item => !item.disabled)
    
    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        e.preventDefault()
        setCurrentIndex(prev => (prev + 1) % items.length)
        break
      case 'ArrowUp':
      case 'ArrowLeft':
        e.preventDefault()
        setCurrentIndex(prev => (prev - 1 + items.length) % items.length)
        break
      case 'Home':
        e.preventDefault()
        setCurrentIndex(0)
        break
      case 'End':
        e.preventDefault()
        setCurrentIndex(items.length - 1)
        break
    }
  }

  useEffect(() => {
    const currentItem = itemsRef.current[currentIndex]
    if (currentItem) {
      currentItem.focus()
    }
  }, [currentIndex])

  return {
    registerItem,
    handleKeyDown,
    currentIndex,
    setCurrentIndex
  }
}

// Hook for screen reader announcements
export const useScreenReader = () => {
  const [announcement, setAnnouncement] = useState('')
  const [priority, setPriority] = useState<'polite' | 'assertive'>('polite')

  const announce = (message: string, messagePriority: 'polite' | 'assertive' = 'polite') => {
    setAnnouncement('')
    setPriority(messagePriority)
    setTimeout(() => setAnnouncement(message), 100)
  }

  return { announcement, priority, announce }
}

// Hook for reduced motion preferences
export const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return prefersReducedMotion
}

// Hook for high contrast mode
export const useHighContrast = () => {
  const [prefersHighContrast, setPrefersHighContrast] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-contrast: high)')
    setPrefersHighContrast(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersHighContrast(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return prefersHighContrast
}

// Hook for color scheme preferences
export const useColorScheme = () => {
  const [prefersDark, setPrefersDark] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    setPrefersDark(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersDark(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return prefersDark
}

// Hook for focus visible
export const useFocusVisible = () => {
  const [isFocusVisible, setIsFocusVisible] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        setIsFocusVisible(true)
      }
    }

    const handleMouseDown = () => {
      setIsFocusVisible(false)
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleMouseDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleMouseDown)
    }
  }, [])

  return isFocusVisible
}
