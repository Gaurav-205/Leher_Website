const mongoose = require('mongoose');
require('dotenv').config();

// Set environment variables if not set
if (!process.env.MONGODB_URI) {
  process.env.MONGODB_URI = 'mongodb+srv://gauravkhandelwal205_db_user:gaurav@cluster0.urnv9wg.mongodb.net/test';
}

// User Schema
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'counselor', 'admin', 'moderator'], default: 'student' },
  isVerified: { type: Boolean, default: false },
  profile: {
    avatar: String,
    bio: String,
    phoneNumber: String
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

// Test script to retrieve users data
const retrieveUsers = async () => {
  try {
    await connectDB();
    
    console.log('🔍 Retrieving users data...');
    
    // Count total users
    const totalUsers = await User.countDocuments();
    console.log(`📊 Total users in database: ${totalUsers}`);
    
    // Get all users (without password)
    const users = await User.find({}).select('-password');
    
    console.log('\n👥 All Users:');
    console.log('='.repeat(80));
    
    users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.firstName} ${user.lastName}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Role: ${user.role}`);
      console.log(`   Verified: ${user.isVerified ? '✅' : '❌'}`);
      console.log(`   Created: ${user.createdAt.toLocaleDateString()}`);
      if (user.profile?.bio) {
        console.log(`   Bio: ${user.profile.bio.substring(0, 50)}...`);
      }
      console.log('');
    });
    
    // Get users by role
    const admins = await User.find({ role: 'admin' }).select('-password');
    const moderators = await User.find({ role: 'moderator' }).select('-password');
    const counselors = await User.find({ role: 'counselor' }).select('-password');
    const students = await User.find({ role: 'student' }).select('-password');
    
    console.log('\n📋 Users by Role:');
    console.log('='.repeat(50));
    console.log(`👤 Admins: ${admins.length}`);
    console.log(`🛡️ Moderators: ${moderators.length}`);
    console.log(`👨‍⚕️ Counselors: ${counselors.length}`);
    console.log(`🎓 Students: ${students.length}`);
    
    // Get recent users (last 5)
    const recentUsers = await User.find({})
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(5);
    
    console.log('\n🕒 Recent Users (Last 5):');
    console.log('='.repeat(50));
    recentUsers.forEach((user, index) => {
      console.log(`${index + 1}. ${user.firstName} ${user.lastName} (${user.role}) - ${user.createdAt.toLocaleDateString()}`);
    });
    
    // Test specific user lookup
    const testUser = await User.findOne({ email: 'gauravkhandelwal205@gmail.com' }).select('-password');
    if (testUser) {
      console.log('\n🎯 Test User Found:');
      console.log('='.repeat(50));
      console.log(`Name: ${testUser.firstName} ${testUser.lastName}`);
      console.log(`Email: ${testUser.email}`);
      console.log(`Role: ${testUser.role}`);
      console.log(`Verified: ${testUser.isVerified ? '✅' : '❌'}`);
    }
    
  } catch (error) {
    console.error('❌ Error retrieving users:', error);
  } finally {
    mongoose.connection.close();
    console.log('\n🔌 Database connection closed');
  }
};

retrieveUsers();
