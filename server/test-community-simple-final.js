const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000/api';

// Simple community test
const testCommunitySimpleFinal = async () => {
  try {
    console.log('🔍 Simple Community Test...');
    
    // Step 1: Login
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
    const postData = {
      title: 'Simple Community Test',
      content: 'Testing the community feature.',
      category: 'general',
      tags: ['test'],
      isAnonymous: false
    };
    
    const postResponse = await axios.post(`${API_BASE_URL}/community/posts`, postData, { headers });
    const postId = postResponse.data.data._id;
    console.log('✅ Post created');
    
    // Step 3: Create a comment
    const commentData = {
      content: 'This is a test comment.',
      parentComment: null
    };
    
    const commentResponse = await axios.post(
      `${API_BASE_URL}/community/posts/${postId}/comments`, 
      commentData, 
      { headers }
    );
    const commentId = commentResponse.data.data._id;
    console.log('✅ Comment created');
    
    // Step 4: Get the post with comments
    const getPostResponse = await axios.get(`${API_BASE_URL}/community/posts/${postId}`, { headers });
    const post = getPostResponse.data.data.post;
    console.log('✅ Post retrieved');
    console.log(`   Comments: ${post.commentCount}`);
    
    // Step 5: Like the comment
    await axios.post(`${API_BASE_URL}/community/comments/${commentId}/like`, {}, { headers });
    console.log('✅ Comment liked');
    
    // Step 6: Get all posts
    const allPostsResponse = await axios.get(`${API_BASE_URL}/community/posts`, { headers });
    console.log('✅ All posts retrieved');
    console.log(`   Total posts: ${allPostsResponse.data.data.posts.length}`);
    
    console.log('\n🎉 Community feature working!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
};

testCommunitySimpleFinal();
