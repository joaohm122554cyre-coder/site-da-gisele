import { useEffect, useRef, useState } from 'react'
import instagramLogo from '../assets/icons/instagram.svg'
import ebenezerLogo from '../assets/icons/ebenezer-logo.webp'
import { artist } from '../lib/site-data'

const credits = [
  { label: 'Instagram', href: 'https://www.instagram.com/agencia_ebenezer_br', logo: instagramLogo, plainBg: true, glow: '#E1306C' },
  { label: 'ebenezeragencia.com.br', href: 'https://ebenezeragencia.com.br', logo: ebenezerLogo, plainBg: false, glow: '#7f5af2' },
]

// Um só selo com o logo — ao clicar, abre as duas opções (Instagram e site)
// pra pessoa escolher, em vez de já vir com dois botões separados.
function EbenezerBadge() {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const onPointerDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false)
    }
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div ref={wrapRef} className="relative">
      {/* o brilho fica no invólucro de fora, do tamanho do botão inteiro (com a
          escrita) — o botão em si mora dentro, intocado, só ganha z-index pra
          aparecer por cima do brilho girando */}
      <span className="glow-ring inline-block rounded-full" style={{ '--glow-color': '#7f5af2' }}>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-haspopup="true"
          aria-label="Desenvolvido por Ebenézer — ver Instagram e site"
          className="group relative z-[1] inline-flex items-center gap-3 rounded-full border border-[#f4eef7]/15 bg-[#14122a]/40 py-1.5 pl-1.5 pr-4 backdrop-blur-sm transition-colors duration-300 hover:border-[#d954d1]/50"
        >
          <span className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full shadow-sm">
            <img src={ebenezerLogo} alt="" className="h-full w-full object-cover" />
          </span>
          <span className="font-display text-base italic text-[#f4eef7]">Ebenézer</span>
        </button>
      </span>

      {open && (
        <div className="absolute bottom-full left-1/2 z-20 mb-3 w-60 -translate-x-1/2 space-y-2 rounded-2xl border border-[#f4eef7]/12 bg-[#1c1638]/95 p-2 shadow-2xl shadow-black/50 backdrop-blur-md">
          {credits.map(({ label, href, logo, plainBg, glow }) => (
            <span key={label} className="glow-ring block rounded-xl" style={{ '--glow-color': glow }}>
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="relative z-[1] flex items-center gap-3 rounded-xl px-2.5 py-2.5 text-[13px] text-[#f4eef7]/80 transition-colors hover:bg-[#f4eef7]/[0.06] hover:text-[#f4eef7]"
              >
                <span
                  className={`grid h-8 w-8 shrink-0 place-items-center overflow-hidden rounded-full shadow-sm ${plainBg ? 'bg-white p-1.5' : ''}`}
                >
                  <img src={logo} alt="" className={`h-full w-full ${plainBg ? 'object-contain' : 'object-cover'}`} />
                </span>
                {label}
              </a>
            </span>
          ))}
          <span className="absolute left-1/2 top-full h-3 w-3 -translate-x-1/2 -translate-y-1.5 rotate-45 border-b border-r border-[#f4eef7]/12 bg-[#1c1638]/95" />
        </div>
      )}
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="py-14 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center gap-10 md:flex-row md:items-center md:justify-between">
        <div className="text-center md:text-left">
          <p className="font-display text-base tracking-[0.3em] text-[#f4eef7] uppercase">
            {artist.name}
          </p>
          <p className="mt-2 text-[11px] text-[#f4eef7]/55">
            &copy; {new Date().getFullYear()} Todos os direitos reservados. {artist.label}.
          </p>
        </div>

        <div className="flex flex-col items-center gap-3 md:items-end">
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#f4eef7]/60">Desenvolvido por</span>
          <EbenezerBadge />
        </div>
      </div>
    </footer>
  )
}
