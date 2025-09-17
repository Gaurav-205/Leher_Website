const mongoose = require('mongoose');
const axios = require('axios');
require('dotenv').config();

// Set environment variables if not set
if (!process.env.MONGODB_URI) {
  process.env.MONGODB_URI = 'mongodb+srv://gauravkhandelwal205_db_user:gaurav@cluster0.urnv9wg.mongodb.net/test';
}

const API_BASE_URL = 'http://localhost:5000/api';

// Test function to test community feature with commenting
const testCommunityFeature = async () => {
  try {
    console.log('🔍 Testing Community Feature with Commenting...');
    
    // Step 1: Login as a student to get token
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
      title: 'Test Post: Mental Health Support',
      content: 'This is a test post to demonstrate the community feature. I am sharing my experience with managing academic stress and would love to hear from others who have similar experiences.',
      category: 'mental-health',
      tags: ['academic-stress', 'support', 'community'],
      isAnonymous: false
    };
    
    const postResponse = await axios.post(`${API_BASE_URL}/community/posts`, postData, { headers });
    const postId = postResponse.data.data._id;
    console.log('✅ Post created successfully');
    console.log(`   Post ID: ${postId}`);
    console.log(`   Title: ${postResponse.data.data.title}`);
    
    // Step 3: Get the created post
    console.log('\n3️⃣ Retrieving the created post...');
    const getPostResponse = await axios.get(`${API_BASE_URL}/community/posts/${postId}`, { headers });
    console.log('✅ Post retrieved successfully');
    const post = getPostResponse.data.data.post;
    console.log(`   Author: ${post.author.firstName} ${post.author.lastName}`);
    console.log(`   Category: ${post.category}`);
    console.log(`   Tags: ${post.tags.join(', ')}`);
    
    // Step 4: Create comments on the post
    console.log('\n4️⃣ Creating comments on the post...');
    
    const comments = [
      {
        content: 'Thank you for sharing this! I can relate to academic stress. What strategies have worked best for you?',
        parentComment: null
      },
      {
        content: 'I found that setting a study schedule really helped me manage my workload better.',
        parentComment: null
      },
      {
        content: 'Have you tried meditation or mindfulness exercises? They helped me a lot.',
        parentComment: null
      }
    ];
    
    const createdComments = [];
    for (let i = 0; i < comments.length; i++) {
      const commentResponse = await axios.post(
        `${API_BASE_URL}/community/posts/${postId}/comments`, 
        comments[i], 
        { headers }
      );
      createdComments.push(commentResponse.data.data);
      console.log(`✅ Comment ${i + 1} created: ${commentResponse.data.data.content.substring(0, 50)}...`);
    }
    
    // Step 5: Create a reply to the first comment
    console.log('\n5️⃣ Creating a reply to the first comment...');
    const replyData = {
      content: 'I agree! Time management is crucial. I use the Pomodoro technique and it works wonders.',
      parentComment: createdComments[0]._id
    };
    
    const replyResponse = await axios.post(
      `${API_BASE_URL}/community/posts/${postId}/comments`, 
      replyData, 
      { headers }
    );
    console.log('✅ Reply created successfully');
    console.log(`   Reply: ${replyResponse.data.data.content}`);
    
    // Step 6: Like and dislike comments
    console.log('\n6️⃣ Testing comment likes and dislikes...');
    
    // Like the first comment
    await axios.post(`${API_BASE_URL}/community/comments/${createdComments[0]._id}/like`, {}, { headers });
    console.log('✅ Liked first comment');
    
    // Like the second comment
    await axios.post(`${API_BASE_URL}/community/comments/${createdComments[1]._id}/like`, {}, { headers });
    console.log('✅ Liked second comment');
    
    // Step 7: Get all comments for the post
    console.log('\n7️⃣ Retrieving all comments for the post...');
    const updatedPostResponse = await axios.get(`${API_BASE_URL}/community/posts/${postId}`, { headers });
    const postComments = updatedPostResponse.data.data.post.comments;
    
    console.log(`✅ Retrieved ${postComments.length} comments`);
    postComments.forEach((comment, index) => {
      console.log(`   ${index + 1}. ${comment.content.substring(0, 60)}...`);
      console.log(`      Author: ${comment.author.firstName} ${comment.author.lastName}`);
      console.log(`      Likes: ${comment.likeCount}, Replies: ${comment.replyCount}`);
      console.log(`      Created: ${new Date(comment.createdAt).toLocaleString()}`);
    });
    
    // Step 8: Update a comment
    console.log('\n8️⃣ Updating a comment...');
    const updateData = {
      content: 'Thank you for sharing this! I can relate to academic stress. What strategies have worked best for you? I would love to learn more about your experience.'
    };
    
    const updateResponse = await axios.put(
      `${API_BASE_URL}/community/comments/${createdComments[0]._id}`, 
      updateData, 
      { headers }
    );
    console.log('✅ Comment updated successfully');
    console.log(`   Updated content: ${updateResponse.data.data.content.substring(0, 80)}...`);
    console.log(`   Is edited: ${updateResponse.data.data.isEdited}`);
    
    // Step 9: Get comment replies
    console.log('\n9️⃣ Getting comment replies...');
    const repliesResponse = await axios.get(
      `${API_BASE_URL}/community/comments/${createdComments[0]._id}/replies`, 
      { headers }
    );
    console.log(`✅ Retrieved ${repliesResponse.data.data.length} replies`);
    repliesResponse.data.data.forEach((reply, index) => {
      console.log(`   Reply ${index + 1}: ${reply.content.substring(0, 60)}...`);
    });
    
    // Step 10: Test with different user (counselor)
    console.log('\n🔟 Testing with counselor user...');
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
      content: 'As a mental health professional, I recommend seeking support from your institution\'s counseling services. They can provide personalized strategies for managing academic stress.',
      parentComment: null
    };
    
    const counselorCommentResponse = await axios.post(
      `${API_BASE_URL}/community/posts/${postId}/comments`, 
      counselorCommentData, 
      { headers: counselorHeaders }
    );
    console.log('✅ Counselor comment added successfully');
    console.log(`   Comment: ${counselorCommentResponse.data.data.content.substring(0, 80)}...`);
    
    // Step 11: Final post summary
    console.log('\n📊 Final Post Summary:');
    const finalPostResponse = await axios.get(`${API_BASE_URL}/community/posts/${postId}`, { headers });
    const finalPost = finalPostResponse.data.data.post;
    
    console.log(`   Title: ${finalPost.title}`);
    console.log(`   Author: ${finalPost.author.firstName} ${finalPost.author.lastName}`);
    console.log(`   Category: ${finalPost.category}`);
    console.log(`   Total Comments: ${finalPost.commentCount}`);
    console.log(`   Views: ${finalPost.views}`);
    console.log(`   Created: ${new Date(finalPost.createdAt).toLocaleString()}`);
    
    console.log('\n🎉 Community feature with commenting tested successfully!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
    if (error.response?.data) {
      console.error('Response data:', JSON.stringify(error.response.data, null, 2));
    }
  }
};

testCommunityFeature();
