# Contributing to LEHER

Thank you for your interest in contributing to LEHER! We welcome contributions from the community.

## 🌊 About LEHER

LEHER is a mental health support platform designed for students in higher education institutions across India. It's developed for SIH 2025 (Smart India Hackathon 2025).

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm 8+
- Git
- MongoDB (local or Atlas)
- Basic knowledge of React, TypeScript, and Node.js

### Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/yourusername/leher-platform.git
   cd leher-platform
   ```

2. **Install Dependencies**
   ```bash
   npm run install-all
   ```

3. **Set Up Environment Variables**
   ```bash
   # Copy environment files
   cp server/env.example server/.env
   cp client/env.example client/.env
   
   # Edit the files with your configuration
   nano server/.env
   nano client/.env
   ```

4. **Start Development Servers**
   ```bash
   npm run dev
   ```

   This will start:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

## 📝 How to Contribute

### 1. Reporting Issues

- Use the GitHub issue tracker
- Provide clear description and steps to reproduce
- Include screenshots if applicable
- Use appropriate labels

### 2. Suggesting Features

- Open a new issue with the "enhancement" label
- Describe the feature and its benefits
- Consider implementation complexity
- Discuss with maintainers before starting work

### 3. Code Contributions

1. **Create a Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

2. **Make Your Changes**
   - Follow the coding standards
   - Write meaningful commit messages
   - Add tests if applicable
   - Update documentation

3. **Test Your Changes**
   ```bash
   # Run linting
   npm run lint
   
   # Run tests
   npm run test
   
   # Build applications
   npm run build
   ```

4. **Submit a Pull Request**
   - Provide clear description of changes
   - Link related issues
   - Request review from maintainers

## 🎨 Code Style Guidelines

### TypeScript/JavaScript

- Use TypeScript strict mode
- Follow ESLint rules
- Use meaningful variable and function names
- Add JSDoc comments for complex functions
- Prefer const over let
- Use arrow functions for callbacks

### React Components

- Use functional components with hooks
- Use TypeScript interfaces for props
- Keep components small and focused
- Use proper prop validation
- Follow naming conventions (PascalCase for components)

### CSS/Styling

- Use TailwindCSS utility classes
- Follow mobile-first approach
- Use semantic class names
- Maintain consistent spacing
- Support dark mode

### Backend Code

- Use async/await over promises
- Implement proper error handling
- Use TypeScript interfaces for data models
- Follow RESTful API conventions
- Add input validation

## 🧪 Testing

### Frontend Testing

```bash
cd client
npm run test
```

### Backend Testing

```bash
cd server
npm run test
```

### Manual Testing

- Test on different browsers
- Test responsive design
- Test accessibility features
- Test performance

## 📚 Documentation

### Code Documentation

- Add JSDoc comments for functions
- Document complex algorithms
- Explain business logic
- Update README files

### API Documentation

- Document all API endpoints
- Provide example requests/responses
- Update API.md file
- Include error codes

## 🔒 Security Guidelines

- Never commit sensitive data
- Use environment variables for secrets
- Validate all inputs
- Implement proper authentication
- Follow OWASP guidelines

## 🌍 Internationalization

- Support multiple Indian languages
- Use proper Unicode encoding
- Test with different character sets
- Consider RTL languages

## 📱 PWA Guidelines

- Ensure offline functionality
- Implement proper caching
- Test on different devices
- Follow PWA best practices

## 🚀 Deployment

### Local Testing

```bash
# Build for production
npm run build

# Test production build
npm run preview
```

### Staging Deployment

- Test on staging environment
- Verify all features work
- Check performance metrics
- Test on different devices

## 🏷️ Commit Message Format

Use conventional commit format:

```
type(scope): description

feat(auth): add JWT authentication
fix(ui): resolve mobile layout issue
docs(readme): update installation instructions
style(components): improve button styling
refactor(api): optimize database queries
test(auth): add unit tests for login
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

## 🔄 Pull Request Process

### Before Submitting

- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Tests pass locally
- [ ] Documentation updated
- [ ] No console errors
- [ ] Cross-browser testing completed

### Pull Request Template

```markdown
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
```

## 🎯 Project Roadmap

### Current Priorities

1. **Core Features**
   - AI chatbot functionality
   - User authentication
   - Appointment booking
   - Community forums

2. **Enhancements**
   - Mobile app development
   - Advanced analytics
   - Multi-language support
   - Crisis intervention

3. **Future Features**
   - Video counseling
   - Group therapy sessions
   - Integration with educational institutions
   - Advanced AI features

## 🤝 Community Guidelines

### Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Provide constructive feedback
- Help others learn and grow
- Follow GitHub's community guidelines

### Communication

- Use GitHub issues for discussions
- Be clear and concise
- Provide context for questions
- Help others when possible

## 📞 Getting Help

### Resources

- **Documentation**: Check README.md and docs/
- **Issues**: Search existing GitHub issues
- **Discussions**: Use GitHub Discussions for questions
- **Community**: Join our community channels

### Contact

- **Email**: support@leher.app
- **GitHub**: Create an issue
- **Discord**: Join our community server

## 🏆 Recognition

Contributors will be recognized in:

- README.md contributors section
- Release notes
- Project documentation
- Community acknowledgments

## 📄 License

By contributing to LEHER, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to LEHER! Together, we're creating harmony in the ocean of the mind.** 🌊