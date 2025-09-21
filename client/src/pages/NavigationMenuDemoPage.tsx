import React from 'react'
import LeherNavigationMenu from '@components/ui/navigation-menu-demo'
import { Sparkles, Zap, Palette, Code, Heart } from 'lucide-react'

const NavigationMenuDemoPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 text-sm font-semibold mb-6">
            <Sparkles className="h-4 w-4 mr-2" />
            Enhanced Design System
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Navigation Menu Demo
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Experience the new shadcn/ui navigation menu component with modern glassmorphism effects, 
            smooth animations, and enhanced visual design integrated with Leher's design system.
          </p>
        </div>

        <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 mb-16">
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500">
                <Palette className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Interactive Navigation Menu
              </h2>
            </div>
          </div>
          <div className="flex justify-center">
            <LeherNavigationMenu />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="group bg-white/60 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-8 hover:shadow-2xl transition-all duration-500 hover:scale-105">
            <div className="flex items-center mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 group-hover:scale-110 transition-transform duration-300">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 ml-4">
                Modern Features
              </h3>
            </div>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mr-3"></div>
                Dropdown menus with smooth animations
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 mr-3"></div>
                Responsive design for all screen sizes
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mr-3"></div>
                Accessible keyboard navigation
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500 mr-3"></div>
                Customizable styling with Tailwind CSS
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 mr-3"></div>
                Built with Radix UI primitives
              </li>
            </ul>
          </div>

          <div className="group bg-white/60 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-8 hover:shadow-2xl transition-all duration-500 hover:scale-105">
            <div className="flex items-center mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 group-hover:scale-110 transition-transform duration-300">
                <Code className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 ml-4">
                Integration
              </h3>
            </div>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mr-3"></div>
                Seamlessly integrated with React Router
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 mr-3"></div>
                Consistent with Leher's design system
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mr-3"></div>
                Mobile-friendly responsive behavior
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500 mr-3"></div>
                Easy to customize and extend
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 mr-3"></div>
                TypeScript support included
              </li>
            </ul>
          </div>

          <div className="group bg-white/60 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-8 hover:shadow-2xl transition-all duration-500 hover:scale-105 md:col-span-2 lg:col-span-1">
            <div className="flex items-center mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 group-hover:scale-110 transition-transform duration-300">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 ml-4">
                Design Philosophy
              </h3>
            </div>
            <div className="space-y-4 text-gray-600">
              <p className="leading-relaxed">
                Our navigation menu embodies Leher's commitment to mental wellness through 
                thoughtful design that feels calming and supportive.
              </p>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-200/50">
                <p className="text-sm font-semibold text-blue-700 mb-2">
                  Key Principles:
                </p>
                <ul className="text-sm space-y-1">
                  <li>• Accessibility first</li>
                  <li>• Smooth, calming animations</li>
                  <li>• Intuitive user experience</li>
                  <li>• Modern visual aesthetics</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl p-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
          <div className="relative z-10">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 rounded-2xl bg-white/20 backdrop-blur-sm">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-center mb-4">
              Ready to Experience the Future?
            </h3>
            <p className="text-center text-blue-100 max-w-2xl mx-auto leading-relaxed">
              The enhanced navigation menu is now available in your navbar for authenticated users. 
              It provides a more polished and professional navigation experience with 
              dropdown menus for features and quick access to main sections.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavigationMenuDemoPage
