import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#A8CFF1]/30 bg-white text-[#2A3E66] shadow-sm transition-colors hover:bg-[#A8CFF1]/10 focus:outline-none focus:ring-2 focus:ring-[#45A1E7] focus:ring-offset-2 dark:border-[#1A1A2E]/50 dark:bg-[#0F0F23] dark:text-[#A8CFF1] dark:hover:bg-[#1A1A2E]/50 dark:focus:ring-[#A8CFF1]"
      aria-label="Toggle theme"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </button>
  )
}
