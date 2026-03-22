import { useEffect, useState } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { Menu, X, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/Logo'
import { Chatbot } from '@/components/Chatbot'
import { cn } from '@/lib/utils'

export default function Layout() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Dynamic header text logic
  const dynamicWords = ['rápida', 'segura', 'definitiva']
  const [wordIndex, setWordIndex] = useState(0)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
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
    { label: 'Contato', href: '#consulta' },
  ]

  return (
    <div className="flex flex-col min-h-screen relative bg-white">
      <header
        className={cn(
          'fixed top-0 w-full z-50 transition-all duration-300',
          isScrolled ? 'glass-nav py-3' : 'bg-white py-5 border-b border-primary/10',
        )}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2">
              <Logo className="scale-75 origin-left" />
            </Link>

            {/* Dynamic Rotating Text - Desktop Only */}
            <div className="hidden lg:flex items-center text-sm font-bold text-black border-l-2 border-secondary pl-6">
              Limpe seu nome de forma
              <div className="relative w-[85px] h-6 ml-1 overflow-hidden">
                {dynamicWords.map((word, i) => (
                  <span
                    key={word}
                    className={cn(
                      'absolute left-0 top-0 text-primary transition-all duration-500',
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
            <ul className="flex items-center gap-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm font-bold text-black hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <a href="#consulta">
              <Button className="btn-glow font-bold shadow-md text-black bg-secondary hover:bg-secondary/90">
                Consultar CPF
              </Button>
            </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2 text-primary" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="w-8 h-8" />
          </button>
        </div>
      </header>

      {/* Slide-out Sidebar Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm animate-in fade-in md:hidden">
          <div className="absolute right-0 top-0 bottom-0 w-[280px] bg-white border-l border-primary shadow-2xl flex flex-col p-6 animate-in slide-in-from-right duration-300">
            <div className="flex justify-between items-center mb-10 border-b border-primary/20 pb-4">
              <Logo className="scale-75 origin-left" />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-black hover:text-primary bg-secondary/20 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="flex flex-col gap-6 flex-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xl font-bold text-black border-b border-primary/10 pb-2"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="mt-auto pt-6">
              <a href="#consulta" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full h-14 text-lg text-black bg-secondary font-bold">
                  Consultar CPF
                </Button>
              </a>
            </div>
          </div>
        </div>
      )}

      <main className="flex-1 flex flex-col w-full overflow-hidden pt-[80px]">
        <Outlet />
      </main>

      <footer className="bg-white border-t-4 border-secondary pt-16 pb-8 text-black">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-1 md:col-span-2">
              <Logo className="mb-6 scale-90 origin-left" />
              <p className="text-black font-medium text-sm max-w-md leading-relaxed">
                A Ilumicred Soluções atua de forma administrativa para garantir seus direitos
                baseados no Código de Defesa do Consumidor.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4 text-primary">Links Úteis</h4>
              <ul className="space-y-2 text-sm font-medium text-black">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="hover:text-primary transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4 text-primary">Segurança</h4>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-black bg-secondary/10 p-3 rounded-lg border border-secondary">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                  <span className="text-sm font-bold">Ambiente 100% Seguro</span>
                </div>
                <div className="flex items-center gap-2 text-black bg-secondary/10 p-3 rounded-lg border border-secondary">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                  <span className="text-sm font-bold">Amparado pelo CDC</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-primary/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-black">
            <p>© {new Date().getFullYear()} Ilumicred Soluções. Todos os direitos reservados.</p>
            <p>CNPJ: 00.000.000/0001-00</p>
          </div>
        </div>
      </footer>

      <Chatbot />
    </div>
  )
}
