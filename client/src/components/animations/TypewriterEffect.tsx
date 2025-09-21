import { useState, useEffect, ReactNode } from 'react'
import { useReducedMotion } from '@/hooks/useAccessibility'

interface TypewriterEffectProps {
  text: string
  speed?: number
  delay?: number
  className?: string
  onComplete?: () => void
}

const TypewriterEffect = ({
  text,
  speed = 50,
  delay = 0,
  className = '',
  onComplete
}: TypewriterEffectProps) => {
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayedText(text)
      onComplete?.()
      return
    }

    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayedText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      } else {
        onComplete?.()
      }
    }, currentIndex === 0 ? delay : speed)

    return () => clearTimeout(timer)
  }, [currentIndex, text, speed, delay, onComplete, prefersReducedMotion])

  return (
    <span className={className}>
      {displayedText}
      {!prefersReducedMotion && currentIndex < text.length && (
        <span className="animate-pulse">|</span>
      )}
    </span>
  )
}

export default TypewriterEffect
