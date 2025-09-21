import { useState } from 'react'
import { useI18n } from '@services/i18n'
import { Globe, Check } from 'lucide-react'

const LanguageSelector = () => {
  const { getCurrentLanguage, getSupportedLanguages, setLanguage, getCurrentLanguageConfig } = useI18n()
  const [isOpen, setIsOpen] = useState(false)
  
  const currentLang = getCurrentLanguage()
  const supportedLanguages = getSupportedLanguages()
  const currentLangConfig = getCurrentLanguageConfig()

  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-[#A8CFF1]/20 dark:hover:bg-[#1A1A2E]/50 transition-colors duration-200"
        aria-label="Select language"
      >
        <Globe className="h-4 w-4" />
        <span className="text-sm font-medium">
          {currentLangConfig?.flag} {currentLangConfig?.nativeName}
        </span>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#1A1A2E] rounded-xl shadow-lg border border-[#A8CFF1]/30 dark:border-[#A8CFF1]/30 z-20 overflow-hidden">
            <div className="py-2">
              {supportedLanguages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`w-full flex items-center justify-between px-4 py-3 text-left hover:bg-[#A8CFF1]/10 dark:hover:bg-[#A8CFF1]/10 transition-colors duration-200 ${
                    lang.code === currentLang 
                      ? 'bg-[#A8CFF1]/20 dark:bg-[#A8CFF1]/20' 
                      : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{lang.flag}</span>
                    <div>
                      <div className="text-sm font-medium text-[#2A3E66] dark:text-[#A8CFF1]">
                        {lang.nativeName}
                      </div>
                      <div className="text-xs text-[#45A1E7] dark:text-[#B8B8B8]">
                        {lang.name}
                      </div>
                    </div>
                  </div>
                  {lang.code === currentLang && (
                    <Check className="h-4 w-4 text-[#00589F] dark:text-[#45A1E7]" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default LanguageSelector
