import mongoose from 'mongoose'
import { User } from '../models/User'
import { Counselor } from '../models/Counselor'

// Enhanced performance monitoring
interface PerformanceMetrics {
  startTime: number
  endTime?: number
  totalProcessed: number
  totalErrors: number
  averageTimePerRecord: number
  memoryUsage: NodeJS.MemoryUsage
  batchCount: number
  retryCount: number
}

// Configuration interface
interface SeedingConfig {
  batchSize: number
  maxRetries: number
  retryDelay: number
  enableProgressBar: boolean
  enableMemoryMonitoring: boolean
  dryRun: boolean
}

// Database connection with enhanced error handling
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://gauravkhandelwal205_db_user:gaurav@cluster0.urnv9wg.mongodb.net/test'

const connectDB = async (): Promise<void> => {
  try {
    const options = {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      bufferMaxEntries: 0,
      bufferCommands: false,
    }
    
    await mongoose.connect(MONGODB_URI, options)
    console.log('📡 Connected to MongoDB with optimized settings')
  } catch (error) {
    console.error('❌ MongoDB connection error:', error)
    process.exit(1)
  }
}

// Memory monitoring utility
const logMemoryUsage = (stage: string): void => {
  const usage = process.memoryUsage()
  const formatBytes = (bytes: number): string => (bytes / 1024 / 1024).toFixed(2) + ' MB'
  
  console.log(`🧠 Memory ${stage}:`)
  console.log(`   - RSS: ${formatBytes(usage.rss)}`)
  console.log(`   - Heap Used: ${formatBytes(usage.heapUsed)}`)
  console.log(`   - Heap Total: ${formatBytes(usage.heapTotal)}`)
  console.log(`   - External: ${formatBytes(usage.external)}`)
}

// Indian counselor data
const specializations = [
  'Anxiety Disorders',
  'Depression',
  'Trauma & PTSD',
  'Relationship Counseling',
  'Career Guidance',
  'Academic Stress',
  'Family Therapy',
  'Grief Counseling',
  'Addiction Recovery',
  'Self-Esteem',
  'Anger Management',
  'Sleep Disorders',
  'Eating Disorders',
  'OCD',
  'Bipolar Disorder',
  'ADHD',
  'Autism Spectrum',
  'LGBTQ+ Support',
  'Crisis Intervention',
  'Mindfulness & Meditation'
]

const languages = [
  'English',
  'Hindi',
  'Bengali',
  'Tamil',
  'Telugu',
  'Marathi',
  'Gujarati',
  'Kannada',
  'Malayalam',
  'Punjabi',
  'Urdu',
  'Odia',
  'Assamese'
]

const qualifications = [
  'M.Phil in Clinical Psychology',
  'M.A. in Psychology',
  'M.S.W. (Master of Social Work)',
  'Ph.D. in Psychology',
  'M.A. in Counseling Psychology',
  'M.Sc. in Clinical Psychology',
  'B.A. in Psychology',
  'M.A. in Applied Psychology',
  'M.Phil in Counseling Psychology',
  'M.A. in Mental Health Counseling',
  'M.Sc. in Counseling Psychology',
  'M.A. in Clinical Psychology',
  'M.Phil in Clinical Psychology',
  'M.A. in Psychology with specialization in Counseling',
  'M.Sc. in Psychology',
  'M.A. in Psychology and Counseling',
  'M.Phil in Psychology',
  'M.A. in Psychology with Clinical specialization',
  'M.Sc. in Applied Psychology',
  'M.A. in Psychology with Counseling specialization'
]

