import { motion } from 'framer-motion'
import { Building, Stethoscope, Users2, Heart, Star, CheckCircle, Globe, Award, Shield } from 'lucide-react'
import SEOHead from '@components/seo/SEOHead'
import { Link } from 'react-router-dom'

const PartnersPage = () => {
  const partnerCategories = [
    {
      icon: Building,
      title: "Universities",
      description: "Partnering with leading universities across India for student wellness.",
      count: "50+",
      href: "/partners/universities",
      color: "from-blue-500 to-indigo-500",
      partners: [
        "Indian Institute of Technology (IIT)",
        "Indian Institute of Management (IIM)",
        "Delhi University",
        "Mumbai University",
        "Bangalore University"
      ]
    },
    {
      icon: Stethoscope,
      title: "Healthcare Providers",
      description: "Collaborating with hospitals and healthcare institutions.",
      count: "25+",
      href: "/partners/healthcare",
      color: "from-[#A8CFF1] to-[#B9A6DC]",
      partners: [
        "Apollo Hospitals",
        "Fortis Healthcare",
        "Max Healthcare",
        "Manipal Hospitals",
        "Narayana Health"
      ]
    },
    {
      icon: Users2,
      title: "NGOs",
      description: "Working with non-profit organizations for community outreach.",
      count: "30+",
      href: "/partners/ngos",
      color: "from-purple-500 to-pink-500",
      partners: [
        "Mental Health Foundation",
        "Youth for Mental Health",
        "Sangath",
        "The Live Love Laugh Foundation",
        "Mind Matters"
      ]
    },
    {
      icon: Building,
      title: "Corporate Partners",
      description: "Strategic partnerships with corporations for employee wellness.",
      count: "20+",
      href: "/partners/corporate",
      color: "from-[#45A1E7] to-[#00589F]",
      partners: [
        "Tata Consultancy Services",
        "Infosys",
        "Wipro",
        "HCL Technologies",
        "Tech Mahindra"
      ]
    }
  ]

  const featuredPartners = [
    {
      name: "Indian Institute of Technology, Mumbai",
      type: "University Partner",
      logo: "/api/placeholder/200/100",
      description: "Leading technical institute providing comprehensive mental health support to students.",
      programs: ["Student Counseling", "Crisis Intervention", "Peer Support Groups", "Mental Health Awareness"],
      studentsReached: "5000+",
      rating: 4.9,
      partnership: "Since 2020"
    },
    {
      name: "Apollo Hospitals",
      type: "Healthcare Partner",
      logo: "/api/placeholder/200/100",
      description: "Premier healthcare provider offering specialized mental health services.",
      programs: ["Psychiatric Consultation", "Inpatient Care", "Rehabilitation", "Family Therapy"],
      studentsReached: "3000+",
      rating: 4.8,
      partnership: "Since 2019"
    },
    {
      name: "Sangath",
      type: "NGO Partner",
      logo: "/api/placeholder/200/100",
      description: "Mental health research and service organization focused on community care.",
      programs: ["Community Outreach", "Training Programs", "Research Collaboration", "Awareness Campaigns"],
      studentsReached: "2000+",
      rating: 4.9,
      partnership: "Since 2021"
    }
  ]

  const benefits = [
    {
      icon: Heart,
      title: "Expanded Reach",
      description: "Reaching students across multiple institutions and communities"
    },
    {
      icon: Shield,
      title: "Quality Assurance",
      description: "Ensuring high standards through partner vetting and monitoring"
    },
    {
      icon: Globe,
      title: "Resource Sharing",
      description: "Leveraging partner resources for better service delivery"
    },
    {
      icon: Award,
      title: "Innovation",
      description: "Collaborating on new approaches to mental health care"
    }
  ]

  const stats = [
    { label: "Partner Organizations", value: "125+", icon: Building },
    { label: "Cities Covered", value: "25+", icon: Globe },
    { label: "Students Reached", value: "100K+", icon: Users2 },
    { label: "Partnership Years", value: "5+", icon: Award }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#A8CFF1]/10 via-white to-[#B9A6DC]/10 dark:from-[#0F0F23] dark:via-[#1A1A2E] dark:to-[#16213E]">
      <SEOHead 
        title="Partners - Leher Mental Health"
        description="Meet our partners: universities, healthcare providers, NGOs, and corporations working together for student mental health."
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
              Our <span className="gradient-text">Partners</span>
            </h1>
            <p className="text-lg sm:text-xl text-[#45A1E7] dark:text-[#B8B8B8] max-w-3xl mx-auto font-montserrat leading-relaxed">
              Collaborating with leading organizations across India to make mental health support accessible to all students.
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

      {/* Partner Categories */}
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
              Partner Categories
            </h2>
            <p className="text-lg text-[#45A1E7] dark:text-[#B8B8B8] max-w-2xl mx-auto font-montserrat">
              We work with diverse organizations to create a comprehensive mental health ecosystem.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {partnerCategories.map((category, index) => {
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
                  
                  <div className="space-y-2 mb-6">
                    <h4 className="text-sm font-semibold text-[#2A3E66] dark:text-[#A8CFF1] font-poppins">
                      Key Partners:
                    </h4>
                    {category.partners.map((partner, partnerIndex) => (
                      <div key={partnerIndex} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-[#00589F] dark:text-[#45A1E7] mr-2 flex-shrink-0" />
                        <span className="text-sm text-[#45A1E7] dark:text-[#B8B8B8] font-montserrat">
                          {partner}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Link
                    to={category.href}
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#2A3E66] to-[#00589F] dark:from-[#A8CFF1] dark:to-[#45A1E7] text-white dark:text-[#0F0F23] font-semibold rounded-xl hover:from-[#00589F] hover:to-[#45A1E7] dark:hover:from-[#45A1E7] dark:hover:to-[#B9A6DC] transition-all duration-300 font-montserrat"
                  >
                    View {category.title}
                    <Building className="ml-2 h-4 w-4" />
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
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
              Partnership Benefits
            </h2>
            <p className="text-lg text-[#45A1E7] dark:text-[#B8B8B8] max-w-2xl mx-auto font-montserrat">
              How our partnerships create value for students and organizations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
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
                    {benefit.title}
                  </h3>
                  <p className="text-[#45A1E7] dark:text-[#B8B8B8] font-montserrat leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Partners */}
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
              Featured Partners
            </h2>
            <p className="text-lg text-[#45A1E7] dark:text-[#B8B8B8] max-w-2xl mx-auto font-montserrat">
              Meet some of our key partners making a difference in student mental health.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPartners.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-[#1A1A2E] rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-center mb-4">
                  <div className="w-full h-32 bg-gradient-to-br from-[#A8CFF1] to-[#B9A6DC] rounded-lg mb-4 flex items-center justify-center">
                    <Building className="h-16 w-16 text-[#2A3E66] dark:text-[#A8CFF1]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#2A3E66] dark:text-[#A8CFF1] mb-2 font-poppins">
                    {partner.name}
                  </h3>
                  <p className="text-[#45A1E7] dark:text-[#B8B8B8] font-montserrat mb-3">
                    {partner.type}
                  </p>
                  <div className="flex items-center justify-center mb-3">
                    <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                    <span className="text-sm font-medium text-[#2A3E66] dark:text-[#A8CFF1] font-montserrat">
                      {partner.rating} • {partner.studentsReached} students
                    </span>
                  </div>
                </div>
                
                <p className="text-[#45A1E7] dark:text-[#B8B8B8] text-sm font-montserrat leading-relaxed mb-4">
                  {partner.description}
                </p>
                
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-[#2A3E66] dark:text-[#A8CFF1] mb-2 font-poppins">
                    Programs:
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {partner.programs.map((program, programIndex) => (
                      <span
                        key={programIndex}
                        className="px-2 py-1 bg-[#A8CFF1]/20 dark:bg-[#1A1A2E]/50 text-[#2A3E66] dark:text-[#A8CFF1] text-xs rounded-md font-montserrat"
                      >
                        {program}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-center">
                  <span className="text-xs text-[#45A1E7] dark:text-[#B8B8B8] font-montserrat">
                    Partnership: {partner.partnership}
                  </span>
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
              Interested in Partnering with Us?
            </h2>
            <p className="text-lg text-white/90 mb-8 font-montserrat max-w-2xl mx-auto">
              Join our network of partners and help us make mental health support accessible to students across India.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:partnerships@leher.com"
                className="inline-flex items-center px-6 py-3 bg-white text-[#2A3E66] font-semibold rounded-xl hover:bg-gray-100 transition-colors duration-300 font-montserrat"
              >
                <Building className="mr-2 h-5 w-5" />
                Become a Partner
              </a>
              <Link
                to="/about/contact"
                className="inline-flex items-center px-6 py-3 border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-colors duration-300 font-montserrat"
              >
                <Heart className="mr-2 h-5 w-5" />
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default PartnersPage
