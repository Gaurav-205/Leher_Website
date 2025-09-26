"use client"

import * as React from "react"
import { Link } from "react-router-dom"
import { Bot, Users, BookOpen, Calendar, User, Heart, Sparkles, Shield, Zap, Info, Stethoscope, MapPin, Users2, Building, Phone, Mail, Clock, Award, Globe, Lock } from "lucide-react"
import { useAuthStore } from '@store/authStore'

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { CustomNavigationMenuTrigger } from "@/components/ui/custom-navigation-menu-trigger"

// About Us section
const aboutUsItems = [
  {
    title: "Our Mission",
    href: "/about/mission",
    description: "Learn about our commitment to mental wellness for students across India.",
    icon: Heart,
    gradient: "from-[#2A3E66] to-[#00589F]",
  },
  {
    title: "Our Story",
    href: "/about",
    description: "Discover how Leher was founded and our journey in mental health support.",
    icon: BookOpen,
    gradient: "from-[#00589F] to-[#45A1E7]",
  },
  {
    title: "Leadership Team",
    href: "/about",
    description: "Meet the experts and professionals behind Leher's success.",
    icon: Users,
    gradient: "from-[#A8CFF1] to-[#B9A6DC]",
  },
  {
    title: "Contact Us",
    href: "/about",
    description: "Get in touch with our support team for any questions or concerns.",
    icon: Phone,
    gradient: "from-[#B9A6DC] to-[#A8CFF1]",
  },
]

// Services section
const servicesItems = [
  {
    title: "AI Assistant",
    href: "/app/chatbot",
    description: "24/7 mental health support with crisis detection and personalized guidance.",
    icon: Bot,
    gradient: "from-purple-500 to-pink-500",
    badge: "New"
  },
  {
    title: "Community Support",
    href: "/app/community",
    description: "Anonymous forums for stigma-free connections and peer support.",
    icon: Users,
    gradient: "from-[#00589F] to-[#45A1E7]",
  },
  {
    title: "Resources",
    href: "/app/resources",
    description: "Curated mental health content, tools, and educational materials.",
    icon: BookOpen,
    gradient: "from-[#A8CFF1] to-[#B9A6DC]",
  },
  {
    title: "Appointments",
    href: "/app/appointments",
    description: "Schedule sessions with professional counselors and therapists.",
    icon: Calendar,
    gradient: "from-[#45A1E7] to-[#00589F]",
  },
]

// Experts section
const expertsItems = [
  {
    title: "Counselors",
    href: "/experts",
    description: "Meet our licensed mental health counselors and therapists.",
    icon: Stethoscope,
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    title: "Psychologists",
    href: "/experts",
    description: "Connect with qualified psychologists for specialized support.",
    icon: Award,
    gradient: "from-green-500 to-teal-500",
  },
  {
    title: "Peer Support",
    href: "/experts",
    description: "Trained peer supporters who understand student challenges.",
    icon: Users,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "Crisis Specialists",
    href: "/experts",
    description: "24/7 crisis intervention specialists for emergency support.",
    icon: Shield,
    gradient: "from-red-500 to-orange-500",
  },
]


// Partners section
const partnersItems = [
  {
    title: "Universities",
    href: "/partners",
    description: "Partnering with leading universities across India for student wellness.",
    icon: Building,
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    title: "Healthcare Providers",
    href: "/partners",
    description: "Collaborating with hospitals and healthcare institutions.",
    icon: Stethoscope,
    gradient: "from-[#A8CFF1] to-[#B9A6DC]",
  },
  {
    title: "NGOs",
    href: "/partners",
    description: "Working with non-profit organizations for community outreach.",
    icon: Users2,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "Corporate Partners",
    href: "/partners",
    description: "Strategic partnerships with corporations for employee wellness.",
    icon: Building,
    gradient: "from-[#45A1E7] to-[#00589F]",
  },
]

