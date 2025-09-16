import { Routes, Route, Outlet } from 'react-router-dom'
import { useAuthStore } from '@store/authStore'
import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'

// Layout Components
import FixedNavbar from '@components/layout/FixedNavbar'
import AuthLayout from '@components/layout/AuthLayout'

// Page Components
import LandingPage from '@pages/LandingPage'
import LoginPage from '@pages/auth/LoginPage'
import RegisterPage from '@pages/auth/RegisterPage'
import HomePage from '@pages/HomePage'
import ChatbotPage from '@pages/ChatbotPage'
import SimpleAppointmentsPage from '@pages/SimpleAppointmentsPage'
import CommunityPage from '@pages/CommunityPage'
import ResourcesPage from '@pages/ResourcesPage'
import ProfilePage from '@pages/ProfilePage'
import AdminDashboard from '@pages/admin/AdminDashboard'
import CounselorDashboard from '@pages/counselors/CounselorDashboard'
import NotFoundPage from '@pages/NotFoundPage'

// Protected Route Component
import ProtectedRoute from '@components/auth/ProtectedRoute'
import AdminRoute from '@components/auth/AdminRoute'

function App() {
  const { checkAuthStatus, isAuthenticated, user, token } = useAuthStore()

  useEffect(() => {
    checkAuthStatus()
  }, [checkAuthStatus])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Fixed Navbar for all pages */}
      <FixedNavbar />
      
      {/* Main content with top padding to account for fixed navbar */}
      <div className="pt-16">
        <Routes>
          {/* Root route - shows landing page for non-authenticated users, redirects to /app for authenticated users */}
          <Route path="/" element={<LandingPage />} />
          
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
                <Route path="appointments" element={<SimpleAppointmentsPage />} />
            <Route path="community" element={<CommunityPage />} />
            <Route path="resources" element={<ResourcesPage />} />
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
            <ProtectedRoute>
              <div className="min-h-screen">
                <Outlet />
              </div>
            </ProtectedRoute>
          }>
            <Route index element={<CounselorDashboard />} />
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      
      <Toaster />
    </div>
  )
}

export default App
