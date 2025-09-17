import mongoose from 'mongoose'
import { User } from '@models/User'
import bcrypt from 'bcryptjs'

const seedData = async () => {
  try {
    console.log('🌱 Starting data seeding...')

    // Clear existing data
    await User.deleteMany({})

    console.log('🗑️ Cleared existing data')

    // Create admin users
    const adminPassword = 'Admin@123'
    
    const admin1 = await User.create({
      firstName: 'Admin1',
      lastName: 'User',
      email: 'admin1@leher.com',
      password: adminPassword,
      role: 'admin',
      isVerified: true
    })

    const admin2 = await User.create({
      firstName: 'Admin2',
      lastName: 'User',
      email: 'admin2@leher.com',
      password: adminPassword,
      role: 'admin',
      isVerified: true
    })

    // Create moderator user - Hardcoded
    const moderatorPassword = 'Moderator@123'
    const moderator = await User.create({
      firstName: 'Gaurav',
      lastName: 'Khandelwal',
      email: 'gauravkhandelwal205@gmail.com',
      password: moderatorPassword,
      role: 'moderator',
      isVerified: true,
      profile: {
        bio: 'Platform moderator and administrator',
        phoneNumber: '9876543215'
      }
    })

    console.log('👤 Created admin and moderator users')

    // Create counselor users
    const counselorPassword = 'Couns@123'
    
    const counselor1 = await User.create({
      firstName: 'Dr. Kavita',
      lastName: 'Rao',
      email: 'kavita@counselor.com',
      password: counselorPassword,
      role: 'counselor',
      isVerified: true,
      profile: {
        bio: 'Experienced counselor specializing in anxiety and depression.',
        phoneNumber: '9876543210'
      }
    })

    const counselor2 = await User.create({
      firstName: 'Dr. Sunil',
      lastName: 'Bansal',
      email: 'sunil@counselor.com',
      password: counselorPassword,
      role: 'counselor',
      isVerified: true,
      profile: {
        bio: 'Career counselor with extensive experience in academic guidance.',
        phoneNumber: '9876543211'
      }
    })

    const counselor3 = await User.create({
      firstName: 'Dr. Preeti',
      lastName: 'Yadav',
      email: 'preeti@counselor.com',
      password: counselorPassword,
      role: 'counselor',
      isVerified: true,
      profile: {
        bio: 'Specialized in trauma recovery and grief counseling.',
        phoneNumber: '9876543212'
      }
    })

    const counselor4 = await User.create({
      firstName: 'Dr. Naveen',
      lastName: 'Shah',
      email: 'naveen@counselor.com',
      password: counselorPassword,
      role: 'counselor',
      isVerified: true,
      profile: {
        bio: 'Mental health specialist focusing on student wellness.',
        phoneNumber: '9876543213'
      }
    })

    const counselor5 = await User.create({
      firstName: 'Dr. Mina',
      lastName: 'Sethi',
      email: 'mina@counselor.com',
      password: counselorPassword,
      role: 'counselor',
      isVerified: true,
      profile: {
        bio: 'Family therapist and relationship counselor.',
        phoneNumber: '9876543214'
      }
    })

    console.log('👥 Created counselor users')

    // Create student users
    const studentPassword = 'User@123'
    
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
        isVerified: true,
        educationLevel: 'undergraduate',
        profile: {
          bio: `${student.firstName} is a dedicated student pursuing their academic goals.`,
          phoneNumber: `9876543${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`
        }
      })
      createdStudents.push(createdStudent)
    }

    console.log('🎓 Created student users')

    console.log('👨‍⚕️ Counselor profiles will be created separately if needed')

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

export default seedData

