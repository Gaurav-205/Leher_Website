import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Computer Science Student',
      institution: 'IIT Delhi',
      content: 'The AI chatbot helped me through my exam anxiety. It was like having a friend who understood exactly what I was going through. The 24/7 availability made all the difference.',
      rating: 5,
      avatar: 'PS'
    },
    {
      name: 'Rajesh Kumar',
      role: 'Engineering Student',
      institution: 'NIT Trichy',
      content: 'I was skeptical about online counseling, but the platform made it so easy and comfortable. The counselor I spoke with was incredibly understanding and helped me work through my stress.',
      rating: 5,
      avatar: 'RK'
    },
    {
      name: 'Ananya Patel',
      role: 'Medical Student',
      institution: 'AIIMS Delhi',
      content: 'The peer support forums are amazing. It\'s comforting to know I\'m not alone in my struggles. The community here is so supportive and non-judgmental.',
      rating: 5,
      avatar: 'AP'
    },
    {
      name: 'Vikram Singh',
      role: 'MBA Student',
      institution: 'IIM Ahmedabad',
      content: 'The resources section has been a lifesaver. The articles on stress management and time management have really helped me balance my studies and personal life.',
      rating: 5,
      avatar: 'VS'
    },
    {
      name: 'Sneha Reddy',
      role: 'Arts Student',
      institution: 'JNU Delhi',
      content: 'I love that the platform is available in multiple languages. Being able to express myself in Telugu made the counseling sessions much more effective for me.',
      rating: 5,
      avatar: 'SR'
    },
    {
      name: 'Arjun Mehta',
      role: 'Research Scholar',
      institution: 'TIFR Mumbai',
      content: 'The crisis intervention feature is incredible. When I was going through a really tough time, the AI immediately connected me with a counselor. It probably saved my life.',
      rating: 5,
      avatar: 'AM'
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-prata font-bold text-gray-900 mb-4">
              What Students Are Saying
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real stories from students who have found support, guidance, and community through our platform.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              <div className="card hover:shadow-xl transition-shadow duration-300 h-full">
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 text-primary-200">
                  <Quote className="h-8 w-8" />
                </div>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-700 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center">
                  <div className="h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-primary-600 font-semibold text-sm">
                      {testimonial.avatar}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role}
                    </div>
                    <div className="text-sm text-primary-600">
                      {testimonial.institution}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
