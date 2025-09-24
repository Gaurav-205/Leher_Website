# LEHER Platform - GitHub Repository Setup

## 📋 Pre-Upload Checklist

Before pushing to GitHub, ensure you have:

- [ ] All sensitive data removed from code
- [ ] Environment files created (`.env.example`)
- [ ] Proper `.gitignore` files
- [ ] Documentation updated
- [ ] License file added
- [ ] Contributing guidelines
- [ ] Issue templates
- [ ] Pull request templates

---

## 🔧 Step-by-Step GitHub Setup

### Step 1: Prepare Repository

1. **Clean up sensitive data**
   ```bash
   # Remove any .env files
   find . -name ".env" -type f -delete
   
   # Remove any logs
   find . -name "*.log" -type f -delete
   
   # Remove node_modules
   rm -rf node_modules
   rm -rf client/node_modules
   rm -rf server/node_modules
   ```

2. **Verify .gitignore**
   ```bash
   # Check if .gitignore exists
   ls -la .gitignore
   
   # If not, create one
   touch .gitignore
   ```

### Step 2: Initialize Git Repository

```bash
# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: LEHER Mental Health Platform

- Complete React frontend with TypeScript
- Node.js backend with Express and MongoDB
- AI chatbot integration
- Multi-language support (14 Indian languages)
- PWA implementation
- Comprehensive authentication system
- Real-time features with Socket.io
- Admin dashboard and analytics
- Crisis intervention system
- Mobile-responsive design"

# Add remote repository
git remote add origin https://github.com/yourusername/leher-platform.git

# Push to GitHub
git push -u origin main
```

### Step 3: Create GitHub Repository

