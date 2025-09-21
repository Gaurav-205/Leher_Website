import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Marquee } from '@/components/3d-testimonails'

const testimonials = [
  {
    name: 'Priya Sharma',
    username: '@priya',
    body: 'Leher helped me through my toughest semester. The AI chatbot understood my anxiety and provided practical coping strategies.',
    img: '',
    country: '🇮🇳 India',
  },
  {
    name: 'Arjun Kumar',
    username: '@arjun',
    body: 'The anonymous community forum gave me a safe space to share my feelings. The Hindi language support made it so much easier.',
    img: '',
    country: '🇮🇳 India',
  },
  {
    name: 'Sneha Patel',
    username: '@sneha',
    body: 'The crisis intervention feature literally saved my life. When I was having suicidal thoughts, the AI immediately connected me with a counselor.',
    img: '',
    country: '🇮🇳 India',
  },
  {
    name: 'Rajesh Singh',
    username: '@rajesh',
    body: 'The breathing exercises and meditation features helped me manage my exam stress. Highly recommend to all students!',
    img: '',
    country: '🇮🇳 India',
  },
  {
    name: 'Kavya Reddy',
    username: '@kavya',
    body: 'The 24/7 AI support is amazing. It\'s like having a mental health companion that\'s always there when you need it.',
    img: '',
    country: '🇮🇳 India',
  },
  {
    name: 'Vikram Joshi',
    username: '@vikram',
    body: 'The platform\'s privacy features made me feel safe to open up about my depression. The counselors are incredibly supportive.',
    img: '',
    country: '🇮🇳 India',
  },
  {
    name: 'Ananya Gupta',
    username: '@ananya',
    body: 'Leher\'s personalized approach to mental health support is revolutionary. It understands Indian students\' unique challenges.',
    img: '',
    country: '🇮🇳 India',
  },
  {
    name: 'Rohit Agarwal',
    username: '@rohit',
    body: 'The group therapy sessions helped me connect with other students facing similar issues. It\'s a supportive community!',
    img: '',
    country: '🇮🇳 India',
  },
  {
    name: 'Meera Iyer',
    username: '@meera',
    body: 'The mood tracking feature helped me understand my emotional patterns better. The insights are incredibly valuable.',
    img: '',
    country: '🇮🇳 India',
  },
]

function TestimonialCard({ img, name, username, body, country }: (typeof testimonials)[number]) {
  return (
    <Card className="w-72 sm:w-80 md:w-96 lg:w-[420px] bg-white/95 dark:bg-[#1A1A2E]/95 backdrop-blur-sm border-[#A8CFF1]/30 dark:border-[#A8CFF1]/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-[#45A1E7]/50 dark:hover:border-[#45A1E7]/30">
      <CardContent className="p-4 sm:p-5 md:p-6">
        <div className="flex items-center gap-2 sm:gap-3">
          <Avatar className="size-8 sm:size-10 md:size-11">
            <AvatarFallback className="bg-gradient-to-br from-[#2A3E66] to-[#00589F] text-white font-semibold text-xs sm:text-sm">
              {name[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col min-w-0 flex-1">
            <figcaption className="text-xs sm:text-sm md:text-base font-medium text-[#2A3E66] dark:text-[#A8CFF1] flex items-center gap-1 font-poppins truncate">
              <span className="truncate">{name}</span> <span className="text-xs sm:text-sm flex-shrink-0">{country}</span>
            </figcaption>
            <p className="text-xs sm:text-sm font-medium text-[#45A1E7] dark:text-[#B8B8B8] font-montserrat truncate">{username}</p>
          </div>
        </div>
        <blockquote className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-[#2A3E66] dark:text-[#E8E8E8] leading-relaxed font-montserrat line-clamp-4">{body}</blockquote>
      </CardContent>
    </Card>
  )
}

export function Testimonials3D() {
  return (
    <div className="relative px-4 sm:px-6 lg:px-8">
      <div className="border border-[#A8CFF1]/30 dark:border-[#A8CFF1]/20 rounded-lg relative flex h-80 sm:h-96 md:h-[28rem] lg:h-[32rem] w-full max-w-[1000px] mx-auto flex-row items-center justify-center overflow-hidden gap-1 sm:gap-2 [perspective:300px] bg-gradient-to-br from-[#A8CFF1]/10 via-white dark:via-[#0F0F23] to-[#B9A6DC]/10 dark:from-[#1A1A2E]/60 dark:via-[#0F0F23] dark:to-[#16213E]/60">
        <div
          className="flex flex-row items-center gap-2 sm:gap-4"
          style={{
            transform:
              'translateX(-50px) translateY(0px) translateZ(-50px) rotateX(15deg) rotateY(-5deg) rotateZ(10deg)',
          }}
        >
          {/* Vertical Marquee (downwards) - Slower speed */}
          <Marquee 
            vertical 
            pauseOnHover 
            repeat={3} 
            speed={50}
            gap={16}
            ariaLabel="Student testimonials scrolling down"
          >
            {testimonials.map((review) => (
              <TestimonialCard key={review.username} {...review} />
            ))}
          </Marquee>
          {/* Vertical Marquee (upwards) - Faster speed */}
          <Marquee 
            vertical 
            pauseOnHover 
            reverse 
            repeat={3} 
            speed={35}
            gap={16}
            ariaLabel="Student testimonials scrolling up"
          >
            {testimonials.map((review) => (
              <TestimonialCard key={review.username} {...review} />
            ))}
          </Marquee>
          {/* Vertical Marquee (downwards) - Medium speed */}
          <Marquee 
            vertical 
            pauseOnHover 
            repeat={3} 
            speed={45}
            gap={16}
            ariaLabel="Student testimonials scrolling down"
          >
            {testimonials.map((review) => (
              <TestimonialCard key={review.username} {...review} />
            ))}
          </Marquee>
          {/* Vertical Marquee (upwards) - Medium speed */}
          <Marquee 
            vertical 
            pauseOnHover 
            reverse 
            repeat={3} 
            speed={40}
            gap={16}
            ariaLabel="Student testimonials scrolling up"
          >
            {testimonials.map((review) => (
              <TestimonialCard key={review.username} {...review} />
            ))}
          </Marquee>
        </div>
        
        {/* Gradient overlays for vertical marquee */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-white/80 dark:from-[#0F0F23]/80 to-transparent"></div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-white/80 dark:from-[#0F0F23]/80 to-transparent"></div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-white/80 dark:from-[#0F0F23]/80 to-transparent"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-white/80 dark:from-[#0F0F23]/80 to-transparent"></div>
      </div>
    </div>
  )
}

export default Testimonials3D
