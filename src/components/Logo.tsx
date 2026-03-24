import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      {/* Fallback SVG icon if src/logo.png is missing. Prompt requested ./src/logo.png placeholder. */}
      <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm overflow-hidden group">
        <img
          src="/src/logo.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            // Hide broken image icon, fallback to SVG
            e.currentTarget.style.display = 'none'
          }}
        />
        {/* Fallback SVG */}
        <svg
          className="w-5 h-5 text-primary group-hover:scale-110 transition-transform"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      </div>
      <div className="font-display text-xl font-bold tracking-tight text-white flex flex-col leading-none">
        ILUMICRED
        <span className="text-[10px] text-primary uppercase tracking-widest font-sans mt-1">
          Soluções
        </span>
      </div>
    </div>
  )
}
