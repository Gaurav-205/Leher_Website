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
      // Create a comprehensive prompt for mental health support
      const systemPrompt = `You are Lehar, a compassionate AI mental health companion designed to support students in India. Your role is to:

1. Provide empathetic, non-judgmental support
2. Offer practical coping strategies and mindfulness techniques
3. Encourage professional help when needed
4. Be culturally sensitive to Indian students' experiences
5. Maintain confidentiality and never share personal information
6. Focus on wellness, stress management, and emotional support

Guidelines:
- Always be warm, understanding, and supportive
- Use simple, clear language
- Provide actionable advice when appropriate
- Never diagnose mental health conditions
- Encourage seeking professional help for serious concerns
- Be mindful of cultural context and academic pressures in India

${context ? `Context: ${context}` : ''}

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
      const crisisPrompt = `You are Lehar, an AI mental health companion. The user seems to be in distress. Provide immediate support while emphasizing the importance of professional help.

Guidelines for crisis response:
1. Acknowledge their feelings with empathy
2. Provide immediate calming techniques
3. Strongly encourage contacting emergency services or crisis helplines
4. Offer specific Indian crisis resources (KIRAN helpline, emergency numbers)
5. Keep the response concise but supportive
6. Never minimize their feelings

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
      // Return fallback tips when API is not available
      return [
        "Take regular breaks during study sessions - even 5 minutes can help refresh your mind",
        "Practice deep breathing exercises when feeling overwhelmed",
        "Connect with friends and family regularly - social support is crucial",
        "Maintain a consistent sleep schedule for better mental clarity",
        "Engage in physical activity daily, even if it's just a short walk"
      ]
    }

    try {
      const prompt = `Generate 5 practical mental wellness tips specifically for Indian students. Each tip should be:
1. Culturally relevant to Indian academic and social context
2. Practical and actionable
3. Focused on stress management, mindfulness, or emotional wellbeing
4. Written in a supportive, encouraging tone

Format as a simple list, one tip per line.`

      const result = await this.model.generateContent(prompt)
      const response = await result.response
      const text = response.text()

      // Parse the response into an array of tips
      const tips = text.split('\n').filter((tip: string) => tip.trim().length > 0)
      
      logger.info('Wellness tips generated successfully')
      return tips.slice(0, 5) // Ensure we only return 5 tips
    } catch (error) {
      logger.error('Error generating wellness tips:', error)
      // Return fallback tips if API fails
      return [
        "Take regular breaks during study sessions - even 5 minutes can help refresh your mind",
        "Practice deep breathing exercises when feeling overwhelmed",
        "Connect with friends and family regularly - social support is crucial",
        "Maintain a consistent sleep schedule for better mental clarity",
        "Engage in physical activity daily, even if it's just a short walk"
      ]
    }
  }

  private getFallbackResponse(prompt: string): string {
    const lowerPrompt = prompt.toLowerCase()
    
    // Crisis detection fallback
    const crisisKeywords = ['suicide', 'kill myself', 'end it all', 'not worth living', 'want to die', 'self harm', 'hurt myself']
    if (crisisKeywords.some(keyword => lowerPrompt.includes(keyword))) {
      return "I understand you're going through a difficult time. Please reach out to emergency services immediately:\n\n• Emergency: 108\n• KIRAN Helpline: 1800-599-0019\n• National Suicide Prevention Helpline: 9152987821\n\nYour safety is important. Please contact a trusted friend, family member, or professional counselor right away."
    }
    
    // Context-aware fallback responses
    if (lowerPrompt.includes('anxious') || lowerPrompt.includes('anxiety')) {
      return "I understand you're feeling anxious. Here are some helpful techniques:\n\n• Take deep breaths: Inhale for 4 counts, hold for 4, exhale for 6\n• Practice grounding: Name 5 things you can see, 4 you can touch, 3 you can hear\n• Try progressive muscle relaxation\n• Consider talking to a counselor or trusted friend\n\nRemember, it's okay to feel anxious - you're not alone in this."
    }
    
    if (lowerPrompt.includes('stress') || lowerPrompt.includes('stressed')) {
      return "Stress is a common experience, especially for students. Here are some strategies:\n\n• Break tasks into smaller, manageable steps\n• Take regular breaks during study sessions\n• Practice time management techniques\n• Engage in physical activity or relaxation exercises\n• Maintain a healthy sleep schedule\n\nDon't hesitate to seek support from friends, family, or mental health professionals."
    }
    
    if (lowerPrompt.includes('sad') || lowerPrompt.includes('depressed') || lowerPrompt.includes('down')) {
      return "I'm sorry you're feeling this way. It's important to acknowledge your feelings:\n\n• Allow yourself to feel without judgment\n• Connect with supportive people in your life\n• Engage in activities that bring you joy\n• Maintain basic self-care routines\n• Consider professional help if these feelings persist\n\nRemember, seeking help is a sign of strength, not weakness."
    }
    
    if (lowerPrompt.includes('sleep') || lowerPrompt.includes('insomnia')) {
      return "Sleep issues can significantly impact your wellbeing. Try these tips:\n\n• Maintain a consistent sleep schedule\n• Create a relaxing bedtime routine\n• Avoid screens 1 hour before bed\n• Keep your bedroom cool, dark, and quiet\n• Limit caffeine and heavy meals before bedtime\n• Consider relaxation techniques like meditation\n\nIf sleep problems persist, consult a healthcare provider."
    }
    
    if (lowerPrompt.includes('exam') || lowerPrompt.includes('study') || lowerPrompt.includes('academic')) {
      return "Academic pressure is real and challenging. Here's how to manage it:\n\n• Create a realistic study schedule with breaks\n• Use active learning techniques\n• Practice past papers and mock tests\n• Form study groups for support\n• Maintain a healthy work-life balance\n• Remember that your worth isn't defined by grades alone\n\nYou're doing your best, and that's enough."
    }
    
    // General supportive response
    return "I'm here to listen and support you. While I'm currently experiencing some technical limitations, I want you to know that:\n\n• Your feelings are valid and important\n• It's okay to not be okay sometimes\n• Seeking help is a sign of strength\n• You're not alone in your struggles\n\nConsider reaching out to:\n• Trusted friends or family members\n• Your college counseling center\n• Mental health professionals\n• Crisis helplines if you're in immediate distress\n\nTake care of yourself, and remember that better days are ahead."
  }
}

export default new GeminiService()
