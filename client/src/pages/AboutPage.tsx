import { motion } from 'framer-motion'
import { Heart, Users, Award, Phone, Mail, MapPin, Clock, Shield, Globe, Target } from 'lucide-react'
import SEOHead from '@components/seo/SEOHead'

const AboutPage = () => {
  const teamMembers = [
    {
      name: "Dr. Priya Sharma",
      role: "Chief Mental Health Officer",
      image: "/api/placeholder/200/200",
      bio: "Licensed clinical psychologist with 15+ years of experience in student mental health.",
      expertise: ["Anxiety Disorders", "Depression", "Crisis Intervention"]
    },
    {
      name: "Rajesh Kumar",
      role: "Head of Technology",
      image: "/api/placeholder/200/200",
      bio: "Tech leader passionate about using AI to improve mental health accessibility.",
      expertise: ["AI Development", "Machine Learning", "User Experience"]
    },
    {
      name: "Dr. Anjali Mehta",
      role: "Clinical Director",
      image: "/api/placeholder/200/200",
      bio: "Psychiatrist specializing in adolescent and young adult mental health.",
      expertise: ["Psychiatry", "Medication Management", "Trauma Therapy"]
    }
  ]

  const values = [
    {
      icon: Heart,
      title: "Compassion",
      description: "We approach every interaction with empathy and understanding."
    },
    {
      icon: Shield,
      title: "Confidentiality",
      description: "Your privacy and trust are our top priorities."
    },
    {
      icon: Globe,
      title: "Accessibility",
      description: "Making mental health support available to all students."
    },
    {
      icon: Target,
      title: "Excellence",
      description: "Committed to providing the highest quality of care."
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#A8CFF1]/10 via-white to-[#B9A6DC]/10 dark:from-[#0F0F23] dark:via-[#1A1A2E] dark:to-[#16213E]">
      <SEOHead 
        title="About Us - Leher Mental Health Support"
        description="Learn about Leher's mission to provide accessible mental health support for students across India."
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
              About <span className="bg-gradient-to-r from-[#00589F] to-[#45A1E7] dark:from-[#A8CFF1] dark:to-[#B9A6DC] bg-clip-text text-transparent">Leher</span>
            </h1>
            <p className="text-xl sm:text-2xl text-[#45A1E7] dark:text-[#B8B8B8] max-w-4xl mx-auto font-montserrat leading-relaxed">
              We're on a mission to make mental health support accessible, affordable, and stigma-free for students across India.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2A3E66] dark:text-[#A8CFF1] mb-8 font-poppins tracking-tight">
                Our Mission
              </h2>
              <p className="text-lg sm:text-xl text-[#45A1E7] dark:text-[#B8B8B8] mb-8 font-montserrat leading-relaxed">
                Leher (meaning "wave" in Hindi) represents the ripple effect of positive mental health support. 
                We believe that every student deserves access to professional mental health care, regardless of 
                their background or circumstances.
              </p>
              <p className="text-lg sm:text-xl text-[#45A1E7] dark:text-[#B8B8B8] font-montserrat leading-relaxed">
                Our platform combines AI-powered support, professional counseling, and peer community to create 
                a comprehensive mental health ecosystem for students.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-[#A8CFF1]/15 to-[#B9A6DC]/15 dark:from-[#1A1A2E]/40 dark:to-[#16213E]/40 rounded-3xl p-10 backdrop-blur-sm border border-[#A8CFF1]/20 dark:border-[#A8CFF1]/10"
            >
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center group">
                  <div className="text-4xl sm:text-5xl font-bold text-[#2A3E66] dark:text-[#A8CFF1] mb-3 group-hover:text-[#00589F] dark:group-hover:text-[#45A1E7] transition-colors duration-300">10K+</div>
                  <div className="text-sm sm:text-base text-[#45A1E7] dark:text-[#B8B8B8] font-medium">Students Helped</div>
                </div>
                <div className="text-center group">
                  <div className="text-4xl sm:text-5xl font-bold text-[#2A3E66] dark:text-[#A8CFF1] mb-3 group-hover:text-[#00589F] dark:group-hover:text-[#45A1E7] transition-colors duration-300">50+</div>
                  <div className="text-sm sm:text-base text-[#45A1E7] dark:text-[#B8B8B8] font-medium">Universities</div>
                </div>
                <div className="text-center group">
                  <div className="text-4xl sm:text-5xl font-bold text-[#2A3E66] dark:text-[#A8CFF1] mb-3 group-hover:text-[#00589F] dark:group-hover:text-[#45A1E7] transition-colors duration-300">24/7</div>
                  <div className="text-sm sm:text-base text-[#45A1E7] dark:text-[#B8B8B8] font-medium">AI Support</div>
                </div>
                <div className="text-center group">
                  <div className="text-4xl sm:text-5xl font-bold text-[#2A3E66] dark:text-[#A8CFF1] mb-3 group-hover:text-[#00589F] dark:group-hover:text-[#45A1E7] transition-colors duration-300">95%</div>
                  <div className="text-sm sm:text-base text-[#45A1E7] dark:text-[#B8B8B8] font-medium">Satisfaction</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
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
              Our Values
            </h2>
            <p className="text-lg text-[#45A1E7] dark:text-[#B8B8B8] max-w-2xl mx-auto font-montserrat">
              These core values guide everything we do at Leher.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center group"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#A8CFF1] to-[#B9A6DC] dark:from-[#1A1A2E] dark:to-[#16213E] rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-8 w-8 text-[#2A3E66] dark:text-[#A8CFF1]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#2A3E66] dark:text-[#A8CFF1] mb-3 font-poppins">
                    {value.title}
                  </h3>
                  <p className="text-[#45A1E7] dark:text-[#B8B8B8] font-montserrat leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
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
              Meet Our Team
            </h2>
            <p className="text-lg text-[#45A1E7] dark:text-[#B8B8B8] max-w-2xl mx-auto font-montserrat">
              Our diverse team of mental health professionals, technologists, and advocates.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-[#1A1A2E] rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-center mb-4">
                  <div className="w-24 h-24 bg-gradient-to-br from-[#A8CFF1] to-[#B9A6DC] rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-12 w-12 text-[#2A3E66] dark:text-[#A8CFF1]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#2A3E66] dark:text-[#A8CFF1] mb-2 font-poppins">
                    {member.name}
                  </h3>
                  <p className="text-[#45A1E7] dark:text-[#B8B8B8] font-montserrat mb-3">
                    {member.role}
                  </p>
                </div>
                <p className="text-[#45A1E7] dark:text-[#B8B8B8] text-sm font-montserrat leading-relaxed mb-4">
                  {member.bio}
                </p>
                <div className="flex flex-wrap gap-2">
                  {member.expertise.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-2 py-1 bg-[#A8CFF1]/20 dark:bg-[#1A1A2E]/50 text-[#2A3E66] dark:text-[#A8CFF1] text-xs rounded-md font-montserrat"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
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
              Get in Touch
            </h2>
            <p className="text-lg text-[#45A1E7] dark:text-[#B8B8B8] max-w-2xl mx-auto font-montserrat">
              Have questions or want to partner with us? We'd love to hear from you.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-[#A8CFF1] to-[#B9A6DC] rounded-lg mb-4">
                <Mail className="h-6 w-6 text-[#2A3E66] dark:text-[#A8CFF1]" />
              </div>
              <h3 className="text-lg font-bold text-[#2A3E66] dark:text-[#A8CFF1] mb-2 font-poppins">
                Email Us
              </h3>
              <p className="text-[#45A1E7] dark:text-[#B8B8B8] font-montserrat">
                support@leher.com
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-[#A8CFF1] to-[#B9A6DC] rounded-lg mb-4">
                <Phone className="h-6 w-6 text-[#2A3E66] dark:text-[#A8CFF1]" />
              </div>
              <h3 className="text-lg font-bold text-[#2A3E66] dark:text-[#A8CFF1] mb-2 font-poppins">
                Call Us
              </h3>
              <p className="text-[#45A1E7] dark:text-[#B8B8B8] font-montserrat">
                +91 98765 43210
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-[#A8CFF1] to-[#B9A6DC] rounded-lg mb-4">
                <MapPin className="h-6 w-6 text-[#2A3E66] dark:text-[#A8CFF1]" />
              </div>
              <h3 className="text-lg font-bold text-[#2A3E66] dark:text-[#A8CFF1] mb-2 font-poppins">
                Visit Us
              </h3>
              <p className="text-[#45A1E7] dark:text-[#B8B8B8] font-montserrat">
                Mumbai, India
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage

