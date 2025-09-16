import { useState } from 'react'
import { motion } from 'framer-motion'
import { Menu } from 'lucide-react'

// Chatbot Components
import ChatInterface from '@components/chatbot/ChatInterface'
import ChatSidebar from '@components/chatbot/ChatSidebar'

const ChatbotPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null)

  return (
    <div className="h-full w-full bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-hidden">
      <div className="h-full flex">
        {/* Desktop Sidebar - Always visible on large screens */}
        <div className="hidden lg:block lg:w-80 lg:flex-shrink-0">
          <ChatSidebar
            isOpen={true}
            onClose={() => {}}
            onSessionSelect={setActiveSessionId}
            activeSessionId={activeSessionId}
          />
        </div>

        {/* Mobile Sidebar Toggle Button */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden fixed top-20 left-4 z-30 p-2 bg-white border border-gray-200 rounded-lg shadow-lg hover:bg-gray-50 transition-colors duration-200"
          title="Open chat sidebar"
        >
          <Menu className="h-5 w-5 text-gray-600" />
        </button>

        {/* Mobile Sidebar */}
        <div className="lg:hidden">
          <ChatSidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            onSessionSelect={setActiveSessionId}
            activeSessionId={activeSessionId}
          />
        </div>

        {/* Chat Interface */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 flex flex-col min-w-0"
        >
          <ChatInterface 
            sessionId={activeSessionId} 
            onToggleSidebar={() => setSidebarOpen(true)}
          />
        </motion.div>
      </div>
    </div>
  )
}

export default ChatbotPage