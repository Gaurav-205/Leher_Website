const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000/api';

// Debug authorization issue
const testDebugAuthorization = async () => {
  try {
    console.log('🔍 Debug Authorization Issue...');
    
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
      title: 'Debug Authorization Post',
      content: 'Debugging authorization issue.',
      category: 'general',
      tags: ['debug'],
      isAnonymous: false
    };
    
    const postResponse = await axios.post(`${API_BASE_URL}/community/posts`, postData, { headers });
    const postId = postResponse.data.data._id;
    console.log('✅ Post created');
    
    // Step 3: Create a comment
    const commentData = {
      content: 'Debug comment for authorization test.',
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
    
    // Step 4: Try to get the comment directly to see its structure
    console.log('\n4️⃣ Getting comment directly...');
    try {
      // This endpoint doesn't exist, but let's try to understand the structure
      console.log('   Comment structure from creation:');
      console.log(`   - Author ID: ${commentResponse.data.data.author._id}`);
      console.log(`   - Author Name: ${commentResponse.data.data.author.firstName} ${commentResponse.data.data.author.lastName}`);
      console.log(`   - User ID: ${userId}`);
      console.log(`   - IDs match: ${commentResponse.data.data.author._id === userId}`);
    } catch (error) {
      console.log('   No direct comment endpoint available');
    }
    
    // Step 5: Try to update the comment
    console.log('\n5️⃣ Trying to update comment...');
    const updateData = {
      content: 'Updated debug comment.'
    };
    
    try {
      const updateResponse = await axios.put(
        `${API_BASE_URL}/community/comments/${commentId}`, 
        updateData, 
        { headers }
      );
      console.log('✅ Comment updated successfully');
    } catch (updateError) {
      console.log('❌ Comment update failed');
      console.log(`   Error: ${updateError.response?.data?.message || updateError.message}`);
      
      // Let's check if the issue is with the token or user context
      console.log('\n   Debugging user context:');
      console.log(`   - Token: ${token.substring(0, 50)}...`);
      console.log(`   - User ID from login: ${userId}`);
      console.log(`   - Comment Author ID: ${commentResponse.data.data.author._id}`);
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
};

testDebugAuthorization();
