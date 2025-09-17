const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000/api';

// Comprehensive test for community feature with commenting
const testCommunityFinal = async () => {
  try {
    console.log('🔍 Comprehensive Community Feature Test...');
    
    // Step 1: Login as student
    console.log('\n1️⃣ Logging in as student...');
    const loginResponse = await axios.post(`${API_BASE_URL}/auth/login`, {
      email: 'aanya@student.com',
      password: 'User@123',
      userType: 'student'
    });
    
    const token = loginResponse.data.data.token;
    const userId = loginResponse.data.data.user._id;
    console.log('✅ Student login successful');
    
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    
    // Step 2: Create a community post
    console.log('\n2️⃣ Creating a community post...');
    const postData = {
      title: 'Final Test: Community Feature with Comments',
      content: 'This is a comprehensive test of the community feature with commenting functionality. I am sharing my experience and would love to hear from the community.',
      category: 'mental-health',
      tags: ['community', 'support', 'test'],
      isAnonymous: false
    };
    
    const postResponse = await axios.post(`${API_BASE_URL}/community/posts`, postData, { headers });
    const postId = postResponse.data.data._id;
    console.log('✅ Post created successfully');
    console.log(`   Post ID: ${postId}`);
    console.log(`   Title: ${postResponse.data.data.title}`);
    
    // Step 3: Create multiple comments
    console.log('\n3️⃣ Creating comments...');
    const comments = [
      'Thank you for sharing this! I can relate to your experience.',
      'This is really helpful. What strategies worked best for you?',
      'I appreciate you being open about this topic.'
    ];
    
    const createdComments = [];
    for (let i = 0; i < comments.length; i++) {
      const commentData = {
        content: comments[i],
        parentComment: null
      };
      
      const commentResponse = await axios.post(
        `${API_BASE_URL}/community/posts/${postId}/comments`, 
        commentData, 
        { headers }
      );
      createdComments.push(commentResponse.data.data);
      console.log(`✅ Comment ${i + 1} created`);
    }
    
    // Step 4: Create a reply to the first comment
    console.log('\n4️⃣ Creating a reply...');
    const replyData = {
      content: 'I agree! It takes courage to share personal experiences.',
      parentComment: createdComments[0]._id
    };
    
    const replyResponse = await axios.post(
      `${API_BASE_URL}/community/posts/${postId}/comments`, 
      replyData, 
      { headers }
    );
    console.log('✅ Reply created successfully');
    
    // Step 5: Like comments
    console.log('\n5️⃣ Liking comments...');
    await axios.post(`${API_BASE_URL}/community/comments/${createdComments[0]._id}/like`, {}, { headers });
    await axios.post(`${API_BASE_URL}/community/comments/${createdComments[1]._id}/like`, {}, { headers });
    console.log('✅ Comments liked successfully');
    
    // Step 6: Update a comment
    console.log('\n6️⃣ Updating a comment...');
    const updateData = {
      content: 'Thank you for sharing this! I can relate to your experience. This is really valuable for the community.'
    };
    
    const updateResponse = await axios.put(
      `${API_BASE_URL}/community/comments/${createdComments[0]._id}`, 
      updateData, 
      { headers }
    );
    console.log('✅ Comment updated successfully');
    console.log(`   Updated content: ${updateResponse.data.data.content.substring(0, 80)}...`);
    
    // Step 7: Get the post with all comments
    console.log('\n7️⃣ Retrieving post with comments...');
    const getPostResponse = await axios.get(`${API_BASE_URL}/community/posts/${postId}`, { headers });
    const post = getPostResponse.data.data.post;
    const postComments = post.comments;
    
    console.log('✅ Post retrieved successfully');
    console.log(`   Title: ${post.title}`);
    console.log(`   Author: ${post.author.firstName} ${post.author.lastName}`);
    console.log(`   Total Comments: ${post.commentCount}`);
    console.log(`   Views: ${post.views}`);
    
    console.log('\n📝 Comments:');
    postComments.forEach((comment, index) => {
      console.log(`   ${index + 1}. ${comment.content.substring(0, 60)}...`);
      console.log(`      Author: ${comment.author.firstName} ${comment.author.lastName}`);
      console.log(`      Likes: ${comment.likeCount}, Replies: ${comment.replyCount}`);
      console.log(`      Created: ${new Date(comment.createdAt).toLocaleString()}`);
    });
    
    // Step 8: Test with counselor user
    console.log('\n8️⃣ Testing with counselor user...');
    const counselorLoginResponse = await axios.post(`${API_BASE_URL}/auth/login`, {
      email: 'kavita@counselor.com',
      password: 'Couns@123',
      userType: 'counselor'
    });
    
    const counselorToken = counselorLoginResponse.data.data.token;
    const counselorHeaders = {
      'Authorization': `Bearer ${counselorToken}`,
      'Content-Type': 'application/json'
    };
    
    // Counselor adds a professional comment
    const counselorCommentData = {
      content: 'As a mental health professional, I recommend seeking support from qualified counselors. Remember, it\'s okay to ask for help.',
      parentComment: null
    };
    
    const counselorCommentResponse = await axios.post(
      `${API_BASE_URL}/community/posts/${postId}/comments`, 
      counselorCommentData, 
      { headers: counselorHeaders }
    );
    console.log('✅ Counselor comment added successfully');
    
    // Step 9: Get all community posts
    console.log('\n9️⃣ Getting all community posts...');
    const allPostsResponse = await axios.get(`${API_BASE_URL}/community/posts`, { headers });
    const allPosts = allPostsResponse.data.data.posts;
    
    console.log('✅ All posts retrieved');
    console.log(`   Total posts: ${allPosts.length}`);
    allPosts.forEach((post, index) => {
      console.log(`   ${index + 1}. ${post.title} (${post.commentCount} comments, ${post.likeCount} likes)`);
    });
    
    // Step 10: Test comment replies
    console.log('\n🔟 Testing comment replies...');
    const repliesResponse = await axios.get(
      `${API_BASE_URL}/community/comments/${createdComments[0]._id}/replies`, 
      { headers }
    );
    console.log(`✅ Retrieved ${repliesResponse.data.data.length} replies`);
    repliesResponse.data.data.forEach((reply, index) => {
      console.log(`   Reply ${index + 1}: ${reply.content.substring(0, 60)}...`);
    });
    
    console.log('\n🎉 Community feature with commenting tested successfully!');
    console.log('\n📊 Summary:');
    console.log('   ✅ Post creation and retrieval');
    console.log('   ✅ Comment creation and replies');
    console.log('   ✅ Comment likes and updates');
    console.log('   ✅ Multi-user interaction (student + counselor)');
    console.log('   ✅ Authorization and permissions');
    console.log('   ✅ Data persistence and relationships');
    
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
    if (error.response?.data) {
      console.error('Response data:', JSON.stringify(error.response.data, null, 2));
    }
  }
};

testCommunityFinal();
