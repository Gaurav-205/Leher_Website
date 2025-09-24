#!/bin/bash

# LEHER Platform Deployment Script
# This script automates the deployment process for LEHER

set -e  # Exit on any error

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

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to check prerequisites
check_prerequisites() {
    print_status "Checking prerequisites..."
    
    if ! command_exists node; then
        print_error "Node.js is not installed. Please install Node.js 18+ first."
        exit 1
    fi
    
    if ! command_exists npm; then
        print_error "npm is not installed. Please install npm first."
        exit 1
    fi
    
    # Check Node.js version
    NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 18 ]; then
        print_error "Node.js version 18+ is required. Current version: $(node -v)"
        exit 1
    fi
    
    print_success "Prerequisites check passed"
}

# Function to install dependencies
install_dependencies() {
    print_status "Installing dependencies..."
    
    # Install root dependencies
    if [ -f "package.json" ]; then
        npm install
    fi
    
    # Install client dependencies
    if [ -d "client" ]; then
        print_status "Installing client dependencies..."
        cd client
        npm install
        cd ..
    fi
    
    # Install server dependencies
    if [ -d "server" ]; then
        print_status "Installing server dependencies..."
        cd server
        npm install
        cd ..
    fi
    
    print_success "Dependencies installed successfully"
}

# Function to setup environment variables
setup_environment() {
    print_status "Setting up environment variables..."
    
    # Server environment
    if [ -d "server" ] && [ -f "server/env.example" ]; then
        if [ ! -f "server/.env" ]; then
            print_status "Creating server .env file..."
            cp server/env.example server/.env
            print_warning "Please edit server/.env with your configuration"
        else
            print_status "Server .env file already exists"
        fi
    fi
    
    # Client environment
    if [ -d "client" ] && [ -f "client/env.example" ]; then
        if [ ! -f "client/.env" ]; then
            print_status "Creating client .env file..."
            cp client/env.example client/.env
            print_warning "Please edit client/.env with your configuration"
        else
            print_status "Client .env file already exists"
        fi
    fi
    
    print_success "Environment setup completed"
}

# Function to build applications
build_applications() {
    print_status "Building applications..."
    
    # Build client
    if [ -d "client" ]; then
        print_status "Building client application..."
        cd client
        npm run build
        cd ..
        print_success "Client build completed"
    fi
    
    # Build server
    if [ -d "server" ]; then
        print_status "Building server application..."
        cd server
        npm run build
        cd ..
        print_success "Server build completed"
    fi
    
    print_success "All applications built successfully"
}

# Function to run tests
run_tests() {
    print_status "Running tests..."
    
    # Client tests
    if [ -d "client" ] && [ -f "client/package.json" ]; then
        if grep -q '"test"' client/package.json; then
            print_status "Running client tests..."
            cd client
            npm test -- --watchAll=false
            cd ..
        fi
    fi
    
    # Server tests
    if [ -d "server" ] && [ -f "server/package.json" ]; then
        if grep -q '"test"' server/package.json; then
            print_status "Running server tests..."
            cd server
            npm test
            cd ..
        fi
    fi
    
    print_success "All tests passed"
}

# Function to start development servers
start_dev() {
    print_status "Starting development servers..."
    
    if [ -f "package.json" ] && grep -q '"dev"' package.json; then
        print_status "Starting development environment..."
        npm run dev
    else
        print_warning "No development script found in root package.json"
        print_status "You can start servers manually:"
        print_status "  Client: cd client && npm run dev"
        print_status "  Server: cd server && npm run dev"
    fi
}

# Function to deploy to production
deploy_production() {
    print_status "Deploying to production..."
    
    # Check if we're in a git repository
    if [ ! -d ".git" ]; then
        print_error "Not a git repository. Please initialize git first."
        exit 1
    fi
    
    # Check if we're on main branch
    CURRENT_BRANCH=$(git branch --show-current)
    if [ "$CURRENT_BRANCH" != "main" ]; then
        print_warning "Not on main branch. Current branch: $CURRENT_BRANCH"
        read -p "Do you want to continue? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            print_status "Deployment cancelled"
            exit 0
        fi
    fi
    
    # Push to remote
    print_status "Pushing to remote repository..."
    git push origin main
    
    print_success "Deployment triggered successfully"
    print_status "Check your deployment platform for status"
}

# Function to show help
show_help() {
    echo "LEHER Platform Deployment Script"
    echo ""
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  install     Install all dependencies"
    echo "  setup       Setup environment variables"
    echo "  build       Build all applications"
    echo "  test        Run all tests"
    echo "  dev         Start development servers"
    echo "  deploy      Deploy to production"
    echo "  full        Run full setup (install + setup + build + test)"
    echo "  help        Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 install    # Install dependencies"
    echo "  $0 dev        # Start development"
    echo "  $0 deploy     # Deploy to production"
}

# Main script logic
main() {
    case "${1:-help}" in
        "install")
            check_prerequisites
            install_dependencies
            ;;
        "setup")
            setup_environment
            ;;
        "build")
            check_prerequisites
            build_applications
            ;;
        "test")
            check_prerequisites
            run_tests
            ;;
        "dev")
            check_prerequisites
            install_dependencies
            setup_environment
            start_dev
            ;;
        "deploy")
            check_prerequisites
            build_applications
            run_tests
            deploy_production
            ;;
        "full")
            check_prerequisites
            install_dependencies
            setup_environment
            build_applications
            run_tests
            print_success "Full setup completed successfully!"
            print_status "You can now start development with: $0 dev"
            ;;
        "help"|*)
            show_help
            ;;
    esac
}

# Run main function with all arguments
main "$@"
