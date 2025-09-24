# 🚀 LEHER Platform - Complete Deployment Guide

## 📋 Quick Start Checklist

- [ ] **GitHub Repository**: Code pushed to GitHub
- [ ] **Environment Variables**: Configured for production
- [ ] **Database**: MongoDB Atlas cluster ready
- [ ] **API Keys**: OpenAI, Google Maps (if needed)
- [ ] **Domain**: Custom domain ready (optional)

---

## 🌐 Deployment Options

### Option 1: Vercel + Railway (Recommended) ⭐
- **Frontend**: Vercel (Free tier)
- **Backend**: Railway (Free tier)
- **Database**: MongoDB Atlas (Free tier)
- **Cost**: $0/month
- **Setup Time**: 15 minutes

### Option 2: Netlify + Render
- **Frontend**: Netlify (Free tier)
- **Backend**: Render (Free tier)
- **Database**: MongoDB Atlas (Free tier)
- **Cost**: $0/month
- **Setup Time**: 20 minutes

### Option 3: Traditional VPS
- **Server**: DigitalOcean, AWS, Google Cloud
- **Database**: MongoDB Atlas or self-hosted
- **Cost**: $5-20/month
- **Setup Time**: 1-2 hours

---

## 🎯 Option 1: Vercel + Railway Deployment

### Step 1: Prepare GitHub Repository

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit: LEHER Platform ready for deployment"
   git push origin main
   ```

2. **Verify repository structure**
   ```
   leher-platform/
   ├── .github/workflows/deploy.yml
   ├── client/
   ├── server/
   ├── README.md
   ├── DEPLOYMENT_GUIDE.md
   └── .gitignore
   ```

### Step 2: Deploy Frontend to Vercel

1. **Go to [vercel.com](https://vercel.com)**
   - Sign up with GitHub
   - Click "New Project"
   - Import your repository

2. **Configure Project Settings**
   ```
   Framework Preset: Vite
   Root Directory: client
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

3. **Add Environment Variables**
   ```
   VITE_API_BASE_URL=https://your-backend.railway.app/api
   VITE_APP_NAME=LEHER
   VITE_ENABLE_PWA=true
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment (2-3 minutes)
   - Note your Vercel URL: `https://your-app.vercel.app`

### Step 3: Deploy Backend to Railway

