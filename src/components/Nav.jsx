import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const links = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#musicas', label: 'Músicas' },
  { href: '#agenda', label: 'Agenda' },
  { href: '#contato', label: 'Contato' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-500 ${
        scrolled ? 'bg-[#ffdcee]/85 backdrop-blur-sm border-b border-[#a9a0d8]/60' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        <a
          href="#"
          className={`font-display text-sm tracking-[0.3em] uppercase transition-colors duration-500 ${
            scrolled ? 'text-[#1a2140]' : 'text-white'
          }`}
        >
          Giselli Cristina
        </a>
        <div className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-[11px] tracking-[0.2em] uppercase transition-colors ${
                scrolled ? 'text-[#1a2140]/70 hover:text-[#1a2140]' : 'text-white/70 hover:text-white'
              }`}
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </motion.nav>
  )
}