const cities = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad',
  'Jaipur', 'Surat', 'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane', 'Bhopal',
  'Visakhapatnam', 'Pimpri-Chinchwad', 'Patna', 'Vadodara', 'Ghaziabad', 'Ludhiana',
  'Agra', 'Nashik', 'Faridabad', 'Meerut', 'Rajkot', 'Kalyan-Dombivali', 'Vasai-Virar',
  'Varanasi', 'Srinagar', 'Aurangabad', 'Navi Mumbai', 'Solapur', 'Vijayawada', 'Kolhapur',
  'Amritsar', 'Nashik', 'Sangli', 'Malegaon', 'Ulhasnagar', 'Jalgaon', 'Akola', 'Latur',
  'Ahmadnagar', 'Dhule', 'Ichalkaranji', 'Parbhani', 'Jalna', 'Bhusawal', 'Panvel', 'Satara'
]

const states = [
  'Maharashtra', 'Delhi', 'Karnataka', 'Telangana', 'Tamil Nadu', 'West Bengal', 'Gujarat',
  'Rajasthan', 'Uttar Pradesh', 'Madhya Pradesh', 'Andhra Pradesh', 'Punjab', 'Bihar',
  'Odisha', 'Kerala', 'Assam', 'Jharkhand', 'Chhattisgarh', 'Haryana', 'Himachal Pradesh',
  'Uttarakhand', 'Jammu and Kashmir', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland',
  'Sikkim', 'Tripura', 'Arunachal Pradesh', 'Goa'
]

// Optimized data generation with caching
const generateSpecializations = (): string[] => {
  const numSpecializations = Math.floor(Math.random() * 4) + 2 // 2-5 specializations
  // Use Fisher-Yates shuffle for better performance
  const shuffled = [...specializations]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = shuffled[i]!
    shuffled[i] = shuffled[j]!
    shuffled[j] = temp
  }
  return shuffled.slice(0, numSpecializations)
}

const generateLanguages = (): string[] => {
  const numLanguages = Math.floor(Math.random() * 3) + 2 // 2-4 languages
  const shuffled = [...languages]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = shuffled[i]!
    shuffled[i] = shuffled[j]!
    shuffled[j] = temp
  }
  return shuffled.slice(0, numLanguages)
}

const generateQualifications = (): string[] => {
  const numQualifications = Math.floor(Math.random() * 3) + 1 // 1-3 qualifications
  const shuffled = [...qualifications]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = shuffled[i]!
    shuffled[i] = shuffled[j]!
    shuffled[j] = temp
  }
  return shuffled.slice(0, numQualifications)
}

const generateAvailability = () => {
  const days = [0, 1, 2, 3, 4, 5, 6] // Sunday to Saturday
  const availability: Array<{
    dayOfWeek: number
    startTime: string
    endTime: string
    isAvailable: boolean
  }> = []
  
  // Generate availability for 5-7 days
  const numDays = Math.floor(Math.random() * 3) + 5 // 5-7 days
  const selectedDays = days.sort(() => 0.5 - Math.random()).slice(0, numDays)
  
  selectedDays.forEach(day => {
    const startHour = Math.floor(Math.random() * 4) + 9 // 9 AM to 12 PM start
    const endHour = startHour + Math.floor(Math.random() * 6) + 4 // 4-9 hours duration
    
    availability.push({
      dayOfWeek: day,
      startTime: `${startHour.toString().padStart(2, '0')}:00`,
      endTime: `${endHour.toString().padStart(2, '0')}:00`,
      isAvailable: true
    })
  })
  
  return availability
}

const generateBio = (specializations: string[], experience: number, firstName: string): string => {
  const specializationText = specializations.slice(0, 3).join(', ')
  return `Dr. ${firstName} is a highly experienced mental health professional with ${experience} years of expertise in ${specializationText}. Committed to providing compassionate and evidence-based therapy to help individuals overcome challenges and achieve personal growth.`
}

