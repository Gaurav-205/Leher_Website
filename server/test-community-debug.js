const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000/api';

// Debug test for community feature
const testCommunityDebug = async () => {
  try {
    console.log('🔍 Debug Community Test...');
    
    // Step 1: Login
    console.log('\n1️⃣ Logging in...');
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
    console.log('\n2️⃣ Creating a post...');
    const postData = {
      title: 'Debug Test Post',
      content: 'This is a debug test post.',
      category: 'general',
      tags: ['debug'],
      isAnonymous: false
    };
    
    const postResponse = await axios.post(`${API_BASE_URL}/community/posts`, postData, { headers });
    const postId = postResponse.data.data._id;
    console.log('✅ Post created');
    console.log(`   Post ID: ${postId}`);
    
    // Step 3: Create a comment
    console.log('\n3️⃣ Creating a comment...');
    const commentData = {
      content: 'This is a debug comment.',
      parentComment: null
    };
    
    const commentResponse = await axios.post(
      `${API_BASE_URL}/community/posts/${postId}/comments`, 
      commentData, 
      { headers }
    );
    const commentId = commentResponse.data.data._id;
    const commentAuthorId = commentResponse.data.data.author._id;
    console.log('✅ Comment created');
    console.log(`   Comment ID: ${commentId}`);
    console.log(`   Comment Author ID: ${commentAuthorId}`);
    console.log(`   User ID: ${userId}`);
    console.log(`   IDs match: ${commentAuthorId === userId}`);
    
    // Step 4: Get the post with comments
    console.log('\n4️⃣ Getting post with comments...');
    const getPostResponse = await axios.get(`${API_BASE_URL}/community/posts/${postId}`, { headers });
    const post = getPostResponse.data.data.post;
    console.log('✅ Post retrieved');
    console.log(`   Post comments array length: ${post.comments.length}`);
    console.log(`   Post comment count: ${post.commentCount}`);
    
    // Step 5: Try to update the comment
    console.log('\n5️⃣ Trying to update comment...');
    const updateData = {
      content: 'This is an updated debug comment.'
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
    }
    
    // Step 6: Get all community posts to see if our post appears
    console.log('\n6️⃣ Getting all community posts...');
    const allPostsResponse = await axios.get(`${API_BASE_URL}/community/posts`, { headers });
    console.log('✅ All posts retrieved');
    console.log(`   Total posts: ${allPostsResponse.data.data.posts.length}`);
    allPostsResponse.data.data.posts.forEach((post, index) => {
      console.log(`   ${index + 1}. ${post.title} (${post.commentCount} comments)`);
    });
    
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
    if (error.response?.data) {
      console.error('Response data:', JSON.stringify(error.response.data, null, 2));
    }
  }
};

testCommunityDebug();
