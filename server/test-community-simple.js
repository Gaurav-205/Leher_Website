const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000/api';

// Simple test for community feature
const testCommunitySimple = async () => {
  try {
    console.log('🔍 Simple Community Test...');
    
    // Step 1: Login
    console.log('\n1️⃣ Logging in...');
    const loginResponse = await axios.post(`${API_BASE_URL}/auth/login`, {
      email: 'aanya@student.com',
      password: 'User@123',
      userType: 'student'
    });
    
    const token = loginResponse.data.data.token;
    console.log('✅ Login successful');
    
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    
    // Step 2: Create a post
    console.log('\n2️⃣ Creating a post...');
    const postData = {
      title: 'Simple Test Post',
      content: 'This is a simple test post for the community feature.',
      category: 'general',
      tags: ['test'],
      isAnonymous: false
    };
    
    const postResponse = await axios.post(`${API_BASE_URL}/community/posts`, postData, { headers });
    console.log('✅ Post created');
    console.log('Post response:', JSON.stringify(postResponse.data, null, 2));
    
    const postId = postResponse.data.data._id;
    
    // Step 3: Get the post
    console.log('\n3️⃣ Getting the post...');
    const getPostResponse = await axios.get(`${API_BASE_URL}/community/posts/${postId}`, { headers });
    console.log('✅ Post retrieved');
    console.log('Get post response:', JSON.stringify(getPostResponse.data, null, 2));
    
    // Step 4: Create a comment
    console.log('\n4️⃣ Creating a comment...');
    const commentData = {
      content: 'This is a test comment on the post.',
      parentComment: null
    };
    
    const commentResponse = await axios.post(
      `${API_BASE_URL}/community/posts/${postId}/comments`, 
      commentData, 
      { headers }
    );
    console.log('✅ Comment created');
    console.log('Comment response:', JSON.stringify(commentResponse.data, null, 2));
    
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
    if (error.response?.data) {
      console.error('Response data:', JSON.stringify(error.response.data, null, 2));
    }
  }
};

testCommunitySimple();