1. **Go to [railway.app](https://railway.app)**
   - Sign up with GitHub
   - Click "New Project"
   - Select "Deploy from GitHub repo"

2. **Select Repository**
   - Choose your LEHER repository
   - Set root directory to `server`

3. **Configure Environment Variables**
   ```
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/leher
   JWT_SECRET=your-super-secret-jwt-key-change-this
   JWT_EXPIRE=7d
   OPENAI_API_KEY=your-openai-api-key
   CORS_ORIGIN=https://your-app.vercel.app
   BCRYPT_ROUNDS=12
   RATE_LIMIT_MAX_REQUESTS=50
   ```

4. **Deploy**
   - Railway will auto-deploy
   - Wait for deployment (3-5 minutes)
   - Note your Railway URL: `https://your-app.railway.app`

### Step 4: Update Frontend Environment

1. **Update Vercel Environment Variables**
   ```
   VITE_API_BASE_URL=https://your-app.railway.app/api
   ```

2. **Redeploy Frontend**
   - Go to Vercel dashboard
   - Click "Redeploy" on latest deployment

### Step 5: Test Deployment

1. **Frontend**: Visit your Vercel URL
2. **Backend**: Test API endpoints
3. **Database**: Verify data persistence
4. **Authentication**: Test login/signup
5. **AI Chatbot**: Test chatbot functionality

---

## 🗄️ Database Setup (MongoDB Atlas)

### Step 1: Create MongoDB Atlas Account

1. **Go to [cloud.mongodb.com](https://cloud.mongodb.com)**
2. **Sign up** for free account
3. **Create organization** (if prompted)

### Step 2: Create Cluster

1. **Click "Build a Database"**
2. **Choose "M0 Sandbox"** (Free tier)
3. **Select region** closest to your users
4. **Cluster name**: `leher-cluster`
5. **Click "Create"**

### Step 3: Create Database User

1. **Go to "Database Access"**
2. **Click "Add New Database User"**
3. **Username**: `leher-user`
4. **Password**: Generate secure password
5. **Database User Privileges**: Read and write to any database
6. **Click "Add User"**

### Step 4: Whitelist IP Addresses

1. **Go to "Network Access"**
2. **Click "Add IP Address"**
3. **For development**: Add your current IP
4. **For production**: Add `0.0.0.0/0` (allow all IPs)
5. **Click "Confirm"**

### Step 5: Get Connection String

1. **Go to "Clusters"**
2. **Click "Connect"**
3. **Choose "Connect your application"**
4. **Driver**: Node.js
5. **Version**: 4.1 or later
6. **Copy connection string**

### Step 6: Update Environment Variables

Replace the connection string in your Railway environment variables:
```
MONGODB_URI=mongodb+srv://leher-user:password@leher-cluster.xxxxx.mongodb.net/leher?retryWrites=true&w=majority
```

---

## 🔑 API Keys Setup

### OpenAI API Key

1. **Go to [platform.openai.com](https://platform.openai.com)**
2. **Sign up** or log in
3. **Go to API Keys**
4. **Create new secret key**
5. **Copy the key**
6. **Add to Railway environment variables**:
   ```
   OPENAI_API_KEY=sk-your-openai-api-key-here
   ```

### Google Maps API Key (Optional)

1. **Go to [console.cloud.google.com](https://console.cloud.google.com)**
2. **Create new project** or select existing
3. **Enable Maps JavaScript API**
4. **Create credentials** → API Key
5. **Restrict key** to your domain
6. **Add to Vercel environment variables**:
   ```
   VITE_MAPS_API_KEY=your-google-maps-api-key
   ```

---

## 🧪 Testing Your Deployment

### 1. Frontend Tests

```bash
# Test frontend locally
cd client
npm run build
npm run preview

# Test production build
curl https://your-app.vercel.app
```

### 2. Backend Tests

```bash
# Test API endpoints
curl https://your-app.railway.app/api/health
curl https://your-app.railway.app/api/auth/register
```

### 3. Database Tests

```bash
# Test database connection
curl -X POST https://your-app.railway.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

### 4. Full Integration Test

1. **Visit frontend**: https://your-app.vercel.app
2. **Register new account**
3. **Login with credentials**
4. **Test AI chatbot**
5. **Test appointment booking**
6. **Test community features**

---

## 🔧 Troubleshooting

### Common Issues

#### 1. Build Failures

**Problem**: Vercel build fails
**Solution**:
```bash
# Check build logs in Vercel dashboard
# Common fixes:
# - Update Node.js version in vercel.json
# - Check environment variables
# - Verify build command
```

#### 2. CORS Errors

**Problem**: Frontend can't connect to backend
**Solution**:
```bash
# Update Railway environment variables
CORS_ORIGIN=https://your-app.vercel.app

# Redeploy backend
```

#### 3. Database Connection Issues

**Problem**: Backend can't connect to MongoDB
**Solution**:
```bash
# Check MongoDB URI format
# Verify database user permissions
# Check IP whitelist
# Test connection string locally
```

#### 4. Environment Variables Not Working

**Problem**: Environment variables not loaded
**Solution**:
```bash
# Check variable names (case-sensitive)
# Verify variable values
# Redeploy after changes
# Check deployment logs
```

### Debug Commands

```bash
# Check Railway logs
railway logs

# Check Vercel logs
vercel logs

# Test API locally
curl -X GET https://your-app.railway.app/api/health

# Test database connection
mongosh "mongodb+srv://username:password@cluster.mongodb.net/leher"
```

---

## 📊 Monitoring and Maintenance

### 1. Set Up Monitoring

**Uptime Monitoring**:
- [UptimeRobot](https://uptimerobot.com) (Free)
- [Pingdom](https://pingdom.com) (Paid)

**Error Tracking**:
- [Sentry](https://sentry.io) (Free tier)
- [Bugsnag](https://bugsnag.com) (Free tier)

### 2. Performance Monitoring

**Analytics**:
- Google Analytics
- Vercel Analytics
- Railway Metrics

**Logs**:
- Vercel Function Logs
- Railway Application Logs
- MongoDB Atlas Logs

### 3. Regular Maintenance

**Weekly**:
- Check application logs
- Monitor error rates
- Review performance metrics

**Monthly**:
- Update dependencies
- Review security settings
- Backup database
- Check API usage limits

---

## 🚀 Advanced Deployment Options

### Custom Domain Setup

1. **Buy domain** (Namecheap, GoDaddy, etc.)
2. **Configure DNS**:
   ```
   Type: CNAME
   Name: www
   Value: your-app.vercel.app
   
   Type: A
   Name: @
   Value: 76.76.19.61 (Vercel IP)
   ```
3. **Add domain to Vercel**
4. **Update CORS_ORIGIN** in Railway

### SSL Certificate

- **Vercel**: Automatic SSL
- **Railway**: Automatic SSL
- **Custom domain**: Automatic SSL

### CDN Setup

- **Vercel**: Built-in CDN
- **CloudFlare**: Free CDN
- **AWS CloudFront**: Paid CDN

---

## 📈 Scaling Considerations

### When to Scale

- **Users**: 1000+ concurrent users
- **Traffic**: 10,000+ requests/day
- **Storage**: 1GB+ database size
- **Performance**: Response time >2 seconds

### Scaling Options

**Horizontal Scaling**:
- Multiple server instances
- Load balancer
- Database clustering

**Vertical Scaling**:
- Upgrade server resources
- Optimize database queries
- Implement caching

### Cost Optimization

**Free Tier Limits**:
- Vercel: 100GB bandwidth/month
- Railway: 500 hours/month
- MongoDB Atlas: 512MB storage

**Upgrade When**:
- Exceed free tier limits
- Need better performance
- Require more features

---

## 🆘 Support and Resources

### Documentation

- **Project README**: Complete setup guide
- **API Documentation**: Endpoint reference
- **Deployment Guide**: This document
- **Contributing Guide**: Development setup

### Community

- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: Questions and discussions
- **Discord**: Real-time community chat

### Professional Support

- **Email**: support@leher.app
- **Consulting**: Custom deployment assistance
- **Training**: Team training sessions

---

## ✅ Deployment Checklist

### Pre-Deployment
- [ ] Code pushed to GitHub
- [ ] Environment variables configured
- [ ] Database cluster created
- [ ] API keys obtained
- [ ] Domain ready (optional)

### Deployment
- [ ] Frontend deployed to Vercel
- [ ] Backend deployed to Railway
- [ ] Database connected
- [ ] Environment variables set
- [ ] SSL certificates active

### Post-Deployment
- [ ] Frontend loads correctly
- [ ] Backend API responds
- [ ] Database connection works
- [ ] Authentication functions
- [ ] AI chatbot responds
- [ ] All features tested

### Monitoring
- [ ] Uptime monitoring set up
- [ ] Error tracking configured
- [ ] Performance monitoring active
- [ ] Logs accessible
- [ ] Alerts configured

---

## 🎉 Congratulations!

Your LEHER platform is now live! 

**Frontend**: https://your-app.vercel.app
**Backend**: https://your-app.railway.app
**Database**: MongoDB Atlas

### Next Steps

1. **Share your platform** with users
2. **Monitor performance** and usage
3. **Gather feedback** from users
4. **Iterate and improve** based on feedback
5. **Scale** as your user base grows

### SIH 2025 Submission

For your SIH 2025 submission, provide:
- **GitHub Repository**: Link to your code
- **Live Demo**: Link to your deployed platform
- **Documentation**: Link to your README
- **Video Demo**: Screen recording of your platform

---

**Creating Harmony in the Ocean of the Mind** 🌊

*Good luck with your SIH 2025 submission!*
