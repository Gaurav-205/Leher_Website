const mongoose = require('mongoose');
require('dotenv').config();

// Set environment variables if not set
if (!process.env.MONGODB_URI) {
  process.env.MONGODB_URI = 'mongodb+srv://vrajpatel402126_db_user:sih2025@cluster0.ksyr7z7.mongodb.net/mental-health-platform';
}

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Test script to check counselors
const testCounselors = async () => {
  try {
    await connectDB();
    
    // Import models
    const { Counselor } = require('./dist/models/Counselor');
    const { User } = require('./dist/models/User');
    
    console.log('🔍 Checking counselors in database...');
    
    // Count total counselors
    const totalCounselors = await Counselor.countDocuments();
    console.log(`📊 Total counselors in database: ${totalCounselors}`);
    
    // Get first 5 counselors with populated user data
    const counselors = await Counselor.find({})
      .populate('userId', 'firstName lastName email')
      .limit(5);
    
    console.log('\n👥 Sample counselors:');
    counselors.forEach((counselor, index) => {
      console.log(`${index + 1}. ${counselor.userId.firstName} ${counselor.userId.lastName}`);
      console.log(`   Email: ${counselor.userId.email}`);
      console.log(`   Specializations: ${counselor.specialization.join(', ')}`);
      console.log(`   Available: ${counselor.isAvailable}`);
      console.log(`   Rating: ${counselor.rating}`);
      console.log('');
    });
    
    // Check available counselors
    const availableCounselors = await Counselor.find({ isAvailable: true });
    console.log(`✅ Available counselors: ${availableCounselors.length}`);
    
  } catch (error) {
    console.error('❌ Error testing counselors:', error);
  } finally {
    mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
};

testCounselors();
