// Shared constants and data
export const LANDING_DATA = {
  stats: [
    { value: '50K+', label: 'Chat Sessions', description: 'AI-powered support' },
    { value: '2.5K+', label: 'Counseling Sessions', description: 'Professional support' },
    { value: '95%', label: 'Success Rate', description: 'Student satisfaction' }
  ],
  
  universities: [
    'IIT Delhi', 'IIT Bombay', 'IIT Bangalore', 'IISc', 'DU', 
    'JNU', 'BITS', 'NIT', 'IIM', 'AIIMS'
  ],
  
  features: [
    {
      id: 'ai',
      title: 'AI Assistant',
      description: '24/7 mental health support with crisis detection',
      ctaLabel: 'Chat now',
      to: '/app/chatbot',
      icon: 'Bot'
    },
    {
      id: 'community',
      title: 'Peer Support',
      description: 'Anonymous forums for stigma-free connections',
      ctaLabel: 'Join community',
      to: '/app/community',
      icon: 'Users'
    },
    {
      id: 'resources',
      title: 'Resources',
      description: 'Curated mental health content and tools',
      ctaLabel: 'Explore resources',
      to: '/app/resources',
      icon: 'BookOpen'
    }
  ],
  
  trustIndicators: [
    { icon: 'Users', text: '10K+ Active Users' },
    { icon: 'Shield', text: 'HIPAA Compliant' },
    { icon: 'Star', text: '4.9/5 Rating' }
  ]
}

// Dark mode color variants
export const DARK_COLORS = {
  primary: '#A8CFF1',
  secondary: '#B9A6DC', 
  accent: '#45A1E7',
  dark: '#1A1A2E',
  darker: '#16213E',
  text: '#E8E8E8',
  textSecondary: '#B8B8B8',
  background: '#0F0F23',
  surface: '#1A1A2E'
}

// Animation variants for consistency
export const ANIMATION_VARIANTS = {
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  },
  
  staggerChildren: {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  },
  
  sectionHeader: {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  }
}

// Common styling classes with dark mode support
export const STYLES = {
  section: 'py-16 md:py-20 lg:py-24',
  container: 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8',
  sectionHeader: 'text-center mb-12 md:mb-16 lg:mb-20',
  heading: 'text-2xl md:text-3xl lg:text-4xl font-bold text-[#2A3E66] dark:text-[#A8CFF1] mb-4 md:mb-6 font-poppins',
  subheading: 'text-lg md:text-xl lg:text-2xl text-[#45A1E7] dark:text-[#B8B8B8] max-w-3xl mx-auto mb-6 font-montserrat leading-relaxed',
  divider: 'w-24 md:w-32 h-1 bg-gradient-to-r from-[#00589F] to-[#45A1E7] dark:from-[#A8CFF1] dark:to-[#B9A6DC] mx-auto rounded-full',
  gradientBg: 'bg-gradient-to-br from-[#A8CFF1]/5 to-[#B9A6DC]/5 dark:from-[#1A1A2E]/50 dark:to-[#16213E]/50',
  primaryButton: 'group inline-flex items-center px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-[#2A3E66] to-[#00589F] dark:from-[#A8CFF1] dark:to-[#45A1E7] text-white dark:text-[#0F0F23] font-semibold rounded-xl hover:from-[#00589F] hover:to-[#45A1E7] dark:hover:from-[#45A1E7] dark:hover:to-[#B9A6DC] focus:outline-none focus:ring-2 focus:ring-[#45A1E7] dark:focus:ring-[#A8CFF1] focus:ring-offset-2 dark:focus:ring-offset-[#0F0F23] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 font-montserrat text-sm md:text-base'
}
