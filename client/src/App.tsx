import { Routes, Route, Outlet } from 'react-router-dom'
import { useAuthStore } from '@store/authStore'
import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from '@/contexts/ThemeContext'
import AnalyticsProvider from '@components/analytics/AnalyticsProvider'
import ErrorBoundary from '@components/error/ErrorBoundary'
import GlobalErrorHandler from '@components/error/GlobalErrorHandler'
import PWAInstallButton from '@components/pwa/PWAInstallButton'
import SkipLink from '@components/accessibility/SkipLink'
import Announcer from '@components/accessibility/Announcer'

// Layout Components
import FixedNavbar from '@components/layout/FixedNavbarWithNavigationMenu'
import AuthLayout from '@components/layout/AuthLayout'

// Page Components
import LandingPage from '@pages/LandingPage'
import LoginPage from '@pages/auth/LoginPage'
import RegisterPage from '@pages/auth/RegisterPage'
import HomePage from '@pages/HomePage'
import ChatbotPage from '@pages/ChatbotPage'
import CommunityPage from '@pages/CommunityPage'
import ResourcesPage from '@pages/ResourcesPage'
import AppointmentsPage from '@pages/AppointmentsPage'
import ProfilePage from '@pages/ProfilePage'
import AdminDashboard from '@pages/admin/AdminDashboard'
import NotFoundPage from '@pages/NotFoundPage'

// Public Pages
import AboutPage from '@pages/AboutPage'
import ServicesPage from '@pages/ServicesPage'
import ExpertsPage from '@pages/ExpertsPage'
import CentresPage from '@pages/CentresPage'
import PartnersPage from '@pages/PartnersPage'

// About Sub-pages
import AboutMissionPage from '@pages/about/AboutMissionPage'

// Dashboard Components
import CounselorDashboard from '@components/dashboard/CounselorDashboard'
import ModeratorDashboard from '@components/dashboard/ModeratorDashboard'

// Protected Route Component
import ProtectedRoute from '@components/auth/ProtectedRoute'
import AdminRoute from '@components/auth/AdminRoute'

function App() {
  const { checkAuthStatus, isAuthenticated, user } = useAuthStore()

  useEffect(() => {
    checkAuthStatus()
  }, [checkAuthStatus])

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AnalyticsProvider>
          <GlobalErrorHandler />
          <SkipLink />
          <Announcer message="" />
          <div className="min-h-screen bg-gradient-to-br from-[#A8CFF1]/10 via-white to-[#B9A6DC]/10 dark:from-[#0F0F23] dark:via-[#1A1A2E] dark:to-[#16213E]">
            {/* Fixed Navbar for all pages */}
            <FixedNavbar />
      
      {/* Main content - no padding to allow navbar overlap */}
      <div>
        <Routes>
          {/* Root route - shows landing page for non-authenticated users, redirects to /app for authenticated users */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Public Routes */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/about/mission" element={<AboutMissionPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/experts" element={<ExpertsPage />} />
          <Route path="/centres" element={<CentresPage />} />
          <Route path="/partners" element={<PartnersPage />} />
          
          {/* Auth Routes - only accessible when not authenticated */}
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>

          {/* Protected Routes - only accessible when authenticated */}
          <Route path="/app" element={
            <ProtectedRoute>
              <div className="h-[calc(100vh-4rem)]">
                <Outlet />
              </div>
            </ProtectedRoute>
          }>
            <Route index element={<HomePage />} />
            <Route path="chatbot" element={<ChatbotPage />} />
            <Route path="community" element={<CommunityPage />} />
            <Route path="resources" element={<ResourcesPage />} />
            <Route path="appointments" element={<AppointmentsPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="settings" element={<ProfilePage />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={
            <AdminRoute>
              <div className="min-h-screen">
                <Outlet />
              </div>
            </AdminRoute>
          }>
            <Route index element={<AdminDashboard />} />
          </Route>

          {/* Counselor Routes */}
          <Route path="/counselor" element={
            <ProtectedRoute allowedRoles={['counselor']}>
              <div className="min-h-screen">
                <Outlet />
              </div>
            </ProtectedRoute>
          }>
            <Route index element={<CounselorDashboard />} />
          </Route>

          {/* Moderator Routes */}
          <Route path="/moderator" element={
            <ProtectedRoute allowedRoles={['moderator']}>
              <div className="min-h-screen">
                <Outlet />
              </div>
            </ProtectedRoute>
          }>
            <Route index element={<ModeratorDashboard />} />
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      
            <Toaster />
            <PWAInstallButton />
          </div>
        </AnalyticsProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
