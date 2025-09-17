import { motion } from 'framer-motion'
import LoginForm from '@components/auth/LoginForm'

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <LoginForm />
        </motion.div>
      </div>
    </div>
  )
}

export default LoginPage