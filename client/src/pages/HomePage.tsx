import { motion } from 'framer-motion'
import { useAuthStore } from '@store/authStore'
import StudentDashboard from '@components/dashboard/StudentDashboard'
import CounselorDashboard from '@components/dashboard/CounselorDashboard'
import ModeratorDashboard from '@components/dashboard/ModeratorDashboard'
import AdminDashboard from '@pages/admin/AdminDashboard'

const HomePage = () => {
  const { user } = useAuthStore()

  // Render role-specific dashboard
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#A8CFF1]/10 via-white to-[#B9A6DC]/10 dark:from-[#0F0F23] dark:via-[#1A1A2E] dark:to-[#16213E]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00589F] dark:border-[#45A1E7] mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-[#B8B8B8] font-montserrat">Loading...</p>
        </motion.div>
      </div>
    )
  }

  switch (user.role) {
    case 'student':
      return <StudentDashboard />
    case 'counselor':
      return <CounselorDashboard />
    case 'moderator':
      return <ModeratorDashboard />
    case 'admin':
      return <AdminDashboard />
    default:
      return <StudentDashboard />
  }

}

export default HomePage
