import { Link } from 'react-router-dom'
import { ArrowRight, Play, Star, Users, Shield, Zap, Heart, Sparkles, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'

const HeroSection = () => {
  return (
    <section 
      id="main-content"
      className="relative h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 overflow-hidden bg-white dark:bg-[#0F0F23]"
      role="banner"
      aria-label="Hero section"
    >
      {/* Enhanced background with animated elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#A8CFF1]/10 via-white to-[#B9A6DC]/10 dark:from-[#1A1A2E]/40 dark:via-[#0F0F23] dark:to-[#16213E]/40"></div>
      
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-[#A8CFF1]/20 rounded-full blur-xl"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-32 h-32 bg-[#B9A6DC]/20 rounded-full blur-xl"
          animate={{
            y: [0, 20, 0],
            x: [0, -15, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="absolute bottom-40 left-20 w-24 h-24 bg-[#45A1E7]/20 rounded-full blur-xl"
          animate={{
            y: [0, -15, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-12 flex flex-col justify-center h-full">
        {/* Enhanced Badge */}
        <motion.div 
          className="inline-flex items-center px-4 py-2 rounded-full bg-white/90 dark:bg-[#1A1A2E]/70 border border-[#A8CFF1]/40 dark:border-[#A8CFF1]/30 text-[#2A3E66] dark:text-[#E8E8E8] text-sm font-medium mb-2 sm:mb-3 font-montserrat shadow-lg backdrop-blur-sm self-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <Sparkles className="w-3 h-3 mr-1.5 text-[#00589F] dark:text-[#A8CFF1]" />
          </motion.div>
          <span className="hidden sm:inline">Trusted by 10,000+ students across India</span>
          <span className="sm:hidden">10K+ students trust us</span>
        </motion.div>

        {/* Enhanced Main Heading */}
        <motion.h1 
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#2A3E66] dark:text-[#A8CFF1] mb-2 sm:mb-3 leading-tight font-poppins tracking-tight text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Mental Wellness
          </motion.span>
          <motion.span 
            className="block bg-gradient-to-r from-[#00589F] to-[#45A1E7] dark:from-[#A8CFF1] dark:to-[#B9A6DC] bg-clip-text text-transparent mt-1 sm:mt-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Made Simple
          </motion.span>
        </motion.h1>

        {/* Enhanced Subheading */}
        <motion.p 
          className="text-lg sm:text-xl md:text-2xl text-[#45A1E7] dark:text-[#B8B8B8] mb-4 sm:mb-6 max-w-3xl mx-auto leading-relaxed font-montserrat px-4 sm:px-0 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          Professional support, AI assistance, and community connection for your mental health journey.
          <motion.span 
            className="block mt-4 text-[#2A3E66] dark:text-[#E8E8E8] font-semibold text-xl sm:text-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            Start your wellness journey today.
          </motion.span>
        </motion.p>

        {/* Enhanced CTA Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-4 sm:mb-6 px-4 sm:px-0 self-center" 
          role="group" 
          aria-label="Call to action buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/auth/register"
              className="group relative inline-flex items-center px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-[#2A3E66] to-[#00589F] text-white font-semibold rounded-2xl hover:from-[#00589F] hover:to-[#45A1E7] focus:outline-none focus:ring-4 focus:ring-[#45A1E7]/30 focus:ring-offset-2 transition-all duration-300 shadow-xl hover:shadow-2xl font-montserrat text-base sm:text-lg w-full sm:w-auto justify-center min-w-[200px] sm:min-w-[220px] overflow-hidden"
              aria-label="Get started with Leher for free"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#45A1E7] to-[#A8CFF1] opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
              >
                <Heart className="mr-2 h-5 w-5" aria-hidden="true" />
              </motion.div>
              Get Started Free
              <motion.div
                className="ml-2"
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
              >
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
              </motion.div>
            </Link>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button 
              className="group inline-flex items-center px-8 sm:px-10 py-4 sm:py-5 text-[#2A3E66] dark:text-[#E8E8E8] font-semibold rounded-2xl border-2 border-[#A8CFF1] dark:border-[#A8CFF1]/50 hover:border-[#45A1E7] dark:hover:border-[#45A1E7] hover:bg-[#A8CFF1]/10 dark:hover:bg-[#1A1A2E]/50 focus:outline-none focus:ring-4 focus:ring-[#45A1E7]/30 dark:focus:ring-[#A8CFF1]/30 focus:ring-offset-2 dark:focus:ring-offset-[#0F0F23] transition-all duration-300 font-montserrat text-base sm:text-lg w-full sm:w-auto justify-center min-w-[200px] sm:min-w-[220px] hover:shadow-xl backdrop-blur-sm"
              aria-label="Watch a demo of Leher features"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <Play className="mr-2 h-5 w-5" aria-hidden="true" />
              </motion.div>
              Watch Demo
            </button>
          </motion.div>
        </motion.div>

        {/* Enhanced Trust Indicators */}
        <motion.div 
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4 px-4 sm:px-0 self-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
        >
          <motion.div 
            className="flex items-center gap-2 bg-white/80 dark:bg-[#1A1A2E]/60 px-4 py-2 rounded-full border border-[#A8CFF1]/30 dark:border-[#A8CFF1]/20 shadow-lg backdrop-blur-sm"
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
            >
              <Users className="h-4 w-4 text-[#00589F] dark:text-[#A8CFF1]" />
            </motion.div>
            <span className="text-sm text-[#2A3E66] dark:text-[#E8E8E8] font-medium font-montserrat">10K+ Active Users</span>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-2 bg-white/80 dark:bg-[#1A1A2E]/60 px-4 py-2 rounded-full border border-[#A8CFF1]/30 dark:border-[#A8CFF1]/20 shadow-lg backdrop-blur-sm"
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 4 }}
            >
              <Shield className="h-4 w-4 text-[#00589F] dark:text-[#A8CFF1]" />
            </motion.div>
            <span className="text-sm text-[#2A3E66] dark:text-[#E8E8E8] font-medium font-montserrat">HIPAA Compliant</span>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-2 bg-white/80 dark:bg-[#1A1A2E]/60 px-4 py-2 rounded-full border border-[#A8CFF1]/30 dark:border-[#A8CFF1]/20 shadow-lg backdrop-blur-sm"
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, repeatDelay: 6 }}
            >
              <Star className="h-4 w-4 text-[#00589F] dark:text-[#A8CFF1]" />
            </motion.div>
            <span className="text-sm text-[#2A3E66] dark:text-[#E8E8E8] font-medium font-montserrat">4.9/5 Rating</span>
          </motion.div>
        </motion.div>

        {/* Additional Features */}
        <motion.div 
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 px-4 sm:px-0 self-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8 }}
        >
          <motion.div 
            className="flex items-center gap-2 text-[#45A1E7] dark:text-[#B8B8B8]"
            whileHover={{ scale: 1.05 }}
          >
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span className="text-sm font-medium font-montserrat">24/7 AI Support</span>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-2 text-[#45A1E7] dark:text-[#B8B8B8]"
            whileHover={{ scale: 1.05 }}
          >
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span className="text-sm font-medium font-montserrat">Expert Counselors</span>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-2 text-[#45A1E7] dark:text-[#B8B8B8]"
            whileHover={{ scale: 1.05 }}
          >
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span className="text-sm font-medium font-montserrat">Anonymous & Secure</span>
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}


export default HeroSection
