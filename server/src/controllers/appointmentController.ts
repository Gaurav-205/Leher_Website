import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { Appointment } from '@models/Appointment'
import { Counselor } from '@models/Counselor'
import { User } from '@models/User'
import { AuthRequest } from '@middleware/auth'
import logger from '@utils/logger'

// @desc    Get user's appointments
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

    const skip = (Number(page) - 1) * Number(limit)
    const query: any = {}

    // Determine if user is student or counselor
    const user = await User.findById(userId)
    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found'
      })
      return
    }

    if (user.role === 'student') {
      query.studentId = userId
    } else if (user.role === 'counselor') {
      query.counselorId = userId
    } else {
      res.status(403).json({
        success: false,
        message: 'Access denied'
      })
      return
    }

    // Add filters
    if (status) {
      query.status = status
    }
    if (type) {
      query.type = type
    }

    const appointments = await Appointment.find(query)
      .populate('studentId', 'firstName lastName email')
      .populate('counselorId', 'firstName lastName email')
      .sort({ date: 1, time: 1 })
      .skip(skip)
      .limit(Number(limit))

    const totalAppointments = await Appointment.countDocuments(query)

    res.json({
      success: true,
      data: {
        appointments,
        pagination: {
          currentPage: Number(page),
          totalPages: Math.ceil(totalAppointments / Number(limit)),
          totalAppointments,
          hasNext: skip + appointments.length < totalAppointments,
          hasPrev: Number(page) > 1
        }
      }
    })
  } catch (error) {
    next(error)
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
      .populate('studentId', 'firstName lastName email profile')
      .populate('counselorId', 'firstName lastName email profile')

    if (!appointment) {
      res.status(404).json({
        success: false,
        message: 'Appointment not found'
      })
      return
    }

    // Check if user has access to this appointment
    const user = await User.findById(userId)
    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found'
      })
      return
    }

    const hasAccess = user.role === 'admin' || 
                     appointment.studentId.toString() === userId.toString() ||
                     appointment.counselorId.toString() === userId.toString()

    if (!hasAccess) {
      res.status(403).json({
        success: false,
        message: 'Access denied'
      })
      return
    }

    res.json({
      success: true,
      data: appointment
    })
  } catch (error) {
    next(error)
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
    const { counselorId, date, time, duration, type, notes, studentNotes } = req.body

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated'
      })
      return
    }

    // Check if user is a student
    const user = await User.findById(userId)
    if (!user || user.role !== 'student') {
      res.status(403).json({
        success: false,
        message: 'Only students can book appointments'
      })
      return
    }

    // Check if counselor exists and is available
    const counselor = await Counselor.findOne({ userId: counselorId, isAvailable: true })
      .populate('userId', 'firstName lastName email')

    if (!counselor) {
      res.status(404).json({
        success: false,
        message: 'Counselor not found or not available'
      })
      return
    }

    // Check if appointment date is in the future
    const appointmentDate = new Date(date)
    const appointmentDateTime = new Date(`${appointmentDate.toISOString().split('T')[0]}T${time}`)
    
    if (appointmentDateTime <= new Date()) {
      res.status(400).json({
        success: false,
        message: 'Appointment must be scheduled for a future date and time'
      })
      return
    }

    // Check for conflicts
    const existingAppointment = await Appointment.findOne({
      counselorId: counselorId,
      date: appointmentDate,
      time: time,
      status: { $in: ['scheduled', 'confirmed'] }
    })

    if (existingAppointment) {
      res.status(409).json({
        success: false,
        message: 'Time slot is already booked'
      })
      return
    }

    // Check counselor's daily session limit
    const todayAppointments = await Appointment.countDocuments({
      counselorId: counselorId,
      date: appointmentDate,
      status: { $in: ['scheduled', 'confirmed'] }
    })

    if (todayAppointments >= counselor.maxSessionsPerDay) {
      res.status(409).json({
        success: false,
        message: 'Counselor has reached maximum sessions for this day'
      })
      return
    }

    // Create appointment
    const appointment = await Appointment.create({
      studentId: userId,
      counselorId: counselorId,
      date: appointmentDate,
      time: time,
      duration: duration || 60,
      type: type || 'individual',
      notes: notes,
      studentNotes: studentNotes,
      status: 'scheduled'
    })

    const populatedAppointment = await Appointment.findById(appointment._id)
      .populate('studentId', 'firstName lastName email')
      .populate('counselorId', 'firstName lastName email')

    res.status(201).json({
      success: true,
      data: populatedAppointment,
      message: 'Appointment booked successfully'
    })

    logger.info(`New appointment created: ${appointment._id} by student ${userId} with counselor ${counselorId}`)
  } catch (error) {
    next(error)
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
    const updateData = req.body

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

    // Check permissions
    const user = await User.findById(userId)
    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found'
      })
      return
    }

    const canUpdate = user.role === 'admin' || 
                     appointment.studentId.toString() === userId.toString() ||
                     appointment.counselorId.toString() === userId.toString()

    if (!canUpdate) {
      res.status(403).json({
        success: false,
        message: 'Access denied'
      })
      return
    }

    // Students can only update certain fields
    if (user.role === 'student') {
      const allowedFields = ['studentNotes', 'notes']
      const filteredUpdate: any = {}
      allowedFields.forEach(field => {
        if (updateData[field] !== undefined) {
          filteredUpdate[field] = updateData[field]
        }
      })
      Object.assign(updateData, filteredUpdate)
    }

    // Counselors can update more fields
    if (user.role === 'counselor') {
      const allowedFields = ['counselorNotes', 'meetingLink', 'location', 'status']
      const filteredUpdate: any = {}
      allowedFields.forEach(field => {
        if (updateData[field] !== undefined) {
          filteredUpdate[field] = updateData[field]
        }
      })
      Object.assign(updateData, filteredUpdate)
    }

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate('studentId', 'firstName lastName email')
     .populate('counselorId', 'firstName lastName email')

    res.json({
      success: true,
      data: updatedAppointment,
      message: 'Appointment updated successfully'
    })

    logger.info(`Appointment updated: ${id} by user ${userId}`)
  } catch (error) {
    next(error)
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

    // Check permissions
    const user = await User.findById(userId)
    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found'
      })
      return
    }

    const canCancel = user.role === 'admin' || 
                     appointment.studentId.toString() === userId.toString() ||
                     appointment.counselorId.toString() === userId.toString()

    if (!canCancel) {
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

    // Check if appointment is too close to start time (less than 2 hours)
    const appointmentDateTime = new Date(`${appointment.date.toISOString().split('T')[0]}T${appointment.time}`)
    const twoHoursFromNow = new Date(Date.now() + 2 * 60 * 60 * 1000)

    if (appointmentDateTime <= twoHoursFromNow && user.role === 'student') {
      res.status(400).json({
        success: false,
        message: 'Appointment cannot be cancelled less than 2 hours before start time'
      })
      return
    }

    appointment.status = 'cancelled'
    await appointment.save()

    res.json({
      success: true,
      message: 'Appointment cancelled successfully'
    })

    logger.info(`Appointment cancelled: ${id} by user ${userId}`)
  } catch (error) {
    next(error)
  }
}

