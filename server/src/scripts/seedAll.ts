import mongoose from 'mongoose'
import { connectDB } from '@config/database'
import { User } from '@models/User'
import { Counselor } from '@models/Counselor'
import { Institution } from '@models/Institution'
import bcrypt from 'bcryptjs'

// Configuration
interface SeedingConfig {
  batchSize: number
  maxRetries: number
  retryDelay: number
  enableProgressBar: boolean
  dryRun: boolean
}

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

// Utility functions
const generateSpecializations = (): string[] => {
  const numSpecs = Math.floor(Math.random() * 3) + 2 // 2-4 specializations
  const shuffled = [...specializations].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, numSpecs)
}

const generateLanguages = (): string[] => {
  const numLangs = Math.floor(Math.random() * 3) + 2 // 2-4 languages
  const shuffled = [...languages].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, numLangs)
}

const generateQualifications = (): string[] => {
  const numQuals = Math.floor(Math.random() * 3) + 1 // 1-3 qualifications
  const shuffled = [...qualifications].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, numQuals)
}

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

const generateBio = (specializations: string[], experience: number, name: string): string => {
  const specText = specializations.slice(0, 2).join(' and ')
  return `Dr. ${name} is a compassionate mental health professional with ${experience} years of experience specializing in ${specText}. Committed to providing culturally sensitive and evidence-based therapy to help individuals overcome their challenges and achieve mental wellness.`
}

// Progress tracking
const createProgressBar = (total: number) => {
  let current = 0
  const startTime = Date.now()
  
  return {
    increment: () => {
      current++
      const progress = (current / total) * 100
      const progressBar = '█'.repeat(Math.floor(progress / 2)) + '░'.repeat(50 - Math.floor(progress / 2))
      const elapsed = Date.now() - startTime
      const avgTime = elapsed / current
      const remaining = total - current
      const eta = Math.round((remaining * avgTime) / 1000)
      
      process.stdout.write(`\r🚀 Progress: [${progressBar}] ${progress.toFixed(1)}% (${current}/${total}) | ⏱️ ETA: ${eta}s`)
      
      if (current === total) {
        console.log('\n✅ Seeding completed!')
      }
    }
  }
}

// Retry utility
const retryOperation = async <T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> => {
  let lastError: Error
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation()
    } catch (error) {
      lastError = error as Error
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, delay * attempt))
      }
    }
  }
  
  throw lastError!
}

// Seed institutions
const seedInstitutions = async (config: SeedingConfig) => {
  console.log('🏛️ Seeding institutions...')
  
  if (config.dryRun) {
    console.log(`📋 Would create ${institutions.length} institutions`)
    return
  }
  
  // Clear existing institutions
  await retryOperation(() => Institution.deleteMany({}), config.maxRetries, config.retryDelay)
  
  const institutionDocs = institutions.map(name => ({
    name,
    type: 'university' as const,
    location: {
      state: states[Math.floor(Math.random() * states.length)],
      city: cities[Math.floor(Math.random() * cities.length)],
      address: `${cities[Math.floor(Math.random() * cities.length)]}, ${states[Math.floor(Math.random() * states.length)]}`
    },
    contact: {
      email: `contact@${name.toLowerCase().replace(/[^a-z0-9]/g, '')}.edu.in`,
      phone: `${Math.floor(Math.random() * 9000000000) + 1000000000}`,
      website: `https://www.${name.toLowerCase().replace(/[^a-z0-9]/g, '')}.edu.in`
    },
    isActive: true
  }))
  
  await retryOperation(() => Institution.insertMany(institutionDocs), config.maxRetries, config.retryDelay)
  console.log(`✅ Created ${institutionDocs.length} institutions`)
}

// Seed counselors
const seedCounselors = async (config: SeedingConfig) => {
  console.log('👥 Seeding counselors...')
  
  if (config.dryRun) {
    console.log(`📋 Would create ${indianNames.length} counselors`)
    return
  }
  
  // Clear existing counselors and their associated users
  const existingCounselors = await retryOperation(() => Counselor.find({}), config.maxRetries, config.retryDelay)
  const existingUserIds = existingCounselors.map(c => c.userId)
  
  await retryOperation(() => Counselor.deleteMany({}), config.maxRetries, config.retryDelay)
  await retryOperation(() => User.deleteMany({ _id: { $in: existingUserIds } }), config.maxRetries, config.retryDelay)
  
  const progress = config.enableProgressBar ? createProgressBar(indianNames.length) : null
  
  for (let i = 0; i < indianNames.length; i++) {
    const name = indianNames[i]
    if (!name) continue
    
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
    
    await retryOperation(() => user.save(), config.maxRetries, config.retryDelay)
    
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
    
    await retryOperation(() => counselor.save(), config.maxRetries, config.retryDelay)
    
    if (progress) progress.increment()
  }
  
  console.log(`✅ Created ${indianNames.length} counselors`)
  console.log('🔑 Default password for all counselors: counselor123')
}

