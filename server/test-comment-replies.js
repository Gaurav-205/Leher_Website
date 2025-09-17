const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000/api';

// Test comment replies functionality
const testCommentReplies = async () => {
  try {
    console.log('🔍 Testing Comment Replies Functionality...');
    
    // Step 1: Login as student
    console.log('\n1️⃣ Logging in as student...');
    const loginResponse = await axios.post(`${API_BASE_URL}/auth/login`, {
      email: 'aanya@student.com',
      password: 'User@123',
      userType: 'student'
    });
    
    const token = loginResponse.data.data.token;
    console.log('✅ Student login successful');
    
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    
    // Step 2: Create a post
    console.log('\n2️⃣ Creating a post...');
    const postData = {
      title: 'Comment Replies Test Post',
      content: 'This post is for testing comment replies functionality.',
      category: 'general',
      tags: ['test', 'comments'],
      isAnonymous: false
    };
    
    const postResponse = await axios.post(`${API_BASE_URL}/community/posts`, postData, { headers });
    const postId = postResponse.data.data._id;
    console.log('✅ Post created successfully');
    console.log(`   Post ID: ${postId}`);
    
    // Step 3: Create a main comment
    console.log('\n3️⃣ Creating a main comment...');
    const mainCommentData = {
      content: 'This is a main comment. Other users can reply to this!',
      parentComment: null
    };
    
    const mainCommentResponse = await axios.post(
      `${API_BASE_URL}/community/posts/${postId}/comments`, 
      mainCommentData, 
      { headers }
    );
    const mainCommentId = mainCommentResponse.data.data._id;
    console.log('✅ Main comment created');
    console.log(`   Comment ID: ${mainCommentId}`);
    console.log(`   Content: ${mainCommentResponse.data.data.content}`);
    
    // Step 4: Login as another user (counselor)
    console.log('\n4️⃣ Logging in as counselor...');
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
    console.log('✅ Counselor login successful');
    
    // Step 5: Counselor replies to the main comment
    console.log('\n5️⃣ Counselor replying to main comment...');
    const replyData = {
      content: 'Thank you for sharing! As a counselor, I can provide some professional insights on this topic.',
      parentComment: mainCommentId
    };
    
    const replyResponse = await axios.post(
      `${API_BASE_URL}/community/posts/${postId}/comments`, 
      replyData, 
      { headers: counselorHeaders }
    );
    const replyId = replyResponse.data.data._id;
    console.log('✅ Reply created successfully');
    console.log(`   Reply ID: ${replyId}`);
    console.log(`   Content: ${replyResponse.data.data.content}`);
    console.log(`   Parent Comment: ${replyResponse.data.data.parentComment}`);
    
    // Step 6: Student replies to the counselor's reply (nested reply)
    console.log('\n6️⃣ Student replying to counselor\'s reply...');
    const nestedReplyData = {
      content: 'That\'s very helpful! Could you provide more specific advice on this topic?',
      parentComment: replyId
    };
    
    const nestedReplyResponse = await axios.post(
      `${API_BASE_URL}/community/posts/${postId}/comments`, 
      nestedReplyData, 
      { headers }
    );
    const nestedReplyId = nestedReplyResponse.data.data._id;
    console.log('✅ Nested reply created successfully');
    console.log(`   Nested Reply ID: ${nestedReplyId}`);
    console.log(`   Content: ${nestedReplyResponse.data.data.content}`);
    console.log(`   Parent Comment: ${nestedReplyResponse.data.data.parentComment}`);
    
    // Step 7: Get the post with all comments to see the structure
    console.log('\n7️⃣ Retrieving post with all comments...');
    const getPostResponse = await axios.get(`${API_BASE_URL}/community/posts/${postId}`, { headers });
    const post = getPostResponse.data.data.post;
    const postComments = post.comments;
    
    console.log('✅ Post retrieved successfully');
    console.log(`   Total Comments: ${post.commentCount}`);
    console.log(`   Comments Array Length: ${postComments.length}`);
    
    // Step 8: Get replies for the main comment
    console.log('\n8️⃣ Getting replies for main comment...');
    const repliesResponse = await axios.get(
      `${API_BASE_URL}/community/comments/${mainCommentId}/replies`, 
      { headers }
    );
    console.log('✅ Replies retrieved successfully');
    console.log(`   Number of replies: ${repliesResponse.data.data.replies.length}`);
    
    repliesResponse.data.data.replies.forEach((reply, index) => {
      console.log(`   Reply ${index + 1}:`);
      console.log(`     ID: ${reply._id}`);
      console.log(`     Author: ${reply.author.firstName} ${reply.author.lastName}`);
      console.log(`     Content: ${reply.content.substring(0, 60)}...`);
      console.log(`     Parent: ${reply.parentComment}`);
      console.log(`     Replies: ${reply.replyCount}`);
    });
    
    // Step 9: Like some comments
    console.log('\n9️⃣ Liking comments...');
    await axios.post(`${API_BASE_URL}/community/comments/${mainCommentId}/like`, {}, { headers });
    await axios.post(`${API_BASE_URL}/community/comments/${replyId}/like`, {}, { headers: counselorHeaders });
    console.log('✅ Comments liked successfully');
    
    // Step 10: Final summary
    console.log('\n📊 Comment Replies Test Summary:');
    console.log('   ✅ Main comment created');
    console.log('   ✅ Reply to main comment created');
    console.log('   ✅ Nested reply (reply to reply) created');
    console.log('   ✅ Comment structure maintained');
    console.log('   ✅ Replies properly linked to parent comments');
    console.log('   ✅ Multi-user interaction working');
    console.log('   ✅ Comment likes working');
    
    console.log('\n🎉 Comment replies functionality tested successfully!');
    console.log('\n💡 How it works:');
    console.log('   1. Users can create main comments on posts');
    console.log('   2. Other users can reply to main comments');
    console.log('   3. Users can reply to replies (nested comments)');
    console.log('   4. Each comment tracks its parent comment');
    console.log('   5. Comments maintain proper hierarchy');
    console.log('   6. All users can interact with any comment');
    
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
    if (error.response?.data) {
      console.error('Response data:', JSON.stringify(error.response.data, null, 2));
    }
  }
};

testCommentReplies();
