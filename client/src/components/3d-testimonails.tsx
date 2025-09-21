import React, { ComponentPropsWithoutRef, useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface MarqueeProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Optional CSS class name to apply custom styles
   */
  className?: string;
  /**
   * Whether to reverse the animation direction
   * @default false
   */
  reverse?: boolean;
  /**
   * Whether to pause the animation on hover
   * @default false
   */
  pauseOnHover?: boolean;
  /**
   * Content to be displayed in the marquee
   */
  children: React.ReactNode;
  /**
   * Whether to animate vertically instead of horizontally
   * @default false
   */
  vertical?: boolean;
  /**
   * Number of times to repeat the content
   * @default 4
   */
  repeat?: number;
  /**
   * Animation duration in seconds
   * @default 40
   */
  speed?: number;
  /**
   * Gap between items in pixels
   * @default 16
   */
  gap?: number;
  /**
   * If true, automatically repeats children enough to fill the visible area
   */
  autoFill?: boolean;
  /**
   * Whether to show pause/play controls
   * @default false
   */
  showControls?: boolean;
  /**
   * Whether the marquee is initially paused
   * @default false
   */
  initiallyPaused?: boolean;
  /**
   * ARIA label for accessibility
   */
  ariaLabel?: string;
  /**
   * ARIA live region politeness
   */
  ariaLive?: 'off' | 'polite' | 'assertive';
  /**
   * ARIA role
   */
  ariaRole?: string;
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  speed = 40,
  gap = 16,
  showControls = false,
  initiallyPaused = false,
  ariaLabel,
  ariaLive = 'off',
  ariaRole = 'marquee',
  ...props
}: MarqueeProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(initiallyPaused);
  const [isHovered, setIsHovered] = useState(false);

  // Calculate CSS custom properties
  const duration = `${speed}s`;
  const gapValue = `${gap}px`;

  // Handle pause/play functionality
  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  // Handle hover state
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Determine if animation should be paused
  const shouldPause = isPaused || (pauseOnHover && isHovered);

  return (
    <div
      {...props}
      ref={marqueeRef}
      data-slot="marquee"
      className={cn(
        'group flex overflow-hidden p-2',
        {
          'flex-row': !vertical,
          'flex-col': vertical,
        },
        className,
      )}
      style={{
        '--duration': duration,
        '--gap': gapValue,
      } as React.CSSProperties}
      aria-label={ariaLabel}
      aria-live={ariaLive}
      role={ariaRole}
      tabIndex={0}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Pause/Play Controls */}
      {showControls && (
        <button
          onClick={togglePause}
          className="absolute top-2 right-2 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors duration-200"
          aria-label={isPaused ? 'Resume animation' : 'Pause animation'}
        >
          {isPaused ? (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          )}
        </button>
      )}

      {React.useMemo(
        () => (
          <>
            {Array.from({ length: repeat }, (_, i) => (
              <div
                key={i}
                className={cn(
                  !vertical ? 'flex-row' : 'flex-col',
                  'flex shrink-0 justify-around',
                  !vertical && 'animate-marquee flex-row',
                  vertical && 'animate-marquee-vertical flex-col',
                  reverse && '[animation-direction:reverse]',
                )}
                style={{
                  animationPlayState: shouldPause ? 'paused' : 'running',
                  gap: gapValue,
                } as React.CSSProperties}
              >
                {children}
              </div>
            ))}
          </>
        ),
        [repeat, children, vertical, reverse, shouldPause, gapValue],
      )}
    </div>
  );
}
