import { motion } from 'framer-motion'
import { Stethoscope, Award, Users, Shield, Star, Clock, MapPin, Phone, Mail, Calendar, CheckCircle } from 'lucide-react'
import SEOHead from '@components/seo/SEOHead'
import { Link } from 'react-router-dom'

const ExpertsPage = () => {
  const expertCategories = [
    {
      icon: Stethoscope,
      title: "Counselors",
      description: "Meet our licensed mental health counselors and therapists.",
      count: "25+",
      href: "/experts/counselors",
      color: "from-blue-500 to-indigo-500",
      features: [
        "Licensed mental health professionals",
        "Individual and group therapy sessions",
        "Specialized treatment programs",
        "Follow-up care planning"
      ]
    },
    {
      icon: Award,
      title: "Psychologists",
      description: "Connect with qualified psychologists for specialized support.",
      count: "15+",
      href: "/experts/psychologists",
      color: "from-green-500 to-teal-500",
      features: [
        "Clinical and counseling psychologists",
        "Psychological assessments",
        "Evidence-based therapies",
        "Research-backed interventions"
      ]
    },
    {
      icon: Users,
      title: "Peer Support",
      description: "Trained peer supporters who understand student challenges.",
      count: "50+",
      href: "/experts/peer-support",
      color: "from-purple-500 to-pink-500",
      features: [
        "Lived experience specialists",
        "Peer mentoring programs",
        "Support group facilitation",
        "Recovery coaching"
      ]
    },
    {
      icon: Shield,
      title: "Crisis Specialists",
      description: "24/7 crisis intervention specialists for emergency support.",
      count: "10+",
      href: "/experts/crisis",
      color: "from-red-500 to-orange-500",
      features: [
        "24/7 crisis intervention",
        "Emergency response protocols",
        "Suicide prevention training",
        "Immediate support coordination"
      ]
    }
  ]

  const featuredExperts = [
    {
      name: "Dr. Priya Sharma",
      role: "Clinical Psychologist",
      specialization: ["Anxiety Disorders", "Depression", "Trauma Therapy"],
      experience: "15+ years",
      rating: 4.9,
      sessions: 1200,
      image: "/api/placeholder/200/200",
      bio: "Licensed clinical psychologist specializing in adolescent and young adult mental health.",
      languages: ["English", "Hindi", "Marathi"],
      availability: "Mon-Fri, 9 AM - 6 PM"
    },
    {
      name: "Dr. Rajesh Kumar",
      role: "Counseling Psychologist",
      specialization: ["Relationship Counseling", "Career Guidance", "Stress Management"],
      experience: "12+ years",
      rating: 4.8,
      sessions: 950,
      image: "/api/placeholder/200/200",
      bio: "Experienced counselor helping students navigate academic and personal challenges.",
      languages: ["English", "Hindi", "Tamil"],
      availability: "Mon-Sat, 10 AM - 7 PM"
    },
    {
      name: "Dr. Anjali Mehta",
      role: "Psychiatrist",
      specialization: ["Medication Management", "Bipolar Disorder", "ADHD"],
      experience: "18+ years",
      rating: 4.9,
      sessions: 1500,
      image: "/api/placeholder/200/200",
      bio: "Board-certified psychiatrist with expertise in medication management and therapy.",
      languages: ["English", "Hindi", "Gujarati"],
      availability: "Mon-Fri, 8 AM - 5 PM"
    }
  ]

  const stats = [
    { label: "Total Experts", value: "100+", icon: Users },
    { label: "Sessions Completed", value: "50K+", icon: Calendar },
    { label: "Student Satisfaction", value: "98%", icon: Star },
    { label: "Response Time", value: "< 2hrs", icon: Clock }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#A8CFF1]/10 via-white to-[#B9A6DC]/10 dark:from-[#0F0F23] dark:via-[#1A1A2E] dark:to-[#16213E]">
      <SEOHead 
        title="Mental Health Experts - Leher"
        description="Connect with qualified mental health professionals: counselors, psychologists, peer supporters, and crisis specialists."
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
              Meet Our <span className="gradient-text">Experts</span>
            </h1>
            <p className="text-lg sm:text-xl text-[#45A1E7] dark:text-[#B8B8B8] max-w-3xl mx-auto font-montserrat leading-relaxed">
              Connect with qualified mental health professionals who understand the unique challenges students face.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-[#1A1A2E]/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#A8CFF1] to-[#B9A6DC] dark:from-[#1A1A2E] dark:to-[#16213E] rounded-xl mb-4">
                    <Icon className="h-8 w-8 text-[#2A3E66] dark:text-[#A8CFF1]" />
                  </div>
                  <div className="text-3xl font-bold text-[#2A3E66] dark:text-[#A8CFF1] mb-2 font-poppins">
                    {stat.value}
                  </div>
                  <div className="text-[#45A1E7] dark:text-[#B8B8B8] font-montserrat">
                    {stat.label}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Expert Categories */}
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
              Types of Experts
            </h2>
            <p className="text-lg text-[#45A1E7] dark:text-[#B8B8B8] max-w-2xl mx-auto font-montserrat">
              Choose the right type of mental health professional for your needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {expertCategories.map((category, index) => {
              const Icon = category.icon
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
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${category.color} rounded-xl mr-4 flex-shrink-0`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-2xl font-bold text-[#2A3E66] dark:text-[#A8CFF1] font-poppins">
                          {category.title}
                        </h3>
                        <span className="text-lg font-bold text-[#00589F] dark:text-[#45A1E7] font-poppins">
                          {category.count}
                        </span>
                      </div>
                      <p className="text-[#45A1E7] dark:text-[#B8B8B8] font-montserrat leading-relaxed mb-4">
                        {category.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    {category.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-[#00589F] dark:text-[#45A1E7] mr-3 flex-shrink-0" />
                        <span className="text-[#45A1E7] dark:text-[#B8B8B8] font-montserrat">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Link
                    to={category.href}
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#2A3E66] to-[#00589F] dark:from-[#A8CFF1] dark:to-[#45A1E7] text-white dark:text-[#0F0F23] font-semibold rounded-xl hover:from-[#00589F] hover:to-[#45A1E7] dark:hover:from-[#45A1E7] dark:hover:to-[#B9A6DC] transition-all duration-300 font-montserrat"
                  >
                    View {category.title}
                    <Users className="ml-2 h-4 w-4" />
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Experts */}
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
              Featured Experts
            </h2>
            <p className="text-lg text-[#45A1E7] dark:text-[#B8B8B8] max-w-2xl mx-auto font-montserrat">
              Meet some of our most experienced and highly-rated mental health professionals.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredExperts.map((expert, index) => (
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
                    <Stethoscope className="h-12 w-12 text-[#2A3E66] dark:text-[#A8CFF1]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#2A3E66] dark:text-[#A8CFF1] mb-2 font-poppins">
                    {expert.name}
                  </h3>
                  <p className="text-[#45A1E7] dark:text-[#B8B8B8] font-montserrat mb-3">
                    {expert.role}
                  </p>
                  <div className="flex items-center justify-center mb-3">
                    <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                    <span className="text-sm font-medium text-[#2A3E66] dark:text-[#A8CFF1] font-montserrat">
                      {expert.rating} ({expert.sessions} sessions)
                    </span>
                  </div>
                </div>
                
                <p className="text-[#45A1E7] dark:text-[#B8B8B8] text-sm font-montserrat leading-relaxed mb-4">
                  {expert.bio}
                </p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 text-[#00589F] dark:text-[#45A1E7] mr-2" />
                    <span className="text-[#45A1E7] dark:text-[#B8B8B8] font-montserrat">
                      {expert.experience} experience
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 text-[#00589F] dark:text-[#45A1E7] mr-2" />
                    <span className="text-[#45A1E7] dark:text-[#B8B8B8] font-montserrat">
                      {expert.availability}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {expert.specialization.map((specialty, specialtyIndex) => (
                    <span
                      key={specialtyIndex}
                      className="px-2 py-1 bg-[#A8CFF1]/20 dark:bg-[#1A1A2E]/50 text-[#2A3E66] dark:text-[#A8CFF1] text-xs rounded-md font-montserrat"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>

                <div className="flex space-x-2">
                  <button className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-[#2A3E66] to-[#00589F] dark:from-[#A8CFF1] dark:to-[#45A1E7] text-white dark:text-[#0F0F23] text-sm font-medium rounded-lg hover:from-[#00589F] hover:to-[#45A1E7] dark:hover:from-[#45A1E7] dark:hover:to-[#B9A6DC] transition-all duration-300 font-montserrat">
                    <Calendar className="mr-2 h-4 w-4" />
                    Book Session
                  </button>
                  <button className="inline-flex items-center justify-center px-4 py-2 border border-[#A8CFF1] dark:border-[#45A1E7] text-[#2A3E66] dark:text-[#A8CFF1] text-sm font-medium rounded-lg hover:bg-[#A8CFF1]/10 dark:hover:bg-[#1A1A2E]/30 transition-colors duration-300 font-montserrat">
                    <Phone className="h-4 w-4" />
                  </button>
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
              Ready to Connect with an Expert?
            </h2>
            <p className="text-lg text-white/90 mb-8 font-montserrat max-w-2xl mx-auto">
              Book a session with one of our qualified mental health professionals and start your healing journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/app/appointments"
                className="inline-flex items-center px-6 py-3 bg-white text-[#2A3E66] font-semibold rounded-xl hover:bg-gray-100 transition-colors duration-300 font-montserrat"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Book Appointment
              </Link>
              <Link
                to="/app/chatbot"
                className="inline-flex items-center px-6 py-3 border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-colors duration-300 font-montserrat"
              >
                <Stethoscope className="mr-2 h-5 w-5" />
                Try AI Assistant First
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default ExpertsPage
