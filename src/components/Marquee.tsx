export function Marquee() {
  return (
    <div className="relative flex overflow-x-hidden bg-primary/20 border-b border-primary/30 text-white/90 py-1.5 text-xs font-semibold tracking-widest uppercase">
      <div className="animate-marquee whitespace-nowrap flex items-center min-w-full">
        {[...Array(6)].map((_, i) => (
          <span key={i} className="mx-8 flex items-center gap-8">
            ILUMICRED SOLUÇÕES LTDA - CNPJ: 50.584.948/0001-00 - Osasco / SP
            <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block shadow-[0_0_8px_var(--primary)]" />
          </span>
        ))}
      </div>
      <div className="absolute top-0 animate-marquee whitespace-nowrap flex items-center min-w-full ml-[100%]">
        {[...Array(6)].map((_, i) => (
          <span key={`dup-${i}`} className="mx-8 flex items-center gap-8">
            ILUMICRED SOLUÇÕES LTDA - CNPJ: 50.584.948/0001-00 - Osasco / SP
            <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block shadow-[0_0_8px_var(--primary)]" />
          </span>
        ))}
      </div>
    </div>
  )
}
