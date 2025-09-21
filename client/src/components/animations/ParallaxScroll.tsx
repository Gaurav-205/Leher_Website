import { useEffect, useRef, ReactNode } from 'react'
import { useReducedMotion } from '@/hooks/useAccessibility'

interface ParallaxScrollProps {
  children: ReactNode
  speed?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  className?: string
}

const ParallaxScroll = ({ 
  children, 
  speed = 0.5, 
  direction = 'up',
  className = '' 
}: ParallaxScrollProps) => {
  const elementRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) return

    const element = elementRef.current
    if (!element) return

    const handleScroll = () => {
      const rect = element.getBoundingClientRect()
      const scrolled = window.pageYOffset
      const rate = scrolled * -speed

      let transform = ''
      switch (direction) {
        case 'up':
          transform = `translateY(${rate}px)`
          break
        case 'down':
          transform = `translateY(${-rate}px)`
          break
        case 'left':
          transform = `translateX(${rate}px)`
          break
        case 'right':
          transform = `translateX(${-rate}px)`
          break
      }

      element.style.transform = transform
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [speed, direction, prefersReducedMotion])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}

export default ParallaxScroll
