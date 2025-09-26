import { Link } from 'react-router-dom'
import { ArrowRight, Play, Star, Users, Shield, Zap } from 'lucide-react'
import { LANDING_DATA } from '@/constants/landing'

const HeroSection = () => {
  return (
    <section 
      id="main-content"
      className="relative h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 overflow-hidden bg-white dark:bg-[#0F0F23]"
      role="banner"
      aria-label="Hero section"
    >
      {/* Clean background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#A8CFF1]/8 via-white to-[#B9A6DC]/8 dark:from-[#1A1A2E]/30 dark:via-[#0F0F23] dark:to-[#16213E]/30"></div>

      <div className="relative z-10 max-w-7xl mx-auto text-center w-full px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Badge */}
        <div className="inline-flex items-center px-5 py-2.5 rounded-full bg-white/80 dark:bg-[#1A1A2E]/60 border border-[#A8CFF1]/30 dark:border-[#A8CFF1]/20 text-[#2A3E66] dark:text-[#E8E8E8] text-sm font-medium mb-6 sm:mb-8 font-montserrat shadow-sm">
          <Star className="w-4 h-4 mr-2 text-[#00589F] dark:text-[#A8CFF1]" />
          <span className="hidden sm:inline">Trusted by 10,000+ students across India</span>
          <span className="sm:hidden">10K+ students trust us</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#2A3E66] dark:text-[#A8CFF1] mb-6 sm:mb-8 leading-tight font-poppins tracking-tight">
          Mental Wellness
          <span className="block bg-gradient-to-r from-[#00589F] to-[#45A1E7] dark:from-[#A8CFF1] dark:to-[#B9A6DC] bg-clip-text text-transparent mt-2">
            Made Simple
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-xl md:text-2xl text-[#45A1E7] dark:text-[#B8B8B8] mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed font-montserrat px-4 sm:px-0">
          Professional support, AI assistance, and community connection for your mental health journey. 
          <span className="block mt-3 text-[#2A3E66] dark:text-[#E8E8E8] font-semibold text-xl sm:text-2xl">Start your wellness journey today.</span>
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-8 sm:mb-10 px-4 sm:px-0" role="group" aria-label="Call to action buttons">
          <Link
            to="/auth/register"
            className="group relative inline-flex items-center px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-[#2A3E66] to-[#00589F] text-white font-semibold rounded-2xl hover:from-[#00589F] hover:to-[#45A1E7] focus:outline-none focus:ring-4 focus:ring-[#45A1E7]/30 focus:ring-offset-2 transition-all duration-300 shadow-lg hover:shadow-xl font-montserrat text-base sm:text-lg w-full sm:w-auto justify-center min-w-[200px] sm:min-w-[220px]"
            aria-label="Get started with Leher for free"
          >
            <Zap className="mr-2 h-5 w-5" aria-hidden="true" />
            Get Started Free
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
          </Link>
          
          <button 
            className="group inline-flex items-center px-8 sm:px-10 py-4 sm:py-5 text-[#2A3E66] dark:text-[#E8E8E8] font-semibold rounded-2xl border-2 border-[#A8CFF1] dark:border-[#A8CFF1]/50 hover:border-[#45A1E7] dark:hover:border-[#45A1E7] hover:bg-[#A8CFF1]/10 dark:hover:bg-[#1A1A2E]/50 focus:outline-none focus:ring-4 focus:ring-[#45A1E7]/30 dark:focus:ring-[#A8CFF1]/30 focus:ring-offset-2 dark:focus:ring-offset-[#0F0F23] transition-all duration-300 font-montserrat text-base sm:text-lg w-full sm:w-auto justify-center min-w-[200px] sm:min-w-[220px] hover:shadow-lg"
            aria-label="Watch a demo of Leher features"
          >
            <Play className="mr-2 h-5 w-5" aria-hidden="true" />
            Watch Demo
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-8 sm:mb-10 px-4 sm:px-0">
          {LANDING_DATA.trustIndicators.map((indicator, index) => {
            const IconComponent = indicator.icon === 'Users' ? Users : 
                                 indicator.icon === 'Shield' ? Shield : Star
            return (
              <div key={index} className="flex items-center gap-2 bg-white/70 dark:bg-[#1A1A2E]/50 px-4 py-2 rounded-full border border-[#A8CFF1]/20 dark:border-[#A8CFF1]/10 shadow-sm">
                <IconComponent className="h-4 w-4 text-[#00589F] dark:text-[#A8CFF1]" />
                <span className="text-sm text-[#2A3E66] dark:text-[#E8E8E8] font-medium font-montserrat">{indicator.text}</span>
              </div>
            )
          })}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto px-4 sm:px-0">
          {LANDING_DATA.stats.map((stat, index) => (
            <div key={stat.label} className="text-center p-6 sm:p-8 rounded-2xl bg-white/60 dark:bg-[#1A1A2E]/40 border border-[#A8CFF1]/20 dark:border-[#A8CFF1]/10 shadow-sm">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2A3E66] dark:text-[#A8CFF1] mb-2 font-poppins">
                {stat.value}
              </div>
              <div className="text-sm sm:text-base text-[#45A1E7] dark:text-[#B8B8B8] font-semibold font-montserrat mb-1">{stat.label}</div>
              <div className="text-xs text-[#A8CFF1] dark:text-[#B9A6DC] font-montserrat">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


export default HeroSection
