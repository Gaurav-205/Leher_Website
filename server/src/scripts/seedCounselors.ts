import mongoose from 'mongoose'
import { User } from '@models/User'
import { Counselor } from '@models/Counselor'
import { connectDB } from '@config/database'
import bcrypt from 'bcryptjs'

// Indian names data
const indianNames = [
  { firstName: 'Priya', lastName: 'Sharma' },
  { firstName: 'Rajesh', lastName: 'Kumar' },
  { firstName: 'Anita', lastName: 'Patel' },
  { firstName: 'Vikram', lastName: 'Singh' },
  { firstName: 'Sunita', lastName: 'Gupta' },
  { firstName: 'Amit', lastName: 'Verma' },
  { firstName: 'Kavita', lastName: 'Joshi' },
  { firstName: 'Ravi', lastName: 'Reddy' },
  { firstName: 'Meera', lastName: 'Iyer' },
  { firstName: 'Suresh', lastName: 'Nair' },
  { firstName: 'Deepa', lastName: 'Menon' },
  { firstName: 'Arjun', lastName: 'Pillai' },
  { firstName: 'Lakshmi', lastName: 'Rao' },
  { firstName: 'Kiran', lastName: 'Desai' },
  { firstName: 'Rohit', lastName: 'Agarwal' },
  { firstName: 'Pooja', lastName: 'Malhotra' },
  { firstName: 'Nikhil', lastName: 'Chopra' },
  { firstName: 'Sneha', lastName: 'Bhatia' },
  { firstName: 'Rahul', lastName: 'Jain' },
  { firstName: 'Divya', lastName: 'Saxena' },
  { firstName: 'Manish', lastName: 'Tiwari' },
  { firstName: 'Ritu', lastName: 'Mishra' },
  { firstName: 'Sandeep', lastName: 'Yadav' },
  { firstName: 'Neha', lastName: 'Pandey' },
  { firstName: 'Vishal', lastName: 'Shukla' },
  { firstName: 'Anjali', lastName: 'Dwivedi' },
  { firstName: 'Gaurav', lastName: 'Trivedi' },
  { firstName: 'Shilpa', lastName: 'Bansal' },
  { firstName: 'Rakesh', lastName: 'Goyal' },
  { firstName: 'Preeti', lastName: 'Khanna' }
]

const specializations = [
  'anxiety',
  'depression', 
  'stress-management',
  'academic-pressure',
  'relationship-issues',
  'career-guidance',
  'addiction',
  'trauma',
  'grief-counseling',
  'family-therapy',
  'group-therapy',
  'crisis-intervention',
  'mindfulness',
  'cognitive-behavioral-therapy'
]

const languages = ['en', 'hi', 'ta', 'te', 'bn', 'mr', 'gu', 'kn', 'ml', 'pa', 'or', 'as', 'ne', 'ur']

const qualifications = [
  'M.A. in Psychology',
  'M.Phil in Clinical Psychology',
  'Ph.D. in Psychology',
  'M.S.W. (Master of Social Work)',
  'M.A. in Counseling Psychology',
  'B.A. in Psychology',
  'M.A. in Clinical Psychology',
  'Diploma in Counseling',
  'Certificate in Cognitive Behavioral Therapy',
  'M.A. in Applied Psychology',
  'M.Sc. in Psychology',
  'M.A. in Mental Health Counseling',
  'Post Graduate Diploma in Counseling',
  'M.A. in Educational Psychology'
]

const institutions = [
  'Delhi University',
  'JNU (Jawaharlal Nehru University)',
  'TISS (Tata Institute of Social Sciences)',
  'NIMHANS (National Institute of Mental Health and Neurosciences)',
  'Ambedkar University Delhi',
  'University of Mumbai',
  'University of Calcutta',
  'University of Madras',
  'Banaras Hindu University',
  'Aligarh Muslim University',
  'Jamia Millia Islamia',
  'University of Hyderabad',
  'Pune University',
  'Karnataka University',
  'Gujarat University'
]

const cities = [
  'New Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Ahmedabad',
  'Jaipur', 'Surat', 'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane', 'Bhopal', 'Visakhapatnam',
  'Pimpri-Chinchwad', 'Patna', 'Vadodara', 'Ghaziabad', 'Ludhiana', 'Agra', 'Nashik', 'Faridabad',
  'Meerut', 'Rajkot', 'Kalyan-Dombivali', 'Vasai-Virar', 'Varanasi'
]

const states = [
  'Delhi', 'Maharashtra', 'Karnataka', 'Tamil Nadu', 'West Bengal', 'Telangana', 'Gujarat',
  'Rajasthan', 'Uttar Pradesh', 'Madhya Pradesh', 'Andhra Pradesh', 'Bihar', 'Punjab',
  'Haryana', 'Kerala', 'Odisha', 'Assam', 'Jharkhand', 'Chhattisgarh', 'Himachal Pradesh'
]

