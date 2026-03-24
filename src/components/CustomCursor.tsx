import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only enable on non-touch devices
    if (!window.matchMedia('(pointer: fine)').matches) return

    setIsVisible(true)

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const updateHoverState = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive = target.closest('button, a, input, select, textarea, [role="button"]')
      setIsHovering(!!isInteractive)
    }

    window.addEventListener('mousemove', updatePosition)
    window.addEventListener('mouseover', updateHoverState)

    return () => {
      window.removeEventListener('mousemove', updatePosition)
      window.removeEventListener('mouseover', updateHoverState)
    }
  }, [])

  if (!isVisible) return null

  return (
    <>
      <div
        className={cn(
          'fixed top-0 left-0 w-4 h-4 bg-primary rounded-full pointer-events-none z-[100] transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 mix-blend-screen',
          isHovering ? 'scale-50' : 'scale-100',
        )}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
      <div
        className={cn(
          'fixed top-0 left-0 w-10 h-10 border border-primary rounded-full pointer-events-none z-[100] transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out mix-blend-screen',
          isHovering ? 'scale-150 bg-primary/20 border-transparent' : 'scale-100',
        )}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
    </>
  )
}
