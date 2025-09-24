import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Play, Star, Users, Shield, Zap } from 'lucide-react'
import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { ProgressiveBlur } from '@/components/ui/progressive-blur'
import { AnimatedGradient } from '@/components/ui/animated-gradient'
import { LANDING_DATA, ANIMATION_VARIANTS } from '@/constants/landing'

const HeroSection = () => {
  return (
    <section 
      id="main-content"
      className="relative h-screen flex items-center justify-center px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 overflow-hidden bg-white dark:bg-[#0F0F23]"
      role="banner"
      aria-label="Hero section"
    >
      {/* Animated Gradient Background */}
      <AnimatedGradient 
        colors={['#A8CFF1', '#B9A6DC', '#45A1E7', '#00589F', '#2A3E66']}
        size={500}
        blur={150}
        duration={15}
        intensity={0.6}
        className="opacity-60 dark:opacity-40"
      />
      
      {/* Additional subtle background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#A8CFF1]/10 via-white to-[#B9A6DC]/10 dark:from-[#1A1A2E]/60 dark:via-[#0F0F23] dark:to-[#16213E]/60"></div>

      <div className="relative z-10 max-w-7xl mx-auto text-center w-full px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12">
        {/* Badge - static, no animation */}
        <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-[#A8CFF1]/20 to-[#B9A6DC]/20 dark:from-[#1A1A2E]/50 dark:to-[#16213E]/50 border border-[#A8CFF1]/30 dark:border-[#A8CFF1]/20 text-[#2A3E66] dark:text-[#E8E8E8] text-xs sm:text-sm font-medium mb-3 sm:mb-4 font-montserrat">
          <Star className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1.5 sm:mr-2 text-[#00589F]" />
          <span className="hidden sm:inline">Trusted by 10,000+ students across India</span>
          <span className="sm:hidden">10,000+ students trust us</span>
        </div>

        {/* Main Heading - static, no animation */}
        <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#2A3E66] dark:text-[#A8CFF1] mb-2 sm:mb-3 md:mb-4 leading-tight font-poppins">
          Mental Wellness
          <span className="block bg-gradient-to-r from-[#00589F] to-[#45A1E7] dark:from-[#A8CFF1] dark:to-[#B9A6DC] bg-clip-text text-transparent">
            Made Simple
          </span>
        </h1>

        {/* Subheading - static, no animation */}
        <p className="text-xs xs:text-sm sm:text-base md:text-lg text-[#45A1E7] dark:text-[#B8B8B8] mb-3 sm:mb-4 md:mb-5 max-w-2xl mx-auto leading-relaxed font-montserrat px-2 sm:px-0">
          Professional support, AI assistance, and community connection for your mental health journey. 
          <span className="text-[#2A3E66] dark:text-[#E8E8E8] font-semibold">Start your wellness journey today.</span>
        </p>

        {/* CTA Buttons - static, no animation */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 justify-center items-center mb-3 sm:mb-4 md:mb-5 px-2 sm:px-4 md:px-0" role="group" aria-label="Call to action buttons">
          <Link
            to="/auth/register"
            className="group relative inline-flex items-center px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 md:py-3.5 bg-gradient-to-r from-[#2A3E66] to-[#00589F] text-white font-semibold rounded-xl hover:from-[#00589F] hover:to-[#45A1E7] focus:outline-none focus:ring-2 focus:ring-[#45A1E7] focus:ring-offset-2 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 font-montserrat text-sm sm:text-base md:text-lg w-full sm:w-auto justify-center min-w-[180px] sm:min-w-[200px]"
            aria-label="Get started with Leher for free"
          >
            <Zap className="mr-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
            Get Started Free
            <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
          </Link>
          
          <button 
            className="group inline-flex items-center px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 md:py-3.5 text-[#2A3E66] dark:text-[#E8E8E8] font-semibold rounded-xl border-2 border-[#A8CFF1] dark:border-[#A8CFF1]/50 hover:border-[#45A1E7] dark:hover:border-[#45A1E7] hover:bg-[#A8CFF1]/10 dark:hover:bg-[#1A1A2E]/50 focus:outline-none focus:ring-2 focus:ring-[#45A1E7] dark:focus:ring-[#A8CFF1] focus:ring-offset-2 dark:focus:ring-offset-[#0F0F23] transition-all duration-300 font-montserrat text-sm sm:text-base md:text-lg w-full sm:w-auto justify-center min-w-[180px] sm:min-w-[200px]"
            aria-label="Watch a demo of Leher features"
          >
            <Play className="mr-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
            Watch Demo
          </button>
        </div>

        {/* Trust Indicators - static, no animation */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4 md:mb-5 px-2 sm:px-4 md:px-0">
          {LANDING_DATA.trustIndicators.map((indicator, index) => {
            const IconComponent = indicator.icon === 'Users' ? Users : 
                                 indicator.icon === 'Shield' ? Shield : Star
            return (
              <div key={index} className="flex items-center gap-1.5 sm:gap-2">
                <IconComponent className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-[#00589F] dark:text-[#A8CFF1]" />
                <span className="text-xs sm:text-sm md:text-base text-[#2A3E66] dark:text-[#E8E8E8] font-medium font-montserrat">{indicator.text}</span>
              </div>
            )
          })}
        </div>

        {/* Stats Grid - static, no animation */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4 max-w-4xl mx-auto px-2 sm:px-4 md:px-0">
          {LANDING_DATA.stats.map((stat, index) => (
            <div key={stat.label} className="text-center group p-2 sm:p-3 md:p-4 rounded-lg hover:bg-[#A8CFF1]/5 dark:hover:bg-[#1A1A2E]/30 transition-all duration-300">
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#2A3E66] dark:text-[#A8CFF1] mb-1 group-hover:text-[#00589F] dark:group-hover:text-[#45A1E7] transition-colors duration-300 font-poppins">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm md:text-base text-[#45A1E7] dark:text-[#B8B8B8] font-medium font-montserrat">{stat.label}</div>
              <div className="text-xs sm:text-sm text-[#A8CFF1] dark:text-[#B9A6DC] font-montserrat">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


export default HeroSection
