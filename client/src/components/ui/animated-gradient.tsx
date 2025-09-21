'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface AnimatedGradientProps {
  colors?: string[]
  className?: string
  size?: number
  blur?: number
  duration?: number
  intensity?: number
}

export function AnimatedGradient({
  colors = [
    '#A8CFF1',
    '#B9A6DC', 
    '#45A1E7',
    '#00589F',
    '#2A3E66'
  ],
  className,
  size = 400,
  blur = 200,
  duration = 20,
  intensity = 0.5
}: AnimatedGradientProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    // Generate random movement targets (-intensity to +intensity)
    const generateRandomTarget = () => (Math.random() - 0.5) * intensity * 2

    // Set CSS custom properties for animation
    const setAnimationVariables = () => {
      svg.style.setProperty('--tx-1', `${generateRandomTarget()}`)
      svg.style.setProperty('--ty-1', `${generateRandomTarget()}`)
      svg.style.setProperty('--tx-2', `${generateRandomTarget()}`)
      svg.style.setProperty('--ty-2', `${generateRandomTarget()}`)
      svg.style.setProperty('--tx-3', `${generateRandomTarget()}`)
      svg.style.setProperty('--ty-3', `${generateRandomTarget()}`)
      svg.style.setProperty('--tx-4', `${generateRandomTarget()}`)
      svg.style.setProperty('--ty-4', `${generateRandomTarget()}`)
    }

    // Initial setup
    setAnimationVariables()

    // Update positions periodically for more dynamic movement
    const interval = setInterval(() => {
      setAnimationVariables()
    }, duration * 1000)

    return () => clearInterval(interval)
  }, [duration, intensity])

  // Generate unique keyframes for each color
  const generateKeyframes = (index: number) => {
    const keyframeName = `float-${index}`
    const positions = [
      { tx: 'var(--tx-1)', ty: 'var(--ty-1)' },
      { tx: 'var(--tx-2)', ty: 'var(--ty-2)' },
      { tx: 'var(--tx-3)', ty: 'var(--ty-3)' },
      { tx: 'var(--tx-4)', ty: 'var(--ty-4)' }
    ]
    
    // Rotate positions based on index for variety
    const rotatedPositions = [
      ...positions.slice(index % 4),
      ...positions.slice(0, index % 4)
    ]

    return `
      @keyframes ${keyframeName} {
        0%, 100% { transform: translate(0, 0); }
        25% { transform: translate(calc(${rotatedPositions[0].tx} * 1%), calc(${rotatedPositions[0].ty} * 1%)); }
        50% { transform: translate(calc(${rotatedPositions[1].tx} * 1%), calc(${rotatedPositions[1].ty} * 1%)); }
        75% { transform: translate(calc(${rotatedPositions[2].tx} * 1%), calc(${rotatedPositions[2].ty} * 1%)); }
      }
    `
  }

  return (
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
      <svg
        ref={svgRef}
        className="w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        style={{
          '--duration': `${duration}s`,
        } as React.CSSProperties}
      >
        <defs>
          <filter id="blur">
            <feGaussianBlur stdDeviation={blur / 100} />
          </filter>
        </defs>
        
        {colors.map((color, index) => {
          const initialX = Math.random() * 100
          const initialY = Math.random() * 100
          
          return (
            <circle
              key={index}
              cx={initialX}
              cy={initialY}
              r={size / 100}
              fill={color}
              opacity={0.3}
              filter="url(#blur)"
              style={{
                animation: `float-${index} var(--duration) ease-in-out infinite`,
                animationDelay: `${index * 0.5}s`,
              }}
            />
          )
        })}
      </svg>
      
      <style dangerouslySetInnerHTML={{
        __html: colors.map((_, index) => generateKeyframes(index)).join('\n')
      }} />
    </div>
  )
}