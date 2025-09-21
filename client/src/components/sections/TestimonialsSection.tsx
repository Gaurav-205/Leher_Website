import { motion } from 'framer-motion'
import Testimonials3D from '@components/Testimonials3D'
import { AnimatedSection, SectionHeader } from '@/components/shared/LandingComponents'
import { AnimatedGradient } from '@/components/ui/animated-gradient'

const TestimonialsSection = () => {
  return (
    <AnimatedSection>
      {/* Subtle animated background */}
      <AnimatedGradient 
        colors={['#B9A6DC', '#A8CFF1', '#45A1E7']}
        size={350}
        blur={180}
        duration={30}
        intensity={0.15}
        className="opacity-15"
      />
      
      <SectionHeader 
        title="What students say"
        subtitle="Real stories from students who found support and community"
      />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="px-2 sm:px-4 md:px-6 lg:px-8"
      >
        <Testimonials3D />
      </motion.div>
    </AnimatedSection>
  )
}

export default TestimonialsSection