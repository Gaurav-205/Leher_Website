# Mental Health Support Platform API Documentation

## Overview

This document provides comprehensive API documentation for the Mental Health Support Platform built for SIH 2025.

## Base URL

```
Development: http://localhost:5000/api
Production: https://api.mentalhealthsupport.com/api
```

## Authentication

Most endpoints require authentication using JWT tokens. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Response Format

All API responses follow this format:

```json
{
  "success": boolean,
  "data": any,
  "message": string,
  "error": string,
  "errors": object
}
```

## Endpoints

### Authentication

#### Register User
- **POST** `/auth/register`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "SecurePassword123",
    "firstName": "John",
    "lastName": "Doe",
    "institutionId": "optional-institution-id",
    "problemDescription": "optional-description",
    "agreeToTerms": true
  }
  ```

#### Login User
- **POST** `/auth/login`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "SecurePassword123"
  }
  ```

#### Get Profile
- **GET** `/auth/profile`
- **Headers:** `Authorization: Bearer <token>`

#### Update Profile
- **PUT** `/auth/profile`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "phoneNumber": "9876543210",
    "bio": "Updated bio"
  }
  ```

#### Change Password
- **PUT** `/auth/change-password`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "currentPassword": "OldPassword123",
    "newPassword": "NewPassword123"
  }
  ```

#### Forgot Password
- **POST** `/auth/forgot-password`
- **Body:**
  ```json
  {
    "email": "user@example.com"
  }
  ```

#### Reset Password
- **POST** `/auth/reset-password`
- **Body:**
  ```json
  {
    "token": "reset-token",
    "password": "NewPassword123"
  }
  ```

### Chatbot

#### Send Message
- **POST** `/chatbot/message`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "message": "I'm feeling anxious about my exams",
    "sessionId": "session-id"
  }
  ```

#### Get Chat History
- **GET** `/chatbot/history`
- **Headers:** `Authorization: Bearer <token>`
- **Query Parameters:**
  - `sessionId` (optional)
  - `limit` (default: 50)
  - `page` (default: 1)

#### Start New Session
- **POST** `/chatbot/session`
- **Headers:** `Authorization: Bearer <token>`

### Appointments

#### Get Appointments
- **GET** `/appointments`
- **Headers:** `Authorization: Bearer <token>`
- **Query Parameters:**
  - `status` (optional)
  - `counselorId` (optional)
  - `date` (optional)

#### Create Appointment
- **POST** `/appointments`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "counselorId": "counselor-id",
    "date": "2025-01-15",
    "time": "14:00",
    "duration": 60,
    "type": "individual",
    "notes": "Optional notes"
  }
  ```

#### Get Available Counselors
- **GET** `/appointments/counselors`
- **Headers:** `Authorization: Bearer <token>`
- **Query Parameters:**
  - `specialization` (optional)
  - `date` (optional)
  - `time` (optional)

### Forums

#### Get Forum Posts
- **GET** `/forums`
- **Headers:** `Authorization: Bearer <token>`
- **Query Parameters:**
  - `category` (optional)
  - `search` (optional)
  - `page` (default: 1)
  - `limit` (default: 10)

#### Create Forum Post
- **POST** `/forums`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "title": "Post Title",
    "content": "Post content",
    "category": "anxiety",
    "tags": ["stress", "exams"],
    "isAnonymous": false
  }
  ```

#### Get Forum Categories
- **GET** `/forums/categories`
- **Headers:** `Authorization: Bearer <token>`

#### Add Reply
- **POST** `/forums/:id/replies`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "content": "Reply content",
    "isAnonymous": false,
    "parentReplyId": "optional-parent-reply-id"
  }
  ```

### Resources

#### Get Resources
- **GET** `/resources`
- **Headers:** `Authorization: Bearer <token>`
- **Query Parameters:**
  - `category` (optional)
  - `type` (optional)
  - `language` (optional)
  - `difficulty` (optional)
  - `search` (optional)

#### Get Resource by ID
- **GET** `/resources/:id`
- **Headers:** `Authorization: Bearer <token>`

#### Get Resource Categories
- **GET** `/resources/categories`
- **Headers:** `Authorization: Bearer <token>`

### Institutions

#### Get Institutions
- **GET** `/institutions`
- **Query Parameters:**
  - `type` (optional)
  - `state` (optional)
  - `city` (optional)
  - `search` (optional)

#### Get Institution by ID
- **GET** `/institutions/:id`

### Admin

#### Get Dashboard Analytics
- **GET** `/admin/dashboard`
- **Headers:** `Authorization: Bearer <admin-token>`

#### Get All Users
- **GET** `/admin/users`
- **Headers:** `Authorization: Bearer <admin-token>`
- **Query Parameters:**
  - `role` (optional)
  - `institution` (optional)
  - `page` (default: 1)
  - `limit` (default: 10)

#### Get Crisis Alerts
- **GET** `/admin/crisis-alerts`
- **Headers:** `Authorization: Bearer <admin-token>`

#### Get Analytics
- **GET** `/admin/analytics`
- **Headers:** `Authorization: Bearer <admin-token>`
- **Query Parameters:**
  - `period` (optional: daily, weekly, monthly)
  - `startDate` (optional)
  - `endDate` (optional)

## Error Codes

| Code | Description |
|------|-------------|
| 400 | Bad Request - Invalid input data |
| 401 | Unauthorized - Invalid or missing token |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource not found |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error - Server error |

## Rate Limiting

- **General API:** 100 requests per 15 minutes per IP
- **Authentication:** 5 failed attempts per 15 minutes per IP
- **Chatbot:** 50 messages per hour per user

## WebSocket Events

### Client to Server

- `join-user-room` - Join user's personal room
- `chat-message` - Send chat message
- `crisis-alert` - Send crisis alert

### Server to Client

- `chat-response` - Receive chat response
- `crisis-alert` - Receive crisis alert notification
- `appointment-reminder` - Receive appointment reminder
- `notification` - Receive general notification

## Data Models

### User
```json
{
  "_id": "string",
  "email": "string",
  "firstName": "string",
  "lastName": "string",
  "role": "student|counselor|admin|moderator",
  "institution": "Institution",
  "profile": "UserProfile",
  "isVerified": "boolean",
  "createdAt": "string",
  "updatedAt": "string"
}
```

### Institution
```json
{
  "_id": "string",
  "name": "string",
  "type": "school|college|university",
  "location": {
    "state": "string",
    "city": "string",
    "address": "string"
  },
  "contact": {
    "email": "string",
    "phone": "string",
    "website": "string"
  },
  "isActive": "boolean"
}
```

### Appointment
```json
{
  "_id": "string",
  "studentId": "string",
  "counselorId": "string",
  "date": "string",
  "time": "string",
  "duration": "number",
  "type": "individual|group|emergency",
  "status": "scheduled|confirmed|completed|cancelled|no-show",
  "notes": "string",
  "meetingLink": "string",
  "location": "string"
}
```

## Security Considerations

1. **HTTPS Only** - All API calls must use HTTPS in production
2. **JWT Tokens** - Use secure JWT tokens with appropriate expiration
3. **Input Validation** - All inputs are validated and sanitized
4. **Rate Limiting** - Implemented to prevent abuse
5. **CORS** - Configured for specific origins
6. **Helmet** - Security headers implemented
7. **Data Encryption** - Sensitive data is encrypted at rest

## Testing

Use the provided Postman collection or test the API using curl:

```bash
# Register a new user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPassword123",
    "firstName": "Test",
    "lastName": "User",
    "agreeToTerms": true
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPassword123"
  }'
```

## Support

For API support or questions, please contact the development team or refer to the project documentation.
