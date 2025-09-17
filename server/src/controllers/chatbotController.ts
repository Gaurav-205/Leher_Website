import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { Chat } from '@models/Chat'
import { User } from '@models/User'
import { AuthRequest } from '@middleware/auth'
import geminiService from '@services/geminiService'
import logger from '@utils/logger'
import { v4 as uuidv4 } from 'uuid'

// @desc    Send message to chatbot
// @route   POST /api/chatbot/message
// @access  Private
export const sendMessage = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array())
      console.log('Request body:', req.body)
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      })
      return
    }

    const { message, sessionId } = req.body
    const userId = req.user?._id

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated'
      })
      return
    }

    // Enhanced crisis detection following comprehensive mental health guidelines
    const crisisKeywords = [
      'suicide', 'kill myself', 'end it all', 'not worth living', 'want to die', 
      'self harm', 'hurt myself', 'end my life', 'not worth it', 'better off dead',
      'suicidal', 'self-harm', 'cutting', 'overdose', 'poison', 'jump off',
      'hang myself', 'shoot myself', 'drown myself', 'burn myself',
      'no point living', 'world without me', 'everyone better off',
      'final solution', 'permanent solution', 'escape pain',
      'end the pain', 'stop the pain', 'can\'t take it anymore',
      'give up', 'lose hope', 'hopeless', 'helpless',
      'want to disappear', 'disappear forever', 'never wake up',
      'sleep forever', 'end everything', 'no way out',
      'trapped', 'no escape', 'can\'t go on', 'done with life',
      'hate living', 'life is pointless', 'nothing matters',
      'wish i was dead', 'should be dead', 'deserve to die'
    ]
    
    // More sophisticated crisis detection
    const lowerMessage = message.toLowerCase()
    const isCrisis = crisisKeywords.some(keyword => 
      lowerMessage.includes(keyword.toLowerCase())
    ) || 
    // Check for patterns that might indicate crisis
    (lowerMessage.includes('want to') && (lowerMessage.includes('die') || lowerMessage.includes('end'))) ||
    (lowerMessage.includes('can\'t') && (lowerMessage.includes('anymore') || lowerMessage.includes('take it'))) ||
    (lowerMessage.includes('no point') && lowerMessage.includes('living'))

    let chatSession
    let sessionIdToUse = sessionId

    // Find or create chat session
    if (sessionIdToUse) {
      chatSession = await Chat.findOne({ 
        sessionId: sessionIdToUse, 
        userId, 
        isActive: true 
      })
    }

    if (!chatSession) {
      sessionIdToUse = uuidv4()
      chatSession = new Chat({
        userId,
        sessionId: sessionIdToUse,
        messages: [],
        isActive: true
      })
      // Save the new session to ensure createdAt is set
      await chatSession.save()
    }

    // Add user message to chat
    chatSession.messages.push({
      role: 'user' as const,
      content: message,
      timestamp: new Date(),
      isCrisis
    } as any)

    // Generate AI response
    let aiResponse: string
    const recentMessages = chatSession.messages.slice(-10) // Get last 10 messages for context
    const context = recentMessages.map(msg => `${msg.role}: ${msg.content}`).join('\n')

    // Enhanced context with mood and conversation patterns
    const sessionDuration = chatSession.createdAt 
      ? Date.now() - new Date(chatSession.createdAt).getTime() 
      : 0
    
    const enhancedContext = {
      recentMessages: context,
      messageCount: chatSession.messages.length,
      sessionDuration,
      isCrisis,
      userMood: message.includes('feeling') ? 'mood_mentioned' : 'general'
    }

    if (isCrisis) {
      aiResponse = await geminiService.generateCrisisResponse(message)
      logger.warn(`Crisis message detected from user ${userId}: ${message}`)
    } else {
      aiResponse = await geminiService.generateResponse(message, JSON.stringify(enhancedContext))
    }

    // Add AI response to chat
    chatSession.messages.push({
      role: 'assistant' as const,
      content: aiResponse,
      timestamp: new Date(),
      isCrisis
    } as any)

    // Save chat session
    await chatSession.save()

    res.json({
      success: true,
      data: {
        message: aiResponse,
        sessionId: sessionIdToUse,
        isCrisis,
        timestamp: new Date()
      }
    })

    logger.info(`Chat message processed for user ${userId}, session: ${sessionIdToUse}`)
  } catch (error) {
    next(error)
  }
}

