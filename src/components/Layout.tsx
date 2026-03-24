import { useEffect, useState } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { CustomCursor } from '@/components/CustomCursor'
import { AuroraBackground } from '@/components/AuroraBackground'
import { Marquee } from '@/components/Marquee'
import { Logo } from '@/components/Logo'
import { Chatbot } from '@/components/Chatbot'
import { cn } from '@/lib/utils'
import { MagneticButton } from '@/components/MagneticButton'

export default function Layout() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Dynamic header text logic
  const dynamicWords = ['rápida', 'segura', 'definitiva']
  const [wordIndex, setWordIndex] = useState(0)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % dynamicWords.length)
    }, 2000)
    return () => clearInterval(timer)
  }, [dynamicWords.length])

  const navLinks = [
    { label: 'Início', href: '#' },
    { label: 'Como funciona', href: '#como-funciona' },
    { label: 'Depoimentos', href: '#depoimentos' },
    { label: 'Dúvidas', href: '#faq' },
  ]

  return (
    <div className="flex flex-col min-h-screen relative selection:bg-primary/30 selection:text-white">
      <CustomCursor />
      <AuroraBackground />

      <div className="fixed top-0 w-full z-50">
        <Marquee />
        <header
          className={cn(
            'w-full transition-all duration-500 ease-out border-b border-transparent',
            isScrolled ? 'glass-nav py-3' : 'bg-transparent py-5',
          )}
        >
          <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <Logo />
              </Link>

              {/* Dynamic Rotating Text - Desktop Only */}
              <div className="hidden lg:flex items-center text-sm font-medium text-white/70 border-l border-white/20 pl-6">
                Recuperação de crédito de forma
                <div className="relative w-[85px] h-5 ml-1 overflow-hidden font-bold text-primary">
                  {dynamicWords.map((word, i) => (
                    <span
                      key={word}
                      className={cn(
                        'absolute left-1 top-0 transition-all duration-500 ease-out',
                        i === wordIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
                      )}
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              <ul className="flex items-center gap-8">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm font-medium text-white/80 hover:text-white transition-colors relative group"
                    >
                      {link.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full" />
                    </a>
                  </li>
                ))}
              </ul>
              <a href="#consulta">
                <MagneticButton className="px-6 py-2.5 rounded-full bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/20 hover:border-primary/50 backdrop-blur-md transition-all text-sm">
                  Consultar CPF
                </MagneticButton>
              </a>
            </nav>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 text-white hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="w-7 h-7" />
            </button>
          </div>
        </header>
      </div>

      {/* Slide-out Sidebar Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-xl animate-in fade-in duration-300 md:hidden flex justify-end">
          <div className="w-[80%] max-w-[320px] h-full bg-[#111] border-l border-white/10 shadow-2xl flex flex-col p-8 animate-in slide-in-from-right duration-300">
            <div className="flex justify-between items-center mb-12 border-b border-white/10 pb-6">
              <Logo className="scale-90 origin-left" />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-white/70 hover:text-white bg-white/5 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex flex-col gap-6 flex-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-display font-bold text-white/90 hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="mt-auto pt-8 border-t border-white/10">
              <a href="#consulta" onClick={() => setMobileMenuOpen(false)}>
                <button className="w-full py-4 rounded-xl bg-primary text-white font-bold text-lg hover:bg-primary/90 transition-colors neon-glow">
                  Iniciar Análise
                </button>
              </a>
            </div>
          </div>
        </div>
      )}

      <main className="flex-1 flex flex-col w-full pt-[120px]">
        <Outlet />
      </main>

      <footer className="border-t border-white/10 pt-20 pb-10 mt-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 -z-10" />
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <Logo className="mb-6 scale-90 origin-left" />
              <p className="text-white/60 font-medium text-sm max-w-md leading-relaxed">
                A Ilumicred Soluções atua de forma administrativa para garantir seus direitos
                baseados no Código de Defesa do Consumidor, promovendo sua liberdade financeira de
                forma 100% legal.
              </p>
            </div>
            <div className="flex flex-col items-start md:items-end text-left md:text-right">
              <h4 className="font-display font-bold text-xl mb-6 text-white">Navegação</h4>
              <ul className="space-y-3 text-sm font-medium text-white/70">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="hover:text-primary transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-white/40">
            <p>
              © {new Date().getFullYear()} ILUMICRED SOLUÇÕES LTDA. Todos os direitos reservados.
            </p>
            <p>CNPJ: 50.584.948/0001-00</p>
          </div>
        </div>
      </footer>

      <Chatbot />
    </div>
  )
}
