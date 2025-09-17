const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000/api';

// Test comment update authorization
const testCommentUpdate = async () => {
  try {
    console.log('🔍 Testing Comment Update Authorization...');
    
    // Step 1: Login
    const loginResponse = await axios.post(`${API_BASE_URL}/auth/login`, {
      email: 'aanya@student.com',
      password: 'User@123',
      userType: 'student'
    });
    
    const token = loginResponse.data.data.token;
    const userId = loginResponse.data.data.user._id;
    console.log('✅ Login successful');
    console.log(`   User ID: ${userId}`);
    
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    
    // Step 2: Create a post
    const postData = {
      title: 'Authorization Test Post',
      content: 'Testing comment authorization.',
      category: 'general',
      tags: ['test'],
      isAnonymous: false
    };
    
    const postResponse = await axios.post(`${API_BASE_URL}/community/posts`, postData, { headers });
    const postId = postResponse.data.data._id;
    console.log('✅ Post created');
    
    // Step 3: Create a comment
    const commentData = {
      content: 'This is a test comment for authorization.',
      parentComment: null
    };
    
    const commentResponse = await axios.post(
      `${API_BASE_URL}/community/posts/${postId}/comments`, 
      commentData, 
      { headers }
    );
    const commentId = commentResponse.data.data._id;
    console.log('✅ Comment created');
    console.log(`   Comment ID: ${commentId}`);
    console.log(`   Comment Author: ${JSON.stringify(commentResponse.data.data.author)}`);
    
    // Step 4: Try to update the comment
    console.log('\n4️⃣ Trying to update comment...');
    const updateData = {
      content: 'This is an updated comment.'
    };
    
    try {
      const updateResponse = await axios.put(
        `${API_BASE_URL}/community/comments/${commentId}`, 
        updateData, 
        { headers }
      );
      console.log('✅ Comment updated successfully');
      console.log('Updated comment:', JSON.stringify(updateResponse.data, null, 2));
    } catch (updateError) {
      console.log('❌ Comment update failed');
      console.log(`   Error: ${updateError.response?.data?.message || updateError.message}`);
      console.log('   Response:', JSON.stringify(updateError.response?.data, null, 2));
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
};

testCommentUpdate();
