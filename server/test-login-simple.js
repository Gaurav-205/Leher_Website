const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000/api';

// Simple login test
const testLoginSimple = async () => {
  try {
    console.log('🔍 Simple Login Test...');
    
    const loginResponse = await axios.post(`${API_BASE_URL}/auth/login`, {
      email: 'aanya@student.com',
      password: 'User@123',
      userType: 'student'
    });
    
    console.log('✅ Login successful');
    console.log('Response:', JSON.stringify(loginResponse.data, null, 2));
    
  } catch (error) {
    console.error('❌ Login failed:', error.response?.data || error.message);
  }
};

testLoginSimple();