// Resources section
const resourcesItems = [
  {
    title: "Self-Help Guides",
    href: "/app/resources",
    description: "Comprehensive guides for managing stress, anxiety, and depression.",
    icon: BookOpen,
    gradient: "from-[#00589F] to-[#45A1E7]",
  },
  {
    title: "Crisis Resources",
    href: "/app/resources",
    description: "Emergency resources and helpline numbers for immediate support.",
    icon: Shield,
    gradient: "from-[#2A3E66] to-[#00589F]",
  },
  {
    title: "Educational Content",
    href: "/app/resources",
    description: "Articles, videos, and courses on mental health topics.",
    icon: Award,
    gradient: "from-[#A8CFF1] to-[#B9A6DC]",
  },
  {
    title: "Mobile Apps",
    href: "/app/resources",
    description: "Recommended mental health apps and digital tools.",
    icon: Bot,
    gradient: "from-[#B9A6DC] to-[#A8CFF1]",
  },
]

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { title: string; icon?: React.ComponentType<{ className?: string }>; gradient?: string; badge?: string; isLocked?: boolean }
>(({ className, title, children, icon: Icon, gradient, badge, isLocked = false, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "group block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-[#A8CFF1]/10 focus:bg-[#A8CFF1]/10",
            isLocked && "opacity-60 cursor-not-allowed",
            className
          )}
          {...props}
        >
          <div className="flex items-center space-x-3">
            {Icon && (
              <div className={cn(
                "h-6 w-6 rounded-md bg-gradient-to-br flex items-center justify-center",
                isLocked ? "from-gray-300 to-gray-400" : gradient || "from-[#2A3E66] to-[#00589F]"
              )}>
                <Icon className={cn(
                  "h-3 w-3",
                  isLocked ? "text-gray-500" : "text-white"
                )} />
              </div>
            )}
            <div className="flex-1">
              <div className={cn(
                "text-sm font-medium leading-none transition-colors duration-200",
                isLocked ? "text-gray-500" : "text-[#2A3E66] group-hover:text-[#00589F]"
              )}>
                {title}
                {isLocked && <Lock className="inline-block ml-2 h-3 w-3" />}
                {badge && !isLocked && (
                  <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-[#A8CFF1]/30 text-[#2A3E66]">
                    {badge}
                  </span>
                )}
              </div>
              <p className={cn(
                "line-clamp-2 text-xs leading-snug transition-colors duration-200 mt-1",
                isLocked ? "text-gray-400" : "text-[#45A1E7] group-hover:text-[#00589F]"
              )}>
                {children}
              </p>
            </div>
          </div>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

export function LeherNavigationMenu({ isScrolled = false }: { isScrolled?: boolean }) {
  const { isAuthenticated } = useAuthStore()
  
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {/* About Us */}
        <NavigationMenuItem>
          <CustomNavigationMenuTrigger isScrolled={isScrolled}>
            <Info className="h-4 w-4 mr-2" />
            About Us
          </CustomNavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-4 p-6 md:w-[500px] lg:w-[600px] lg:grid-cols-2">
              <li className="row-span-4">
                <NavigationMenuLink asChild>
                  <Link
                    className="group flex h-full w-full select-none flex-col justify-end rounded-lg bg-gradient-to-br from-[#2A3E66] to-[#00589F] p-6 no-underline outline-none focus:shadow-md transition-all duration-200 hover:from-[#00589F] hover:to-[#45A1E7]"
                    to="/about"
                  >
                    <div className="mb-3 flex items-center">
                      <div className="p-2 rounded-md bg-white/20 mr-3">
                        <Heart className="h-4 w-4 text-white" />
                      </div>
                      <div className="text-lg font-semibold text-white">About Leher</div>
                    </div>
                    <p className="text-sm text-white/90 group-hover:text-white transition-colors duration-200">
                      Learn about our mission to provide accessible mental health support for students across India.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              {aboutUsItems.map((item) => {
                const Icon = item.icon
                return (
                  <ListItem 
                    key={item.title} 
                    href={item.href} 
                    title={item.title}
                    icon={Icon}
                    gradient={item.gradient}
                  >
                    {item.description}
                  </ListItem>
                )
              })}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Services */}
        <NavigationMenuItem>
          <CustomNavigationMenuTrigger isScrolled={isScrolled}>
            <Sparkles className="h-4 w-4 mr-2" />
            Services
          </CustomNavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-4 p-6 md:w-[600px] lg:w-[700px] lg:grid-cols-2">
              <li className="row-span-4">
                <NavigationMenuLink asChild>
                  <Link
                    className="group flex h-full w-full select-none flex-col justify-end rounded-lg bg-gradient-to-br from-[#00589F] to-[#45A1E7] p-6 no-underline outline-none focus:shadow-md transition-all duration-200 hover:from-[#45A1E7] hover:to-[#A8CFF1]"
                    to="/services"
                  >
                    <div className="mb-3 flex items-center">
                      <div className="p-2 rounded-md bg-white/20 mr-3">
                        <Sparkles className="h-4 w-4 text-white" />
                      </div>
                      <div className="text-lg font-semibold text-white">Services</div>
                    </div>
                    <p className="text-sm text-white/90 group-hover:text-white transition-colors duration-200">
                      Comprehensive mental health services designed specifically for students.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              {servicesItems.map((item) => {
                const Icon = item.icon
                const isLocked = !isAuthenticated && (item.href.startsWith('/app/'))
                return (
                  <ListItem 
                    key={item.title} 
                    href={isLocked ? "/auth/register" : item.href} 
                    title={item.title}
                    icon={Icon}
                    gradient={item.gradient}
                    badge={item.badge}
                    isLocked={isLocked}
                  >
                    {item.description}
                  </ListItem>
                )
              })}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Experts */}
        <NavigationMenuItem>
          <CustomNavigationMenuTrigger isScrolled={isScrolled}>
            <Stethoscope className="h-4 w-4 mr-2" />
            Experts
          </CustomNavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-4 p-6 md:w-[500px] lg:w-[600px] lg:grid-cols-2">
              <li className="row-span-4">
                <NavigationMenuLink asChild>
                  <Link
                    className={`group flex h-full w-full select-none flex-col justify-end rounded-lg p-6 no-underline outline-none focus:shadow-md transition-all duration-200 ${
                      !isAuthenticated 
                        ? "bg-gradient-to-br from-gray-400 to-gray-500 cursor-not-allowed opacity-60" 
                        : "bg-gradient-to-br from-[#45A1E7] to-[#A8CFF1] hover:from-[#A8CFF1] hover:to-[#B9A6DC]"
                    }`}
                    to={!isAuthenticated ? "/auth/register" : "/experts"}
                  >
                    <div className="mb-3 flex items-center">
                      <div className="p-2 rounded-md bg-white/20 mr-3">
                        <Award className="h-4 w-4 text-white" />
                      </div>
                      <div className="text-lg font-semibold text-white flex items-center">
                        Experts
                        {!isAuthenticated && <Lock className="ml-2 h-4 w-4" />}
                      </div>
                    </div>
                    <p className="text-sm text-white/90 group-hover:text-white transition-colors duration-200">
                      {!isAuthenticated 
                        ? "Sign up to access our team of qualified mental health professionals."
                        : "Meet our team of qualified mental health professionals."
                      }
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              {expertsItems.map((item) => {
                const Icon = item.icon
                const isLocked = !isAuthenticated
                return (
                  <ListItem 
                    key={item.title} 
                    href={isLocked ? "/auth/register" : item.href} 
                    title={item.title}
                    icon={Icon}
                    gradient={item.gradient}
                    isLocked={isLocked}
                  >
                    {item.description}
                  </ListItem>
                )
              })}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>


        {/* Partners */}
        <NavigationMenuItem>
          <CustomNavigationMenuTrigger isScrolled={isScrolled}>
            <Users2 className="h-4 w-4 mr-2" />
            Partners
          </CustomNavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-4 p-6 md:w-[500px] lg:w-[600px] lg:grid-cols-2">
              <li className="row-span-4">
                <NavigationMenuLink asChild>
                  <Link
                    className="group flex h-full w-full select-none flex-col justify-end rounded-lg bg-gradient-to-br from-[#B9A6DC] to-[#2A3E66] p-6 no-underline outline-none focus:shadow-md transition-all duration-200 hover:from-[#2A3E66] hover:to-[#00589F]"
                    to="/partners"
                  >
                    <div className="mb-3 flex items-center">
                      <div className="p-2 rounded-md bg-white/20 mr-3">
                        <Users2 className="h-4 w-4 text-white" />
                      </div>
                      <div className="text-lg font-semibold text-white">Partners</div>
                    </div>
                    <p className="text-sm text-white/90 group-hover:text-white transition-colors duration-200">
                      Collaborating with leading organizations for better mental health.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              {partnersItems.map((item) => {
                const Icon = item.icon
                return (
                  <ListItem 
                    key={item.title} 
                    href={item.href} 
                    title={item.title}
                    icon={Icon}
                    gradient={item.gradient}
                  >
                    {item.description}
                  </ListItem>
                )
              })}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Resources */}
        <NavigationMenuItem>
          <CustomNavigationMenuTrigger isScrolled={isScrolled}>
            <BookOpen className="h-4 w-4 mr-2" />
            Resources
          </CustomNavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-4 p-6 md:w-[500px] lg:w-[600px] lg:grid-cols-2">
              <li className="row-span-4">
                <NavigationMenuLink asChild>
                  <Link
                    className={`group flex h-full w-full select-none flex-col justify-end rounded-lg p-6 no-underline outline-none focus:shadow-md transition-all duration-200 ${
                      !isAuthenticated 
                        ? "bg-gradient-to-br from-gray-400 to-gray-500 cursor-not-allowed opacity-60" 
                        : "bg-gradient-to-br from-[#00589F] to-[#B9A6DC] hover:from-[#B9A6DC] hover:to-[#A8CFF1]"
                    }`}
                    to={!isAuthenticated ? "/auth/register" : "/resources"}
                  >
                    <div className="mb-3 flex items-center">
                      <div className="p-2 rounded-md bg-white/20 mr-3">
                        <BookOpen className="h-4 w-4 text-white" />
                      </div>
                      <div className="text-lg font-semibold text-white flex items-center">
                        Resources
                        {!isAuthenticated && <Lock className="ml-2 h-4 w-4" />}
                      </div>
                    </div>
                    <p className="text-sm text-white/90 group-hover:text-white transition-colors duration-200">
                      {!isAuthenticated 
                        ? "Sign up to access tools, guides, and educational content for mental wellness."
                        : "Access tools, guides, and educational content for mental wellness."
                      }
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              {resourcesItems.map((item) => {
                const Icon = item.icon
                const isLocked = !isAuthenticated
                return (
                  <ListItem 
                    key={item.title} 
                    href={isLocked ? "/auth/register" : item.href} 
                    title={item.title}
                    icon={Icon}
                    gradient={item.gradient}
                    isLocked={isLocked}
                  >
                    {item.description}
                  </ListItem>
                )
              })}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default LeherNavigationMenu