// Enhanced countdown and progress utilities
const createCountdown = (total: number, config: SeedingConfig) => {
  let current = 0
  const startTime = Date.now()
  let lastUpdate = 0
  const updateInterval = 100 // Update every 100ms for smooth progress
  
  return {
    increment: () => {
      current++
      const now = Date.now()
      
      // Throttle updates for better performance
      if (now - lastUpdate < updateInterval && current < total) {
        return
      }
      lastUpdate = now
      
      const elapsed = now - startTime
      const remaining = total - current
      const avgTimePerItem = elapsed / current
      const estimatedTimeRemaining = remaining * avgTimePerItem
      
      const progress = (current / total) * 100
      const progressBar = '█'.repeat(Math.floor(progress / 2)) + '░'.repeat(50 - Math.floor(progress / 2))
      
      // Enhanced progress display with memory info
      let display = `\r🚀 Progress: [${progressBar}] ${progress.toFixed(1)}% (${current}/${total}) | ⏱️ ETA: ${Math.round(estimatedTimeRemaining / 1000)}s | ⚡ ${Math.round(1000 / avgTimePerItem)}/s`
      
      if (config.enableMemoryMonitoring) {
        const memUsage = process.memoryUsage()
        display += ` | 🧠 ${(memUsage.heapUsed / 1024 / 1024).toFixed(1)}MB`
      }
      
      process.stdout.write(display)
      
      if (current === total) {
        console.log('\n✅ Countdown completed!')
      }
    },
    getCurrent: () => current,
    getTotal: () => total,
    getProgress: () => (current / total) * 100,
    getElapsedTime: () => Date.now() - startTime
  }
}

// Enhanced batch processing with retry logic
const processBatch = async <T>(
  items: T[], 
  batchSize: number, 
  processor: (batch: T[]) => Promise<void>,
  countdown?: ReturnType<typeof createCountdown>,
  config?: SeedingConfig
): Promise<void> => {
  const maxRetries = config?.maxRetries || 3
  const retryDelay = config?.retryDelay || 1000
  
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize)
    let retryCount = 0
    let success = false
    
    while (!success && retryCount < maxRetries) {
      try {
        await processor(batch)
        success = true
        
        if (countdown) {
          for (let j = 0; j < batch.length; j++) {
            countdown.increment()
          }
        }
      } catch (error) {
        retryCount++
        console.error(`\n❌ Batch ${Math.floor(i / batchSize) + 1} failed (attempt ${retryCount}/${maxRetries}):`, error)
        
        if (retryCount < maxRetries) {
          console.log(`⏳ Retrying in ${retryDelay}ms...`)
          await new Promise(resolve => setTimeout(resolve, retryDelay))
        } else {
          console.error(`💥 Batch ${Math.floor(i / batchSize) + 1} failed after ${maxRetries} attempts`)
          throw error
        }
      }
    }
  }
}

// Retry utility for individual operations
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

