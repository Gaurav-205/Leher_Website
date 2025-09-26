import { motion } from 'framer-motion'
import { Bot, Users, BookOpen, Calendar, Shield, Zap, Heart, Clock, CheckCircle, Star } from 'lucide-react'
import SEOHead from '@components/seo/SEOHead'

const ServicesPage = () => {
  const services = [
    {
      icon: Bot,
      title: "AI Assistant",
      description: "24/7 mental health support with crisis detection and personalized guidance.",
      features: [
        "Instant responses to mental health queries",
        "Crisis detection and intervention",
        "Personalized wellness recommendations",
        "Multi-language support"
      ],
      pricing: "Free",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Anonymous forums for stigma-free connections and peer support.",
      features: [
        "Anonymous peer support groups",
        "Moderated discussion forums",
        "Success story sharing",
        "Mentor matching program"
      ],
      pricing: "Free",
      color: "from-[#00589F] to-[#45A1E7]"
    },
    {
      icon: BookOpen,
      title: "Resources",
      description: "Curated mental health content, tools, and educational materials.",
      features: [
        "Self-help guides and articles",
        "Interactive wellness tools",
        "Video tutorials and courses",
        "Crisis resource directory"
      ],
      pricing: "Free",
      color: "from-[#A8CFF1] to-[#B9A6DC]"
    },
    {
      icon: Calendar,
      title: "Professional Counseling",
      description: "Schedule sessions with licensed counselors and therapists.",
      features: [
        "One-on-one counseling sessions",
        "Group therapy options",
        "Specialized treatment programs",
        "Follow-up care planning"
      ],
      pricing: "₹500-1500/session",
      color: "from-[#45A1E7] to-[#00589F]"
    }
  ]

  const process = [
    {
      step: "01",
      title: "Sign Up",
      description: "Create your account and complete a brief assessment to understand your needs."
    },
    {
      step: "02",
      title: "Choose Service",
      description: "Select from our range of services based on your preferences and requirements."
    },
    {
      step: "03",
      title: "Get Started",
      description: "Begin your mental health journey with immediate access to AI support and resources."
    },
    {
      step: "04",
      title: "Ongoing Support",
      description: "Receive continuous support through our community and professional services."
    }
  ]

  const testimonials = [
    {
      name: "Priya S.",
      role: "Engineering Student",
      content: "The AI assistant helped me manage my anxiety during exam season. It's like having a therapist available 24/7.",
      rating: 5
    },
    {
      name: "Arjun M.",
      role: "Medical Student",
      content: "The community support groups made me realize I'm not alone in my struggles. The peer support is incredible.",
      rating: 5
    },
    {
      name: "Sneha R.",
      role: "MBA Student",
      content: "Professional counseling through Leher helped me overcome depression. The counselors are amazing.",
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#A8CFF1]/10 via-white to-[#B9A6DC]/10 dark:from-[#0F0F23] dark:via-[#1A1A2E] dark:to-[#16213E]">
      <SEOHead 
        title="Services - Leher Mental Health Support"
        description="Comprehensive mental health services for students: AI assistant, community support, resources, and professional counseling."
      />
      
      {/* Hero Section */}
      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#2A3E66] dark:text-[#A8CFF1] mb-8 font-poppins tracking-tight">
              Our <span className="bg-gradient-to-r from-[#00589F] to-[#45A1E7] dark:from-[#A8CFF1] dark:to-[#B9A6DC] bg-clip-text text-transparent">Services</span>
            </h1>
            <p className="text-xl sm:text-2xl text-[#45A1E7] dark:text-[#B8B8B8] max-w-4xl mx-auto font-montserrat leading-relaxed">
              Comprehensive mental health support designed specifically for students across India.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white dark:bg-[#1A1A2E] rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-300 border border-[#A8CFF1]/10 dark:border-[#A8CFF1]/20 hover:border-[#A8CFF1]/20 dark:hover:border-[#A8CFF1]/30 group"
                >
                  <div className="flex items-start mb-8">
                    <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${service.color} rounded-2xl mr-6 flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <Icon className="h-10 w-10 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl sm:text-3xl font-bold text-[#2A3E66] dark:text-[#A8CFF1] mb-3 font-poppins">
                        {service.title}
                      </h3>
                      <p className="text-lg text-[#45A1E7] dark:text-[#B8B8B8] font-montserrat leading-relaxed mb-6">
                        {service.description}
                      </p>
                      <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#A8CFF1]/20 to-[#B9A6DC]/20 dark:from-[#1A1A2E]/50 dark:to-[#16213E]/50 rounded-full border border-[#A8CFF1]/30 dark:border-[#A8CFF1]/20">
                        <span className="text-base font-semibold text-[#2A3E66] dark:text-[#A8CFF1] font-montserrat">
                          {service.pricing}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-[#2A3E66] dark:text-[#A8CFF1] font-poppins">
                      What's Included:
                    </h4>
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center group/feature">
                        <CheckCircle className="h-6 w-6 text-[#00589F] dark:text-[#45A1E7] mr-4 flex-shrink-0 group-hover/feature:scale-110 transition-transform duration-200" />
                        <span className="text-base text-[#45A1E7] dark:text-[#B8B8B8] font-montserrat leading-relaxed">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-[#1A1A2E]/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2A3E66] dark:text-[#A8CFF1] mb-6 font-poppins">
              How It Works
            </h2>
            <p className="text-lg text-[#45A1E7] dark:text-[#B8B8B8] max-w-2xl mx-auto font-montserrat">
              Getting started with Leher is simple and straightforward.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#A8CFF1] to-[#B9A6DC] dark:from-[#1A1A2E] dark:to-[#16213E] rounded-xl mb-4">
                  <span className="text-2xl font-bold text-[#2A3E66] dark:text-[#A8CFF1] font-poppins">
                    {step.step}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#2A3E66] dark:text-[#A8CFF1] mb-3 font-poppins">
                  {step.title}
                </h3>
                <p className="text-[#45A1E7] dark:text-[#B8B8B8] font-montserrat leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2A3E66] dark:text-[#A8CFF1] mb-6 font-poppins">
              What Students Say
            </h2>
            <p className="text-lg text-[#45A1E7] dark:text-[#B8B8B8] max-w-2xl mx-auto font-montserrat">
              Real stories from students who found support and healing through Leher.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-[#1A1A2E] rounded-xl p-6 shadow-lg"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-[#45A1E7] dark:text-[#B8B8B8] font-montserrat leading-relaxed mb-4">
                  "{testimonial.content}"
                </p>
                <div>
                  <h4 className="font-semibold text-[#2A3E66] dark:text-[#A8CFF1] font-poppins">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-[#45A1E7] dark:text-[#B8B8B8] font-montserrat">
                    {testimonial.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#2A3E66] to-[#00589F] dark:from-[#A8CFF1] dark:to-[#45A1E7]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 font-poppins">
              Ready to Start Your Mental Health Journey?
            </h2>
            <p className="text-lg text-white/90 mb-8 font-montserrat max-w-2xl mx-auto">
              Join thousands of students who have found support, community, and healing through Leher.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/auth/register"
                className="inline-flex items-center px-6 py-3 bg-white text-[#2A3E66] font-semibold rounded-xl hover:bg-gray-100 transition-colors duration-300 font-montserrat"
              >
                <Zap className="mr-2 h-5 w-5" />
                Get Started Free
              </a>
              <a
                href="/app/chatbot"
                className="inline-flex items-center px-6 py-3 border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-colors duration-300 font-montserrat"
              >
                <Bot className="mr-2 h-5 w-5" />
                Try AI Assistant
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default ServicesPage

