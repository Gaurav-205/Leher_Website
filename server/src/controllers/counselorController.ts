import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { Counselor } from '@models/Counselor'
import { User } from '@models/User'
import { AuthRequest } from '@middleware/auth'
import logger from '@utils/logger'

// @desc    Get counselor profile
// @route   GET /api/counselors/profile
// @access  Private (Counselor only)
export const getCounselorProfile = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?._id

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated'
      })
      return
    }

    const counselor = await Counselor.findOne({ userId })
      .populate('userId', 'firstName lastName email profile')

    if (!counselor) {
      res.status(404).json({
        success: false,
        message: 'Counselor profile not found'
      })
      return
    }

    res.json({
      success: true,
      data: counselor
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Create or update counselor profile
// @route   POST /api/counselors/profile
// @access  Private (Counselor only)
export const createOrUpdateCounselorProfile = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      })
      return
    }

    const userId = req.user?._id
    const {
      specialization,
      experience,
      languages,
      availability,
      bio,
      qualifications,
      consultationFee,
      maxSessionsPerDay
    } = req.body

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated'
      })
      return
    }

    // Check if user is a counselor
    const user = await User.findById(userId)
    if (!user || user.role !== 'counselor') {
      res.status(403).json({
        success: false,
        message: 'Only counselors can create/update counselor profiles'
      })
      return
    }

    // Check if counselor profile already exists
    let counselor = await Counselor.findOne({ userId })

    if (counselor) {
      // Update existing profile
      counselor.specialization = specialization
      counselor.experience = experience
      counselor.languages = languages
      counselor.availability = availability
      counselor.bio = bio
      counselor.qualifications = qualifications
      counselor.consultationFee = consultationFee
      counselor.maxSessionsPerDay = maxSessionsPerDay

      await counselor.save()
    } else {
      // Create new profile
      counselor = await Counselor.create({
        userId,
        specialization,
        experience,
        languages,
        availability,
        bio,
        qualifications,
        consultationFee,
        maxSessionsPerDay: maxSessionsPerDay || 8
      })
    }

    const populatedCounselor = await Counselor.findById(counselor._id)
      .populate('userId', 'firstName lastName email profile')

    res.status(201).json({
      success: true,
      data: populatedCounselor,
      message: counselor.isNew ? 'Counselor profile created successfully' : 'Counselor profile updated successfully'
    })

    logger.info(`Counselor profile ${counselor.isNew ? 'created' : 'updated'} for user ${userId}`)
  } catch (error) {
    next(error)
  }
}

// @desc    Update counselor availability
// @route   PUT /api/counselors/availability
// @access  Private (Counselor only)
export const updateAvailability = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      })
      return
    }

    const userId = req.user?._id
    const { availability, isAvailable } = req.body

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated'
      })
      return
    }

    const counselor = await Counselor.findOne({ userId })
    if (!counselor) {
      res.status(404).json({
        success: false,
        message: 'Counselor profile not found'
      })
      return
    }

    counselor.availability = availability
    if (isAvailable !== undefined) {
      counselor.isAvailable = isAvailable
    }

    await counselor.save()

    res.json({
      success: true,
      data: counselor,
      message: 'Availability updated successfully'
    })

    logger.info(`Availability updated for counselor ${userId}`)
  } catch (error) {
    next(error)
  }
}

// @desc    Get counselor statistics
// @route   GET /api/counselors/stats
// @access  Private (Counselor only)
export const getCounselorStats = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?._id

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated'
      })
      return
    }

    const counselor = await Counselor.findOne({ userId })
    if (!counselor) {
      res.status(404).json({
        success: false,
        message: 'Counselor profile not found'
      })
      return
    }

    // Get appointment statistics
    const { Appointment } = await import('@models/Appointment')
    
    const totalAppointments = await Appointment.countDocuments({ counselorId: userId })
    const completedAppointments = await Appointment.countDocuments({ 
      counselorId: userId, 
      status: 'completed' 
    })
    const upcomingAppointments = await Appointment.countDocuments({ 
      counselorId: userId, 
      status: { $in: ['scheduled', 'confirmed'] },
      date: { $gte: new Date() }
    })
    const todayAppointments = await Appointment.countDocuments({ 
      counselorId: userId, 
      date: { 
        $gte: new Date(new Date().setHours(0, 0, 0, 0)),
        $lt: new Date(new Date().setHours(23, 59, 59, 999))
      },
      status: { $in: ['scheduled', 'confirmed'] }
    })

    // Get average rating
    const appointmentsWithRating = await Appointment.find({
      counselorId: userId,
      rating: { $exists: true }
    }).select('rating')

    const averageRating = appointmentsWithRating.length > 0 
      ? appointmentsWithRating.reduce((sum, apt) => sum + (apt.rating || 0), 0) / appointmentsWithRating.length
      : 0

    res.json({
      success: true,
      data: {
        totalAppointments,
        completedAppointments,
        upcomingAppointments,
        todayAppointments,
        averageRating: Math.round(averageRating * 10) / 10,
        totalSessions: counselor.totalSessions,
        rating: counselor.rating,
        isAvailable: counselor.isAvailable
      }
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Get all counselors (for admin)
// @route   GET /api/counselors
// @access  Private (Admin only)
export const getAllCounselors = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?._id
    const { page = 1, limit = 10, specialization, isAvailable } = req.query

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated'
      })
      return
    }

    // Check if user is admin
    const user = await User.findById(userId)
    if (!user || user.role !== 'admin') {
      res.status(403).json({
        success: false,
        message: 'Access denied. Admin role required.'
      })
      return
    }

    const skip = (Number(page) - 1) * Number(limit)
    const query: any = {}

    if (specialization) {
      query.specialization = { $in: Array.isArray(specialization) ? specialization : [specialization] }
    }

    if (isAvailable !== undefined) {
      query.isAvailable = isAvailable === 'true'
    }

    const counselors = await Counselor.find(query)
      .populate('userId', 'firstName lastName email profile')
      .sort({ rating: -1, totalSessions: -1 })
      .skip(skip)
      .limit(Number(limit))

    const totalCounselors = await Counselor.countDocuments(query)

    res.json({
      success: true,
      data: {
        counselors,
        pagination: {
          currentPage: Number(page),
          totalPages: Math.ceil(totalCounselors / Number(limit)),
          totalCounselors,
          hasNext: skip + counselors.length < totalCounselors,
          hasPrev: Number(page) > 1
        }
      }
    })
  } catch (error) {
    next(error)
  }
}
