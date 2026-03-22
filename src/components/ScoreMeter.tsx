import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface ScoreMeterProps {
  score: number
  className?: string
}

export function ScoreMeter({ score, className }: ScoreMeterProps) {
  const [currentScore, setCurrentScore] = useState(0)
  const radius = 80
  const circumference = 2 * Math.PI * radius
  const arcLength = circumference / 2 // Semi-circle

  useEffect(() => {
    // Animate score from 0 to target
    let start = 0
    const duration = 1500
    const increment = score / (duration / 16) // 60fps

    const timer = setInterval(() => {
      start += increment
      if (start >= score) {
        setCurrentScore(score)
        clearInterval(timer)
      } else {
        setCurrentScore(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [score])

  // Map score (0-1000) to percentage (0-100)
  const percentage = (currentScore / 1000) * 100
  // Calculate dash offset for semi-circle
  const strokeDashoffset = arcLength - (percentage / 100) * arcLength

  let colorClass = 'text-destructive'
  if (currentScore > 400) colorClass = 'text-secondary'
  if (currentScore > 700) colorClass = 'text-success'

  return (
    <div className={cn('relative flex flex-col items-center', className)}>
      <svg width="200" height="110" viewBox="0 0 200 110" className="overflow-visible">
        {/* Background Arc */}
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="16"
          strokeLinecap="round"
          className="text-muted"
        />
        {/* Progress Arc */}
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="16"
          strokeLinecap="round"
          className={cn('transition-all duration-300 ease-out', colorClass)}
          strokeDasharray={`${arcLength} ${arcLength}`}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      <div className="absolute bottom-0 flex flex-col items-center">
        <span className={cn('text-4xl font-extrabold tracking-tighter', colorClass)}>
          {currentScore}
        </span>
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mt-1">
          Score
        </span>
      </div>
    </div>
  )
}