// @desc    Get available counselors
// @route   GET /api/appointments/counselors
// @access  Private
export const getAvailableCounselors = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { specialization, language, date, time } = req.query

    const query: any = { isAvailable: true }

    if (specialization) {
      query.specialization = { $in: Array.isArray(specialization) ? specialization : [specialization] }
    }

    if (language) {
      query.languages = { $in: Array.isArray(language) ? language : [language] }
    }

    const counselors = await Counselor.find(query)
      .populate('userId', 'firstName lastName email profile')
      .sort({ rating: -1, totalSessions: -1 })

    // Filter counselors based on availability for specific date/time
    let availableCounselors = counselors

    if (date && time) {
      const appointmentDate = new Date(date as string)
      const dayOfWeek = appointmentDate.getDay()

      availableCounselors = counselors.filter(counselor => {
        // Check if counselor is available on this day
        const dayAvailability = counselor.availability.find(avail => avail.dayOfWeek === dayOfWeek)
        if (!dayAvailability || !dayAvailability.isAvailable) return false

        // Check if time is within counselor's working hours
        const appointmentTime = time as string
        if (appointmentTime < dayAvailability.startTime || appointmentTime >= dayAvailability.endTime) {
          return false
        }

        return true
      })
    }

    res.json({
      success: true,
      data: availableCounselors
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Get available time slots for a counselor
// @route   GET /api/appointments/counselors/:id/slots
// @access  Private
export const getAvailableSlots = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params
    const { date } = req.query

    if (!date) {
      res.status(400).json({
        success: false,
        message: 'Date is required'
      })
      return
    }

    const counselor = await Counselor.findOne({ userId: id, isAvailable: true })
      .populate('userId', 'firstName lastName email')

    if (!counselor) {
      res.status(404).json({
        success: false,
        message: 'Counselor not found or not available'
      })
      return
    }

    const appointmentDate = new Date(date as string)
    const dayOfWeek = appointmentDate.getDay()

    // Get counselor's availability for this day
    const dayAvailability = counselor.availability.find(avail => avail.dayOfWeek === dayOfWeek)
    if (!dayAvailability || !dayAvailability.isAvailable) {
      res.json({
        success: true,
        data: {
          counselor: counselor.userId,
          date: appointmentDate,
          availableSlots: []
        }
      })
      return
    }

    // Get existing appointments for this date
    const existingAppointments = await Appointment.find({
      counselorId: id,
      date: appointmentDate,
      status: { $in: ['scheduled', 'confirmed'] }
    }).select('time duration')

    // Generate available time slots
    const availableSlots = []
    const startTime = dayAvailability.startTime
    const endTime = dayAvailability.endTime
    const slotDuration = 60 // 60 minutes per slot

    // Convert time strings to minutes for easier calculation
    const timeToMinutes = (time: string) => {
      const [hours, minutes] = time.split(':').map(Number)
      return (hours || 0) * 60 + (minutes || 0)
    }

    const minutesToTime = (minutes: number) => {
      const hours = Math.floor(minutes / 60)
      const mins = minutes % 60
      return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`
    }

    const startMinutes = timeToMinutes(startTime)
    const endMinutes = timeToMinutes(endTime)

    for (let minutes = startMinutes; minutes + slotDuration <= endMinutes; minutes += slotDuration) {
      const slotTime = minutesToTime(minutes)
      
      // Check if this slot is already booked
      const isBooked = existingAppointments.some(appointment => {
        const appointmentStart = timeToMinutes(appointment.time)
        const appointmentEnd = appointmentStart + appointment.duration
        return minutes < appointmentEnd && minutes + slotDuration > appointmentStart
      })

      if (!isBooked) {
        availableSlots.push({
          time: slotTime,
          duration: slotDuration,
          available: true
        })
      }
    }

    res.json({
      success: true,
      data: {
        counselor: counselor.userId,
        date: appointmentDate,
        availableSlots
      }
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Rate appointment
// @route   POST /api/appointments/:id/rate
// @access  Private
export const rateAppointment = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
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
    const { rating, feedback } = req.body

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

    // Check if user is the student who had this appointment
    if (appointment.studentId.toString() !== userId.toString()) {
      res.status(403).json({
        success: false,
        message: 'Only the student can rate this appointment'
      })
      return
    }

    // Check if appointment is completed
    if (appointment.status !== 'completed') {
      res.status(400).json({
        success: false,
        message: 'Can only rate completed appointments'
      })
      return
    }

    // Update appointment with rating and feedback
    appointment.rating = rating
    appointment.feedback = feedback
    await appointment.save()

    // Update counselor's overall rating
    const counselor = await Counselor.findOne({ userId: appointment.counselorId })
    if (counselor) {
      const allRatings = await Appointment.find({
        counselorId: appointment.counselorId,
        rating: { $exists: true }
      }).select('rating')

      const totalRating = allRatings.reduce((sum, apt) => sum + (apt.rating || 0), 0)
      counselor.rating = totalRating / allRatings.length
      await counselor.save()
    }

    res.json({
      success: true,
      message: 'Appointment rated successfully'
    })

    logger.info(`Appointment rated: ${id} with rating ${rating} by user ${userId}`)
  } catch (error) {
    next(error)
  }
}
