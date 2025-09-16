import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@store/authStore'
import { ReactNode } from 'react'

interface AdminRouteProps {
  children: ReactNode
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const { user, isAuthenticated } = useAuthStore()

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />
  }

  if (user?.role !== 'admin') {
    return <Navigate to="/app" replace />
  }

  return <>{children}</>
}

export default AdminRoute
