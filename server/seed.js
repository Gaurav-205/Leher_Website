const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://gauravkhandelwal205_db_user:gaurav@cluster0.urnv9wg.mongodb.net/test'

// User Schema
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'counselor', 'admin', 'moderator'], default: 'student' },
  isEmailVerified: { type: Boolean, default: false },
  profile: {
    avatar: String,
    bio: String,
    phone: String
  }
}, { timestamps: true })

// Counselor Schema
const availabilitySchema = new mongoose.Schema({
  dayOfWeek: { type: Number, required: true, min: 0, max: 6 },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  isAvailable: { type: Boolean, default: true }
})

const counselorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  specialization: [{ type: String, required: true }],
  experience: { type: Number, required: true, min: 0, max: 50 },
  languages: [{ type: String, required: true }],
  availability: [availabilitySchema],
  rating: { type: Number, default: 0, min: 0, max: 5 },
  totalSessions: { type: Number, default: 0, min: 0 },
  bio: { type: String, required: true, maxlength: 1000 },
  qualifications: [{ type: String, required: true, maxlength: 200 }],
  isAvailable: { type: Boolean, default: true },
  consultationFee: { type: Number, min: 0 },
  maxSessionsPerDay: { type: Number, default: 8, min: 1, max: 12 },
  currentSessionsToday: { type: Number, default: 0, min: 0 }
}, { timestamps: true })

// Appointment Schema
const appointmentSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  counselorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  duration: { type: Number, required: true, min: 15, max: 180, default: 60 },
  type: { type: String, enum: ['individual', 'group', 'emergency'], default: 'individual' },
  status: { type: String, enum: ['scheduled', 'confirmed', 'completed', 'cancelled', 'no-show'], default: 'scheduled' },
  notes: { type: String, maxlength: 1000 },
  meetingLink: { type: String },
  location: { type: String, maxlength: 200 },
  studentNotes: { type: String, maxlength: 500 },
  counselorNotes: { type: String, maxlength: 1000 },
  rating: { type: Number, min: 1, max: 5 },
  feedback: { type: String, maxlength: 1000 }
}, { timestamps: true })

const User = mongoose.model('User', userSchema)
const Counselor = mongoose.model('Counselor', counselorSchema)
const Appointment = mongoose.model('Appointment', appointmentSchema)