1. **Go to GitHub**
   - Visit [github.com](https://github.com)
   - Sign in to your account

2. **Create New Repository**
   - Click "New repository"
   - Repository name: `leher-platform`
   - Description: `Mental Health Support Platform for Students - SIH 2025`
   - Set to Public (for SIH 2025)
   - Add README: No (we have our own)
   - Add .gitignore: No (we have our own)
   - Add license: MIT License

3. **Repository Settings**
   - Go to Settings → General
   - Enable Issues
   - Enable Projects
   - Enable Wiki (optional)
   - Enable Discussions (optional)

### Step 4: Configure Repository

1. **Add Repository Topics**
   ```
   mental-health
   student-support
   ai-chatbot
   counseling
   sih-2025
   react
   nodejs
   mongodb
   typescript
   pwa
   ```

2. **Set Up Branch Protection**
   - Go to Settings → Branches
   - Add rule for `main` branch
   - Require pull request reviews
   - Require status checks
   - Require up-to-date branches

3. **Configure GitHub Actions**
   - Go to Settings → Actions
   - Allow all actions
   - Enable required workflows

---

## 📁 Repository Structure

Your GitHub repository should have this structure:

```
leher-platform/
├── .github/
│   ├── workflows/
│   │   └── deploy.yml
│   ├── ISSUE_TEMPLATE/
│   │   └── bug_report.md
│   └── PULL_REQUEST_TEMPLATE.md
├── client/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── .env.example
├── server/
│   ├── src/
│   ├── package.json
│   ├── tsconfig.json
│   └── env.example
├── shared/
├── docs/
├── README.md
├── DEPLOYMENT_GUIDE.md
├── ENVIRONMENT_SETUP.md
├── CONTRIBUTING.md
├── LICENSE
└── .gitignore
```

---

## 🔐 Environment Variables Setup

### Create Environment Example Files

1. **Server Environment Example**
   ```bash
   # Copy existing example
   cp server/env.example server/.env.example
   ```

2. **Client Environment Example**
   ```bash
   # Create client environment example
   cat > client/.env.example << EOF
   # API Configuration
   VITE_API_BASE_URL=http://localhost:5000/api
   
   # App Configuration
   VITE_APP_NAME=LEHER
   VITE_APP_VERSION=1.0.0
   
   # Feature Flags
   VITE_ENABLE_PWA=true
   VITE_ENABLE_ANALYTICS=false
   EOF
   ```

---

## 📝 Documentation Files

### 1. Contributing Guidelines

```bash
# Create CONTRIBUTING.md
cat > CONTRIBUTING.md << EOF
# Contributing to LEHER

Thank you for your interest in contributing to LEHER!

## Getting Started

1. Fork the repository
2. Clone your fork
3. Create a feature branch
4. Make your changes
5. Test your changes
6. Submit a pull request

## Development Setup

\`\`\`bash
# Install dependencies
npm run install-all

# Start development servers
npm run dev
\`\`\`

## Code Style

- Use TypeScript strict mode
- Follow ESLint rules
- Write meaningful commit messages
- Add tests for new features

## Pull Request Process

1. Update documentation
2. Add tests if applicable
3. Ensure all tests pass
4. Request review from maintainers
EOF
```

### 2. Issue Templates

```bash
# Create issue template directory
mkdir -p .github/ISSUE_TEMPLATE

# Create bug report template
cat > .github/ISSUE_TEMPLATE/bug_report.md << EOF
---
name: Bug report
about: Create a report to help us improve
title: '[BUG] '
labels: bug
assignees: ''
---

**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear and concise description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment:**
 - OS: [e.g. iOS]
 - Browser [e.g. chrome, safari]
 - Version [e.g. 22]

**Additional context**
Add any other context about the problem here.
EOF
```

### 3. Pull Request Template

```bash
# Create pull request template
cat > .github/PULL_REQUEST_TEMPLATE.md << EOF
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tests pass locally
- [ ] Manual testing completed
- [ ] Cross-browser testing (if applicable)

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No console errors
EOF
```

---

## 🚀 Deployment Configuration

### 1. GitHub Actions Secrets

Add these secrets to your GitHub repository:

```
VERCEL_TOKEN=your-vercel-token
VERCEL_ORG_ID=your-vercel-org-id
VERCEL_PROJECT_ID=your-vercel-project-id
RAILWAY_TOKEN=your-railway-token
VITE_API_BASE_URL=https://your-backend-url.com/api
```

### 2. Environment Variables for Deployment

**Vercel (Frontend):**
```
VITE_API_BASE_URL=https://your-backend.railway.app/api
VITE_APP_NAME=LEHER
VITE_ENABLE_PWA=true
```

**Railway (Backend):**
```
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/leher
JWT_SECRET=your-production-jwt-secret
OPENAI_API_KEY=your-openai-api-key
CORS_ORIGIN=https://your-frontend.vercel.app
```

---

## 📊 Repository Features

### 1. Enable GitHub Pages (Optional)

```bash
# Go to Settings → Pages
# Source: Deploy from a branch
# Branch: gh-pages
# Folder: / (root)
```

### 2. Set Up Project Board

1. Go to Projects tab
2. Create new project
3. Add columns:
   - To Do
   - In Progress
   - Review
   - Done

### 3. Configure Notifications

1. Go to Settings → Notifications
2. Enable email notifications
3. Set up webhook notifications (if needed)

---

## 🔒 Security Settings

### 1. Repository Security

1. Go to Settings → Security
2. Enable Dependabot alerts
3. Enable Dependabot security updates
4. Enable secret scanning
5. Enable push protection

### 2. Branch Protection Rules

```bash
# Go to Settings → Branches
# Add rule for main branch:
- Require pull request reviews before merging
- Require status checks to pass before merging
- Require branches to be up to date before merging
- Restrict pushes that create files
- Include administrators
```

---

## 📈 Analytics and Insights

### 1. Enable GitHub Insights

1. Go to Insights tab
2. View traffic statistics
3. Monitor clone and view counts
4. Track contributor activity

### 2. Set Up Code Quality

```bash
# Add code quality badges to README
[![Build Status](https://github.com/yourusername/leher-platform/workflows/Deploy/badge.svg)](https://github.com/yourusername/leher-platform/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
```

---

## 🎯 Final Steps

### 1. Test Repository

```bash
# Clone your repository to test
git clone https://github.com/yourusername/leher-platform.git
cd leher-platform

# Install dependencies
npm run install-all

# Start development
npm run dev
```

### 2. Create First Release

1. Go to Releases
2. Create new release
3. Tag version: `v1.0.0`
4. Release title: `LEHER Platform v1.0.0`
5. Description: Initial release with all core features

### 3. Share Repository

- **SIH 2025 Submission**: Share repository link
- **Portfolio**: Add to your portfolio
- **LinkedIn**: Share on professional networks
- **Community**: Share in relevant communities

---

## 🆘 Troubleshooting

### Common Issues

1. **Large File Upload**
   ```bash
   # Use Git LFS for large files
   git lfs install
   git lfs track "*.png"
   git lfs track "*.jpg"
   git add .gitattributes
   ```

2. **Sensitive Data in History**
   ```bash
   # Remove sensitive data from history
   git filter-branch --force --index-filter \
   'git rm --cached --ignore-unmatch server/.env' \
   --prune-empty --tag-name-filter cat -- --all
   ```

3. **Build Failures**
   ```bash
   # Check GitHub Actions logs
   # Verify environment variables
   # Test locally first
   ```

---

## ✅ Repository Checklist

- [ ] Repository created on GitHub
- [ ] Code pushed to GitHub
- [ ] README.md updated
- [ ] Environment examples created
- [ ] Contributing guidelines added
- [ ] Issue templates created
- [ ] Pull request template added
- [ ] GitHub Actions configured
- [ ] Branch protection enabled
- [ ] Security settings configured
- [ ] License added
- [ ] Topics added
- [ ] First release created
- [ ] Documentation complete

**Your LEHER platform is now GitHub-ready!** 🚀
