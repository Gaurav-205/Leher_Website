# Environment Variables for LEHER Platform

## Server Environment Variables (.env)

Copy `server/env.example` to `server/.env` and configure:

```env
# Server Configuration
NODE_ENV=development
PORT=5000
HOST=localhost

# Database
MONGODB_URI=mongodb://localhost:27017/leher
# For production, use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/leher

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here-change-in-production
JWT_EXPIRE=7d
JWT_REFRESH_SECRET=your-super-secret-refresh-key-here
JWT_REFRESH_EXPIRE=30d

# Email Configuration (Optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@leher.app

# AI Configuration
OPENAI_API_KEY=your-openai-api-key
GEMINI_API_KEY=your-gemini-api-key

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
# For production:
# CORS_ORIGIN=https://your-frontend-domain.com

# File Upload
MAX_FILE_SIZE=10485760
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/gif,application/pdf

# Logging
LOG_LEVEL=info
LOG_FILE=logs/app.log

# Security
BCRYPT_ROUNDS=12
SESSION_SECRET=your-session-secret-here
ENCRYPTION_MASTER_KEY=your-super-secure-encryption-master-key

# External APIs
INSTITUTION_API_URL=https://api.example.com/institutions
EMERGENCY_SERVICES_API_URL=https://api.example.com/emergency

# Feature Flags
ENABLE_AI_CHATBOT=true
ENABLE_CRISIS_ALERTS=true
ENABLE_ANALYTICS=true
ENABLE_NOTIFICATIONS=true

# Monitoring
ENABLE_MONITORING=false
MONITORING_API_KEY=your-monitoring-api-key
```

## Client Environment Variables (.env)

Create `client/.env` and configure:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:5000/api
# For production:
# VITE_API_BASE_URL=https://your-backend-domain.com/api

# App Configuration
VITE_APP_NAME=LEHER
VITE_APP_VERSION=1.0.0
VITE_APP_DESCRIPTION=Mental Health Support Platform

# Analytics (Optional)
VITE_GA_TRACKING_ID=your-google-analytics-id
VITE_MIXPANEL_TOKEN=your-mixpanel-token

# Feature Flags
VITE_ENABLE_PWA=true
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_NOTIFICATIONS=true

# External Services
VITE_MAPS_API_KEY=your-google-maps-api-key
VITE_RECAPTCHA_SITE_KEY=your-recaptcha-site-key
```

## Production Environment Variables

### Vercel (Frontend)
```env
VITE_API_BASE_URL=https://your-backend.railway.app/api
VITE_APP_NAME=LEHER
VITE_ENABLE_PWA=true
```

### Railway (Backend)
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/leher
JWT_SECRET=your-production-jwt-secret
JWT_EXPIRE=7d
OPENAI_API_KEY=your-openai-api-key
CORS_ORIGIN=https://your-frontend.vercel.app
BCRYPT_ROUNDS=12
RATE_LIMIT_MAX_REQUESTS=50
```

## Security Notes

1. **Never commit .env files** to version control
2. **Use strong, unique secrets** for production
3. **Rotate secrets regularly**
4. **Use different secrets** for different environments
5. **Enable MongoDB authentication** in production
6. **Use HTTPS** in production
7. **Set up proper CORS** origins

## Getting API Keys

### OpenAI API Key
1. Go to [platform.openai.com](https://platform.openai.com)
2. Create an account
3. Generate an API key
4. Add billing information

### MongoDB Atlas
1. Go to [cloud.mongodb.com](https://cloud.mongodb.com)
2. Create a free cluster
3. Create a database user
4. Whitelist your IP address
5. Get connection string

### Google Maps API (Optional)
1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Enable Maps JavaScript API
3. Create API key
4. Restrict key to your domain

## Environment Setup Checklist

- [ ] Copy `server/env.example` to `server/.env`
- [ ] Copy `client/.env.example` to `client/.env`
- [ ] Configure MongoDB URI
- [ ] Set JWT secrets
- [ ] Add OpenAI API key
- [ ] Configure CORS origins
- [ ] Set up email service (optional)
- [ ] Configure file upload settings
- [ ] Set feature flags
- [ ] Test environment variables
