// Test script for authentication flow
const testAuth = async () => {
  const baseURL = 'http://localhost:5000/api';
  
  // Test registration
  console.log('Testing registration...');
  try {
    const registerResponse = await fetch(`${baseURL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test-complete@example.com',
        password: 'Test123456',
        firstName: 'John',
        lastName: 'Doe',
        educationLevel: 'undergraduate',
        agreeToTerms: true
      })
    });
    
    const registerData = await registerResponse.json();
    console.log('Registration Status:', registerResponse.status);
    console.log('Registration Response:', JSON.stringify(registerData, null, 2));
    
    if (registerResponse.ok) {
      // Test login with the same credentials
      console.log('\nTesting login...');
      const loginResponse = await fetch(`${baseURL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'test-complete@example.com',
          password: 'Test123456'
        })
      });
      
      const loginData = await loginResponse.json();
      console.log('Login Status:', loginResponse.status);
      console.log('Login Response:', JSON.stringify(loginData, null, 2));
      
      if (loginResponse.ok && loginData.data?.token) {
        // Test protected route
        console.log('\nTesting protected route...');
        const profileResponse = await fetch(`${baseURL}/auth/profile`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${loginData.data.token}`,
            'Content-Type': 'application/json',
          }
        });
        
        const profileData = await profileResponse.json();
        console.log('Profile Status:', profileResponse.status);
        console.log('Profile Response:', JSON.stringify(profileData, null, 2));
      }
    }
  } catch (error) {
    console.error('Test failed:', error);
  }
};

testAuth();
