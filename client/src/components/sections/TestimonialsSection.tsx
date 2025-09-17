import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Priya Sharma',
      role: 'Computer Science Student',
      content: 'Lehar helped me through my toughest semester. The AI chatbot understood my anxiety and provided practical coping strategies.',
      rating: 5
    },
    {
      id: 2,
      name: 'Arjun Kumar',
      role: 'Engineering Student',
      content: 'The anonymous community forum gave me a safe space to share my feelings. The Hindi language support made it so much easier.',
      rating: 5
    },
    {
      id: 3,
      name: 'Sneha Patel',
      role: 'Medical Student',
      content: 'The crisis intervention feature literally saved my life. When I was having suicidal thoughts, the AI immediately connected me with a counselor.',
      rating: 5
    }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl font-light text-gray-900 mb-4">
            What students say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Real stories from students who found support through our platform
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-lg p-6 shadow-sm"
            >
              <div className="flex items-center mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-gray-700 mb-4 text-sm leading-relaxed">
                "{testimonial.content}"
              </blockquote>
              <div>
                <div className="font-medium text-gray-900 text-sm">{testimonial.name}</div>
                <div className="text-xs text-gray-600">{testimonial.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection