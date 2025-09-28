# Leher - Mental Wellness Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue.svg)](https://www.typescriptlang.org/)

> **Leher** (meaning "wave" in Hindi) is a comprehensive mental wellness platform designed specifically for students across India. We provide professional support, AI assistance, and community connection for your mental health journey.

## 🌟 Features

### Core Features
- **AI-Powered Chatbot**: 24/7 mental health support with crisis detection
- **Professional Counseling**: Connect with licensed mental health professionals
- **Community Support**: Anonymous forums for peer support and connection
- **Resource Library**: Curated mental health content, tools, and educational materials
- **Appointment Booking**: Schedule sessions with counselors and therapists
- **Crisis Intervention**: Emergency support and helpline resources

### Technical Features
- **Responsive Design**: Mobile-first approach with PWA capabilities
- **Dark/Light Mode**: Theme switching for user preference
- **Real-time Chat**: Socket.io powered messaging system
- **Authentication**: Secure JWT-based authentication with role-based access
- **Admin Dashboard**: Comprehensive admin panel for user and content management
- **Analytics**: User engagement and platform analytics

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB 6+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Gaurav-205/Leher_Website.git
   cd Leher_Website
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install client dependencies
   cd client
   npm install
   
   # Install server dependencies
   cd ../server
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Copy environment files
   cp client/env.example client/.env
   cp server/env.example server/.env
   ```

4. **Configure Environment Variables**
   
   **Client (.env)**
   ```env
   VITE_API_URL=http://localhost:5000
   VITE_APP_NAME=Leher
   ```

   **Server (.env)**
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/leher
   JWT_SECRET=your_jwt_secret_here
   OPENAI_API_KEY=your_openai_api_key
   NODE_ENV=development
   ```

5. **Start the development servers**
   ```bash
   # Start server (from root directory)
   npm run dev:server
   
   # Start client (in new terminal)
   npm run dev:client
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📁 Project Structure

```
Leher_Website/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── store/         # State management
│   │   ├── types/         # TypeScript types
│   │   └── utils/         # Utility functions
│   ├── public/            # Static assets
│   └── package.json
├── server/                # Node.js backend
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── models/        # Database models
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Custom middleware
│   │   ├── services/      # Business logic
│   │   └── utils/         # Utility functions
│   └── package.json
├── shared/                # Shared types and utilities
└── docs/                  # Documentation
```

## 🛠️ Available Scripts

### Root Level
```bash
npm run dev:client     # Start client development server
npm run dev:server     # Start server development server
npm run build          # Build both client and server
npm run start          # Start production servers
```

### Client
```bash
npm run dev            # Start development server
npm run build          # Build for production
npm run preview        # Preview production build
npm run lint           # Run ESLint
```

### Server
```bash
npm run dev            # Start development server with nodemon
npm run build          # Build TypeScript to JavaScript
npm run start          # Start production server
npm run seed           # Seed database with sample data
```

## 🔧 Technology Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **TailwindCSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Client-side routing
- **Zustand** - State management
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Socket.io** - Real-time communication
- **OpenAI API** - AI chatbot
- **Winston** - Logging

### DevOps & Tools
- **Git** - Version control
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **GitHub Actions** - CI/CD

## 👥 User Roles

### Student
- Access to AI chatbot
- Community forums
- Resource library
- Appointment booking
- Profile management

### Counselor
- Client management
- Session scheduling
- Progress tracking
- Dashboard analytics

### Admin
- User management
- Content moderation
- Platform analytics
- System configuration

### Moderator
- Community moderation
- Content review
- User support

## 🔐 Security Features

- JWT-based authentication
- Role-based access control
- Input validation and sanitization
- CORS protection
- Rate limiting
- Secure password hashing
- Environment variable protection

## 📱 PWA Features

- Offline functionality
- Installable app
- Push notifications
- Service worker caching
- Responsive design

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [Wiki](https://github.com/Gaurav-205/Leher_Website/wiki)
- **Issues**: [GitHub Issues](https://github.com/Gaurav-205/Leher_Website/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Gaurav-205/Leher_Website/discussions)

## 🙏 Acknowledgments

- Mental health professionals who provided guidance
- Open source community for amazing tools
- Students who provided feedback and suggestions

## 📊 Project Status

- ✅ Core features implemented
- ✅ Authentication system
- ✅ AI chatbot integration
- ✅ Community features
- ✅ Admin dashboard
- 🔄 Mobile app (planned)
- 🔄 Advanced analytics (planned)
- 🔄 Multi-language support (planned)

---

**Made with ❤️ for student mental wellness in India**