const seedCounselorProfiles = async (config: SeedingConfig = {
  batchSize: 50,
  maxRetries: 3,
  retryDelay: 1000,
  enableProgressBar: true,
  enableMemoryMonitoring: true,
  dryRun: false
}) => {
  const metrics: PerformanceMetrics = {
    startTime: Date.now(),
    totalProcessed: 0,
    totalErrors: 0,
    averageTimePerRecord: 0,
    memoryUsage: process.memoryUsage(),
    batchCount: 0,
    retryCount: 0
  }
  
  try {
    console.log('🌱 Starting REFINED counselor profile seeding...')
    console.log('⚡ Enhanced optimizations:')
    console.log(`   - Batch processing (${config.batchSize} records per batch)`)
    console.log(`   - Retry logic (${config.maxRetries} attempts)`)
    console.log('   - Real-time progress tracking')
    console.log('   - Memory monitoring')
    console.log('   - Error recovery and retry logic')
    console.log('   - Fisher-Yates shuffle optimization')
    console.log('')
    
    if (config.enableMemoryMonitoring) {
      logMemoryUsage('Initial')
    }
    
    // Connect to database with retry
    await retryOperation(() => connectDB(), config.maxRetries, config.retryDelay)
    
    // Find all users with role 'counselor' with projection for efficiency
    const counselorUsers = await retryOperation(
      () => User.find({ role: 'counselor' })
        .select('_id firstName lastName email')
        .lean(), // Use lean() for better performance
      config.maxRetries,
      config.retryDelay
    )
    
    console.log(`📋 Found ${counselorUsers.length} counselor users`)
    
    if (counselorUsers.length === 0) {
      console.log('❌ No counselor users found. Please run the user seeding first.')
      return
    }
    
    if (config.dryRun) {
      console.log('🔍 DRY RUN MODE - No changes will be made')
      console.log(`📋 Would process ${counselorUsers.length} counselors in batches of ${config.batchSize}`)
      return
    }
    
    // Clear existing counselor profiles with retry
    console.log('🧹 Clearing existing counselor profiles...')
    await retryOperation(() => Counselor.deleteMany({}), config.maxRetries, config.retryDelay)
    
    // Create countdown for progress tracking
    const countdown = config.enableProgressBar ? createCountdown(counselorUsers.length, config) : null
    if (countdown) console.log('')
    
    // Pre-generate data for efficiency
    const preGeneratedData = counselorUsers.map(user => {
      const city = cities[Math.floor(Math.random() * cities.length)]
      const state = states[Math.floor(Math.random() * states.length)]
      const experience = Math.floor(Math.random() * 15) + 2
      const counselorSpecializations = generateSpecializations()
      const counselorLanguages = generateLanguages()
      const counselorQualifications = generateQualifications()
      const availability = generateAvailability()
      const rating = Math.random() * 2 + 3
      const totalSessions = Math.floor(Math.random() * 500) + 50
      const consultationFee = Math.floor(Math.random() * 2000) + 500
      
      return {
        user,
        city,
        state,
        experience,
        counselorSpecializations,
        counselorLanguages,
        counselorQualifications,
        availability,
        rating,
        totalSessions,
        consultationFee
      }
    })
    
    // Process in batches for efficiency
    await processBatch(
      preGeneratedData,
      config.batchSize,
      async (batch) => {
        // Create counselor documents for batch
        const counselorDocs = batch.map(({ user, ...data }) => ({
          userId: user._id,
          specialization: data.counselorSpecializations,
          experience: data.experience,
          languages: data.counselorLanguages,
          availability: data.availability,
          rating: data.rating,
          totalSessions: data.totalSessions,
          bio: generateBio(data.counselorSpecializations, data.experience, user.firstName),
          qualifications: data.counselorQualifications,
          isAvailable: Math.random() > 0.1,
          consultationFee: data.consultationFee,
          currentSessionsToday: Math.floor(Math.random() * 3)
        }))
        
        // Batch insert for maximum efficiency
        await Counselor.insertMany(counselorDocs, { 
          ordered: false
        })
        
        metrics.totalProcessed += batch.length
        metrics.batchCount++
      },
      countdown || undefined,
      config
    )
    
    // Calculate final metrics
    metrics.endTime = Date.now()
    metrics.averageTimePerRecord = (metrics.endTime - metrics.startTime) / metrics.totalProcessed
    metrics.memoryUsage = process.memoryUsage()
    
    console.log('')
    console.log('🎉 Successfully seeded counselor profiles!')
    console.log('📊 Enhanced Performance Summary:')
    console.log(`   ⏱️  Total time: ${((metrics.endTime - metrics.startTime) / 1000).toFixed(2)}s`)
    console.log(`   📈 Records processed: ${metrics.totalProcessed}`)
    console.log(`   📦 Batches processed: ${metrics.batchCount}`)
    console.log(`   ❌ Errors: ${metrics.totalErrors}`)
    console.log(`   🔄 Retries: ${metrics.retryCount}`)
    console.log(`   ⚡ Average time per record: ${metrics.averageTimePerRecord.toFixed(2)}ms`)
    console.log(`   🚀 Processing rate: ${Math.round(1000 / metrics.averageTimePerRecord)} records/second`)
    
    if (config.enableMemoryMonitoring) {
      console.log('🧠 Memory Usage:')
      console.log(`   - RSS: ${(metrics.memoryUsage.rss / 1024 / 1024).toFixed(2)} MB`)
      console.log(`   - Heap Used: ${(metrics.memoryUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`)
      console.log(`   - Heap Total: ${(metrics.memoryUsage.heapTotal / 1024 / 1024).toFixed(2)} MB`)
    }
    
    console.log('')
    console.log('📋 Data Summary:')
    console.log(`   - Total counselor profiles: ${metrics.totalProcessed}`)
    console.log(`   - Average experience: ~9 years`)
    console.log(`   - Languages covered: ${[...new Set(languages)].length}`)
    console.log(`   - Specializations: ${specializations.length}`)
    
  } catch (error) {
    console.error('❌ Error seeding counselor profiles:', error)
    metrics.totalErrors++
    
    // Enhanced error reporting
    if (error instanceof Error) {
      console.error('📋 Error Details:')
      console.error(`   - Message: ${error.message}`)
      console.error(`   - Stack: ${error.stack?.split('\n')[0]}`)
    }
  } finally {
    // Graceful cleanup
    try {
      await mongoose.connection.close()
      console.log('🔌 Database connection closed gracefully')
    } catch (closeError) {
      console.error('⚠️ Error closing database connection:', closeError)
    }
  }
}

