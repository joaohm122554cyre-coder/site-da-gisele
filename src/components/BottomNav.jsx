import { useEffect, useState } from 'react'
import {
  PiHouse,
  PiHouseFill,
  PiSparkle,
  PiSparkleFill,
  PiMusicNotes,
  PiMusicNotesFill,
  PiPlayCircle,
  PiPlayCircleFill,
  PiMicrophoneStage,
  PiMicrophoneStageFill,
} from 'react-icons/pi'

const links = [
  { id: null, href: '#', label: 'Início', Icon: PiHouse, IconActive: PiHouseFill },
  { id: 'historia', href: '#historia', label: 'Carreira', Icon: PiSparkle, IconActive: PiSparkleFill },
  { id: 'musicas', href: '#musicas', label: 'Músicas', Icon: PiMusicNotes, IconActive: PiMusicNotesFill },
  { id: 'videos', href: '#videos', label: 'Vídeos', Icon: PiPlayCircle, IconActive: PiPlayCircleFill },
  { id: 'contrate', href: '#contrate', label: 'Contratar', Icon: PiMicrophoneStage, IconActive: PiMicrophoneStageFill },
]

// Celular: barra fixa embaixo, estilo app, com os atalhos principais do site.
// Aparece depois que a pessoa sai do Hero. No computador quem faz esse papel é a Nav lateral.
export default function BottomNav() {
  const [active, setActive] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      // some no início (Hero) e no fim da página, pra não cobrir o rodapé —
      // assim não precisa de espaço vazio no fim, e o fundo do site vai até a borda
      const nearEnd =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 160
      setVisible(window.scrollY > window.innerHeight * 0.6 && !nearEnd)
      const line = window.innerHeight * 0.4
      let current = 0
      links.forEach((l, i) => {
        if (!l.id) return
        const el = document.getElementById(l.id)
        if (el && el.getBoundingClientRect().top <= line) current = i
      })
      setActive(current)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <nav
      aria-label="Atalhos do site"
      aria-hidden={!visible}
      className={`fixed inset-x-3 bottom-[calc(0.75rem+env(safe-area-inset-bottom))] z-40 md:hidden transition-all duration-500 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-[150%] opacity-0'
      }`}
    >
      <ul className="flex items-stretch justify-between rounded-2xl border border-[#f4eef7]/10 bg-[#14122a]/35 px-1.5 py-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-md">
        {links.map((l, i) => {
          const isActive = i === active
          const isCta = l.id === 'contrate'
          const Icon = isActive ? l.IconActive : l.Icon
          return (
            <li key={l.label} className="flex-1">
              <a
                href={l.href}
                tabIndex={visible ? 0 : -1}
                aria-current={isActive ? 'true' : undefined}
                className={`flex flex-col items-center gap-0.5 rounded-xl py-1.5 text-[9px] uppercase tracking-[0.12em] transition-colors duration-300 ${
                  isCta
                    ? 'bg-[#d954d1]/15 text-[#f7b9f1] ring-1 ring-[#d954d1]/40'
                    : isActive
                      ? 'text-[#f4eef7]'
                      : 'text-[#f4eef7]/50'
                }`}
              >
                <Icon
                  aria-hidden="true"
                  className={`text-[20px] transition-transform duration-300 ${isActive ? 'scale-110 text-[#d954d1]' : ''}`}
                />
                {l.label}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
