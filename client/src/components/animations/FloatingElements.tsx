import { useEffect, useRef, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useAccessibility'

interface FloatingElementsProps {
  children: ReactNode
  intensity?: number
  duration?: number
  className?: string
}

const FloatingElements = ({
  children,
  intensity = 10,
  duration = 3,
  className = ''
}: FloatingElementsProps) => {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -intensity, 0],
        x: [0, intensity * 0.5, 0],
        rotate: [0, 1, -1, 0]
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  )
}

export default FloatingElements