// Main seeding function
const seedAll = async (config: SeedingConfig = {
  batchSize: 50,
  maxRetries: 3,
  retryDelay: 1000,
  enableProgressBar: true,
  dryRun: false
}) => {
  try {
    console.log('🌱 Starting comprehensive seeding...')
    console.log('⚙️ Configuration:')
    console.log(`   - Batch size: ${config.batchSize}`)
    console.log(`   - Max retries: ${config.maxRetries}`)
    console.log(`   - Progress bar: ${config.enableProgressBar ? 'enabled' : 'disabled'}`)
    console.log(`   - Dry run: ${config.dryRun ? 'enabled' : 'disabled'}`)
    console.log('')
    
    // Connect to database
    await retryOperation(() => connectDB(), config.maxRetries, config.retryDelay)
    
    // Seed institutions first
    await seedInstitutions(config)
    
    // Seed counselors
    await seedCounselors(config)
    
    console.log('')
    console.log('🎉 All seeding completed successfully!')
    console.log('📊 Summary:')
    console.log(`   - Institutions: ${institutions.length}`)
    console.log(`   - Counselors: ${indianNames.length}`)
    console.log(`   - Languages covered: ${languages.length}`)
    console.log(`   - Specializations: ${specializations.length}`)
    
  } catch (error) {
    console.error('❌ Seeding failed:', error)
    throw error
  } finally {
    // Graceful cleanup
    try {
      await mongoose.connection.close()
      console.log('🔌 Database connection closed')
    } catch (closeError) {
      console.error('⚠️ Error closing database connection:', closeError)
    }
  }
}

// Command line interface
const parseArgs = (): SeedingConfig => {
  const args = process.argv.slice(2)
  const options: SeedingConfig = {
    batchSize: 50,
    maxRetries: 3,
    retryDelay: 1000,
    enableProgressBar: true,
    dryRun: false
  }
  
  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--batch-size':
      case '-b':
        options.batchSize = Math.max(1, parseInt(args[++i] || '50') || 50)
        break
      case '--max-retries':
      case '-r':
        options.maxRetries = Math.max(1, parseInt(args[++i] || '3') || 3)
        break
      case '--retry-delay':
        options.retryDelay = Math.max(100, parseInt(args[++i] || '1000') || 1000)
        break
      case '--no-progress':
        options.enableProgressBar = false
        break
      case '--dry-run':
      case '-d':
        options.dryRun = true
        break
      case '--help':
      case '-h':
        console.log(`
🌱 Comprehensive Seeder

Usage: npm run seed [options]

Options:
  -b, --batch-size <number>    Set batch size for processing (default: 50)
  -r, --max-retries <number>   Set maximum retry attempts (default: 3)
  --retry-delay <number>       Set delay between retries in ms (default: 1000)
  --no-progress               Disable progress bar
  -d, --dry-run              Show what would be done without executing
  -h, --help                 Show this help message

Examples:
  npm run seed                           # Run with default settings
  npm run seed -b 100 -r 5               # Use batch size 100 with 5 retries
  npm run seed --dry-run                 # Preview what would be done
  npm run seed --no-progress             # Minimal output
`)
        process.exit(0)
      default:
        if (args[i]?.startsWith('-')) {
          console.error(`❌ Unknown option: ${args[i]}`)
          console.log('Use --help for available options')
          process.exit(1)
        }
    }
  }
  
  return options
}

// Run the seeding function
if (require.main === module) {
  const options = parseArgs()
  
  seedAll(options)
    .then(() => {
      console.log('✅ Seeding completed successfully')
      process.exit(0)
    })
    .catch((error) => {
      console.error('❌ Seeding failed:', error)
      process.exit(1)
    })
}

export default seedAll
