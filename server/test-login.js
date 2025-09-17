const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
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

// Add matchPassword method
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

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

// Test login functionality
const testLogin = async () => {
  try {
    await connectDB();
    
    console.log('🔍 Testing login functionality...');
    
    // Test admin login
    const adminEmail = 'admin1@leher.com';
    const adminPassword = 'Admin@123';
    
    console.log(`\n1️⃣ Testing admin login: ${adminEmail}`);
    
    // Find user
    const user = await User.findOne({ email: adminEmail }).select('+password');
    if (!user) {
      console.log('❌ User not found');
      return;
    }
    
    console.log('✅ User found:');
    console.log(`   Name: ${user.firstName} ${user.lastName}`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Role: ${user.role}`);
    console.log(`   Verified: ${user.isVerified}`);
    
    // Test password match
    console.log('\n2️⃣ Testing password match...');
    const isMatch = await user.matchPassword(adminPassword);
    console.log(`Password match: ${isMatch ? '✅' : '❌'}`);
    
    if (!isMatch) {
      console.log('\n🔍 Debugging password issue...');
      console.log(`Stored password hash: ${user.password.substring(0, 20)}...`);
      
      // Try to hash the password again and compare
      const testHash = await bcrypt.hash(adminPassword, 12);
      console.log(`Test hash: ${testHash.substring(0, 20)}...`);
      
      const directCompare = await bcrypt.compare(adminPassword, user.password);
      console.log(`Direct bcrypt compare: ${directCompare ? '✅' : '❌'}`);
    }
    
    // Test other users
    console.log('\n3️⃣ Testing other user logins...');
    const testUsers = [
      { email: 'gauravkhandelwal205@gmail.com', password: 'Moderator@123' },
      { email: 'kavita@counselor.com', password: 'Couns@123' },
      { email: 'aanya@student.com', password: 'User@123' }
    ];
    
    for (const testUser of testUsers) {
      const foundUser = await User.findOne({ email: testUser.email }).select('+password');
      if (foundUser) {
        const passwordMatch = await foundUser.matchPassword(testUser.password);
        console.log(`${testUser.email}: ${passwordMatch ? '✅' : '❌'}`);
      } else {
        console.log(`${testUser.email}: ❌ User not found`);
      }
    }
    
  } catch (error) {
    console.error('❌ Error testing login:', error);
  } finally {
    mongoose.connection.close();
    console.log('\n🔌 Database connection closed');
  }
};

testLogin();
