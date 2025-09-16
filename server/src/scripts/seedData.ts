import mongoose from 'mongoose'
import { User } from '@models/User'
import { Counselor } from '@models/Counselor'
import { Appointment } from '@models/Appointment'
import bcrypt from 'bcryptjs'

const seedData = async () => {
  try {
    console.log('🌱 Starting data seeding...')

    // Clear existing data
    await User.deleteMany({})
    await Counselor.deleteMany({})
    await Appointment.deleteMany({})

    console.log('🗑️ Cleared existing data')

    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 12)
    const admin = await User.create({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@example.com',
      password: adminPassword,
      role: 'admin',
      isEmailVerified: true
    })
    console.log('👤 Created admin user')

    // Create counselor users
    const counselorPassword = await bcrypt.hash('counselor123', 12)
    
    const counselor1 = await User.create({
      firstName: 'Dr. Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@example.com',
      password: counselorPassword,
      role: 'counselor',
      isEmailVerified: true,
      profile: {
        avatar: '',
        bio: 'Experienced counselor specializing in anxiety and depression.',
        phone: '+91-9876543210'
      }
    })

    const counselor2 = await User.create({
      firstName: 'Dr. Rajesh',
      lastName: 'Kumar',
      email: 'rajesh.kumar@example.com',
      password: counselorPassword,
      role: 'counselor',
      isEmailVerified: true,
      profile: {
        avatar: '',
        bio: 'Career counselor with extensive experience in academic guidance.',
        phone: '+91-9876543211'
      }
    })

    const counselor3 = await User.create({
      firstName: 'Dr. Priya',
      lastName: 'Sharma',
      email: 'priya.sharma@example.com',
      password: counselorPassword,
      role: 'counselor',
      isEmailVerified: true,
      profile: {
        avatar: '',
        bio: 'Specialized in trauma recovery and grief counseling.',
        phone: '+91-9876543212'
      }
    })

    console.log('👥 Created counselor users')

    // Create student users
    const studentPassword = await bcrypt.hash('student123', 12)
    
    const student1 = await User.create({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: studentPassword,
      role: 'student',
      isEmailVerified: true,
      profile: {
        avatar: '',
        bio: 'Computer Science student',
        phone: '+91-9876543213'
      }
    })

    const student2 = await User.create({
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      password: studentPassword,
      role: 'student',
      isEmailVerified: true,
      profile: {
        avatar: '',
        bio: 'Psychology student',
        phone: '+91-9876543214'
      }
    })

    console.log('🎓 Created student users')

    // Create counselor profiles
    const counselorProfile1 = await Counselor.create({
      userId: counselor1._id,
      specialization: ['anxiety', 'depression', 'stress-management'],
      experience: 8,
      languages: ['en', 'hi'],
      availability: [
        { dayOfWeek: 1, startTime: '09:00', endTime: '17:00', isAvailable: true },
        { dayOfWeek: 2, startTime: '09:00', endTime: '17:00', isAvailable: true },
        { dayOfWeek: 3, startTime: '09:00', endTime: '17:00', isAvailable: true },
        { dayOfWeek: 4, startTime: '09:00', endTime: '17:00', isAvailable: true },
        { dayOfWeek: 5, startTime: '09:00', endTime: '17:00', isAvailable: true }
      ],
      rating: 4.8,
      totalSessions: 245,
      bio: 'Experienced counselor specializing in anxiety and depression. I help students navigate academic stress and personal challenges with evidence-based approaches.',
      qualifications: ['PhD in Clinical Psychology', 'Licensed Clinical Psychologist', 'CBT Certified'],
      isAvailable: true,
      consultationFee: 1500,
      maxSessionsPerDay: 8,
      currentSessionsToday: 3
    })

    const counselorProfile2 = await Counselor.create({
      userId: counselor2._id,
      specialization: ['academic-pressure', 'career-guidance', 'relationship-issues'],
      experience: 12,
      languages: ['en', 'hi', 'ta'],
      availability: [
        { dayOfWeek: 1, startTime: '10:00', endTime: '18:00', isAvailable: true },
        { dayOfWeek: 2, startTime: '10:00', endTime: '18:00', isAvailable: true },
        { dayOfWeek: 3, startTime: '10:00', endTime: '18:00', isAvailable: true },
        { dayOfWeek: 4, startTime: '10:00', endTime: '18:00', isAvailable: true },
        { dayOfWeek: 6, startTime: '09:00', endTime: '15:00', isAvailable: true }
      ],
      rating: 4.9,
      totalSessions: 320,
      bio: 'Career counselor with extensive experience helping students with academic pressure and career decisions. Fluent in multiple Indian languages.',
      qualifications: ['MSc in Counseling Psychology', 'Career Guidance Specialist', 'NLP Practitioner'],
      isAvailable: true,
      consultationFee: 1200,
      maxSessionsPerDay: 6,
      currentSessionsToday: 2
    })

    const counselorProfile3 = await Counselor.create({
      userId: counselor3._id,
      specialization: ['trauma', 'grief-counseling', 'family-therapy'],
      experience: 6,
      languages: ['en', 'hi', 'bn'],
      availability: [
        { dayOfWeek: 1, startTime: '14:00', endTime: '20:00', isAvailable: true },
        { dayOfWeek: 2, startTime: '14:00', endTime: '20:00', isAvailable: true },
        { dayOfWeek: 3, startTime: '14:00', endTime: '20:00', isAvailable: true },
        { dayOfWeek: 4, startTime: '14:00', endTime: '20:00', isAvailable: true },
        { dayOfWeek: 5, startTime: '14:00', endTime: '20:00', isAvailable: true }
      ],
      rating: 4.7,
      totalSessions: 180,
      bio: 'Specialized in trauma recovery and grief counseling. I provide a safe space for students dealing with difficult life experiences.',
      qualifications: ['MA in Clinical Psychology', 'Trauma-Informed Care Certified', 'Grief Counseling Specialist'],
      isAvailable: true,
      consultationFee: 1800,
      maxSessionsPerDay: 5,
      currentSessionsToday: 1
    })

    console.log('👨‍⚕️ Created counselor profiles')

    // Create sample appointments
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    
    const nextWeek = new Date(today)
    nextWeek.setDate(nextWeek.getDate() + 7)

    const appointments = [
      {
        studentId: student1._id,
        counselorId: counselor1._id,
        date: tomorrow,
        time: '10:00',
        duration: 60,
        type: 'individual',
        status: 'scheduled',
        notes: 'Discussion about academic stress and anxiety management techniques.',
        studentNotes: 'Feeling overwhelmed with final exams approaching.',
        meetingLink: 'https://meet.google.com/abc-defg-hij',
        location: 'Room 201, Counseling Center'
      },
      {
        studentId: student1._id,
        counselorId: counselor2._id,
        date: new Date(today.getTime() - 24 * 60 * 60 * 1000), // Yesterday
        time: '14:00',
        duration: 60,
        type: 'individual',
        status: 'completed',
        notes: 'Career guidance session focusing on post-graduation plans.',
        studentNotes: 'Need help deciding between job and higher studies.',
        counselorNotes: 'Student shows strong analytical skills, recommended exploring both options.',
        location: 'Room 105, Counseling Center',
        rating: 5,
        feedback: 'Very helpful session. Dr. Kumar provided excellent guidance and helped clarify my career path.'
      },
      {
        studentId: student2._id,
        counselorId: counselor3._id,
        date: nextWeek,
        time: '16:00',
        duration: 60,
        type: 'individual',
        status: 'scheduled',
        notes: 'Follow-up session for trauma recovery progress.',
        studentNotes: 'Feeling much better after the previous sessions.',
        meetingLink: 'https://meet.google.com/xyz-uvwx-rst',
        location: 'Room 203, Counseling Center'
      },
      {
        studentId: student2._id,
        counselorId: counselor1._id,
        date: new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000), // Last week
        time: '11:00',
        duration: 60,
        type: 'individual',
        status: 'completed',
        notes: 'Initial consultation for anxiety management.',
        studentNotes: 'First time seeking help for anxiety.',
        counselorNotes: 'Student shows good insight and motivation for change.',
        location: 'Room 201, Counseling Center',
        rating: 4,
        feedback: 'Good first session. Looking forward to continuing the work.'
      }
    ]

    await Appointment.insertMany(appointments)
    console.log('📅 Created sample appointments')

    console.log('✅ Data seeding completed successfully!')
    console.log('\n📋 Created users:')
    console.log('👤 Admin: admin@example.com / admin123')
    console.log('👨‍⚕️ Counselors: sarah.johnson@example.com, rajesh.kumar@example.com, priya.sharma@example.com / counselor123')
    console.log('🎓 Students: john.doe@example.com, jane.smith@example.com / student123')

  } catch (error) {
    console.error('❌ Error seeding data:', error)
  }
}

export default seedData

