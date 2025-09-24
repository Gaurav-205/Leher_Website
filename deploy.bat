@echo off
REM LEHER Platform Deployment Script for Windows
REM This script automates the deployment process for LEHER

setlocal enabledelayedexpansion

REM Colors (Windows doesn't support colors in batch, but we can use echo)
set "INFO=[INFO]"
set "SUCCESS=[SUCCESS]"
set "WARNING=[WARNING]"
set "ERROR=[ERROR]"

REM Function to print status
:print_status
echo %INFO% %~1
goto :eof

:print_success
echo %SUCCESS% %~1
goto :eof

:print_warning
echo %WARNING% %~1
goto :eof

:print_error
echo %ERROR% %~1
goto :eof

REM Check if Node.js is installed
:check_nodejs
node --version >nul 2>&1
if %errorlevel% neq 0 (
    call :print_error "Node.js is not installed. Please install Node.js 18+ first."
    exit /b 1
)
call :print_success "Node.js is installed"
goto :eof

REM Check if npm is installed
:check_npm
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    call :print_error "npm is not installed. Please install npm first."
    exit /b 1
)
call :print_success "npm is installed"
goto :eof

REM Install dependencies
:install_dependencies
call :print_status "Installing dependencies..."

REM Install root dependencies
if exist "package.json" (
    call :print_status "Installing root dependencies..."
    npm install
    if %errorlevel% neq 0 (
        call :print_error "Failed to install root dependencies"
        exit /b 1
    )
)

REM Install client dependencies
if exist "client\package.json" (
    call :print_status "Installing client dependencies..."
    cd client
    npm install
    if %errorlevel% neq 0 (
        call :print_error "Failed to install client dependencies"
        exit /b 1
    )
    cd ..
)

REM Install server dependencies
if exist "server\package.json" (
    call :print_status "Installing server dependencies..."
    cd server
    npm install
    if %errorlevel% neq 0 (
        call :print_error "Failed to install server dependencies"
        exit /b 1
    )
    cd ..
)

call :print_success "Dependencies installed successfully"
goto :eof

REM Setup environment variables
:setup_environment
call :print_status "Setting up environment variables..."

REM Server environment
if exist "server\env.example" (
    if not exist "server\.env" (
        call :print_status "Creating server .env file..."
        copy "server\env.example" "server\.env" >nul
        call :print_warning "Please edit server\.env with your configuration"
    ) else (
        call :print_status "Server .env file already exists"
    )
)

REM Client environment
if exist "client\env.example" (
    if not exist "client\.env" (
        call :print_status "Creating client .env file..."
        copy "client\env.example" "client\.env" >nul
        call :print_warning "Please edit client\.env with your configuration"
    ) else (
        call :print_status "Client .env file already exists"
    )
)

call :print_success "Environment setup completed"
goto :eof

REM Build applications
:build_applications
call :print_status "Building applications..."

REM Build client
if exist "client\package.json" (
    call :print_status "Building client application..."
    cd client
    npm run build
    if %errorlevel% neq 0 (
        call :print_error "Failed to build client"
        exit /b 1
    )
    cd ..
    call :print_success "Client build completed"
)

REM Build server
if exist "server\package.json" (
    call :print_status "Building server application..."
    cd server
    npm run build
    if %errorlevel% neq 0 (
        call :print_error "Failed to build server"
        exit /b 1
    )
    cd ..
    call :print_success "Server build completed"
)

call :print_success "All applications built successfully"
goto :eof

REM Run tests
:run_tests
call :print_status "Running tests..."

REM Client tests
if exist "client\package.json" (
    findstr /C:"\"test\"" "client\package.json" >nul
    if %errorlevel% equ 0 (
        call :print_status "Running client tests..."
        cd client
        npm test -- --watchAll=false
        if %errorlevel% neq 0 (
            call :print_warning "Client tests failed"
        )
        cd ..
    )
)

REM Server tests
if exist "server\package.json" (
    findstr /C:"\"test\"" "server\package.json" >nul
    if %errorlevel% equ 0 (
        call :print_status "Running server tests..."
        cd server
        npm test
        if %errorlevel% neq 0 (
            call :print_warning "Server tests failed"
        )
        cd ..
    )
)

call :print_success "Tests completed"
goto :eof

REM Start development servers
:start_dev
call :print_status "Starting development servers..."

if exist "package.json" (
    findstr /C:"\"dev\"" "package.json" >nul
    if %errorlevel% equ 0 (
        call :print_status "Starting development environment..."
        npm run dev
    ) else (
        call :print_warning "No development script found in root package.json"
        call :print_status "You can start servers manually:"
        call :print_status "  Client: cd client && npm run dev"
        call :print_status "  Server: cd server && npm run dev"
    )
) else (
    call :print_warning "No package.json found in root directory"
)
goto :eof

REM Deploy to production
:deploy_production
call :print_status "Deploying to production..."

REM Check if we're in a git repository
if not exist ".git" (
    call :print_error "Not a git repository. Please initialize git first."
    exit /b 1
)

REM Check if we're on main branch
for /f "tokens=*" %%i in ('git branch --show-current 2^>nul') do set CURRENT_BRANCH=%%i
if not "%CURRENT_BRANCH%"=="main" (
    call :print_warning "Not on main branch. Current branch: %CURRENT_BRANCH%"
    set /p CONTINUE="Do you want to continue? (y/N): "
    if /i not "%CONTINUE%"=="y" (
        call :print_status "Deployment cancelled"
        exit /b 0
    )
)

REM Push to remote
call :print_status "Pushing to remote repository..."
git push origin main
if %errorlevel% neq 0 (
    call :print_error "Failed to push to remote repository"
    exit /b 1
)

call :print_success "Deployment triggered successfully"
call :print_status "Check your deployment platform for status"
goto :eof

REM Show help
:show_help
echo LEHER Platform Deployment Script
echo.
echo Usage: %0 [COMMAND]
echo.
echo Commands:
echo   install     Install all dependencies
echo   setup       Setup environment variables
echo   build       Build all applications
echo   test        Run all tests
echo   dev         Start development servers
echo   deploy      Deploy to production
echo   full        Run full setup (install + setup + build + test)
echo   help        Show this help message
echo.
echo Examples:
echo   %0 install    # Install dependencies
echo   %0 dev        # Start development
echo   %0 deploy     # Deploy to production
goto :eof

REM Main script logic
:main
if "%1"=="install" (
    call :check_nodejs
    call :check_npm
    call :install_dependencies
) else if "%1"=="setup" (
    call :setup_environment
) else if "%1"=="build" (
    call :check_nodejs
    call :build_applications
) else if "%1"=="test" (
    call :check_nodejs
    call :run_tests
) else if "%1"=="dev" (
    call :check_nodejs
    call :install_dependencies
    call :setup_environment
    call :start_dev
) else if "%1"=="deploy" (
    call :check_nodejs
    call :build_applications
    call :run_tests
    call :deploy_production
) else if "%1"=="full" (
    call :check_nodejs
    call :check_npm
    call :install_dependencies
    call :setup_environment
    call :build_applications
    call :run_tests
    call :print_success "Full setup completed successfully!"
    call :print_status "You can now start development with: %0 dev"
) else (
    call :show_help
)

REM End of script
