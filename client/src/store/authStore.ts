import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { AuthState, User, LoginCredentials, RegisterData } from '@types'
import { authService } from '@services/authService'
import toast from 'react-hot-toast'

interface AuthStore extends AuthState {
  // Actions
  login: (credentials: LoginCredentials) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => void
  checkAuthStatus: () => Promise<void>
  updateProfile: (data: Partial<User>) => Promise<void>
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      // Actions
      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true })
        try {
          const response = await authService.login(credentials)
          
          set({
            user: response.data?.user,
            token: response.data?.token,
            isAuthenticated: true,
            isLoading: false,
          })

          toast.success('Welcome back!')
        } catch (error: any) {
          set({ isLoading: false })
          const errorMessage = error.response?.data?.message || error.response?.data?.error || error.message || 'Login failed'
          toast.error(errorMessage)
          throw error
        }
      },

      register: async (data: RegisterData) => {
        set({ isLoading: true })
        try {
          const response = await authService.register(data)
          
          set({
            user: response.data?.user,
            token: response.data?.token,
            isAuthenticated: true,
            isLoading: false,
          })

          toast.success('Account created successfully!')
        } catch (error: any) {
          set({ isLoading: false })
          const errorMessage = error.response?.data?.message || error.response?.data?.error || error.message || 'Registration failed'
          toast.error(errorMessage)
          throw error
        }
      },

      logout: async () => {
        try {
          await authService.logout()
        } catch (error) {
          // Continue with logout even if API call fails
          console.error('Logout API call failed:', error)
        }
        
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        })
        toast.success('Logged out successfully')
      },

      checkAuthStatus: async () => {
        const { token, user, isAuthenticated } = get()
        
        // If we already have a valid auth state, don't override it
        if (token && user && isAuthenticated) {
          return
        }
        
        if (token && user) {
          try {
            // Verify token is still valid by getting profile
            const response = await authService.getProfile()
            set({ 
              user: response.data,
              isAuthenticated: true 
            })
          } catch (error) {
            // Token is invalid, clear auth state silently
            set({
              user: null,
              token: null,
              isAuthenticated: false,
            })
          }
        } else {
          set({ isAuthenticated: false })
        }
      },

      updateProfile: async (data: Partial<User>) => {
        const { user } = get()
        if (!user) return

        try {
          const response = await authService.updateProfile(data)
          set({ user: response.data })
          toast.success('Profile updated successfully')
        } catch (error: any) {
          toast.error(error.response?.data?.message || 'Update failed')
          throw error
        }
      },

    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)
