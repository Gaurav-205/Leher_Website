# Deployment Guide

## Overview

This guide covers deploying the Mental Health Support Platform for SIH 2025 to various environments without Docker.

## Prerequisites

- Node.js 18+ and npm 8+
- MongoDB 6+
- Redis (optional, for caching)
- Cloudinary account (for file uploads)
- OpenAI API key (for AI chatbot)
- SMTP service (for emails)

## Environment Setup

### 1. Clone Repository

```bash
git clone <repository-url>
cd mental-health-support-platform
```

### 2. Install Dependencies

```bash
# Install root dependencies
npm install

# Install client dependencies
cd client && npm install

# Install server dependencies
cd ../server && npm install
```

### 3. Environment Variables

Copy the environment example files and configure them:

```bash
# Server environment
cp server/env.example server/.env

# Client environment
cp client/.env.example client/.env
```

Configure the following variables in `server/.env`:

```env
# Database
MONGODB_URI=mongodb+srv://gauravkhandelwal205_db_user:gaurav@cluster0.urnv9wg.mongodb.net/test

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# OpenAI
OPENAI_API_KEY=your-openai-api-key

# CORS
CORS_ORIGIN=http://localhost:3000
```

Configure the following variables in `client/.env`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=Mental Health Support Platform
```

## Local Development

### 1. Start MongoDB

```bash
# Using local installation
mongod

# Or using MongoDB Compass/GUI
# Start MongoDB service from your system
```

### 2. Start Development Servers

```bash
# From root directory
npm run dev
```

This will start:
- Client on http://localhost:3000
- Server on http://localhost:5000

### 3. Access the Application

- Frontend: http://localhost:3000
- API: http://localhost:5000/api
- Health Check: http://localhost:5000/health

## Production Deployment

### Option 1: Traditional VPS/Server

#### 1. Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org

# Install PM2
sudo npm install -g pm2

# Install Nginx
sudo apt install nginx -y
```

#### 2. Application Deployment

```bash
# Clone repository
git clone <repository-url>
cd mental-health-support-platform

# Install dependencies
npm run install-all

# Build client
cd client && npm run build

# Build server
cd ../server && npm run build

# Start with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

#### 3. Nginx Configuration

Create `/etc/nginx/sites-available/mental-health`:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    # Client
    location / {
        root /path/to/mental-health-support-platform/client/dist;
        try_files $uri $uri/ /index.html;
    }

    # API
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

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/mental-health /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### 4. SSL Certificate

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate
sudo certbot --nginx -d your-domain.com
```

### Option 2: Cloud Deployment

#### Vercel (Frontend)

1. Connect your GitHub repository to Vercel
2. Set build command: `cd client && npm run build`
3. Set output directory: `client/dist`
4. Add environment variables in Vercel dashboard

#### Railway/Render (Backend)

1. Connect your GitHub repository
2. Set build command: `cd server && npm run build`
3. Set start command: `cd server && npm start`
4. Add environment variables
5. Connect to MongoDB Atlas

#### MongoDB Atlas

1. Create a cluster on MongoDB Atlas
2. Create a database user
3. Whitelist your server IP
4. Get connection string
5. Update `MONGODB_URI` in environment variables

## Monitoring and Logging

### 1. PM2 Monitoring

```bash
# Monitor processes
pm2 monit

# View logs
pm2 logs

# Restart application
pm2 restart all
```

### 2. Log Management

Logs are stored in:
- `server/logs/combined.log` - All logs
- `server/logs/error.log` - Error logs only

### 3. Health Checks

Monitor these endpoints:
- `GET /health` - Application health
- `GET /api/health` - API health

## Security Considerations

### 1. Environment Variables

- Never commit `.env` files
- Use strong, unique secrets
- Rotate secrets regularly
- Use different secrets for different environments

### 2. Database Security

- Use strong passwords
- Enable authentication
- Whitelist IP addresses
- Enable SSL/TLS

### 3. Server Security

- Keep system updated
- Use firewall (UFW)
- Disable root login
- Use SSH keys
- Enable fail2ban

### 4. Application Security

- Enable HTTPS
- Use secure headers
- Implement rate limiting
- Validate all inputs
- Sanitize outputs

## Backup Strategy

### 1. Database Backup

```bash
# Create backup
mongodump --uri="mongodb+srv://gauravkhandelwal205_db_user:gaurav@cluster0.urnv9wg.mongodb.net/test" --out=backup/

# Restore backup
mongorestore --uri="mongodb+srv://gauravkhandelwal205_db_user:gaurav@cluster0.urnv9wg.mongodb.net/test" backup/test/
```

### 2. Automated Backups

Create a cron job for daily backups:

```bash
# Add to crontab
0 2 * * * /path/to/backup-script.sh
```

## Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   sudo lsof -i :5000
   sudo kill -9 <PID>
   ```

2. **MongoDB connection failed**
   - Check if MongoDB is running
   - Verify connection string
   - Check firewall settings

3. **Build failures**
   - Clear node_modules and reinstall
   - Check Node.js version
   - Verify environment variables

4. **CORS errors**
   - Check CORS_ORIGIN setting
   - Verify frontend URL
   - Check proxy configuration

### Logs

Check application logs for detailed error information:

```bash
# PM2 logs
pm2 logs

# Nginx logs
sudo tail -f /var/log/nginx/error.log
```

## Performance Optimization

### 1. Database Indexing

Create indexes for frequently queried fields:

```javascript
// In MongoDB shell
db.users.createIndex({ email: 1 })
db.appointments.createIndex({ studentId: 1, date: 1 })
db.forumPosts.createIndex({ category: 1, createdAt: -1 })
```

### 2. Caching

Implement Redis for caching:

```bash
# Install Redis
sudo apt install redis-server

# Use in application
npm install redis
```

### 3. CDN

Use CloudFront or similar CDN for static assets.

### 4. Load Balancing

Use Nginx or HAProxy for load balancing multiple server instances.

## Scaling

### Horizontal Scaling

1. Deploy multiple server instances
2. Use load balancer
3. Implement session sharing
4. Use shared database

### Vertical Scaling

1. Increase server resources
2. Optimize database queries
3. Implement caching
4. Use connection pooling

## Maintenance

### Regular Tasks

1. **Weekly:**
   - Check application logs
   - Monitor system resources
   - Review security updates

2. **Monthly:**
   - Update dependencies
   - Review and rotate secrets
   - Test backup restoration

3. **Quarterly:**
   - Security audit
   - Performance review
   - Disaster recovery test

## Support

For deployment issues or questions:
1. Check the troubleshooting section
2. Review application logs
3. Contact the development team
4. Refer to the project documentation
