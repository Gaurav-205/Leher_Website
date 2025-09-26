import * as React from "react"
import { ChevronDownIcon } from "@radix-ui/react-icons"
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu"
import { cn } from "@/lib/utils"

const CustomNavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger> & {
    isScrolled?: boolean
  }
>(({ className, children, isScrolled = false, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(
      "group inline-flex h-10 w-max items-center justify-center px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-[#A8CFF1]/10 hover:text-[#00589F] focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-[#A8CFF1]/10 data-[state=open]:bg-[#A8CFF1]/10 font-montserrat rounded-lg hover:shadow-sm",
      isScrolled ? 'text-[#2A3E66] dark:text-[#A8CFF1]' : 'text-[#2A3E66] dark:text-[#A8CFF1] drop-shadow-lg',
      className
    )}
    {...props}
  >
    {children}{" "}
    <ChevronDownIcon
      className="relative top-[1px] ml-1 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180"
      aria-hidden="true"
    />
  </NavigationMenuPrimitive.Trigger>
))
CustomNavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName

export { CustomNavigationMenuTrigger }
