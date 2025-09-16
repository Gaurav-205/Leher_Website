import express from 'express'
import { body, query, param } from 'express-validator'
import { protect } from '@middleware/auth'
import {
  getAppointments,
  getAppointment,
  createAppointment,
  updateAppointment,
  cancelAppointment,
  getAvailableCounselors,
  getAvailableSlots,
  rateAppointment
} from '@controllers/appointmentController'

const router = express.Router()

// All routes are protected
router.use(protect)

// Validation rules
const createAppointmentValidation = [
  body('counselorId')
    .isMongoId()
    .withMessage('Please provide a valid counselor ID'),
  body('date')
    .isISO8601()
    .withMessage('Please provide a valid date')
    .custom((value) => {
      const appointmentDate = new Date(value)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      if (appointmentDate < today) {
        throw new Error('Appointment date must be in the future')
      }
      return true
    }),
  body('time')
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Please provide a valid time format (HH:MM)'),
  body('duration')
    .optional()
    .isInt({ min: 15, max: 180 })
    .withMessage('Duration must be between 15 and 180 minutes'),
  body('type')
    .optional()
    .isIn(['individual', 'group', 'emergency'])
    .withMessage('Type must be individual, group, or emergency'),
  body('notes')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Notes cannot exceed 1000 characters'),
  body('studentNotes')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Student notes cannot exceed 500 characters')
]

const updateAppointmentValidation = [
  body('notes')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Notes cannot exceed 1000 characters'),
  body('studentNotes')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Student notes cannot exceed 500 characters'),
  body('counselorNotes')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Counselor notes cannot exceed 1000 characters'),
  body('meetingLink')
    .optional()
    .isURL()
    .withMessage('Please provide a valid meeting link'),
  body('location')
    .optional()
    .isLength({ max: 200 })
    .withMessage('Location cannot exceed 200 characters'),
  body('status')
    .optional()
    .isIn(['scheduled', 'confirmed', 'confirmed', 'completed', 'cancelled', 'no-show'])
    .withMessage('Invalid status')
]

const rateAppointmentValidation = [
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  body('feedback')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Feedback cannot exceed 1000 characters')
]

const getAppointmentsValidation = [
  query('status')
    .optional()
    .isIn(['scheduled', 'confirmed', 'completed', 'cancelled', 'no-show'])
    .withMessage('Invalid status filter'),
  query('type')
    .optional()
    .isIn(['individual', 'group', 'emergency'])
    .withMessage('Invalid type filter'),
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Limit must be between 1 and 50')
]

const getAvailableSlotsValidation = [
  param('id')
    .isMongoId()
    .withMessage('Please provide a valid counselor ID'),
  query('date')
    .isISO8601()
    .withMessage('Please provide a valid date')
]

// @desc    Get user's appointments
// @route   GET /api/appointments
// @access  Private
router.get('/', getAppointmentsValidation, getAppointments)

// @desc    Get available counselors
// @route   GET /api/appointments/counselors
// @access  Private
router.get('/counselors', getAvailableCounselors)

// @desc    Get available time slots for a counselor
// @route   GET /api/appointments/counselors/:id/slots
// @access  Private
router.get('/counselors/:id/slots', getAvailableSlotsValidation, getAvailableSlots)

// @desc    Create new appointment
// @route   POST /api/appointments
// @access  Private
router.post('/', createAppointmentValidation, createAppointment)

// @desc    Rate appointment
// @route   POST /api/appointments/:id/rate
// @access  Private
router.post('/:id/rate', rateAppointmentValidation, rateAppointment)

// @desc    Get single appointment
// @route   GET /api/appointments/:id
// @access  Private
router.get('/:id', getAppointment)

// @desc    Update appointment
// @route   PUT /api/appointments/:id
// @access  Private
router.put('/:id', updateAppointmentValidation, updateAppointment)

// @desc    Cancel appointment
// @route   DELETE /api/appointments/:id
// @access  Private
router.delete('/:id', cancelAppointment)

export default router