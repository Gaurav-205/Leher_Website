'use client'

import { cn } from '@/lib/utils'
import { useMotionValue, animate, motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import useMeasure from 'react-use-measure'

type InfiniteSliderProps = {
  children: React.ReactNode
  gap?: number
  duration?: number
  durationOnHover?: number
  direction?: 'horizontal' | 'vertical'
  reverse?: boolean
  className?: string
}

export function InfiniteSlider({
  children,
  gap = 16,
  duration = 25,
  durationOnHover,
  direction = 'horizontal',
  reverse = false,
  className,
}: InfiniteSliderProps) {
  const [currentDuration, setCurrentDuration] = useState(duration)
  const [ref, { width, height }] = useMeasure()
  const translation = useMotionValue(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [key, setKey] = useState(0)

  useEffect(() => {
    let controls
    const size = direction === 'horizontal' ? width : height
    const contentSize = size + gap
    const from = reverse ? -contentSize / 2 : 0
    const to = reverse ? 0 : -contentSize / 2

    if (isTransitioning) {
      controls = animate(translation, [translation.get(), to], {
        ease: 'linear',
        duration:
          currentDuration * Math.abs((translation.get() - to) / contentSize),
        onComplete: () => {
          setIsTransitioning(false)
          setKey((prevKey) => prevKey + 1)
        },
      })
    } else {
      controls = animate(translation, [from, to], {
        ease: 'linear',
        duration: currentDuration,
        repeat: Infinity,
        repeatType: 'loop',
        repeatDelay: 0,
        onRepeat: () => {
          translation.set(from)
        },
      })
    }

    return controls?.stop
  }, [
    key,
    translation,
    currentDuration,
    width,
    height,
    gap,
    isTransitioning,
    direction,
    reverse,
  ])

  const hoverProps = durationOnHover
    ? {
        onHoverStart: () => {
          setIsTransitioning(true)
          setCurrentDuration(durationOnHover)
        },
        onHoverEnd: () => {
          setIsTransitioning(true)
          setCurrentDuration(duration)
        },
      }
    : {}

  return (
    <div className={cn('overflow-hidden', className)}>
      <motion.div
        className='flex w-max items-center'
        style={{
          ...(direction === 'horizontal'
            ? { x: translation }
            : { y: translation }),
          gap: `${gap}px`,
          flexDirection: direction === 'horizontal' ? 'row' : 'column',
        }}
        ref={ref}
        {...hoverProps}
      >
        {children}
        {children}
      </motion.div>
    </div>
  )
}

// Company logos data - using text fallbacks for now
const companyLogos = [
  { name: 'IIT Delhi', src: '', alt: 'IIT Delhi' },
  { name: 'IIT Bombay', src: '', alt: 'IIT Bombay' },
  { name: 'IISc Bangalore', src: '', alt: 'IISc Bangalore' },
  { name: 'University of Delhi', src: '', alt: 'University of Delhi' },
  { name: 'JNU', src: '', alt: 'Jawaharlal Nehru University' },
  { name: 'BITS Pilani', src: '', alt: 'BITS Pilani' },
]

const CompanySlider = () => {
  return (
    <section className="py-8 sm:py-12 bg-white dark:bg-[#0F0F23] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          {/* Left side text - small and compact */}
          <div className="text-center sm:text-left flex-shrink-0">
            <h3 className="text-sm sm:text-base font-medium text-[#2A3E66] dark:text-[#A8CFF1] font-poppins">
              Powering the best
              <br />
              teams
            </h3>
          </div>
          
          {/* Right side slider - starts immediately after text */}
          <div className="w-full relative pr-8 sm:pr-16 lg:pr-24 mr-4 sm:mr-8 lg:mr-16">
            <InfiniteSlider
              duration={30}
              durationOnHover={10}
              gap={60}
              className="py-2"
            >
              {companyLogos.map((company, index) => (
                <div key={index} className="flex items-center justify-center px-4 sm:px-6 lg:px-8">
                  <div className="text-xs sm:text-sm font-medium text-[#45A1E7] dark:text-[#B8B8B8] hover:text-[#00589F] dark:hover:text-[#45A1E7] transition-colors duration-300 font-poppins whitespace-nowrap">
                    {company.name}
                  </div>
                </div>
              ))}
            </InfiniteSlider>
            
            {/* Blur edges */}
            <div className="absolute inset-y-0 left-0 w-8 sm:w-12 lg:w-16 bg-gradient-to-r from-white to-transparent dark:from-[#0F0F23] dark:to-transparent pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-8 sm:w-12 lg:w-16 bg-gradient-to-l from-white to-transparent dark:from-[#0F0F23] dark:to-transparent pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CompanySlider