// Generate random availability for a counselor
const generateAvailability = () => {
  const availability = []
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  
  for (let i = 0; i < 7; i++) {
    const isWorkingDay = Math.random() > 0.2 // 80% chance of working on any given day
    
    if (isWorkingDay) {
      const startHour = Math.floor(Math.random() * 4) + 8 // 8 AM to 11 AM start
      const endHour = startHour + Math.floor(Math.random() * 6) + 6 // 6-11 hours duration
      
      availability.push({
        dayOfWeek: i,
        startTime: `${startHour.toString().padStart(2, '0')}:00`,
        endTime: `${Math.min(endHour, 20).toString().padStart(2, '0')}:00`, // Max 8 PM
        isAvailable: true
      })
    } else {
      availability.push({
        dayOfWeek: i,
        startTime: '09:00',
        endTime: '17:00',
        isAvailable: false
      })
    }
  }
  
  return availability
}

// Generate random specializations (2-4 specializations per counselor)
const generateSpecializations = () => {
  const numSpecs = Math.floor(Math.random() * 3) + 2 // 2-4 specializations
  const shuffled = [...specializations].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, numSpecs)
}

// Generate random languages (2-4 languages per counselor)
const generateLanguages = () => {
  const numLangs = Math.floor(Math.random() * 3) + 2 // 2-4 languages
  const shuffled = [...languages].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, numLangs)
}

// Generate random qualifications (1-3 qualifications per counselor)
const generateQualifications = () => {
  const numQuals = Math.floor(Math.random() * 3) + 1 // 1-3 qualifications
  const shuffled = [...qualifications].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, numQuals)
}

// Generate bio based on specializations and experience
const generateBio = (specializations: string[], experience: number, name: string) => {
  const specText = specializations.slice(0, 2).join(' and ')
  return `Dr. ${name} is a compassionate mental health professional with ${experience} years of experience specializing in ${specText}. Committed to providing culturally sensitive and evidence-based therapy to help individuals overcome their challenges and achieve mental wellness.`
}

const seedCounselors = async () => {
  try {
    console.log('🌱 Starting counselor seeding...')
    
    // Connect to database
    await connectDB()
    
    // Clear existing counselors and their associated users
    console.log('🧹 Clearing existing counselor data...')
    const existingCounselors = await Counselor.find({})
    const existingUserIds = existingCounselors.map(c => c.userId)
    
    await Counselor.deleteMany({})
    await User.deleteMany({ _id: { $in: existingUserIds } })
    
    console.log('👥 Creating 30 Indian counselors...')
    
    for (let i = 0; i < 30; i++) {
      const name = indianNames[i]
      if (!name) {
        console.error(`❌ No name found at index ${i}`)
        continue
      }
      
      const city = cities[Math.floor(Math.random() * cities.length)]
      const state = states[Math.floor(Math.random() * states.length)]
      const experience = Math.floor(Math.random() * 15) + 2 // 2-16 years experience
      const counselorSpecializations = generateSpecializations()
      const counselorLanguages = generateLanguages()
      const counselorQualifications = generateQualifications()
      const availability = generateAvailability()
      const rating = Math.random() * 2 + 3 // 3-5 rating
      const totalSessions = Math.floor(Math.random() * 500) + 50 // 50-549 sessions
      const consultationFee = Math.floor(Math.random() * 2000) + 500 // ₹500-₹2500
      const maxSessionsPerDay = Math.floor(Math.random() * 6) + 6 // 6-11 sessions per day
      
      // Create user account
      const hashedPassword = await bcrypt.hash('counselor123', 12)
      const user = new User({
        email: `${name.firstName.toLowerCase()}.${name.lastName.toLowerCase()}@counselor.com`,
        password: hashedPassword,
        firstName: name.firstName,
        lastName: name.lastName,
        role: 'counselor',
        profile: {
          phoneNumber: `${Math.floor(Math.random() * 9000000000) + 1000000000}`,
          preferredLanguage: counselorLanguages[0],
          timezone: 'Asia/Kolkata',
          bio: generateBio(counselorSpecializations, experience, name.firstName)
        },
        isVerified: true
      })
      
      await user.save()
      
      // Create counselor profile
      const counselor = new Counselor({
        userId: user._id,
        specialization: counselorSpecializations,
        experience: experience,
        languages: counselorLanguages,
        availability: availability,
        rating: rating,
        totalSessions: totalSessions,
        bio: generateBio(counselorSpecializations, experience, name.firstName),
        qualifications: counselorQualifications,
        isAvailable: Math.random() > 0.1, // 90% available
        consultationFee: consultationFee,
        maxSessionsPerDay: maxSessionsPerDay,
        currentSessionsToday: Math.floor(Math.random() * 3) // 0-2 sessions today
      })
      
      await counselor.save()
      
      console.log(`✅ Created counselor ${i + 1}/30: ${name.firstName} ${name.lastName} (${city}, ${state})`)
    }
    
    console.log('🎉 Successfully seeded 30 Indian counselors!')
    console.log('📊 Summary:')
    console.log(`   - Total counselors: 30`)
    console.log(`   - Average experience: ~9 years`)
    console.log(`   - Languages covered: ${[...new Set(languages)].length}`)
    console.log(`   - Specializations: ${specializations.length}`)
    console.log('🔑 Default password for all counselors: counselor123')
    
  } catch (error) {
    console.error('❌ Error seeding counselors:', error)
  } finally {
    mongoose.connection.close()
    console.log('🔌 Database connection closed')
  }
}

// Run the seeding function
if (require.main === module) {
  seedCounselors()
}

export default seedCounselors
