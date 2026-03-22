import { useEffect, useState } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { Menu, X, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/Logo'
import { Chatbot } from '@/components/Chatbot'

export default function Layout() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
      setScrollProgress((winScroll / height) * 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Como Funciona', href: '#como-funciona' },
    { label: 'Benefícios', href: '#beneficios' },
    { label: 'O Processo', href: '#legalidade' },
    { label: 'FAQ', href: '#faq' },
  ]

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-[60] bg-transparent">
        <div className="h-full bg-secondary origin-left" style={{ width: `${scrollProgress}%` }} />
      </div>

      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass-nav py-3' : 'bg-transparent py-5'}`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Logo className="scale-75 origin-left" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <a href="#consulta">
              <Button className="btn-glow font-semibold shadow-md text-primary bg-secondary hover:bg-secondary/90">
                Consultar CPF
              </Button>
            </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2 text-foreground" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-sm animate-in fade-in md:hidden">
          <div className="absolute right-0 top-0 bottom-0 w-[280px] bg-background border-l shadow-2xl flex flex-col p-6 animate-in slide-in-from-right">
            <div className="flex justify-between items-center mb-8">
              <Logo className="scale-75 origin-left" />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-muted-foreground hover:text-foreground"
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
                  className="text-lg font-medium text-foreground"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="mt-auto">
              <a href="#consulta" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full h-12 text-lg text-primary bg-secondary font-bold">
                  Consultar CPF Agora
                </Button>
              </a>
            </div>
          </div>
        </div>
      )}

      <main className="flex-1 flex flex-col w-full overflow-hidden">
        <Outlet />
      </main>

      <footer className="bg-[#0A192F] text-white pt-16 pb-8 border-t border-white/10 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-1 md:col-span-2">
              <Logo light className="mb-6 scale-90 origin-left" />
              <p className="text-white/60 text-sm max-w-md leading-relaxed">
                A Ilumicred Soluções é especializada na reabilitação de crédito baseada no Código de
                Defesa do Consumidor. Atuamos de forma administrativa e legal para garantir seus
                direitos.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4 text-white">Links Úteis</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li>
                  <a href="#como-funciona" className="hover:text-secondary transition-colors">
                    Como Funciona
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-secondary transition-colors">
                    Dúvidas Frequentes
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-secondary transition-colors">
                    Termos de Uso
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-secondary transition-colors">
                    Política de Privacidade
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4 text-white">Segurança</h4>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-white/80 bg-white/5 p-3 rounded-lg border border-white/10">
                  <ShieldCheck className="w-5 h-5 text-success" />
                  <span className="text-sm font-medium">Ambiente 100% Seguro</span>
                </div>
                <div className="flex items-center gap-2 text-white/80 bg-white/5 p-3 rounded-lg border border-white/10">
                  <ShieldCheck className="w-5 h-5 text-secondary" />
                  <span className="text-sm font-medium">Amparado pelo CDC</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
            <p>© {new Date().getFullYear()} Ilumicred Soluções. Todos os direitos reservados.</p>
            <p>CNPJ: 00.000.000/0001-00</p>
          </div>
        </div>
      </footer>

      <Chatbot />
    </div>
  )
}
