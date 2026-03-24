import { useRef, useState, MouseEvent, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

export function MagneticButton({
  children,
  className,
  onClick,
  type = 'button',
  disabled,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (!ref.current || disabled) return
    const { clientX, clientY } = e
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    const x = (clientX - (left + width / 2)) * 0.2 // subtle pull
    const y = (clientY - (top + height / 2)) * 0.2
    setPosition({ x, y })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={cn(
        'relative transition-all duration-200 ease-out',
        disabled && 'opacity-50 cursor-not-allowed',
        className,
      )}
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
    >
      {children}
    </button>
  )
}
