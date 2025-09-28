# LEHER - Mental Health Support Platform

A comprehensive digital mental health and psychological support system designed specifically for students in higher education institutions across India.

## 🌊 About LEHER

**LEHER** (Hindi: "Wave") - Creating harmony in the ocean of the mind

LEHER is a full-stack mental health platform that provides:
- 🤖 AI-powered 24/7 mental health support
- 📅 Confidential appointment booking with counselors
- 👥 Anonymous peer-to-peer support forums
- 📚 Multi-language educational resources
- 🚨 Crisis intervention and early warning systems

## 🏗️ Tech Stack

### Frontend
- **React 18** + **TypeScript** + **Vite**
- **TailwindCSS** for styling
- **Framer Motion** for animations
- **Zustand** for state management
- **React Router** for navigation
- **PWA** support

### Backend
- **Node.js** + **Express.js**
- **MongoDB** with **Mongoose**
- **JWT** authentication
- **Socket.io** for real-time features
- **OpenAI API** for AI chatbot
- **Winston** for logging

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm 8+
- MongoDB (local or Atlas)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/leher-platform.git
   cd leher-platform
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables**
   ```bash
   # Copy environment files
   cp server/env.example server/.env
   cp client/.env.example client/.env
   
   # Edit the files with your configuration
   nano server/.env
   nano client/.env
   ```

4. **Start development servers**
   ```bash
   npm run dev
   ```

   This will start:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

## 📁 Project Structure

```
leher-platform/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Route components
│   │   ├── services/      # API services
│   │   ├── store/         # State management
│   │   └── types/         # TypeScript definitions
│   └── dist/              # Built frontend
├── server/                 # Node.js backend
│   ├── src/
│   │   ├── controllers/   # Route handlers
│   │   ├── models/        # Database models
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Express middleware
│   │   └── services/      # Business logic
│   └── dist/              # Compiled backend
├── shared/                 # Shared utilities
└── docs/                   # Documentation
```

## 🔧 Environment Variables

### Server (.env)
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/leher
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d
OPENAI_API_KEY=your-openai-api-key
CORS_ORIGIN=http://localhost:3000
```

### Client (.env)
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=LEHER
```

## 🌐 Deployment

### Frontend (Vercel)

1. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Set build settings:
     - Build Command: `cd client && npm run build`
     - Output Directory: `client/dist`
     - Install Command: `cd client && npm install`

2. **Environment Variables**
   ```
   VITE_API_BASE_URL=https://your-backend-url.com/api
   ```

3. **Deploy**
   - Push to main branch
   - Vercel will auto-deploy

### Backend (Railway)

1. **Connect to Railway**
   - Go to [railway.app](https://railway.app)
   - Connect GitHub repository
   - Select server directory

2. **Environment Variables**
   ```
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=your-mongodb-atlas-uri
   JWT_SECRET=your-production-jwt-secret
   OPENAI_API_KEY=your-openai-api-key
   CORS_ORIGIN=https://your-frontend-url.vercel.app
   ```

3. **Deploy**
   - Railway will auto-deploy on push

### Alternative: Traditional VPS

1. **Server Setup**
   ```bash
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Install PM2
   sudo npm install -g pm2
   
   # Install Nginx
   sudo apt install nginx -y
   ```

2. **Deploy Application**
   ```bash
   # Clone repository
   git clone https://github.com/yourusername/leher-platform.git
   cd leher-platform
   
   # Install dependencies
   npm run install-all
   
   # Build applications
   cd client && npm run build
   cd ../server && npm run build
   
   # Start with PM2
   pm2 start ecosystem.config.js
   pm2 save
   pm2 startup
   ```

3. **Nginx Configuration**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       # Frontend
       location / {
           root /path/to/leher-platform/client/dist;
           try_files $uri $uri/ /index.html;
       }
       
       # Backend API
       location /api {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

## 🧪 Development

### Available Scripts

```bash
# Root level
npm run dev          # Start both client and server
npm run install-all  # Install all dependencies
npm run build        # Build client
npm run start        # Start production server

# Client
cd client
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Server
cd server
npm run dev          # Start dev server with nodemon
npm run build        # Compile TypeScript
npm run start        # Start production server
npm run lint         # Run ESLint
npm run seed         # Seed database
```

### Database Seeding

```bash
cd server
npm run seed
```

This will create:
- 15+ educational institutions
- 30+ counselor profiles
- Sample data for testing

## 🔒 Security

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting
- CORS configuration
- Input validation
- SQL injection protection
- XSS protection

## 📱 Features

### For Students
- AI chatbot for immediate support
- Anonymous community forums
- Counselor appointment booking
- Multi-language resources
- Crisis intervention

### For Counselors
- Client management dashboard
- Appointment scheduling
- Progress tracking
- Crisis alerts

### For Administrators
- Analytics dashboard
- User management
- Institution customization
- Compliance reporting

## 🌍 Multi-language Support

Supports 14 Indian languages:
- Hindi, Tamil, Telugu, Bengali
- Marathi, Gujarati, Kannada, Malayalam
- Punjabi, Odia, Assamese, Nepali, Urdu, English

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏆 SIH 2025

Developed for Smart India Hackathon 2025 under Problem Statement ID: 25092.

## 📞 Support

- **Email**: support@leher.app
- **Documentation**: [docs.leher.app](https://docs.leher.app)
- **Issues**: [GitHub Issues](https://github.com/yourusername/leher-platform/issues)

## 🙏 Acknowledgments

- SIH 2025 organizers
- Mental health professionals
- Student community
- Open source contributors

---

**Creating Harmony in the Ocean of the Mind** 🌊#   L e h e r _ W e b s i t e  
 