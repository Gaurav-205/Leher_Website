import { AnimatedGradient } from '@/components/ui/animated-gradient'
import { AnimatedGradientDemo } from '@/components/demos/AnimatedGradientDemo'

export function AnimatedGradientShowcase() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Animated Gradient */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <AnimatedGradient 
          colors={['#A8CFF1', '#B9A6DC', '#45A1E7', '#00589F', '#2A3E66']}
          size={400}
          blur={200}
          duration={20}
          intensity={0.4}
          className="opacity-40"
        />
        
        <div className="relative z-10 text-center p-8">
          <h1 className="text-6xl font-bold text-[#2A3E66] mb-6">
            Animated Gradient
          </h1>
          <p className="text-xl text-[#45A1E7] max-w-2xl mx-auto">
            Beautiful animated gradient backgrounds using SVG circles with blur filters
          </p>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-[#2A3E66] text-center mb-16">
            Gradient Variations
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Demo 1 */}
            <div className="relative h-64 rounded-xl overflow-hidden bg-white">
              <AnimatedGradient 
                colors={['#A8CFF1', '#B9A6DC', '#45A1E7']}
                size={300}
                blur={150}
                duration={15}
                intensity={0.3}
                className="opacity-30"
              />
              <div className="relative z-10 flex items-center justify-center h-full">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-[#2A3E66] mb-2">Subtle</h3>
                  <p className="text-[#45A1E7] text-sm">Low intensity, gentle movement</p>
                </div>
              </div>
            </div>

            {/* Demo 2 */}
            <div className="relative h-64 rounded-xl overflow-hidden bg-white">
              <AnimatedGradient 
                colors={['#00589F', '#45A1E7', '#A8CFF1']}
                size={350}
                blur={180}
                duration={25}
                intensity={0.5}
                className="opacity-50"
              />
              <div className="relative z-10 flex items-center justify-center h-full">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-[#2A3E66] mb-2">Dynamic</h3>
                  <p className="text-[#45A1E7] text-sm">Medium intensity, flowing motion</p>
                </div>
              </div>
            </div>

            {/* Demo 3 */}
            <div className="relative h-64 rounded-xl overflow-hidden bg-white">
              <AnimatedGradient 
                colors={['#2A3E66', '#00589F', '#B9A6DC']}
                size={400}
                blur={200}
                duration={30}
                intensity={0.7}
                className="opacity-60"
              />
              <div className="relative z-10 flex items-center justify-center h-full">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-[#2A3E66] mb-2">Intense</h3>
                  <p className="text-[#45A1E7] text-sm">High intensity, dramatic movement</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-[#2A3E66] text-center mb-16">
            Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-[#2A3E66] mb-4">
                SVG-Based Animation
              </h3>
              <p className="text-[#45A1E7] mb-6">
                Uses SVG circles with blur filters for smooth, scalable animations that work on all devices.
              </p>
              
              <h3 className="text-2xl font-bold text-[#2A3E66] mb-4">
                CSS Variables Control
              </h3>
              <p className="text-[#45A1E7] mb-6">
                Animation positions are controlled by CSS custom properties that update dynamically.
              </p>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-[#2A3E66] mb-4">
                Customizable Colors
              </h3>
              <p className="text-[#45A1E7] mb-6">
                Pass any array of colors to create unique gradient combinations that match your brand.
              </p>
              
              <h3 className="text-2xl font-bold text-[#2A3E66] mb-4">
                Performance Optimized
              </h3>
              <p className="text-[#45A1E7] mb-6">
                Lightweight implementation with efficient animations that don't impact page performance.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
