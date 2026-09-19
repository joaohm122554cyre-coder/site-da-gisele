import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import logo from '../assets/logo/gc-monograma.png'

const links = [
  { id: null, href: '#', label: 'Início' },
  { id: 'sobre', href: '#sobre', label: 'Sobre' },
  { id: 'historia', href: '#historia', label: 'História' },
  { id: 'musicas', href: '#musicas', label: 'Músicas' },
  { id: 'videos', href: '#videos', label: 'Vídeos' },
  { id: 'galeria', href: '#galeria', label: 'Galeria' },
  { id: 'agenda', href: '#agenda', label: 'Agenda' },
  { id: 'contrate', href: '#contrate', label: 'Contrate' },
  { id: 'redes', href: '#redes', label: 'Redes' },
]

export default function Nav() {
  const [active, setActive] = useState(0)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
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

  const pad = (n) => String(n).padStart(2, '0')

  return (
    <motion.nav
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      aria-label="Navegação principal"
      className="hidden md:flex fixed left-0 top-0 h-screen w-14 z-50 flex-col items-center justify-between py-6 bg-[#14122a]/45 backdrop-blur-md border-r border-[#f4eef7]/10"
    >
      <a
        href="#"
        aria-label="Giselli Cristina — voltar ao início"
        className="group flex flex-col items-center gap-2"
      >
        <img
          src={logo}
          alt="GC"
          className="w-9 opacity-90 drop-shadow-[0_0_10px_rgba(217,84,209,0.35)] transition-all duration-300 group-hover:opacity-100 group-hover:drop-shadow-[0_0_14px_rgba(217,84,209,0.8)]"
        />
        <span className="h-px w-4 bg-gradient-to-r from-transparent via-[#d954d1] to-transparent" />
      </a>

      <div className="relative flex flex-col items-center gap-5 py-2">
        <div className="absolute left-1/2 top-2 bottom-2 w-px -translate-x-1/2 bg-[#f4eef7]/10" />
        <motion.div
          style={{ scaleY: progress }}
          className="absolute left-1/2 top-2 bottom-2 w-px -translate-x-1/2 origin-top bg-gradient-to-b from-[#d954d1] to-[#7f9cf5]"
        />

        {links.map((l, i) => {
          const isActive = i === active
          return (
            <a
              key={l.label}
              href={l.href}
              aria-label={l.label}
              aria-current={isActive ? 'true' : undefined}
              className="group relative z-10 flex h-5 w-8 items-center justify-center"
            >
              <span
                className={`block rounded-full transition-all duration-300 ${
                  isActive
                    ? 'h-2.5 w-2.5 bg-[#d954d1] shadow-[0_0_12px_2px_rgba(217,84,209,0.7)]'
                    : 'h-1.5 w-1.5 bg-[#f4eef7]/40 group-hover:bg-[#f4eef7] group-hover:scale-125'
                }`}
              />
              <span
                className={`pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-full border px-3 py-1.5 text-[10px] uppercase tracking-[0.25em] backdrop-blur-md transition-all duration-300 ${
                  isActive
                    ? 'translate-x-0 border-[#d954d1]/40 bg-[#14122a]/80 text-[#f4eef7] opacity-100 md:opacity-0 md:group-hover:opacity-100'
                    : '-translate-x-1 border-[#f4eef7]/10 bg-[#14122a]/80 text-[#f4eef7]/85 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
                }`}
              >
                {l.label}
              </span>
            </a>
          )
        })}
      </div>

      <div className="flex flex-col items-center gap-1 text-[9px] tabular-nums tracking-[0.15em] text-[#f4eef7]/40">
        <span className="text-[#f4eef7]/85">{pad(active + 1)}</span>
        <span className="h-px w-3 bg-[#f4eef7]/25" />
        <span>{pad(links.length)}</span>
      </div>
    </motion.nav>
  )
}
