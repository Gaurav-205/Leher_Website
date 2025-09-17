import mongoose from 'mongoose'
import { connectDB } from '@config/database'
import seedData from './seedData'

const runSeed = async () => {
  try {
    console.log('🔌 Connecting to MongoDB...')
    await connectDB()
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
