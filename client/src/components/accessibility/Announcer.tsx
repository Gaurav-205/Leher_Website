import { useEffect, useState } from 'react'

interface AnnouncerProps {
  message: string
  priority?: 'polite' | 'assertive'
  delay?: number
}

const Announcer = ({ message, priority = 'polite', delay = 100 }: AnnouncerProps) => {
  const [announcement, setAnnouncement] = useState('')

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setAnnouncement(message)
      }, delay)

      return () => clearTimeout(timer)
    }
  }, [message, delay])

  return (
    <div
      aria-live={priority}
      aria-atomic="true"
      className="sr-only"
      role="status"
    >
      {announcement}
    </div>
  )
}

export default Announcer
