# Contributing to Leher

Thank you for your interest in contributing to Leher! We welcome contributions from the community and are grateful for your help in making mental wellness more accessible to students.

## 🤝 How to Contribute

### Reporting Issues

Before creating an issue, please:
1. Check if the issue already exists
2. Use the appropriate issue template
3. Provide clear steps to reproduce
4. Include relevant system information

### Suggesting Features

We welcome feature suggestions! Please:
1. Check existing feature requests
2. Use the feature request template
3. Explain the problem you're trying to solve
4. Describe your proposed solution

### Code Contributions

#### Getting Started

1. **Fork the repository**
   ```bash
   git clone https://github.com/your-username/Leher_Website.git
   cd Leher_Website
   ```

2. **Set up development environment**
   ```bash
   npm install
   cd client && npm install
   cd ../server && npm install
   ```

3. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make your changes**
   - Follow our coding standards
   - Write tests for new features
   - Update documentation as needed

5. **Test your changes**
   ```bash
   npm run test
   npm run lint
   ```

6. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

7. **Push and create a Pull Request**
   ```bash
   git push origin feature/your-feature-name
   ```

## 📋 Development Guidelines

### Code Style

- Use TypeScript for type safety
- Follow ESLint and Prettier configurations
- Use meaningful variable and function names
- Write self-documenting code
- Add comments for complex logic

### Commit Messages

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(auth): add OAuth login support
fix(chatbot): resolve message duplication issue
docs(readme): update installation instructions
```

### Pull Request Guidelines

1. **Title**: Use a clear, descriptive title
2. **Description**: Explain what changes you made and why
3. **Testing**: Describe how you tested your changes
4. **Screenshots**: Include screenshots for UI changes
5. **Breaking Changes**: Note any breaking changes

### Code Review Process

1. All PRs require at least one review
2. Address review comments promptly
3. Keep PRs focused and reasonably sized
4. Update documentation as needed
5. Ensure all tests pass

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm run test

# Run client tests
cd client && npm run test

# Run server tests
cd server && npm run test

# Run tests in watch mode
npm run test:watch
```

### Writing Tests

- Write unit tests for new functions
- Write integration tests for API endpoints
- Write component tests for React components
- Aim for good test coverage
- Use descriptive test names

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Environment**
   - OS and version
   - Node.js version
   - Browser (if applicable)

2. **Steps to Reproduce**
   - Clear, numbered steps
   - Expected vs actual behavior

3. **Additional Context**
   - Screenshots or videos
   - Error messages
   - Relevant logs

## ✨ Feature Requests

When suggesting features:

1. **Problem Statement**
   - What problem does this solve?
   - Who would benefit from this?

2. **Proposed Solution**
   - How should this work?
   - Any design considerations?

3. **Alternatives**
   - Other solutions you've considered
   - Why this approach is better

## 🏗️ Project Structure

```
Leher_Website/
├── client/          # React frontend
├── server/          # Node.js backend
├── shared/          # Shared utilities
├── docs/            # Documentation
├── .github/         # GitHub workflows and templates
└── scripts/         # Build and deployment scripts
```

## 🔧 Development Setup

### Prerequisites

- Node.js 18+
- MongoDB 6+
- Git

### Environment Variables

Copy the example environment files:
```bash
cp client/env.example client/.env
cp server/env.example server/.env
```

### Database Setup

1. Install MongoDB
2. Create a database named `leher`
3. Run seed script: `npm run seed`

## 📚 Resources

- [React Documentation](https://reactjs.org/docs)
- [Node.js Documentation](https://nodejs.org/docs)
- [MongoDB Documentation](https://docs.mongodb.com)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## 💬 Community

- **Discussions**: [GitHub Discussions](https://github.com/Gaurav-205/Leher_Website/discussions)
- **Issues**: [GitHub Issues](https://github.com/Gaurav-205/Leher_Website/issues)
- **Wiki**: [Project Wiki](https://github.com/Gaurav-205/Leher_Website/wiki)

## 🎯 Areas for Contribution

### High Priority
- [ ] Mobile responsiveness improvements
- [ ] Performance optimizations
- [ ] Accessibility enhancements
- [ ] Test coverage improvements
- [ ] Documentation updates

### Medium Priority
- [ ] New features for community
- [ ] Admin dashboard enhancements
- [ ] API improvements
- [ ] UI/UX improvements
- [ ] Internationalization

### Low Priority
- [ ] Code refactoring
- [ ] Dependency updates
- [ ] Build process improvements
- [ ] Monitoring and analytics

## 🙏 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

Thank you for contributing to Leher! Together, we can make mental wellness more accessible to students everywhere.
