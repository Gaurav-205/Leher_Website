import { GoogleGenerativeAI } from '@google/generative-ai'
import logger from '@utils/logger'

class GeminiService {
  private genAI: GoogleGenerativeAI
  private model: any

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      logger.warn('GEMINI_API_KEY is not defined in environment variables. AI features will be disabled.')
      this.genAI = null as any
      this.model = null
      return
    }
    
    this.genAI = new GoogleGenerativeAI(apiKey)
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
  }

  async generateResponse(prompt: string, context?: string): Promise<string> {
    if (!this.model) {
      return this.getFallbackResponse(prompt)
    }

    try {
      // Parse enhanced context if available
      let enhancedContext = null
      try {
        enhancedContext = context ? JSON.parse(context) : null
      } catch (e) {
        // Fallback to string context
        enhancedContext = { recentMessages: context }
      }

      // Create a conversational prompt for natural, human-like responses
      const systemPrompt = `You are Lehar, a friendly AI mental health companion. Keep responses SHORT, CONVERSATIONAL, and HUMAN-LIKE. 

Key rules:
- Talk like a caring friend, not a formal therapist
- Keep responses under 2-3 sentences
- Use simple, everyday language
- Be warm and empathetic
- If someone mentions crisis/self-harm, immediately provide: National Suicide Prevention Helpline: 9152987821, KIRAN: 1800-599-0019
- You're not a doctor - just here to listen and support
- Understand Indian culture and family dynamics
- Never ask for personal details
- If you don't know something, just say so simply

${enhancedContext ? `
CONVERSATION CONTEXT:
- Message count in session: ${enhancedContext.messageCount || 0}
- Session duration: ${enhancedContext.sessionDuration ? Math.round(enhancedContext.sessionDuration / 60000) + ' minutes' : 'Unknown'}
- User mentioned mood: ${enhancedContext.userMood === 'mood_mentioned' ? 'Yes' : 'No'}
- Recent conversation: ${enhancedContext.recentMessages || 'None'}
` : ''}

User message: ${prompt}`

      const result = await this.model.generateContent(systemPrompt)
      const response = await result.response
      const text = response.text()

      logger.info('Gemini API response generated successfully')
      return text
    } catch (error: any) {
      logger.error('Error generating Gemini response:', error)
      
      // Handle rate limit specifically
      if (error.status === 429 || error.message?.includes('quota') || error.message?.includes('rate limit')) {
        logger.warn('Gemini API rate limit exceeded, using fallback response')
        return this.getFallbackResponse(prompt)
      }
      
      // For other errors, also use fallback
      return this.getFallbackResponse(prompt)
    }
  }

  async generateCrisisResponse(prompt: string): Promise<string> {
    if (!this.model) {
      return this.getFallbackResponse(prompt)
    }

    try {
      const crisisPrompt = `You are Lehar, a caring AI friend. Someone is in crisis - respond with SHORT, CARING messages.

CRISIS RESPONSE:
- Show you care: "I'm really worried about you right now"
- Keep it simple and direct
- Immediately share these helplines:
  • Emergency: 112
  • KIRAN: 1800-599-0019  
  • Suicide Prevention: 9152987821
- Suggest breathing: "Let's take a deep breath together"
- Encourage reaching out to family/friends
- Keep responses under 3 sentences

User message: ${prompt}`

      const result = await this.model.generateContent(crisisPrompt)
      const response = await result.response
      const text = response.text()

      logger.info('Gemini crisis response generated successfully')
      return text
    } catch (error: any) {
      logger.error('Error generating Gemini crisis response:', error)
      
      // Handle rate limit specifically
      if (error.status === 429 || error.message?.includes('quota') || error.message?.includes('rate limit')) {
        logger.warn('Gemini API rate limit exceeded for crisis response, using fallback')
        return this.getFallbackResponse(prompt)
      }
      
      // For other errors, also use fallback
      return this.getFallbackResponse(prompt)
    }
  }

  async generateWellnessTips(): Promise<string[]> {
    if (!this.model) {
      // Return short, conversational fallback tips
      return [
        "Take deep breaths - inhale for 4, hold for 4, exhale for 6. It really helps!",
        "Take study breaks every hour - even 5 minutes can refresh your mind",
        "Call or text a friend today - social connection is so important",
        "Try to sleep at the same time each night - your brain will thank you",
        "Go for a 15-minute walk - fresh air and movement boost your mood",
        "Try 5 minutes of meditation or just sitting quietly - it's easier than you think",
        "Don't skip meals - your brain needs fuel to function well",
        "Celebrate small wins - progress matters more than perfection"
      ]
    }

    try {
      const prompt = `Generate 8 short, friendly wellness tips for Indian students. Keep each tip under 15 words and conversational. Focus on:
- Breathing exercises
- Study breaks
- Sleep habits
- Social connection
- Physical activity
- Mindfulness
- Eating well
- Celebrating progress

Make them sound like advice from a caring friend, not a medical professional.`

      const result = await this.model.generateContent(prompt)
      const response = await result.response
      const text = response.text()

      // Parse the response into an array of tips
      const tips = text.split('\n').filter((tip: string) => tip.trim().length > 0)
      
      logger.info('Wellness tips generated successfully')
      return tips.slice(0, 8) // Ensure we only return 8 tips
    } catch (error) {
      logger.error('Error generating wellness tips:', error)
      // Return fallback tips if API fails
      return [
        "Practice deep breathing exercises: Inhale for 4 counts, hold for 4, exhale for 6 - this activates your body's relaxation response",
        "Take regular study breaks every 45-60 minutes - even 5 minutes can help refresh your mind and reduce stress",
        "Connect with friends and family regularly - social support is crucial for mental wellbeing",
        "Maintain a consistent sleep schedule - aim for 7-9 hours of quality sleep for better mental clarity",
        "Engage in physical activity daily - even a 15-minute walk can boost your mood and energy",
        "Practice mindfulness or meditation - start with just 5 minutes daily to build emotional resilience",
        "Eat regular, balanced meals - proper nutrition supports both physical and mental health",
        "Set realistic academic goals and celebrate small achievements - progress matters more than perfection"
      ]
    }
  }

  private getFallbackResponse(prompt: string): string {
    const lowerPrompt = prompt.toLowerCase()
    
    // Crisis detection fallback
    const crisisKeywords = ['suicide', 'kill myself', 'end it all', 'not worth living', 'want to die', 'self harm', 'hurt myself', 'end my life', 'not worth it', 'better off dead']
    if (crisisKeywords.some(keyword => lowerPrompt.includes(keyword))) {
      return "I'm really worried about you right now. Please call these helplines immediately: Emergency 112, KIRAN 1800-599-0019, or Suicide Prevention 9152987821. You're not alone and people want to help you."
    }
    
    // Short, conversational fallback responses
    if (lowerPrompt.includes('anxious') || lowerPrompt.includes('anxiety')) {
      return "I get it, anxiety can feel really overwhelming. Try taking some deep breaths - inhale for 4, hold for 4, exhale for 6. It really helps calm your nervous system. You're not alone in this."
    }
    
    if (lowerPrompt.includes('stress') || lowerPrompt.includes('stressed')) {
      return "Stress is tough, especially with exams and family pressure. Try breaking your work into smaller chunks and take breaks every hour. Remember, your worth isn't just about grades - you're doing great."
    }
    
    if (lowerPrompt.includes('sad') || lowerPrompt.includes('depressed') || lowerPrompt.includes('down')) {
      return "I'm sorry you're feeling this way. It's okay to feel sad sometimes. Try to do one small thing today that usually makes you feel a bit better, even if it's just getting some fresh air."
    }
    
    if (lowerPrompt.includes('sleep') || lowerPrompt.includes('insomnia')) {
      return "Sleep troubles are so frustrating! Try keeping your phone away an hour before bed and maybe some gentle music. A consistent bedtime routine really helps."
    }
    
    if (lowerPrompt.includes('exam') || lowerPrompt.includes('study') || lowerPrompt.includes('academic')) {
      return "Exam stress is real! Remember to take breaks every hour and don't forget to eat and sleep. Your worth isn't just about grades - you're doing great."
    }
    
    // General supportive response
    return "Hey, I'm Lehar! I'm here to listen and support you. If you're feeling really overwhelmed, remember these helplines: KIRAN 1800-599-0019 or Emergency 112. What's on your mind?"
  }
}

export default new GeminiService()
