#!/bin/bash

# Mental Health Support Platform Setup Script
# SIH 2025 - Problem Statement ID: 25092

set -e

echo "🏥 Mental Health Support Platform Setup"
echo "========================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
check_node() {
    print_status "Checking Node.js installation..."
    if command -v node &> /dev/null; then
        NODE_VERSION=$(node --version)
        print_success "Node.js is installed: $NODE_VERSION"
        
        # Check if version is 18 or higher
        NODE_MAJOR_VERSION=$(echo $NODE_VERSION | cut -d'.' -f1 | sed 's/v//')
        if [ "$NODE_MAJOR_VERSION" -lt 18 ]; then
            print_error "Node.js version 18 or higher is required. Current version: $NODE_VERSION"
            exit 1
        fi
    else
        print_error "Node.js is not installed. Please install Node.js 18 or higher."
        exit 1
    fi
}

# Check if npm is installed
check_npm() {
    print_status "Checking npm installation..."
    if command -v npm &> /dev/null; then
        NPM_VERSION=$(npm --version)
        print_success "npm is installed: $NPM_VERSION"
    else
        print_error "npm is not installed. Please install npm."
        exit 1
    fi
}

# Check if MongoDB is installed
check_mongodb() {
    print_status "Checking MongoDB installation..."
    if command -v mongod &> /dev/null; then
        print_success "MongoDB is installed"
    else
        print_warning "MongoDB is not installed. You can:"
        echo "  1. Install MongoDB locally"
        echo "  2. Use MongoDB Atlas (cloud)"
        echo "  3. Use Docker to run MongoDB"
        echo ""
        read -p "Do you want to continue without MongoDB? (y/n): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
    fi
}

# Install dependencies
install_dependencies() {
    print_status "Installing dependencies..."
    
    # Install root dependencies
    print_status "Installing root dependencies..."
    npm install
    
    # Install client dependencies
    print_status "Installing client dependencies..."
    cd client
    npm install
    cd ..
    
    # Install server dependencies
    print_status "Installing server dependencies..."
    cd server
    npm install
    cd ..
    
    print_success "All dependencies installed successfully"
}

# Setup environment files
setup_environment() {
    print_status "Setting up environment files..."
    
    # Server environment
    if [ ! -f "server/.env" ]; then
        if [ -f "server/env.example" ]; then
            cp server/env.example server/.env
            print_success "Created server/.env from env.example"
        else
            print_warning "server/env.example not found. Please create server/.env manually."
        fi
    else
        print_warning "server/.env already exists. Skipping..."
    fi
    
    # Client environment
    if [ ! -f "client/.env" ]; then
        if [ -f "client/.env.example" ]; then
            cp client/.env.example client/.env
            print_success "Created client/.env from .env.example"
        else
            print_warning "client/.env.example not found. Please create client/.env manually."
        fi
    else
        print_warning "client/.env already exists. Skipping..."
    fi
}

# Create necessary directories
create_directories() {
    print_status "Creating necessary directories..."
    
    # Create logs directory for server
    mkdir -p server/logs
    print_success "Created server/logs directory"
    
    # Create uploads directory for server
    mkdir -p server/uploads
    print_success "Created server/uploads directory"
}

# Build the application (optional for development)
build_application() {
    print_status "Building the application..."
    
    # Build client
    print_status "Building client..."
    cd client
    npm run build
    cd ..
    
    # Build server
    print_status "Building server..."
    cd server
    npm run build
    cd ..
    
    print_success "Application built successfully"
}

# Main setup function
main() {
    echo "Starting setup process..."
    echo ""
    
    # Check prerequisites
    check_node
    check_npm
    check_mongodb
    
    echo ""
    print_status "Prerequisites check completed"
    echo ""
    
    # Install dependencies
    install_dependencies
    
    echo ""
    # Setup environment
    setup_environment
    
    echo ""
    # Create directories
    create_directories
    
    echo ""
    # Build application (optional for development)
    # build_application
    
    echo ""
    print_success "Setup completed successfully!"
    echo ""
    echo "Next steps:"
    echo "1. Configure environment variables in server/.env and client/.env"
    echo "2. Start MongoDB (if using local installation)"
    echo "3. Run 'npm run dev' to start development servers"
    echo "4. Access the application at http://localhost:3000"
    echo ""
    echo "For production deployment, see docs/DEPLOYMENT.md"
    echo ""
    print_success "Happy coding! 🚀"
}

# Run main function
main "$@"
