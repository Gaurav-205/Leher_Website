import { AnimatedGradient } from '@/components/ui/animated-gradient'

export function AnimatedGradientDemo() {
  return (
    <div className="relative h-96 w-full rounded-xl overflow-hidden bg-white">
      <AnimatedGradient 
        colors={['#A8CFF1', '#B9A6DC', '#45A1E7', '#00589F', '#2A3E66']}
        size={300}
        blur={150}
        duration={15}
        intensity={0.3}
      />
      
      {/* Content overlay */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center p-8">
          <h3 className="text-2xl font-bold text-[#2A3E66] mb-4">
            Animated Gradient Background
          </h3>
          <p className="text-[#45A1E7] max-w-md">
            Beautiful animated gradient effect using SVG circles with blur filters
          </p>
        </div>
      </div>
    </div>
  )
}
