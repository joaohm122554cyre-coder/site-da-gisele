import { motion } from 'framer-motion'
import logo from '../assets/logo/logo giselli cristina.png'

const links = [
  { href: '#', label: 'Início' },
  { href: '#sobre', label: 'História' },
  { href: '#musicas', label: 'Músicas' },
  { href: '#videos', label: 'Vídeos' },
  { href: '#galeria', label: 'Galeria' },
  { href: '#agenda', label: 'Agenda' },
  { href: '#contrate', label: 'Contrate' },
  { href: '#redes', label: 'Redes' },
]

export default function Nav() {
  return (
    <motion.nav
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="hidden md:flex fixed left-0 top-0 h-screen w-14 z-50 flex-col items-center justify-between py-6 bg-white/25 backdrop-blur-md border-r border-white/40"
    >
      <a href="#" className="w-9 h-9 rounded-full overflow-hidden bg-white/60 flex items-center justify-center">
        <img
          src={logo}
          alt="Giselli Cristina"
          className="w-16 h-16 object-cover object-top -mt-1"
        />
      </a>

      <div className="flex flex-col items-center gap-7">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            className="text-[10px] tracking-[0.3em] uppercase text-[#f4eef7]/60 hover:text-[#f4eef7] transition-colors [writing-mode:vertical-lr] [text-orientation:upright]"
          >
            {l.label}
          </a>
        ))}
      </div>

      <span className="text-[9px] tracking-[0.3em] uppercase text-[#f4eef7]/30 [writing-mode:vertical-lr] [text-orientation:upright]">
        Gospel
      </span>
    </motion.nav>
  )
}
