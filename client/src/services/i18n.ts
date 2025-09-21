// Internationalization service for multiple languages
interface Translation {
  [key: string]: string | Translation
}

interface LanguageConfig {
  code: string
  name: string
  nativeName: string
  flag: string
  rtl: boolean
}

interface I18nConfig {
  defaultLanguage: string
  fallbackLanguage: string
  supportedLanguages: LanguageConfig[]
  translations: Record<string, Translation>
}

class I18nService {
  private config: I18nConfig
  private currentLanguage: string
  private translations: Translation = {}

  constructor() {
    this.config = this.getDefaultConfig()
    this.currentLanguage = this.detectLanguage()
    this.loadTranslations()
  }

  private getDefaultConfig(): I18nConfig {
    return {
      defaultLanguage: 'en',
      fallbackLanguage: 'en',
      supportedLanguages: [
        { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', rtl: false },
        { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', rtl: false },
        { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳', rtl: false },
        { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳', rtl: false },
        { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳', rtl: false },
        { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳', rtl: false },
        { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳', rtl: false },
        { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳', rtl: false },
        { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳', rtl: false },
        { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳', rtl: false }
      ],
      translations: this.getDefaultTranslations()
    }
  }

  private getDefaultTranslations(): Record<string, Translation> {
    return {
      en: {
        // Navigation
        nav: {
          home: 'Home',
          about: 'About Us',
          services: 'Services',
          experts: 'Experts',
          centres: 'Centres',
          partners: 'Partners',
          resources: 'Resources',
          chatbot: 'Chatbot',
          community: 'Community',
          appointments: 'Appointments',
          admin: 'Admin',
          dashboard: 'Dashboard',
          moderation: 'Moderation'
        },
        // Hero Section
        hero: {
          badge: 'Trusted by 10,000+ students across India',
          title: 'Mental Wellness',
          subtitle: 'Made Simple',
          description: 'Professional support, AI assistance, and community connection for your mental health journey.',
          cta: 'Start your wellness journey today.',
          primaryButton: 'Get Started Free',
          secondaryButton: 'Watch Demo',
          trustIndicators: {
            users: '10K+ Active Users',
            shield: 'HIPAA Compliant',
            star: '4.9/5 Rating'
          },
          stats: {
            chatSessions: 'Chat Sessions',
            counselingSessions: 'Counseling Sessions',
            successRate: 'Success Rate',
            aiPowered: 'AI-powered support',
            professionalSupport: 'Professional support',
            studentSatisfaction: 'Student satisfaction'
          }
        },
        // Features Section
        features: {
          title: 'How we help',
          subtitle: 'Simple tools designed to support your mental wellness journey',
          ai: {
            title: 'AI Assistant',
            description: '24/7 mental health support with crisis detection',
            cta: 'Chat now'
          },
          community: {
            title: 'Peer Support',
            description: 'Anonymous forums for stigma-free connections',
            cta: 'Join community'
          },
          resources: {
            title: 'Resources',
            description: 'Curated mental health content and tools',
            cta: 'Explore resources'
          },
          signUpToAccess: 'Sign Up to Access'
        },
        // Testimonials
        testimonials: {
          title: 'What students say',
          subtitle: 'Real stories from students who found support and community'
        },
        // Company Slider
        companySlider: {
          title: 'Powering the best',
          subtitle: 'teams'
        },
        // Footer
        footer: {
          description: 'Mental wellness support for students across India. Professional care, AI assistance, and community connection.',
          links: {
            aiChat: 'AI Chat',
            community: 'Community',
            resources: 'Resources',
            privacy: 'Privacy',
            about: 'About'
          },
          copyright: 'All rights reserved. Made with ❤️ for students.'
        },
        // Common
        common: {
          loading: 'Loading...',
          error: 'Something went wrong',
          retry: 'Try again',
          signIn: 'Sign In',
          signUp: 'Sign Up',
          getStarted: 'Get Started',
          learnMore: 'Learn More',
          contact: 'Contact',
          support: 'Support'
        }
      },
      hi: {
        // Hindi translations
        nav: {
          home: 'होम',
          about: 'हमारे बारे में',
          services: 'सेवाएं',
          experts: 'विशेषज्ञ',
          centres: 'केंद्र',
          partners: 'भागीदार',
          resources: 'संसाधन',
          chatbot: 'चैटबॉट',
          community: 'समुदाय',
          appointments: 'अपॉइंटमेंट',
          admin: 'एडमिन',
          dashboard: 'डैशबोर्ड',
          moderation: 'संयम'
        },
        hero: {
          badge: 'भारत भर के 10,000+ छात्रों द्वारा भरोसेमंद',
          title: 'मानसिक कल्याण',
          subtitle: 'सरल बनाया गया',
          description: 'आपकी मानसिक स्वास्थ्य यात्रा के लिए पेशेवर सहायता, AI सहायता और समुदाय कनेक्शन।',
          cta: 'आज ही अपनी कल्याण यात्रा शुरू करें।',
          primaryButton: 'मुफ्त में शुरू करें',
          secondaryButton: 'डेमो देखें',
          trustIndicators: {
            users: '10K+ सक्रिय उपयोगकर्ता',
            shield: 'HIPAA अनुपालित',
            star: '4.9/5 रेटिंग'
          },
          stats: {
            chatSessions: 'चैट सत्र',
            counselingSessions: 'परामर्श सत्र',
            successRate: 'सफलता दर',
            aiPowered: 'AI-संचालित सहायता',
            professionalSupport: 'पेशेवर सहायता',
            studentSatisfaction: 'छात्र संतुष्टि'
          }
        },
        features: {
          title: 'हम कैसे मदद करते हैं',
          subtitle: 'आपकी मानसिक कल्याण यात्रा का समर्थन करने के लिए डिज़ाइन किए गए सरल उपकरण',
          ai: {
            title: 'AI सहायक',
            description: 'संकट पहचान के साथ 24/7 मानसिक स्वास्थ्य सहायता',
            cta: 'अभी चैट करें'
          },
          community: {
            title: 'साथी सहायता',
            description: 'कलंक-मुक्त कनेक्शन के लिए गुमनाम फोरम',
            cta: 'समुदाय में शामिल हों'
          },
          resources: {
            title: 'संसाधन',
            description: 'क्यूरेटेड मानसिक स्वास्थ्य सामग्री और उपकरण',
            cta: 'संसाधनों का अन्वेषण करें'
          },
          signUpToAccess: 'पहुंच के लिए साइन अप करें'
        },
        testimonials: {
          title: 'छात्र क्या कहते हैं',
          subtitle: 'छात्रों की वास्तविक कहानियां जिन्हें सहायता और समुदाय मिला'
        },
        companySlider: {
          title: 'सर्वश्रेष्ठ को शक्ति प्रदान करना',
          subtitle: 'टीमें'
        },
        footer: {
          description: 'भारत भर के छात्रों के लिए मानसिक कल्याण सहायता। पेशेवर देखभाल, AI सहायता और समुदाय कनेक्शन।',
          links: {
            aiChat: 'AI चैट',
            community: 'समुदाय',
            resources: 'संसाधन',
            privacy: 'गोपनीयता',
            about: 'हमारे बारे में'
          },
          copyright: 'सभी अधिकार सुरक्षित। छात्रों के लिए ❤️ के साथ बनाया गया।'
        },
        common: {
          loading: 'लोड हो रहा है...',
          error: 'कुछ गलत हुआ',
          retry: 'फिर से कोशिश करें',
          signIn: 'साइन इन',
          signUp: 'साइन अप',
          getStarted: 'शुरू करें',
          learnMore: 'और जानें',
          contact: 'संपर्क',
          support: 'सहायता'
        }
      }
      // Add more languages as needed
    }
  }

  private detectLanguage(): string {
    // Check localStorage first
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('preferred-language')
      if (stored && this.isLanguageSupported(stored)) {
        return stored
      }

      // Check browser language
      const browserLang = navigator.language.split('-')[0]
      if (this.isLanguageSupported(browserLang)) {
        return browserLang
      }
    }

    return this.config.defaultLanguage
  }

  private isLanguageSupported(langCode: string): boolean {
    return this.config.supportedLanguages.some(lang => lang.code === langCode)
  }

  private loadTranslations() {
    this.translations = this.config.translations[this.currentLanguage] || 
                       this.config.translations[this.config.fallbackLanguage] || 
                       {}
  }

  // Set current language
  setLanguage(langCode: string) {
    if (this.isLanguageSupported(langCode)) {
      this.currentLanguage = langCode
      this.loadTranslations()
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('preferred-language', langCode)
        document.documentElement.lang = langCode
        
        // Update RTL if needed
        const language = this.config.supportedLanguages.find(l => l.code === langCode)
        if (language) {
          document.documentElement.dir = language.rtl ? 'rtl' : 'ltr'
        }
      }
    }
  }

  // Get translation
  t(key: string, params?: Record<string, string | number>): string {
    const keys = key.split('.')
    let value: any = this.translations

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        // Fallback to English
        value = this.config.translations[this.config.fallbackLanguage]
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object' && fallbackKey in value) {
            value = value[fallbackKey]
          } else {
            return key // Return key if translation not found
          }
        }
        break
      }
    }

    if (typeof value !== 'string') {
      return key
    }

    // Replace parameters
    if (params) {
      return value.replace(/\{\{(\w+)\}\}/g, (match, param) => {
        return params[param]?.toString() || match
      })
    }

    return value
  }

  // Get current language
  getCurrentLanguage(): string {
    return this.currentLanguage
  }

  // Get supported languages
  getSupportedLanguages(): LanguageConfig[] {
    return this.config.supportedLanguages
  }

  // Get current language config
  getCurrentLanguageConfig(): LanguageConfig | undefined {
    return this.config.supportedLanguages.find(lang => lang.code === this.currentLanguage)
  }

  // Check if current language is RTL
  isRTL(): boolean {
    const config = this.getCurrentLanguageConfig()
    return config?.rtl || false
  }
}

// Create singleton instance
export const i18n = new I18nService()

// Hook for React components
export const useI18n = () => {
  return {
    t: i18n.t.bind(i18n),
    setLanguage: i18n.setLanguage.bind(i18n),
    getCurrentLanguage: i18n.getCurrentLanguage.bind(i18n),
    getSupportedLanguages: i18n.getSupportedLanguages.bind(i18n),
    getCurrentLanguageConfig: i18n.getCurrentLanguageConfig.bind(i18n),
    isRTL: i18n.isRTL.bind(i18n)
  }
}

export default i18n
