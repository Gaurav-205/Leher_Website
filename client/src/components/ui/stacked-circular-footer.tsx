import { Icons } from "@/components/ui/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Facebook, Instagram, Linkedin, Twitter, Heart } from "lucide-react"
import { Link } from "react-router-dom"
import { useI18n } from '@services/i18n'

function StackedCircularFooter() {
  const { t } = useI18n()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-br from-[#2A3E66] to-[#00589F] dark:from-[#0F0F23] dark:to-[#1A1A2E] text-white dark:text-[#A8CFF1] py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center">
          {/* Logo Section */}
          <div className="mb-8 flex items-center justify-center">
            <img 
              src="/logo.png" 
              alt="Leher Logo" 
              className="h-32 w-32 object-contain transition-all duration-200 hover:scale-105"
              onError={(e) => {
                // Fallback to Heart icon if logo fails to load
                e.currentTarget.style.display = 'none'
                const fallbackDiv = e.currentTarget.nextElementSibling as HTMLElement
                if (fallbackDiv) {
                  fallbackDiv.style.display = 'flex'
                }
              }}
            />
            <div className="h-32 w-32 bg-gradient-to-br from-[#A8CFF1] to-[#B9A6DC] dark:from-[#1A1A2E] dark:to-[#16213E] rounded-xl flex items-center justify-center hidden">
              <Heart className="h-16 w-16 text-[#2A3E66] dark:text-[#A8CFF1]" />
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="mb-8 flex flex-wrap justify-center gap-6" role="navigation" aria-label="Footer navigation">
            <Link 
              to="/" 
              className="text-[#A8CFF1] dark:text-[#B8B8B8] hover:text-white dark:hover:text-[#A8CFF1] text-base font-medium transition-colors duration-300 hover:scale-105 font-montserrat"
            >
              {t('nav.home')}
            </Link>
            <Link 
              to="/about" 
              className="text-[#A8CFF1] dark:text-[#B8B8B8] hover:text-white dark:hover:text-[#A8CFF1] text-base font-medium transition-colors duration-300 hover:scale-105 font-montserrat"
            >
              {t('nav.about')}
            </Link>
            <Link 
              to="/app/chatbot" 
              className="text-[#A8CFF1] dark:text-[#B8B8B8] hover:text-white dark:hover:text-[#A8CFF1] text-base font-medium transition-colors duration-300 hover:scale-105 font-montserrat"
            >
              {t('nav.chatbot')}
            </Link>
            <Link 
              to="/app/community" 
              className="text-[#A8CFF1] dark:text-[#B8B8B8] hover:text-white dark:hover:text-[#A8CFF1] text-base font-medium transition-colors duration-300 hover:scale-105 font-montserrat"
            >
              {t('nav.community')}
            </Link>
            <Link 
              to="/app/resources" 
              className="text-[#A8CFF1] dark:text-[#B8B8B8] hover:text-white dark:hover:text-[#A8CFF1] text-base font-medium transition-colors duration-300 hover:scale-105 font-montserrat"
            >
              {t('nav.resources')}
            </Link>
          </nav>

          {/* Social Media Links */}
          <div className="mb-8 flex space-x-4" role="group" aria-label="Social media links">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full border-[#A8CFF1]/30 dark:border-[#A8CFF1]/20 bg-white/10 dark:bg-[#1A1A2E]/50 hover:bg-white/20 dark:hover:bg-[#1A1A2E]/70 text-[#A8CFF1] dark:text-[#B8B8B8] hover:text-white dark:hover:text-[#A8CFF1] transition-all duration-300"
              asChild
            >
              <a href="https://facebook.com/leher" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Facebook">
                <Facebook className="h-4 w-4" />
              </a>
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full border-[#A8CFF1]/30 dark:border-[#A8CFF1]/20 bg-white/10 dark:bg-[#1A1A2E]/50 hover:bg-white/20 dark:hover:bg-[#1A1A2E]/70 text-[#A8CFF1] dark:text-[#B8B8B8] hover:text-white dark:hover:text-[#A8CFF1] transition-all duration-300"
              asChild
            >
              <a href="https://twitter.com/leher_app" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Twitter">
                <Twitter className="h-4 w-4" />
              </a>
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full border-[#A8CFF1]/30 dark:border-[#A8CFF1]/20 bg-white/10 dark:bg-[#1A1A2E]/50 hover:bg-white/20 dark:hover:bg-[#1A1A2E]/70 text-[#A8CFF1] dark:text-[#B8B8B8] hover:text-white dark:hover:text-[#A8CFF1] transition-all duration-300"
              asChild
            >
              <a href="https://instagram.com/leher_app" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram">
                <Instagram className="h-4 w-4" />
              </a>
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full border-[#A8CFF1]/30 dark:border-[#A8CFF1]/20 bg-white/10 dark:bg-[#1A1A2E]/50 hover:bg-white/20 dark:hover:bg-[#1A1A2E]/70 text-[#A8CFF1] dark:text-[#B8B8B8] hover:text-white dark:hover:text-[#A8CFF1] transition-all duration-300"
              asChild
            >
              <a href="https://linkedin.com/company/leher" target="_blank" rel="noopener noreferrer" aria-label="Follow us on LinkedIn">
                <Linkedin className="h-4 w-4" />
              </a>
            </Button>
          </div>

          {/* Newsletter Subscription */}
          <div className="mb-8 w-full max-w-md">
            <form className="flex space-x-2" onSubmit={(e) => e.preventDefault()}>
              <div className="flex-grow">
                <Label htmlFor="email" className="sr-only">
                  Email address for newsletter subscription
                </Label>
                <Input 
                  id="email" 
                  placeholder="Enter your email for updates" 
                  type="email" 
                  className="rounded-full border-[#A8CFF1]/30 dark:border-[#A8CFF1]/20 bg-white/10 dark:bg-[#1A1A2E]/50 text-white dark:text-[#A8CFF1] placeholder:text-[#A8CFF1]/70 dark:placeholder:text-[#B8B8B8]/70 focus:border-[#45A1E7] dark:focus:border-[#45A1E7] focus:ring-[#45A1E7] dark:focus:ring-[#45A1E7]" 
                />
              </div>
              <Button 
                type="submit" 
                className="rounded-full bg-gradient-to-r from-[#A8CFF1] to-[#B9A6DC] dark:from-[#1A1A2E] dark:to-[#16213E] text-[#2A3E66] dark:text-[#A8CFF1] hover:from-[#B9A6DC] hover:to-[#A8CFF1] dark:hover:from-[#16213E] dark:hover:to-[#1A1A2E] transition-all duration-300 font-montserrat"
              >
                Subscribe
              </Button>
            </form>
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-sm text-[#B9A6DC] dark:text-[#B8B8B8] font-montserrat">
              © {currentYear} Leher. {t('footer.copyright')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export { StackedCircularFooter }
