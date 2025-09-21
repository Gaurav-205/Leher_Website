import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Bot, Users, BookOpen, ArrowRight, Lock } from 'lucide-react'
import { AnimatedSection, SectionHeader, STYLES } from '@/components/shared/LandingComponents'
import { LANDING_DATA, ANIMATION_VARIANTS } from '@/constants/landing'
import { useAuthStore } from '@store/authStore'

const iconMap = {
  Bot,
  Users,
  BookOpen
}

const ConnectedFeaturesSection = () => {
  const { isAuthenticated } = useAuthStore()
  
  return (
    <AnimatedSection background="white">
      <SectionHeader 
        title="How we help"
        subtitle="Simple tools designed to support your mental wellness journey"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
        {LANDING_DATA.features.map((feature, index) => {
          const Icon = iconMap[feature.icon as keyof typeof iconMap]
          const isLocked = !isAuthenticated
          
          return (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`text-center group p-3 sm:p-4 md:p-6 lg:p-8 rounded-2xl transition-all duration-300 ${
                isLocked 
                  ? 'hover:bg-gradient-to-br hover:from-[#A8CFF1]/5 hover:to-[#B9A6DC]/5 dark:hover:from-[#1A1A2E]/50 dark:hover:to-[#16213E]/50 opacity-75' 
                  : 'hover:bg-gradient-to-br hover:from-[#A8CFF1]/5 hover:to-[#B9A6DC]/5 dark:hover:from-[#1A1A2E]/50 dark:hover:to-[#16213E]/50'
              }`}
            >
              <div className={`inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-xl mb-2 sm:mb-3 md:mb-4 lg:mb-6 transition-all duration-300 ${
                isLocked 
                  ? 'bg-gradient-to-br from-gray-300 to-gray-400 dark:from-[#2A3E66] dark:to-[#1A1A2E]' 
                  : 'bg-gradient-to-br from-[#A8CFF1] to-[#B9A6DC] dark:from-[#1A1A2E] dark:to-[#16213E] group-hover:from-[#B9A6DC] group-hover:to-[#A8CFF1] dark:group-hover:from-[#16213E] dark:group-hover:to-[#1A1A2E] group-hover:scale-110'
              }`}>
                <Icon className={`h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 transition-colors duration-300 ${
                  isLocked 
                    ? 'text-gray-500 dark:text-gray-400' 
                    : 'text-[#2A3E66] dark:text-[#A8CFF1]'
                }`} />
              </div>
              <h3 className={`text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 md:mb-4 transition-colors duration-300 font-poppins ${
                isLocked 
                  ? 'text-gray-500 dark:text-gray-400' 
                  : 'text-[#2A3E66] dark:text-[#A8CFF1] group-hover:text-[#00589F] dark:group-hover:text-[#45A1E7]'
              }`}>
                {feature.title}
                {isLocked && <Lock className="inline-block ml-2 h-3 w-3 sm:h-4 sm:w-4" />}
              </h3>
              <p className={`mb-2 sm:mb-3 md:mb-4 lg:mb-6 leading-relaxed text-xs sm:text-sm md:text-base font-montserrat ${
                isLocked 
                  ? 'text-gray-400 dark:text-gray-500' 
                  : 'text-[#45A1E7] dark:text-[#B8B8B8]'
              }`}>
                {feature.description}
              </p>
              {isLocked ? (
                <Link
                  to="/auth/register"
                  className="group inline-flex items-center px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-[#2A3E66] to-[#00589F] dark:from-[#A8CFF1] dark:to-[#45A1E7] text-white dark:text-[#0F0F23] font-semibold rounded-xl hover:from-[#00589F] hover:to-[#45A1E7] dark:hover:from-[#45A1E7] dark:hover:to-[#B9A6DC] focus:outline-none focus:ring-2 focus:ring-[#45A1E7] dark:focus:ring-[#A8CFF1] focus:ring-offset-2 dark:focus:ring-offset-[#0F0F23] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 font-montserrat text-xs sm:text-sm md:text-base w-full sm:w-auto justify-center"
                >
                  <Lock className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  Sign Up to Access
                  <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              ) : (
                <Link
                  to={feature.to}
                  className="group inline-flex items-center px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-[#2A3E66] to-[#00589F] dark:from-[#A8CFF1] dark:to-[#45A1E7] text-white dark:text-[#0F0F23] font-semibold rounded-xl hover:from-[#00589F] hover:to-[#45A1E7] dark:hover:from-[#45A1E7] dark:hover:to-[#B9A6DC] focus:outline-none focus:ring-2 focus:ring-[#45A1E7] dark:focus:ring-[#A8CFF1] focus:ring-offset-2 dark:focus:ring-offset-[#0F0F23] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 font-montserrat text-xs sm:text-sm md:text-base w-full sm:w-auto justify-center"
                >
                  {feature.ctaLabel}
                  <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              )}
            </motion.div>
          )
        })}
      </div>
    </AnimatedSection>
  )
}

export default ConnectedFeaturesSection


