# Mental Health Support Platform

A comprehensive digital mental health and psychological support system designed specifically for students in higher education institutions across India.

## 🎯 Project Overview

**Problem Statement ID:** 25092 - SIH 2025  
**Title:** Development of a Digital Mental Health and Psychological Support System for Students in Higher Education

This platform addresses the growing mental health challenges faced by students through:

- 🤖 AI-driven first-aid support via interactive chatbot
- 📅 Confidential appointment booking with counselors
- 📚 Localized psychoeducational resources in regional languages
- 👥 Peer-to-peer support forums with trained moderators
- 📊 Admin dashboard with anonymous analytics
- 🏛️ Institution-specific customization

## 🏗️ Tech Stack

- **Frontend:** React 18 + Vite + TailwindCSS 3
- **Backend:** Node.js + Express.js
- **Database:** MongoDB + Mongoose
- **Authentication:** JWT + bcrypt
- **AI Integration:** OpenAI API / Custom NLP
- **Real-time:** Socket.io
- **Deployment:** Docker + Cloud platforms

## 📁 Project Structure

```
mental-health-support-platform/
├── client/                 # React frontend application
├── server/                 # Node.js backend API
├── shared/                 # Shared utilities and types
├── docs/                   # Documentation
└── scripts/                # Build and deployment scripts
```

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mental-health-support-platform
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables**
   ```bash
   cp server/env.example server/.env
   cp client/.env.example client/.env
   ```

4. **Start development servers**
   ```bash
   npm run dev
   ```

## 🌟 Key Features

### For Students
- Anonymous mental health assessment
- AI-powered crisis intervention
- Secure counselor appointment booking
- Multi-language support (Hindi, English, regional languages)
- Peer support community
- Educational resources and self-help tools

### For Counselors
- Secure client management system
- Appointment scheduling and management
- Progress tracking and notes
- Crisis alert system
- Resource library access

### For Administrators
- Anonymous analytics dashboard
- Early warning system for at-risk students
- Policy planning insights
- Institution-specific customization
- Compliance and reporting tools

## 🎨 Design Philosophy

- **Accessibility First:** WCAG 2.1 AA compliant
- **Cultural Sensitivity:** Designed for Indian educational context
- **Privacy by Design:** End-to-end encryption and data protection
- **Mobile Responsive:** Optimized for all device sizes
- **Inclusive Design:** Support for multiple languages and abilities

## 📱 User Journey

1. **Landing Page** → Clean, welcoming interface
2. **Registration** → Simple sign-up with optional problem description
3. **Institution Selection** → API-powered school/college selection
4. **Home Dashboard** → Access to all platform features
5. **Feature Access** → Chatbot, appointments, forums, resources

## 🔒 Security & Privacy

- End-to-end encryption for sensitive data
- GDPR and Indian data protection compliance
- Anonymous analytics with no personal data
- Secure authentication and session management
- Regular security audits and updates

## 🤝 Contributing

This is an open-source project. Please read our [Contributing Guidelines](docs/CONTRIBUTING.md) before submitting pull requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏆 SIH 2025

Developed for Smart India Hackathon 2025 under Problem Statement ID: 25092, in collaboration with the Department of Student Welfare / Psychology / IQAC, Government of Jammu & Kashmir, Higher Education Department.

## 📞 Support

For technical support or questions about the platform, please contact our development team or refer to the documentation in the `docs/` directory.

## CI Status

![CI](https://github.com/OWNER/REPO/actions/workflows/ci.yml/badge.svg)

This repository uses GitHub Actions to build the server and client on pushes and pull requests.