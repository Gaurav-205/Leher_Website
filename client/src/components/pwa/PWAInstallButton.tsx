import { useState, useEffect } from 'react'
import { usePWA } from '@services/pwa'
import { Download, Check, RefreshCw } from 'lucide-react'

const PWAInstallButton = () => {
  const { canInstall, showInstallPrompt, isAppInstalled, updateServiceWorker, getAppInfo } = usePWA()
  const [showUpdate, setShowUpdate] = useState(false)
  const [isInstalling, setIsInstalling] = useState(false)

  const appInfo = getAppInfo()

  useEffect(() => {
    // Listen for update available event
    const handleUpdateAvailable = () => {
      setShowUpdate(true)
    }

    window.addEventListener('pwa-update-available', handleUpdateAvailable)
    
    return () => {
      window.removeEventListener('pwa-update-available', handleUpdateAvailable)
    }
  }, [])

  const handleInstall = async () => {
    setIsInstalling(true)
    try {
      await showInstallPrompt()
    } catch (error) {
      console.error('Failed to show install prompt:', error)
    } finally {
      setIsInstalling(false)
    }
  }

  const handleUpdate = async () => {
    try {
      await updateServiceWorker()
    } catch (error) {
      console.error('Failed to update service worker:', error)
    }
  }

  // Don't show if app is already installed and no update available
  if (isAppInstalled() && !showUpdate) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {showUpdate ? null : canInstall() ? (
        <button
          onClick={handleInstall}
          disabled={isInstalling}
          className="flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-[#2A3E66] to-[#00589F] text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isInstalling ? (
            <RefreshCw className="h-5 w-5 animate-spin" />
          ) : (
            <Download className="h-5 w-5" />
          )}
          <span className="font-medium">
            {isInstalling ? 'Installing...' : 'Install App'}
          </span>
        </button>
      ) : null}
    </div>
  )
}

export default PWAInstallButton
