import { motion } from 'framer-motion'
import RegisterForm from '@components/auth/RegisterForm'

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#A8CFF1]/10 via-white to-[#B9A6DC]/10 dark:from-[#0F0F23] dark:via-[#1A1A2E] dark:to-[#16213E]">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/80 dark:bg-[#1A1A2E]/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-[#A8CFF1]/20 dark:border-[#A8CFF1]/10"
        >
          <RegisterForm />
        </motion.div>
      </div>
    </div>
  )
}

export default RegisterPage