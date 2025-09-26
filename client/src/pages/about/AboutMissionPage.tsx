import { motion } from 'framer-motion'
import { Heart, Target, Users, Globe, Award, Shield, Lightbulb, ArrowRight } from 'lucide-react'
import SEOHead from '@components/seo/SEOHead'
import { Link } from 'react-router-dom'

const AboutMissionPage = () => {
  const missionPoints = [
    {
      icon: Heart,
      title: "Compassionate Care",
      description: "Providing empathetic and understanding support to every student who reaches out to us.",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: Globe,
      title: "Accessibility",
      description: "Making mental health support available to students regardless of their background or circumstances.",
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: Shield,
      title: "Confidentiality",
      description: "Ensuring complete privacy and trust in all our interactions and services.",
      color: "from-green-500 to-teal-500"
    },
    {
      icon: Target,
      title: "Excellence",
      description: "Maintaining the highest standards of care through qualified professionals and evidence-based practices.",
      color: "from-purple-500 to-violet-500"
    }
  ]

  const impactStats = [
    { label: "Students Helped", value: "10,000+", icon: Users },
    { label: "Universities Partnered", value: "50+", icon: Globe },
    { label: "Crisis Interventions", value: "500+", icon: Shield },
    { label: "Satisfaction Rate", value: "95%", icon: Award }
  ]

  const values = [
    {
      title: "Student-Centered Approach",
      description: "Every decision we make is guided by what's best for our students' mental health and wellbeing."
    },
    {
      title: "Evidence-Based Practice",
      description: "We use scientifically proven methods and continuously update our approaches based on research."
    },
    {
      title: "Cultural Sensitivity",
      description: "We understand and respect the diverse cultural backgrounds of students across India."
    },
    {
      title: "Innovation & Technology",
      description: "We leverage cutting-edge technology to make mental health support more accessible and effective."
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#A8CFF1]/10 via-white to-[#B9A6DC]/10 dark:from-[#0F0F23] dark:via-[#1A1A2E] dark:to-[#16213E]">
      <SEOHead 
        title="Our Mission - Leher Mental Health"
        description="Learn about Leher's mission to provide accessible, compassionate, and effective mental health support for students across India."
      />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2A3E66] dark:text-[#A8CFF1] mb-6 font-poppins">
              Our <span className="gradient-text">Mission</span>
            </h1>
            <p className="text-lg sm:text-xl text-[#45A1E7] dark:text-[#B8B8B8] max-w-3xl mx-auto font-montserrat leading-relaxed">
              To make mental health support accessible, affordable, and stigma-free for every student in India.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-[#2A3E66] dark:text-[#A8CFF1] mb-6 font-poppins">
                Why We Exist
              </h2>
              <p className="text-lg text-[#45A1E7] dark:text-[#B8B8B8] mb-6 font-montserrat leading-relaxed">
                Mental health challenges among students have reached alarming levels in India. Academic pressure, 
                social expectations, financial stress, and the transition to adulthood create a perfect storm of 
                mental health issues that often go unaddressed.
              </p>
              <p className="text-lg text-[#45A1E7] dark:text-[#B8B8B8] font-montserrat leading-relaxed">
                Leher (meaning "wave" in Hindi) represents the ripple effect of positive mental health support. 
                We believe that when one student finds healing and support, it creates waves of positive change 
                throughout their community.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-[#A8CFF1]/20 to-[#B9A6DC]/20 dark:from-[#1A1A2E]/50 dark:to-[#16213E]/50 rounded-2xl p-8"
            >
              <div className="grid grid-cols-2 gap-6">
                {impactStats.map((stat, index) => {
                  const Icon = stat.icon
                  return (
                    <div key={index} className="text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-[#A8CFF1] to-[#B9A6DC] dark:from-[#1A1A2E] dark:to-[#16213E] rounded-lg mb-3">
                        <Icon className="h-6 w-6 text-[#2A3E66] dark:text-[#A8CFF1]" />
                      </div>
                      <div className="text-2xl font-bold text-[#2A3E66] dark:text-[#A8CFF1] mb-1 font-poppins">
                        {stat.value}
                      </div>
                      <div className="text-sm text-[#45A1E7] dark:text-[#B8B8B8] font-montserrat">
                        {stat.label}
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Pillars */}
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
              Our Mission Pillars
            </h2>
            <p className="text-lg text-[#45A1E7] dark:text-[#B8B8B8] max-w-2xl mx-auto font-montserrat">
              Four core principles that guide everything we do at Leher.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {missionPoints.map((point, index) => {
              const Icon = point.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white dark:bg-[#1A1A2E] rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex items-start mb-6">
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${point.color} rounded-xl mr-4 flex-shrink-0`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-[#2A3E66] dark:text-[#A8CFF1] mb-3 font-poppins">
                        {point.title}
                      </h3>
                      <p className="text-[#45A1E7] dark:text-[#B8B8B8] font-montserrat leading-relaxed">
                        {point.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Our Values */}
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
              What Drives Us
            </h2>
            <p className="text-lg text-[#45A1E7] dark:text-[#B8B8B8] max-w-2xl mx-auto font-montserrat">
              The values and principles that shape our approach to mental health care.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-[#1A1A2E] rounded-xl p-6 shadow-lg"
              >
                <h3 className="text-xl font-bold text-[#2A3E66] dark:text-[#A8CFF1] mb-3 font-poppins">
                  {value.title}
                </h3>
                <p className="text-[#45A1E7] dark:text-[#B8B8B8] font-montserrat leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#2A3E66] to-[#00589F] dark:from-[#A8CFF1] dark:to-[#45A1E7]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 font-poppins">
              Join Our Mission
            </h2>
            <p className="text-lg text-white/90 mb-8 font-montserrat max-w-2xl mx-auto">
              Be part of the wave of positive change in student mental health. Together, we can create a 
              more supportive and understanding environment for students across India.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/auth/register"
                className="inline-flex items-center px-6 py-3 bg-white text-[#2A3E66] font-semibold rounded-xl hover:bg-gray-100 transition-colors duration-300 font-montserrat"
              >
                <Heart className="mr-2 h-5 w-5" />
                Get Started
              </Link>
              <Link
                to="/about/story"
                className="inline-flex items-center px-6 py-3 border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-colors duration-300 font-montserrat"
              >
                <ArrowRight className="mr-2 h-5 w-5" />
                Our Story
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default AboutMissionPage
