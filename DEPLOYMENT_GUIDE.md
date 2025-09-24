# LEHER Platform Deployment Guide

## 🚀 Quick Deployment Options

### Option 1: Vercel + Railway (Recommended)
- **Frontend**: Vercel (Free tier available)
- **Backend**: Railway (Free tier available)
- **Database**: MongoDB Atlas (Free tier available)

### Option 2: Netlify + Render
- **Frontend**: Netlify (Free tier available)
- **Backend**: Render (Free tier available)
- **Database**: MongoDB Atlas (Free tier available)

### Option 3: Traditional VPS
- **Server**: DigitalOcean, AWS, Google Cloud
- **Database**: MongoDB Atlas or self-hosted
- **Reverse Proxy**: Nginx

---

## 📋 Pre-Deployment Checklist

- [ ] Code is pushed to GitHub repository
- [ ] Environment variables are configured
- [ ] MongoDB Atlas cluster is set up
- [ ] OpenAI API key is obtained
- [ ] Domain name is ready (optional)
- [ ] SSL certificates are configured

---

## 🌐 Option 1: Vercel + Railway Deployment

### Step 1: Deploy Frontend to Vercel

1. **Go to [vercel.com](https://vercel.com)**
   - Sign up with GitHub
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
   - Wait for deployment to complete
   - Note your Vercel URL

### Step 2: Deploy Backend to Railway

1. **Go to [railway.app](https://railway.app)**
   - Sign up with GitHub
   - Create new project

2. **Connect Repository**
   - Select your GitHub repository
   - Choose "server" as root directory

3. **Configure Environment Variables**
   ```
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

4. **Deploy**
   - Railway will auto-deploy
   - Note your Railway URL

### Step 3: Update Frontend Environment

1. **Update Vercel Environment Variables**
   ```
   VITE_API_BASE_URL=https://your-backend.railway.app/api
   ```

2. **Redeploy Frontend**
   - Trigger new deployment in Vercel

---

## 🌐 Option 2: Netlify + Render Deployment

### Step 1: Deploy Frontend to Netlify

1. **Go to [netlify.com](https://netlify.com)**
   - Sign up with GitHub
   - Import your repository

2. **Configure Build Settings**
   ```
   Base directory: client
   Build command: npm run build
   Publish directory: client/dist
   ```

3. **Add Environment Variables**
   ```
   VITE_API_BASE_URL=https://your-backend.onrender.com/api
   VITE_APP_NAME=LEHER
   ```

4. **Deploy**
   - Click "Deploy site"
   - Note your Netlify URL

### Step 2: Deploy Backend to Render

1. **Go to [render.com](https://render.com)**
   - Sign up with GitHub
   - Create new Web Service

2. **Connect Repository**
   - Select your GitHub repository
   - Choose "server" as root directory

3. **Configure Service**
   ```
   Runtime: Node
   Build Command: npm install && npm run build
   Start Command: npm start
   ```

4. **Add Environment Variables**
   ```
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/leher
   JWT_SECRET=your-production-jwt-secret
   OPENAI_API_KEY=your-openai-api-key
   CORS_ORIGIN=https://your-frontend.netlify.app
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Note your Render URL

---

## 🖥️ Option 3: Traditional VPS Deployment

### Step 1: Server Setup

1. **Create VPS Instance**
   - DigitalOcean Droplet (Ubuntu 20.04+)
   - AWS EC2 Instance
   - Google Cloud Compute Engine

2. **Connect to Server**
   ```bash
   ssh root@your-server-ip
   ```

3. **Update System**
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

4. **Install Node.js**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

5. **Install PM2**
   ```bash
   sudo npm install -g pm2
   ```

6. **Install Nginx**
   ```bash
   sudo apt install nginx -y
   ```

### Step 2: Deploy Application

1. **Clone Repository**
   ```bash
   git clone https://github.com/yourusername/leher-platform.git
   cd leher-platform
   ```

2. **Install Dependencies**
   ```bash
   npm run install-all
   ```

3. **Build Applications**
   ```bash
   cd client && npm run build
   cd ../server && npm run build
   ```

4. **Configure Environment**
   ```bash
   cp server/env.example server/.env
   nano server/.env
   ```

5. **Start with PM2**
   ```bash
   pm2 start ecosystem.config.js
   pm2 save
   pm2 startup
   ```

### Step 3: Configure Nginx

1. **Create Nginx Configuration**
   ```bash
   sudo nano /etc/nginx/sites-available/leher
   ```

2. **Add Configuration**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       # Frontend
       location / {
           root /root/leher-platform/client/dist;
           try_files $uri $uri/ /index.html;
       }
       
       # Backend API
       location /api {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
       }
       
       # WebSocket
       location /socket.io/ {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection "upgrade";
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }
   ```

3. **Enable Site**
   ```bash
   sudo ln -s /etc/nginx/sites-available/leher /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

### Step 4: SSL Certificate

1. **Install Certbot**
   ```bash
   sudo apt install certbot python3-certbot-nginx -y
   ```

2. **Get SSL Certificate**
   ```bash
   sudo certbot --nginx -d your-domain.com
   ```

---

## 🗄️ Database Setup

### MongoDB Atlas (Recommended)

1. **Create Account**
   - Go to [cloud.mongodb.com](https://cloud.mongodb.com)
   - Sign up for free account

2. **Create Cluster**
   - Choose free tier (M0)
   - Select region closest to your users
   - Create cluster

3. **Create Database User**
   - Go to Database Access
   - Add new user
   - Generate password

4. **Whitelist IP Addresses**
   - Go to Network Access
   - Add current IP or 0.0.0.0/0 (for development)

5. **Get Connection String**
   - Go to Clusters
   - Click Connect
   - Choose "Connect your application"
   - Copy connection string

6. **Update Environment Variables**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/leher
   ```

### Self-Hosted MongoDB

1. **Install MongoDB**
   ```bash
   wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
   echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
   sudo apt-get update
   sudo apt-get install -y mongodb-org
   ```

2. **Start MongoDB**
   ```bash
   sudo systemctl start mongod
   sudo systemctl enable mongod
   ```

3. **Create Database**
   ```bash
   mongo
   use leher
   ```

---

## 🔧 Post-Deployment Configuration

### 1. Seed Database
```bash
cd server
npm run seed
```

### 2. Test Deployment
- [ ] Frontend loads correctly
- [ ] Backend API responds
- [ ] Database connection works
- [ ] Authentication works
- [ ] AI chatbot responds
- [ ] File uploads work

### 3. Monitor Application
```bash
# PM2 monitoring
pm2 monit
pm2 logs

# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### 4. Set Up Monitoring
- **Uptime monitoring**: UptimeRobot, Pingdom
- **Error tracking**: Sentry, Bugsnag
- **Analytics**: Google Analytics, Mixpanel

---

## 🚨 Troubleshooting

### Common Issues

1. **Build Failures**
   ```bash
   # Clear cache and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Database Connection Issues**
   - Check MongoDB URI
   - Verify network access
   - Check firewall settings

3. **CORS Errors**
   - Update CORS_ORIGIN in backend
   - Check frontend API URL

4. **Port Issues**
   - Check if port 5000 is available
   - Update PORT in environment variables

5. **SSL Certificate Issues**
   - Renew certificate: `sudo certbot renew`
   - Check domain DNS settings

### Logs and Debugging

```bash
# PM2 logs
pm2 logs

# Nginx logs
sudo tail -f /var/log/nginx/error.log

# Application logs
tail -f server/logs/combined.log
tail -f server/logs/error.log
```

---

## 📊 Performance Optimization

### 1. Enable Compression
```bash
# Nginx compression
sudo nano /etc/nginx/nginx.conf
# Add gzip settings
```

### 2. Set Up CDN
- CloudFlare
- AWS CloudFront
- Google Cloud CDN

### 3. Database Optimization
```javascript
// Create indexes
db.users.createIndex({ email: 1 })
db.appointments.createIndex({ studentId: 1, date: 1 })
db.forumPosts.createIndex({ category: 1, createdAt: -1 })
```

### 4. Caching
```bash
# Install Redis
sudo apt install redis-server

# Use in application
npm install redis
```

---

## 🔒 Security Checklist

- [ ] HTTPS enabled
- [ ] Strong JWT secrets
- [ ] Database authentication
- [ ] Rate limiting configured
- [ ] CORS properly set
- [ ] Input validation enabled
- [ ] File upload restrictions
- [ ] Error handling secure
- [ ] Logs don't contain sensitive data
- [ ] Regular security updates

---

## 📈 Scaling Considerations

### Horizontal Scaling
1. Load balancer (Nginx, HAProxy)
2. Multiple server instances
3. Session sharing (Redis)
4. Database clustering

### Vertical Scaling
1. Increase server resources
2. Optimize database queries
3. Implement caching
4. Use connection pooling

---

## 🆘 Support

If you encounter issues:

1. Check the troubleshooting section
2. Review application logs
3. Check GitHub Issues
4. Contact support team

**Happy Deploying!** 🚀
