import { motion } from 'framer-motion'
import { ANIMATION_VARIANTS, STYLES } from '@/constants/landing'

// Re-export STYLES for convenience
export { STYLES }

interface SectionHeaderProps {
  title: string
  subtitle?: string
  className?: string
}

export const SectionHeader = ({ title, subtitle, className = '' }: SectionHeaderProps) => (
  <motion.div
    {...ANIMATION_VARIANTS.sectionHeader}
    className={`${STYLES.sectionHeader} ${className}`}
  >
    <h2 className={STYLES.heading}>{title}</h2>
    {subtitle && <p className={STYLES.subheading}>{subtitle}</p>}
    <div className={STYLES.divider}></div>
  </motion.div>
)

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  background?: 'gradient' | 'white'
}

export const AnimatedSection = ({ 
  children, 
  className = '', 
  background = 'gradient' 
}: AnimatedSectionProps) => (
  <section className={`${STYLES.section} ${background === 'gradient' ? STYLES.gradientBg : 'bg-white dark:bg-[#0F0F23]'} ${className}`}>
    <div className={STYLES.container}>
      {children}
    </div>
  </section>
)

interface StatCardProps {
  value: string
  label: string
  description: string
  index: number
}

export const StatCard = ({ value, label, description, index }: StatCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    className="text-center group p-2 sm:p-3 md:p-4 rounded-lg hover:bg-[#A8CFF1]/5 dark:hover:bg-[#1A1A2E]/30 transition-all duration-300"
  >
    <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#2A3E66] dark:text-[#A8CFF1] mb-1 sm:mb-2 md:mb-3 group-hover:text-[#00589F] dark:group-hover:text-[#45A1E7] transition-colors duration-300 font-poppins">
      {value}
    </div>
    <div className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-[#45A1E7] dark:text-[#B8B8B8] mb-1 sm:mb-2 font-montserrat">
      {label}
    </div>
    <div className="text-xs sm:text-sm md:text-base text-[#A8CFF1] dark:text-[#B9A6DC] font-montserrat">
      {description}
    </div>
  </motion.div>
)
