const mongoose = require('mongoose');
require('dotenv').config();

// Set environment variables if not set
if (!process.env.MONGODB_URI) {
  process.env.MONGODB_URI = 'mongodb+srv://gauravkhandelwal205_db_user:gaurav@cluster0.urnv9wg.mongodb.net/test';
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
    
    // Define models inline
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
    }, { timestamps: true });

    const availabilitySchema = new mongoose.Schema({
      dayOfWeek: { type: Number, required: true, min: 0, max: 6 },
      startTime: { type: String, required: true },
      endTime: { type: String, required: true },
      isAvailable: { type: Boolean, default: true }
    });

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
    }, { timestamps: true });

    const User = mongoose.model('User', userSchema);
    const Counselor = mongoose.model('Counselor', counselorSchema);
    
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
