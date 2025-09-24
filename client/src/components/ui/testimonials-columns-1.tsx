"use client";
import React from "react";
import { motion } from "motion/react";

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: typeof testimonials;
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-background"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div className="p-10 rounded-3xl border shadow-lg shadow-primary/10 max-w-xs w-full bg-white/95 dark:bg-[#1A1A2E]/95 backdrop-blur-sm border-[#A8CFF1]/30 dark:border-[#A8CFF1]/20" key={i}>
                  <div className="text-[#2A3E66] dark:text-[#E8E8E8] font-montserrat leading-relaxed">{text}</div>
                  <div className="flex items-center gap-2 mt-5">
                    <img
                      width={40}
                      height={40}
                      src={image}
                      alt={name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                      <div className="font-medium tracking-tight leading-5 text-[#2A3E66] dark:text-[#A8CFF1] font-poppins">{name}</div>
                      <div className="leading-5 opacity-60 tracking-tight text-[#45A1E7] dark:text-[#B8B8B8] font-montserrat">{role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};

const testimonials = [
  {
    text: "Leher helped me through my toughest semester. The AI chatbot understood my anxiety and provided practical coping strategies that actually worked.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    name: "Priya Sharma",
    role: "Computer Science Student",
  },
  {
    text: "The anonymous community forum gave me a safe space to share my feelings. The Hindi language support made it so much easier to express myself.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    name: "Arjun Kumar",
    role: "Engineering Student",
  },
  {
    text: "The crisis intervention feature literally saved my life. When I was having suicidal thoughts, the AI immediately connected me with a counselor.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    name: "Sneha Patel",
    role: "Medical Student",
  },
  {
    text: "The breathing exercises and meditation features helped me manage my exam stress. Highly recommend to all students facing academic pressure!",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    name: "Rajesh Singh",
    role: "MBA Student",
  },
  {
    text: "The 24/7 AI support is amazing. It's like having a mental health companion that's always there when you need it, even at 3 AM during exams.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    name: "Kavya Reddy",
    role: "Psychology Student",
  },
  {
    text: "The platform's privacy features made me feel safe to open up about my depression. The counselors are incredibly supportive and understanding.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    name: "Vikram Joshi",
    role: "Arts Student",
  },
  {
    text: "As an international student, Leher helped me navigate cultural differences and homesickness. The platform understands our unique challenges.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    name: "Ananya Gupta",
    role: "International Student",
  },
  {
    text: "The group therapy sessions helped me connect with other students facing similar issues. It's a supportive community that truly cares.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
    name: "Rohit Agarwal",
    role: "Commerce Student",
  },
  {
    text: "The mood tracking feature helped me understand my emotional patterns better. The insights are incredibly valuable for self-awareness.",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
    name: "Meera Iyer",
    role: "Design Student",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const Testimonials = () => {
  return (
    <div className="relative">
      <div className="container z-10 mx-auto">
        <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[500px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