// @desc    Get chat history
// @route   GET /api/chatbot/history/:sessionId
// @access  Private
export const getChatHistory = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { sessionId } = req.params
    const userId = req.user?._id

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated'
      })
      return
    }

    const chatSession = await Chat.findOne({ 
      sessionId, 
      userId, 
      isActive: true 
    }).select('messages sessionId createdAt updatedAt')

    if (!chatSession) {
      res.status(404).json({
        success: false,
        message: 'Chat session not found'
      })
      return
    }

    res.json({
      success: true,
      data: {
        sessionId: chatSession.sessionId,
        messages: chatSession.messages,
        createdAt: chatSession.createdAt,
        updatedAt: chatSession.updatedAt
      }
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Get user's chat sessions
// @route   GET /api/chatbot/sessions
// @access  Private
export const getChatSessions = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?._id
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated'
      })
      return
    }

    const skip = (page - 1) * limit

    const chatSessions = await Chat.find({ 
      userId, 
      isActive: true 
    })
    .select('sessionId messages createdAt updatedAt')
    .sort({ updatedAt: -1 })
    .skip(skip)
    .limit(limit)

    // Get total count for pagination
    const totalSessions = await Chat.countDocuments({ 
      userId, 
      isActive: true 
    })

    // Format sessions with preview of last message
    const formattedSessions = chatSessions.map(session => ({
      sessionId: session.sessionId,
      lastMessage: session.messages[session.messages.length - 1]?.content?.substring(0, 100) + '...' || 'No messages',
      messageCount: session.messages.length,
      createdAt: session.createdAt,
      updatedAt: session.updatedAt
    }))

    res.json({
      success: true,
      data: {
        sessions: formattedSessions,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalSessions / limit),
          totalSessions,
          hasNext: page < Math.ceil(totalSessions / limit),
          hasPrev: page > 1
        }
      }
    })
  } catch (error) {
    next(error)
  }
}

// @desc    End chat session
// @route   DELETE /api/chatbot/sessions/:sessionId
// @access  Private
export const endChatSession = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { sessionId } = req.params
    const userId = req.user?._id

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated'
      })
      return
    }

    const chatSession = await Chat.findOneAndUpdate(
      { sessionId, userId, isActive: true },
      { isActive: false },
      { new: true }
    )

    if (!chatSession) {
      res.status(404).json({
        success: false,
        message: 'Chat session not found'
      })
      return
    }

    res.json({
      success: true,
      message: 'Chat session ended successfully'
    })

    logger.info(`Chat session ${sessionId} ended by user ${userId}`)
  } catch (error) {
    next(error)
  }
}

// @desc    Get wellness tips
// @route   GET /api/chatbot/wellness-tips
// @access  Private
export const getWellnessTips = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const tips = await geminiService.generateWellnessTips()

    res.json({
      success: true,
      data: {
        tips,
        timestamp: new Date()
      }
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Track user mood
// @route   POST /api/chatbot/mood
// @access  Private
export const trackMood = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { mood, notes, sessionId } = req.body
    const userId = req.user?._id

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated'
      })
      return
    }

    // Validate mood (1-5 scale)
    if (!mood || mood < 1 || mood > 5) {
      res.status(400).json({
        success: false,
        message: 'Mood must be between 1 and 5'
      })
      return
    }

    // Store mood data (you can extend this to save to a separate Mood collection)
    const moodData = {
      userId,
      mood,
      notes: notes || '',
      sessionId: sessionId || null,
      timestamp: new Date()
    }

    // For now, we'll just return success. In a full implementation, you'd save this to a database
    logger.info(`Mood tracked for user ${userId}: ${mood}/5`)

    res.json({
      success: true,
      data: {
        mood: moodData.mood,
        timestamp: moodData.timestamp,
        message: 'Mood tracked successfully'
      }
    })
  } catch (error) {
    console.error('Error tracking mood:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to track mood'
    })
  }
}

