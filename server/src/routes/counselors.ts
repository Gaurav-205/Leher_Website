import express from 'express'
import { body, query } from 'express-validator'
import { protect, authorize } from '@middleware/auth'
import {
  getCounselorProfile,
  createOrUpdateCounselorProfile,
  updateAvailability,
  getCounselorStats,
  getAllCounselors
} from '@controllers/counselorController'

const router = express.Router()

// All routes are protected
router.use(protect)

// Validation rules
const counselorProfileValidation = [
  body('specialization')
    .isArray({ min: 1 })
    .withMessage('At least one specialization is required')
    .custom((specializations) => {
      const validSpecializations = [
        'anxiety', 'depression', 'stress-management', 'academic-pressure',
        'relationship-issues', 'career-guidance', 'addiction', 'trauma',
        'grief-counseling', 'family-therapy', 'group-therapy', 'crisis-intervention',
        'mindfulness', 'cognitive-behavioral-therapy', 'other'
      ]
      for (const spec of specializations) {
        if (!validSpecializations.includes(spec)) {
          throw new Error(`Invalid specialization: ${spec}`)
        }
      }
      return true
    }),
  body('experience')
    .isInt({ min: 0, max: 50 })
    .withMessage('Experience must be between 0 and 50 years'),
  body('languages')
    .isArray({ min: 1 })
    .withMessage('At least one language is required')
    .custom((languages) => {
      const validLanguages = ['en', 'hi', 'ta', 'te', 'bn', 'mr', 'gu', 'kn', 'ml', 'pa', 'or', 'as', 'ne', 'ur', 'other']
      for (const lang of languages) {
        if (!validLanguages.includes(lang)) {
          throw new Error(`Invalid language: ${lang}`)
        }
      }
      return true
    }),
  body('availability')
    .isArray({ min: 1 })
    .withMessage('At least one availability slot is required')
    .custom((availability) => {
      for (const slot of availability) {
        if (typeof slot.dayOfWeek !== 'number' || slot.dayOfWeek < 0 || slot.dayOfWeek > 6) {
          throw new Error('Invalid day of week')
        }
        if (!/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(slot.startTime)) {
          throw new Error('Invalid start time format')
        }
        if (!/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(slot.endTime)) {
          throw new Error('Invalid end time format')
        }
        if (slot.startTime >= slot.endTime) {
          throw new Error('Start time must be before end time')
        }
      }
      return true
    }),
  body('bio')
    .isLength({ min: 50, max: 1000 })
    .withMessage('Bio must be between 50 and 1000 characters'),
  body('qualifications')
    .isArray({ min: 1 })
    .withMessage('At least one qualification is required'),
  body('consultationFee')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Consultation fee must be a positive number'),
  body('maxSessionsPerDay')
    .optional()
    .isInt({ min: 1, max: 12 })
    .withMessage('Maximum sessions per day must be between 1 and 12')
]

const availabilityValidation = [
  body('availability')
    .isArray({ min: 1 })
    .withMessage('At least one availability slot is required'),
  body('isAvailable')
    .optional()
    .isBoolean()
    .withMessage('isAvailable must be a boolean')
]

const getAllCounselorsValidation = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Limit must be between 1 and 50'),
  query('specialization')
    .optional()
    .custom((value) => {
      if (Array.isArray(value)) {
        const validSpecializations = [
          'anxiety', 'depression', 'stress-management', 'academic-pressure',
          'relationship-issues', 'career-guidance', 'addiction', 'trauma',
          'grief-counseling', 'family-therapy', 'group-therapy', 'crisis-intervention',
          'mindfulness', 'cognitive-behavioral-therapy', 'other'
        ]
        for (const spec of value) {
          if (!validSpecializations.includes(spec)) {
            throw new Error(`Invalid specialization: ${spec}`)
          }
        }
      }
      return true
    }),
  query('isAvailable')
    .optional()
    .isBoolean()
    .withMessage('isAvailable must be a boolean')
]

// @desc    Get counselor profile
// @route   GET /api/counselors/profile
// @access  Private (Counselor only)
router.get('/profile', authorize('counselor'), getCounselorProfile)

// @desc    Create or update counselor profile
// @route   POST /api/counselors/profile
// @access  Private (Counselor only)
router.post('/profile', authorize('counselor'), counselorProfileValidation, createOrUpdateCounselorProfile)

// @desc    Update counselor availability
// @route   PUT /api/counselors/availability
// @access  Private (Counselor only)
router.put('/availability', authorize('counselor'), availabilityValidation, updateAvailability)

// @desc    Get counselor statistics
// @route   GET /api/counselors/stats
// @access  Private (Counselor only)
router.get('/stats', authorize('counselor'), getCounselorStats)

// @desc    Get all counselors (for admin)
// @route   GET /api/counselors
// @access  Private (Admin only)
router.get('/', authorize('admin'), getAllCounselorsValidation, getAllCounselors)

export default router