async function seedData() {
  try {
    console.log('🌱 Starting data seeding...')

    // Clear existing data
    await User.deleteMany({})
    await Counselor.deleteMany({})
    await Appointment.deleteMany({})

    console.log('🗑️ Cleared existing data')

    // Create admin users
    const adminPassword = await bcrypt.hash('Admin@123', 12)
    
    const admin1 = await User.create({
      firstName: 'Admin1',
      lastName: 'User',
      email: 'admin1@leher.com',
      password: adminPassword,
      role: 'admin',
      isEmailVerified: true
    })

    const admin2 = await User.create({
      firstName: 'Admin2',
      lastName: 'User',
      email: 'admin2@leher.com',
      password: adminPassword,
      role: 'admin',
      isEmailVerified: true
    })

    // Create moderator user - Hardcoded
    const moderatorPassword = await bcrypt.hash('Moderator@123', 12)
    const moderator = await User.create({
      firstName: 'Gaurav',
      lastName: 'Khandelwal',
      email: 'gauravkhandelwal205@gmail.com',
      password: moderatorPassword,
      role: 'moderator',
      isEmailVerified: true,
      profile: {
        bio: 'Platform moderator and administrator',
        phoneNumber: '9876543215'
      }
    })

    console.log('👤 Created admin and moderator users')

    // Create counselor users
    const counselorPassword = await bcrypt.hash('Couns@123', 12)
    
    const counselor1 = await User.create({
      firstName: 'Dr. Kavita',
      lastName: 'Rao',
      email: 'kavita@counselor.com',
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
      firstName: 'Dr. Sunil',
      lastName: 'Bansal',
      email: 'sunil@counselor.com',
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
      firstName: 'Dr. Preeti',
      lastName: 'Yadav',
      email: 'preeti@counselor.com',
      password: counselorPassword,
      role: 'counselor',
      isEmailVerified: true,
      profile: {
        avatar: '',
        bio: 'Specialized in trauma recovery and grief counseling.',
        phone: '+91-9876543212'
      }
    })

    const counselor4 = await User.create({
      firstName: 'Dr. Naveen',
      lastName: 'Shah',
      email: 'naveen@counselor.com',
      password: counselorPassword,
      role: 'counselor',
      isEmailVerified: true,
      profile: {
        avatar: '',
        bio: 'Mental health specialist focusing on student wellness.',
        phone: '+91-9876543213'
      }
    })

    const counselor5 = await User.create({
      firstName: 'Dr. Mina',
      lastName: 'Sethi',
      email: 'mina@counselor.com',
      password: counselorPassword,
      role: 'counselor',
      isEmailVerified: true,
      profile: {
        avatar: '',
        bio: 'Family therapist and relationship counselor.',
        phone: '+91-9876543214'
      }
    })

    console.log('👥 Created counselor users')

    // Create student users
    const studentPassword = await bcrypt.hash('User@123', 12)
    
    const students = [
      { firstName: 'Aanya', lastName: 'Sharma', email: 'aanya@student.com' },
      { firstName: 'Arjun', lastName: 'Kumar', email: 'arjun@student.com' },
      { firstName: 'Priya', lastName: 'Patel', email: 'priya@student.com' },
      { firstName: 'Rahul', lastName: 'Singh', email: 'rahul@student.com' },
      { firstName: 'Sneha', lastName: 'Gupta', email: 'sneha@student.com' },
      { firstName: 'Vikram', lastName: 'Sharma', email: 'vikram@student.com' },
      { firstName: 'Kavya', lastName: 'Joshi', email: 'kavya@student.com' },
      { firstName: 'Rohan', lastName: 'Agarwal', email: 'rohan@student.com' },
      { firstName: 'Ananya', lastName: 'Verma', email: 'ananya@student.com' },
      { firstName: 'Arjun', lastName: 'Malhotra', email: 'arjun.malhotra@student.com' }
    ]

    const createdStudents = []
    for (const student of students) {
      const createdStudent = await User.create({
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        password: studentPassword,
        role: 'student',
        isEmailVerified: true,
        profile: {
          avatar: '',
          bio: `${student.firstName} is a dedicated student pursuing their academic goals.`,
          phone: `+91-9876543${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`
        }
      })
      createdStudents.push(createdStudent)
    }

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

    // Skip appointments for now since we removed the appointments feature
    console.log('📅 Skipping appointments (feature removed)')

    console.log('✅ Data seeding completed successfully!')
    console.log('\n📋 Created users:')
    console.log('👤 Admins: admin1@leher.com, admin2@leher.com / Admin@123')
    console.log('🛡️ Moderator: gauravkhandelwal205@gmail.com / Moderator@123')
    console.log('👨‍⚕️ Counselors: kavita@counselor.com, sunil@counselor.com, preeti@counselor.com, naveen@counselor.com, mina@counselor.com / Couns@123')
    console.log('🎓 Students: aanya@student.com, arjun@student.com, priya@student.com, rahul@student.com, sneha@student.com, vikram@student.com, kavya@student.com, rohan@student.com, ananya@student.com, arjun.malhotra@student.com / User@123')

  } catch (error) {
    console.error('❌ Error seeding data:', error)
  }
}

async function runSeed() {
  try {
    console.log('🔌 Connecting to MongoDB...')
    await mongoose.connect(MONGODB_URI)
    console.log('✅ Connected to MongoDB')

    await seedData()
    
    console.log('🎉 Seeding completed!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Seeding failed:', error)
    process.exit(1)
  }
}

runSeed()