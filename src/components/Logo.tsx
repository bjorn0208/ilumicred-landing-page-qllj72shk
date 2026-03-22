import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  light?: boolean
}

export function Logo({ className, light = false }: LogoProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center font-display leading-none',
        className,
      )}
    >
      <div className="relative flex items-end justify-center h-8 mb-1">
        {/* Book / Shield Shape */}
        <svg
          viewBox="0 0 100 80"
          className={cn('w-12 h-10', light ? 'text-white' : 'text-primary')}
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10,40 L10,65 Q50,90 90,65 L90,40" />
          <path d="M10,40 L50,65 L90,40" />
          <path d="M10,15 L50,40 L90,15" />
          <line x1="50" y1="40" x2="50" y2="65" />
          {/* Lightbulb Accent */}
          <circle
            cx="50"
            cy="15"
            r="4"
            fill="currentColor"
            className="text-secondary"
            stroke="none"
          />
          <path d="M46,6 Q50,0 54,6" className="text-secondary" strokeWidth="3" />
        </svg>
      </div>
      <div
        className={cn('text-xl font-bold tracking-widest', light ? 'text-white' : 'text-primary')}
      >
        ILUM<span className="text-secondary">I</span>CRED
      </div>
    </div>
  )
}
