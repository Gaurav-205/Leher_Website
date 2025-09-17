const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000/api';

// Test function to retrieve users data via API
const testUsersAPI = async () => {
  try {
    console.log('🔍 Testing Users API...');
    
    // Step 1: Login as admin to get token
    console.log('\n1️⃣ Logging in as admin...');
    const loginResponse = await axios.post(`${API_BASE_URL}/auth/login`, {
      email: 'admin1@leher.com',
      password: 'Admin@123',
      userType: 'admin'
    });
    
    const token = loginResponse.data.data.token;
    console.log('✅ Login successful, token received');
    
    // Step 2: Test users endpoint
    console.log('\n2️⃣ Testing /api/users endpoint...');
    try {
      const usersResponse = await axios.get(`${API_BASE_URL}/users`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log('✅ Users endpoint response:');
      console.log(JSON.stringify(usersResponse.data, null, 2));
    } catch (error) {
      console.log('❌ Users endpoint error:');
      console.log(`Status: ${error.response?.status}`);
      console.log(`Message: ${error.response?.data?.message || error.message}`);
    }
    
    // Step 3: Test profile endpoint
    console.log('\n3️⃣ Testing /api/auth/profile endpoint...');
    try {
      const profileResponse = await axios.get(`${API_BASE_URL}/auth/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log('✅ Profile endpoint response:');
      console.log(JSON.stringify(profileResponse.data, null, 2));
    } catch (error) {
      console.log('❌ Profile endpoint error:');
      console.log(`Status: ${error.response?.status}`);
      console.log(`Message: ${error.response?.data?.message || error.message}`);
    }
    
    // Step 4: Test with different user types
    console.log('\n4️⃣ Testing login with different user types...');
    
    const testUsers = [
      { email: 'gauravkhandelwal205@gmail.com', password: 'Moderator@123', userType: 'moderator' },
      { email: 'kavita@counselor.com', password: 'Couns@123', userType: 'counselor' },
      { email: 'aanya@student.com', password: 'User@123', userType: 'student' }
    ];
    
    for (const user of testUsers) {
      try {
        const userLoginResponse = await axios.post(`${API_BASE_URL}/auth/login`, user);
        console.log(`✅ ${user.userType} login successful: ${user.email}`);
        
        // Get profile for this user
        const userToken = userLoginResponse.data.data.token;
        const userProfileResponse = await axios.get(`${API_BASE_URL}/auth/profile`, {
          headers: {
            'Authorization': `Bearer ${userToken}`,
            'Content-Type': 'application/json'
          }
        });
        
        console.log(`   Profile: ${userProfileResponse.data.data.firstName} ${userProfileResponse.data.data.lastName} (${userProfileResponse.data.data.role})`);
      } catch (error) {
        console.log(`❌ ${user.userType} login failed: ${error.response?.data?.message || error.message}`);
      }
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
};

testUsersAPI();
