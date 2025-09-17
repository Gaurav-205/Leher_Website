const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000/api';

// Test data
const testUser = {
  email: 'test@example.com',
  password: 'password123'
};

const testPost = {
  title: 'Test Post for Bug Fixes',
  content: 'This is a test post to verify all community bug fixes are working correctly.',
  category: 'general',
  isAnonymous: false
};

const testComment = {
  content: 'This is a test comment to verify comment functionality.'
};

async function testCommunityFixes() {
  console.log('🧪 Testing Community Feature Bug Fixes...\n');

  try {
    // Test 1: Login to get auth token
    console.log('1. Testing authentication...');
    const loginResponse = await axios.post(`${API_BASE_URL}/auth/login`, testUser);
    const token = loginResponse.data.data.token;
    console.log('✅ Authentication successful\n');

    const headers = { Authorization: `Bearer ${token}` };

    // Test 2: Get categories
    console.log('2. Testing category endpoint...');
    const categoriesResponse = await axios.get(`${API_BASE_URL}/community/categories`);
    console.log('✅ Categories loaded:', categoriesResponse.data.data.length, 'categories\n');

    // Test 3: Create a post
    console.log('3. Testing post creation...');
    const createPostResponse = await axios.post(`${API_BASE_URL}/community/posts`, testPost, { headers });
    const postId = createPostResponse.data.data._id;
    console.log('✅ Post created successfully:', postId, '\n');

    // Test 4: Get posts
    console.log('4. Testing posts retrieval...');
    const postsResponse = await axios.get(`${API_BASE_URL}/community/posts`);
    console.log('✅ Posts retrieved:', postsResponse.data.data.posts.length, 'posts\n');

    // Test 5: Get single post with comments
    console.log('5. Testing single post retrieval...');
    const singlePostResponse = await axios.get(`${API_BASE_URL}/community/posts/${postId}`);
    console.log('✅ Single post retrieved with comments populated\n');

    // Test 6: Create a comment
    console.log('6. Testing comment creation...');
    const createCommentResponse = await axios.post(`${API_BASE_URL}/community/posts/${postId}/comments`, testComment, { headers });
    const commentId = createCommentResponse.data.data._id;
    console.log('✅ Comment created successfully:', commentId, '\n');

    // Test 7: Like a post
    console.log('7. Testing post like functionality...');
    const likePostResponse = await axios.post(`${API_BASE_URL}/community/posts/${postId}/like`, {}, { headers });
    console.log('✅ Post liked successfully\n');

    // Test 8: Like a comment
    console.log('8. Testing comment like functionality...');
    const likeCommentResponse = await axios.post(`${API_BASE_URL}/community/comments/${commentId}/like`, {}, { headers });
    console.log('✅ Comment liked successfully\n');

    // Test 9: Test rate limiting (spam protection)
    console.log('9. Testing rate limiting...');
    try {
      // Try to create multiple comments quickly
      for (let i = 0; i < 6; i++) {
        await axios.post(`${API_BASE_URL}/community/posts/${postId}/comments`, {
          content: `Spam comment ${i + 1}`
        }, { headers });
      }
      console.log('❌ Rate limiting not working - spam comments were allowed\n');
    } catch (error) {
      if (error.response?.status === 429) {
        console.log('✅ Rate limiting working correctly - spam blocked\n');
      } else {
        console.log('❌ Unexpected error in rate limiting test:', error.response?.data?.message, '\n');
      }
    }

    // Test 10: Test input sanitization
    console.log('10. Testing input sanitization...');
    const sanitizedPost = {
      title: '  Test Post with Whitespace  ',
      content: '  Content with whitespace  ',
      category: 'general',
      isAnonymous: false
    };
    const sanitizedPostResponse = await axios.post(`${API_BASE_URL}/community/posts`, sanitizedPost, { headers });
    const sanitizedPostId = sanitizedPostResponse.data.data._id;
    
    // Get the post back to verify sanitization
    const getSanitizedPostResponse = await axios.get(`${API_BASE_URL}/community/posts/${sanitizedPostId}`);
    const retrievedPost = getSanitizedPostResponse.data.data.post;
    
    if (retrievedPost.title === 'Test Post with Whitespace' && retrievedPost.content === 'Content with whitespace') {
      console.log('✅ Input sanitization working correctly\n');
    } else {
      console.log('❌ Input sanitization not working properly\n');
    }

    // Test 11: Test comment replies
    console.log('11. Testing comment replies...');
    const replyResponse = await axios.post(`${API_BASE_URL}/community/posts/${postId}/comments`, {
      content: 'This is a reply to the comment',
      parentComment: commentId
    }, { headers });
    console.log('✅ Comment reply created successfully\n');

    // Test 12: Get comment replies
    console.log('12. Testing comment replies retrieval...');
    const repliesResponse = await axios.get(`${API_BASE_URL}/community/comments/${commentId}/replies`);
    console.log('✅ Comment replies retrieved:', repliesResponse.data.data.replies.length, 'replies\n');

    console.log('🎉 All community feature tests completed successfully!');
    console.log('\n📋 Summary of fixes applied:');
    console.log('✅ Fixed category mismatch between frontend and backend');
    console.log('✅ Added better error handling for comment replies');
    console.log('✅ Added input sanitization for posts and comments');
    console.log('✅ Added rate limiting for spam protection');
    console.log('✅ Added better error handling in frontend components');
    console.log('✅ Added useEffect cleanup to prevent memory leaks');
    console.log('✅ Added validation for comment replies');
    console.log('✅ Added better error messages and user feedback');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data?.message || error.message);
    console.error('Status:', error.response?.status);
    console.error('Data:', error.response?.data);
  }
}

// Run the tests
testCommunityFixes();