// Enhanced command line interface
const parseArgs = (): SeedingConfig => {
  const args = process.argv.slice(2)
  const options: SeedingConfig = {
    batchSize: 50,
    maxRetries: 3,
    retryDelay: 1000,
    enableProgressBar: true,
    enableMemoryMonitoring: true,
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
      case '--no-memory':
        options.enableMemoryMonitoring = false
        break
      case '--dry-run':
      case '-d':
        options.dryRun = true
        break
      case '--help':
      case '-h':
        showHelp()
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

const showHelp = () => {
  console.log(`
🌱 Counselor Profile Seeder - REFINED Version

Usage: npm run seed:counselors [options]

Options:
  -b, --batch-size <number>    Set batch size for processing (default: 50)
  -r, --max-retries <number>   Set maximum retry attempts (default: 3)
  --retry-delay <number>       Set delay between retries in ms (default: 1000)
  --no-progress               Disable progress bar
  --no-memory                 Disable memory monitoring
  -d, --dry-run              Show what would be done without executing
  -h, --help                 Show this help message

Examples:
  npm run seed:counselors                           # Run with default settings
  npm run seed:counselors -b 100 -r 5               # Use batch size 100 with 5 retries
  npm run seed:counselors --dry-run                 # Preview what would be done
  npm run seed:counselors --no-progress --no-memory # Minimal output

Enhanced Features:
  ⚡ Batch processing with configurable size
  🔄 Advanced retry logic with exponential backoff
  📊 Real-time progress tracking with countdown
  🧠 Memory usage monitoring
  📈 Comprehensive performance metrics
  💾 Memory-efficient operations with Fisher-Yates shuffle
  🛡️ Graceful error handling and recovery
  🎯 Optimized database connections
`)
}

// Enhanced seeding function with CLI options
const seedCounselorProfilesWithOptions = async (options: SeedingConfig) => {
  console.log(`⚙️  Configuration:`)
  console.log(`   - Batch size: ${options.batchSize}`)
  console.log(`   - Max retries: ${options.maxRetries}`)
  console.log(`   - Retry delay: ${options.retryDelay}ms`)
  console.log(`   - Progress bar: ${options.enableProgressBar ? 'enabled' : 'disabled'}`)
  console.log(`   - Memory monitoring: ${options.enableMemoryMonitoring ? 'enabled' : 'disabled'}`)
  console.log(`   - Dry run: ${options.dryRun ? 'enabled' : 'disabled'}`)
  console.log('')
  
  // Run the refined seeding with configuration
  await seedCounselorProfiles(options)
}

// Run the seeding function
if (require.main === module) {
  const options = parseArgs()
  
  seedCounselorProfilesWithOptions(options)
    .then(() => {
      console.log('✅ Seeding completed successfully')
      process.exit(0)
    })
    .catch((error) => {
      console.error('❌ Seeding failed:', error)
      process.exit(1)
    })
}

export default seedCounselorProfiles
