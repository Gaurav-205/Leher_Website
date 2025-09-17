import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { Appointment } from '@models/Appointment'
import { User } from '@models/User'
import { Counselor } from '@models/Counselor'
import { AuthRequest } from '@middleware/auth'
import logger from '@utils/logger'

// @desc    Get all appointments for a user
// @route   GET /api/appointments
// @access  Private
export const getAppointments = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?._id
    const { status, type, page = 1, limit = 10 } = req.query

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated'
      })
      return
    }

    // Build query based on user role
    let query: any = {}
    const user = await User.findById(userId)
    
    if (user?.role === 'counselor') {
      query.counselorId = userId
    } else {
      query.studentId = userId
    }

    // Add filters
    if (status) {
      query.status = status
    }
    if (type) {
      query.type = type
    }

    const appointments = await Appointment.find(query)
      .populate('studentId', 'firstName lastName email profile.avatar')
      .populate('counselorId', 'firstName lastName email profile.avatar')
      .sort({ date: 1, time: 1 })
      .limit(Number(limit) * 1)
      .skip((Number(page) - 1) * Number(limit))

    const total = await Appointment.countDocuments(query)

    res.status(200).json({
      success: true,
      data: {
        appointments,
        pagination: {
          currentPage: Number(page),
          totalPages: Math.ceil(total / Number(limit)),
          totalAppointments: total,
          hasNext: Number(page) < Math.ceil(total / Number(limit)),
          hasPrev: Number(page) > 1
        }
      },
      message: 'Appointments retrieved successfully'
    })
  } catch (error) {
    logger.error('Error getting appointments:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

// @desc    Get single appointment
// @route   GET /api/appointments/:id
// @access  Private
export const getAppointment = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params
    const userId = req.user?._id

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated'
      })
      return
    }

    const appointment = await Appointment.findById(id)
      .populate('studentId', 'firstName lastName email profile.avatar')
      .populate('counselorId', 'firstName lastName email profile.avatar')

    if (!appointment) {
      res.status(404).json({
        success: false,
        message: 'Appointment not found'
      })
      return
    }

    // Check if user has access to this appointment
    const user = await User.findById(userId)
    if (user?.role !== 'admin' && 
        appointment.studentId.toString() !== userId && 
        appointment.counselorId.toString() !== userId) {
      res.status(403).json({
        success: false,
        message: 'Access denied'
      })
      return
    }

    res.status(200).json({
      success: true,
      data: appointment,
      message: 'Appointment retrieved successfully'
    })
  } catch (error) {
    logger.error('Error getting appointment:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

// @desc    Create new appointment
// @route   POST /api/appointments
// @access  Private
export const createAppointment = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
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
    const { counselorId, date, time, duration = 60, type = 'individual', notes, location } = req.body

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated'
      })
      return
    }

    // Check if counselor exists and is available
    const counselor = await Counselor.findOne({ userId: counselorId })
    if (!counselor || !counselor.isAvailable) {
      res.status(400).json({
        success: false,
        message: 'Counselor not available'
      })
      return
    }

    // Check for conflicting appointments
    const appointmentDate = new Date(date)
    const existingAppointment = await Appointment.findOne({
      counselorId,
      date: {
        $gte: new Date(appointmentDate.getFullYear(), appointmentDate.getMonth(), appointmentDate.getDate()),
        $lt: new Date(appointmentDate.getFullYear(), appointmentDate.getMonth(), appointmentDate.getDate() + 1)
      },
      time,
      status: { $in: ['scheduled', 'confirmed'] }
    })

    if (existingAppointment) {
      res.status(400).json({
        success: false,
        message: 'Time slot is already booked'
      })
      return
    }

    // Create appointment
    const appointment = new Appointment({
      studentId: userId,
      counselorId,
      date: appointmentDate,
      time,
      duration,
      type,
      notes,
      location,
      status: 'scheduled'
    })

    await appointment.save()

    // Populate the created appointment
    await appointment.populate([
      { path: 'studentId', select: 'firstName lastName email profile.avatar' },
      { path: 'counselorId', select: 'firstName lastName email profile.avatar' }
    ])

    res.status(201).json({
      success: true,
      data: appointment,
      message: 'Appointment created successfully'
    })
  } catch (error) {
    logger.error('Error creating appointment:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

// @desc    Update appointment
// @route   PUT /api/appointments/:id
// @access  Private
export const updateAppointment = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
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

    const { id } = req.params
    const userId = req.user?._id
    const { date, time, duration, type, notes, location, status, meetingLink } = req.body

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated'
      })
      return
    }

    const appointment = await Appointment.findById(id)
    if (!appointment) {
      res.status(404).json({
        success: false,
        message: 'Appointment not found'
      })
      return
    }

    // Check if user has permission to update
    const user = await User.findById(userId)
    if (user?.role !== 'admin' && 
        appointment.studentId.toString() !== userId && 
        appointment.counselorId.toString() !== userId) {
      res.status(403).json({
        success: false,
        message: 'Access denied'
      })
      return
    }

    // Update appointment
    const updateData: any = {}
    if (date) updateData.date = new Date(date)
    if (time) updateData.time = time
    if (duration) updateData.duration = duration
    if (type) updateData.type = type
    if (notes !== undefined) updateData.notes = notes
    if (location !== undefined) updateData.location = location
    if (status) updateData.status = status
    if (meetingLink !== undefined) updateData.meetingLink = meetingLink

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate([
      { path: 'studentId', select: 'firstName lastName email profile.avatar' },
      { path: 'counselorId', select: 'firstName lastName email profile.avatar' }
    ])

    res.status(200).json({
      success: true,
      data: updatedAppointment,
      message: 'Appointment updated successfully'
    })
  } catch (error) {
    logger.error('Error updating appointment:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

// @desc    Cancel appointment
// @route   DELETE /api/appointments/:id
// @access  Private
export const cancelAppointment = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params
    const userId = req.user?._id

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated'
      })
      return
    }

    const appointment = await Appointment.findById(id)
    if (!appointment) {
      res.status(404).json({
        success: false,
        message: 'Appointment not found'
      })
      return
    }

    // Check if user has permission to cancel
    const user = await User.findById(userId)
    if (user?.role !== 'admin' && 
        appointment.studentId.toString() !== userId && 
        appointment.counselorId.toString() !== userId) {
      res.status(403).json({
        success: false,
        message: 'Access denied'
      })
      return
    }

    // Check if appointment can be cancelled
    if (appointment.status === 'completed' || appointment.status === 'cancelled') {
      res.status(400).json({
        success: false,
        message: 'Appointment cannot be cancelled'
      })
      return
    }

    // Cancel appointment
    appointment.status = 'cancelled'
    await appointment.save()

    res.status(200).json({
      success: true,
      message: 'Appointment cancelled successfully'
    })
  } catch (error) {
    logger.error('Error cancelling appointment:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

// @desc    Get available counselors
// @route   GET /api/appointments/counselors
// @access  Private
export const getAvailableCounselors = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { specialization, date, time } = req.query

    let query: any = { isAvailable: true }
    
    if (specialization) {
      query.specialization = { $in: [specialization] }
    }

    const counselors = await Counselor.find(query)
      .populate('userId', 'firstName lastName email profile.avatar')
      .select('-availability')

    // Filter counselors based on availability for specific date/time
    let availableCounselors = counselors

    if (date && time) {
      const appointmentDate = new Date(date as string)
      const requestedTime = time as string

      // Check for conflicts
      const conflictingAppointments = await Appointment.find({
        date: {
          $gte: new Date(appointmentDate.getFullYear(), appointmentDate.getMonth(), appointmentDate.getDate()),
          $lt: new Date(appointmentDate.getFullYear(), appointmentDate.getMonth(), appointmentDate.getDate() + 1)
        },
        time: requestedTime,
        status: { $in: ['scheduled', 'confirmed'] }
      })

      const conflictingCounselorIds = conflictingAppointments.map(apt => apt.counselorId.toString())
      availableCounselors = counselors.filter(counselor => 
        !conflictingCounselorIds.includes(counselor.userId.toString())
      )
    }

    res.status(200).json({
      success: true,
      data: availableCounselors,
      message: 'Available counselors retrieved successfully'
    })
  } catch (error) {
    logger.error('Error getting available counselors:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

// @desc    Get counselor availability
// @route   GET /api/appointments/counselors/:id/availability
// @access  Private
export const getCounselorAvailability = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params
    const { date } = req.query

    const counselor = await Counselor.findById(id)
    if (!counselor) {
      res.status(404).json({
        success: false,
        message: 'Counselor not found'
      })
      return
    }

    let availability = counselor.availability

    // If specific date is requested, check for existing appointments
    if (date) {
      const appointmentDate = new Date(date as string)
      const existingAppointments = await Appointment.find({
        counselorId: counselor.userId, // Use the user ID from the counselor document
        date: {
          $gte: new Date(appointmentDate.getFullYear(), appointmentDate.getMonth(), appointmentDate.getDate()),
          $lt: new Date(appointmentDate.getFullYear(), appointmentDate.getMonth(), appointmentDate.getDate() + 1)
        },
        status: { $in: ['scheduled', 'confirmed'] }
      })

      // Filter out booked time slots
      const bookedTimes = existingAppointments.map(apt => apt.time)
      availability = availability.filter(slot => !bookedTimes.includes(slot.startTime))
    }

    res.status(200).json({
      success: true,
      data: availability,
      message: 'Counselor availability retrieved successfully'
    })
  } catch (error) {
    logger.error('Error getting counselor availability:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}
