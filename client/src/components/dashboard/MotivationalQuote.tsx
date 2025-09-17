import { motion } from 'framer-motion'
import { Quote, RefreshCw } from 'lucide-react'
import { useState } from 'react'

const MotivationalQuote = () => {
  const quotes = [
    {
      text: "You are stronger than you know, more capable than you imagine, and more loved than you realize.",
      author: "Unknown"
    },
    {
      text: "The only way to do great work is to love what you do.",
      author: "Steve Jobs"
    },
    {
      text: "Believe you can and you're halfway there.",
      author: "Theodore Roosevelt"
    },
    {
      text: "Your mental health is a priority. Your happiness is essential. Your self-care is a necessity.",
      author: "Unknown"
    },
    {
      text: "It's okay to not be okay. It's okay to ask for help. It's okay to take a break.",
      author: "Unknown"
    },
    {
      text: "Progress, not perfection, is the goal.",
      author: "Unknown"
    },
    {
      text: "You have been assigned this mountain to show others it can be moved.",
      author: "Mel Robbins"
    },
    {
      text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
      author: "Nelson Mandela"
    }
  ]

  const [currentQuote, setCurrentQuote] = useState(quotes[0])

  const getNewQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length)
    setCurrentQuote(quotes[randomIndex])
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg border border-gray-200 p-6"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <Quote className="h-5 w-5 text-gray-400 mr-3" />
          <h3 className="text-sm font-medium text-gray-900">Daily Quote</h3>
        </div>
        <button
          onClick={getNewQuote}
          className="p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200"
        >
          <RefreshCw className="h-4 w-4" />
        </button>
      </div>

      <motion.div
        key={currentQuote.text}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-4"
      >
        <blockquote className="text-gray-700 text-sm leading-relaxed italic mb-2">
          "{currentQuote.text}"
        </blockquote>
        <cite className="text-gray-500 text-xs">
          — {currentQuote.author}
        </cite>
      </motion.div>
    </motion.div>
  )
}

export default MotivationalQuote
