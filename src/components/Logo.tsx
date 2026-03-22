import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
}

export function Logo({ className }: LogoProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center font-display leading-none',
        className,
      )}
    >
      <div className="relative flex items-end justify-center h-8 mb-1">
        <svg
          viewBox="0 0 100 80"
          className="w-12 h-10 text-primary"
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10,40 L10,65 Q50,90 90,65 L90,40" />
          <path d="M10,40 L50,65 L90,40" />
          <path d="M10,15 L50,40 L90,15" />
          <line x1="50" y1="40" x2="50" y2="65" />
          <circle
            cx="50"
            cy="15"
            r="5"
            fill="currentColor"
            className="text-secondary"
            stroke="none"
          />
          <path d="M46,4 Q50,-2 54,4" className="text-secondary" strokeWidth="4" />
        </svg>
      </div>
      <div className="text-2xl font-extrabold tracking-widest text-primary">
        ILUM<span className="text-secondary bg-primary px-1 rounded-sm mx-[2px]">I</span>CRED
      </div>
    </div>
  )
}
