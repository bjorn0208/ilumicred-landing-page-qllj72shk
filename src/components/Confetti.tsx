import { useEffect, useState } from 'react'

export function Confetti() {
  const [particles, setParticles] = useState<any[]>([])

  useEffect(() => {
    const newParticles = Array.from({ length: 70 }).map((_, i) => {
      const angle = Math.random() * Math.PI * 2
      const velocity = Math.random() * 40 + 10 // vw/vh
      const tx = `${Math.cos(angle) * velocity}vw`
      const ty = `${Math.sin(angle) * velocity + 20}vh` // +20vh to make it fall down
      const color = ['#8b5cf6', '#3b82f6', '#ffffff', '#10b981'][Math.floor(Math.random() * 4)]

      return {
        id: i,
        tx,
        ty,
        color,
        delay: Math.random() * 0.2,
      }
    })
    setParticles(newParticles)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] flex items-center justify-center overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute w-2 h-3 rounded-sm animate-confetti"
          style={
            {
              '--tx': p.tx,
              '--ty': p.ty,
              backgroundColor: p.color,
              animationDelay: `${p.delay}s`,
            } as any
          }
        />
      ))}
    </div>
  )
}
