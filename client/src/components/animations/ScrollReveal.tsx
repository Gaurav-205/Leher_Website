import { useEffect, useRef, ReactNode, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useAccessibility'

interface ScrollRevealProps {
  children: ReactNode
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade'
  distance?: number
  duration?: number
  delay?: number
  className?: string
  threshold?: number
}

const ScrollReveal = ({
  children,
  direction = 'up',
  distance = 50,
  duration = 0.6,
  delay = 0,
  className = '',
  threshold = 0.1
}: ScrollRevealProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { threshold, once: true })
  const prefersReducedMotion = useReducedMotion()

  const getInitialPosition = () => {
    if (prefersReducedMotion) {
      return { opacity: 1, y: 0, x: 0 }
    }

    switch (direction) {
      case 'up':
        return { opacity: 0, y: distance, x: 0 }
      case 'down':
        return { opacity: 0, y: -distance, x: 0 }
      case 'left':
        return { opacity: 0, y: 0, x: distance }
      case 'right':
        return { opacity: 0, y: 0, x: -distance }
      case 'fade':
        return { opacity: 0, y: 0, x: 0 }
      default:
        return { opacity: 0, y: distance, x: 0 }
    }
  }

  const getAnimatePosition = () => {
    if (prefersReducedMotion) {
      return { opacity: 1, y: 0, x: 0 }
    }

    return { opacity: 1, y: 0, x: 0 }
  }

  return (
    <motion.div
      ref={ref}
      initial={getInitialPosition()}
      animate={isInView ? getAnimatePosition() : getInitialPosition()}
      transition={{
        duration: prefersReducedMotion ? 0 : duration,
        delay: prefersReducedMotion ? 0 : delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default ScrollReveal
