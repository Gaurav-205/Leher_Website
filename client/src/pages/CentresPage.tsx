import { motion } from 'framer-motion'
import { MapPin, Phone, Clock, Users, Shield, Heart, Star, CheckCircle, Navigation, Calendar } from 'lucide-react'
import SEOHead from '@components/seo/SEOHead'
import { Link } from 'react-router-dom'

const CentresPage = () => {
  const centres = [
    {
      name: "Leher Mumbai Centre",
      address: "Bandra Kurla Complex, Mumbai, Maharashtra 400051",
      phone: "+91 22 1234 5678",
      email: "mumbai@leher.com",
      hours: "Mon-Sat: 9 AM - 8 PM, Sun: 10 AM - 6 PM",
      services: ["Individual Counseling", "Group Therapy", "Crisis Intervention", "Psychiatric Consultation"],
      rating: 4.8,
      reviews: 156,
      image: "/api/placeholder/400/300",
      coordinates: { lat: 19.0760, lng: 72.8777 },
      specialties: ["Anxiety", "Depression", "Academic Stress", "Relationship Issues"]
    },
    {
      name: "Leher Delhi Centre",
      address: "Connaught Place, New Delhi, Delhi 110001",
      phone: "+91 11 2345 6789",
      email: "delhi@leher.com",
      hours: "Mon-Sat: 9 AM - 8 PM, Sun: 10 AM - 6 PM",
      services: ["Individual Counseling", "Family Therapy", "Career Counseling", "Substance Abuse Support"],
      rating: 4.7,
      reviews: 142,
      image: "/api/placeholder/400/300",
      coordinates: { lat: 28.6139, lng: 77.2090 },
      specialties: ["Career Guidance", "Family Issues", "Substance Abuse", "Trauma Therapy"]
    },
    {
      name: "Leher Bangalore Centre",
      address: "Koramangala, Bangalore, Karnataka 560034",
      phone: "+91 80 3456 7890",
      email: "bangalore@leher.com",
      hours: "Mon-Sat: 9 AM - 8 PM, Sun: 10 AM - 6 PM",
      services: ["Individual Counseling", "Couples Therapy", "LGBTQ+ Support", "Mindfulness Training"],
      rating: 4.9,
      reviews: 189,
      image: "/api/placeholder/400/300",
      coordinates: { lat: 12.9716, lng: 77.5946 },
      specialties: ["LGBTQ+ Support", "Mindfulness", "Couples Therapy", "Work-Life Balance"]
    },
    {
      name: "Leher Chennai Centre",
      address: "T. Nagar, Chennai, Tamil Nadu 600017",
      phone: "+91 44 4567 8901",
      email: "chennai@leher.com",
      hours: "Mon-Sat: 9 AM - 8 PM, Sun: 10 AM - 6 PM",
      services: ["Individual Counseling", "Child & Adolescent Therapy", "Parenting Support", "Educational Assessment"],
      rating: 4.6,
      reviews: 134,
      image: "/api/placeholder/400/300",
      coordinates: { lat: 13.0827, lng: 80.2707 },
      specialties: ["Child Therapy", "Parenting", "Educational Issues", "Learning Disabilities"]
    },
    {
      name: "Leher Pune Centre",
      address: "Koregaon Park, Pune, Maharashtra 411001",
      phone: "+91 20 5678 9012",
      email: "pune@leher.com",
      hours: "Mon-Sat: 9 AM - 8 PM, Sun: 10 AM - 6 PM",
      services: ["Individual Counseling", "Art Therapy", "Music Therapy", "Sports Psychology"],
      rating: 4.8,
      reviews: 167,
      image: "/api/placeholder/400/300",
      coordinates: { lat: 18.5204, lng: 73.8567 },
      specialties: ["Art Therapy", "Music Therapy", "Sports Psychology", "Creative Expression"]
    },
    {
      name: "Leher Hyderabad Centre",
      address: "Banjara Hills, Hyderabad, Telangana 500034",
      phone: "+91 40 6789 0123",
      email: "hyderabad@leher.com",
      hours: "Mon-Sat: 9 AM - 8 PM, Sun: 10 AM - 6 PM",
      services: ["Individual Counseling", "Online Therapy", "Telepsychiatry", "Digital Wellness"],
      rating: 4.7,
      reviews: 145,
      image: "/api/placeholder/400/300",
      coordinates: { lat: 17.3850, lng: 78.4867 },
      specialties: ["Online Therapy", "Digital Wellness", "Tech Stress", "Remote Counseling"]
    }
  ]

  const stats = [
    { label: "Centres Across India", value: "6+", icon: MapPin },
    { label: "Cities Covered", value: "6", icon: Navigation },
    { label: "Total Sessions", value: "25K+", icon: Users },
    { label: "Average Rating", value: "4.8", icon: Star }
  ]

  const services = [
    {
      icon: Users,
      title: "Individual Counseling",
      description: "One-on-one sessions with licensed mental health professionals"
    },
    {
      icon: Shield,
      title: "Crisis Intervention",
      description: "24/7 emergency support for mental health crises"
    },
    {
      icon: Heart,
      title: "Group Therapy",
      description: "Supportive group sessions for shared experiences"
    },
    {
      icon: Phone,
      title: "Telepsychiatry",
      description: "Remote psychiatric consultations and medication management"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#A8CFF1]/10 via-white to-[#B9A6DC]/10 dark:from-[#0F0F23] dark:via-[#1A1A2E] dark:to-[#16213E]">
      <SEOHead 
        title="Mental Health Centres - Leher"
        description="Find Leher mental health centres across India. Professional counseling, therapy, and crisis intervention services."
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
              Our <span className="gradient-text">Centres</span>
            </h1>
            <p className="text-lg sm:text-xl text-[#45A1E7] dark:text-[#B8B8B8] max-w-3xl mx-auto font-montserrat leading-relaxed">
              Professional mental health centres across India, providing accessible and quality care for students.
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

      {/* Services Section */}
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
              Services Available
            </h2>
            <p className="text-lg text-[#45A1E7] dark:text-[#B8B8B8] max-w-2xl mx-auto font-montserrat">
              Comprehensive mental health services at all our centres.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon
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
                    {service.title}
                  </h3>
                  <p className="text-[#45A1E7] dark:text-[#B8B8B8] font-montserrat leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Centres Grid */}
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
              Find a Centre Near You
            </h2>
            <p className="text-lg text-[#45A1E7] dark:text-[#B8B8B8] max-w-2xl mx-auto font-montserrat">
              Visit one of our centres for in-person counseling and support.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {centres.map((centre, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-[#1A1A2E] rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="mb-4">
                  <div className="w-full h-48 bg-gradient-to-br from-[#A8CFF1] to-[#B9A6DC] rounded-lg mb-4 flex items-center justify-center">
                    <MapPin className="h-16 w-16 text-[#2A3E66] dark:text-[#A8CFF1]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#2A3E66] dark:text-[#A8CFF1] mb-2 font-poppins">
                    {centre.name}
                  </h3>
                  <div className="flex items-center mb-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                    <span className="text-sm font-medium text-[#2A3E66] dark:text-[#A8CFF1] font-montserrat">
                      {centre.rating} ({centre.reviews} reviews)
                    </span>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-start">
                    <MapPin className="h-4 w-4 text-[#00589F] dark:text-[#45A1E7] mr-2 mt-1 flex-shrink-0" />
                    <span className="text-sm text-[#45A1E7] dark:text-[#B8B8B8] font-montserrat">
                      {centre.address}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-[#00589F] dark:text-[#45A1E7] mr-2 flex-shrink-0" />
                    <span className="text-sm text-[#45A1E7] dark:text-[#B8B8B8] font-montserrat">
                      {centre.phone}
                    </span>
                  </div>
                  <div className="flex items-start">
                    <Clock className="h-4 w-4 text-[#00589F] dark:text-[#45A1E7] mr-2 mt-1 flex-shrink-0" />
                    <span className="text-sm text-[#45A1E7] dark:text-[#B8B8B8] font-montserrat">
                      {centre.hours}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-[#2A3E66] dark:text-[#A8CFF1] mb-2 font-poppins">
                    Services:
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {centre.services.map((service, serviceIndex) => (
                      <span
                        key={serviceIndex}
                        className="px-2 py-1 bg-[#A8CFF1]/20 dark:bg-[#1A1A2E]/50 text-[#2A3E66] dark:text-[#A8CFF1] text-xs rounded-md font-montserrat"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-[#2A3E66] dark:text-[#A8CFF1] mb-2 font-poppins">
                    Specialties:
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {centre.specialties.map((specialty, specialtyIndex) => (
                      <span
                        key={specialtyIndex}
                        className="px-2 py-1 bg-[#00589F]/20 dark:bg-[#45A1E7]/20 text-[#00589F] dark:text-[#45A1E7] text-xs rounded-md font-montserrat"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-[#2A3E66] to-[#00589F] dark:from-[#A8CFF1] dark:to-[#45A1E7] text-white dark:text-[#0F0F23] text-sm font-medium rounded-lg hover:from-[#00589F] hover:to-[#45A1E7] dark:hover:from-[#45A1E7] dark:hover:to-[#B9A6DC] transition-all duration-300 font-montserrat">
                    <Calendar className="mr-2 h-4 w-4" />
                    Book Visit
                  </button>
                  <button className="inline-flex items-center justify-center px-4 py-2 border border-[#A8CFF1] dark:border-[#45A1E7] text-[#2A3E66] dark:text-[#A8CFF1] text-sm font-medium rounded-lg hover:bg-[#A8CFF1]/10 dark:hover:bg-[#1A1A2E]/30 transition-colors duration-300 font-montserrat">
                    <Navigation className="h-4 w-4" />
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
              Can't Find a Centre Near You?
            </h2>
            <p className="text-lg text-white/90 mb-8 font-montserrat max-w-2xl mx-auto">
              We also offer online counseling and AI-powered support available 24/7 from anywhere in India.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/app/appointments"
                className="inline-flex items-center px-6 py-3 bg-white text-[#2A3E66] font-semibold rounded-xl hover:bg-gray-100 transition-colors duration-300 font-montserrat"
              >
                <Phone className="mr-2 h-5 w-5" />
                Online Counseling
              </Link>
              <Link
                to="/app/chatbot"
                className="inline-flex items-center px-6 py-3 border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-colors duration-300 font-montserrat"
              >
                <Users className="mr-2 h-5 w-5" />
                Try AI Assistant
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default CentresPage
