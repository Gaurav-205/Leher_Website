import { Link } from 'react-router-dom'

const SkipLink = () => {
  return (
    <Link
      to="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 bg-[#2A3E66] text-white rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#45A1E7] focus:ring-offset-2"
    >
      Skip to main content
    </Link>
  )
}

export default SkipLink
