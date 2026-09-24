import { motion } from 'framer-motion'
import { SiSpotify, SiApplemusic, SiYoutube, SiDeezer, SiInstagram } from 'react-icons/si'
import { FaAmazon } from 'react-icons/fa'
import { socials, streaming } from '../lib/site-data'
import Reveal from './Reveal'

const icons = {
  Spotify: SiSpotify,
  'Apple Music': SiApplemusic,
  YouTube: SiYoutube,
  'Amazon Music': FaAmazon,
  Deezer: SiDeezer,
  Instagram: SiInstagram,
}

// Cor de marca de cada plataforma — é o que tira a cara de "molde" das pílulas.
const colors = {
  Spotify: '#1DB954',
  'Apple Music': '#FA2D48',
  YouTube: '#FF0000',
  'Amazon Music': '#00A8E1',
  Deezer: '#A238FF',
  Instagram: '#E1306C',
}
const instagramGradient = 'linear-gradient(135deg, #FEDA75, #D62976 55%, #4F5BD5)'

const hexToRgba = (hex, alpha) => {
  const n = parseInt(hex.slice(1), 16)
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`
}

// side: de que lado a pílula "vem" antes de encaixar no lugar — como um elo de uma
// corrente de ímã se juntando no centro da fileira.
function Item({ name, label, url, side, order }) {
  const Icon = icons[name]
  const color = colors[name]
  const fromX = side === 'left' ? -90 : side === 'right' ? 90 : 0

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noreferrer"
      initial={{ x: fromX, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ type: 'spring', stiffness: 140, damping: 15, delay: 0.35 + order * 0.08 }}
      className="group inline-flex items-center gap-2.5 rounded-full border border-[#f4eef7]/12 bg-[#14122a]/40 py-2 pl-2 pr-5 text-sm text-[#f4eef7]/75 backdrop-blur-sm transition-colors duration-300 hover:text-[#f4eef7]"
      style={{ '--hover-border': hexToRgba(color, 0.6) }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--hover-border)')}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = '')}
    >
      <span
        className="grid h-8 w-8 place-items-center rounded-full transition group-hover:brightness-125"
        style={{ background: name === 'Instagram' ? instagramGradient : hexToRgba(color, 0.18) }}
      >
        <Icon className="h-3 w-3" style={{ color: name === 'Instagram' ? '#fff' : color }} aria-hidden="true" />
      </span>
      {label}
    </motion.a>
  )
}

// A fagulha que pisca no meio da fileira no instante em que os dois lados se encontram.
function MeetSpark({ accent }) {
  return (
    <motion.span
      aria-hidden="true"
      initial={{ opacity: 0, scale: 0.4 }}
      whileInView={{ opacity: [0, 1, 0], scale: [0.4, 1.6, 2.2] }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.55, ease: 'easeOut' }}
      className="pointer-events-none absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full blur-md"
      style={{ background: accent }}
    />
  )
}

function Group({ word, accent, items, delay }) {
  const n = items.length
  const mid = Math.floor(n / 2)
  const hasCenter = n % 2 === 1

  return (
    <Reveal delay={delay}>
      <div className="mb-6 flex items-center justify-center gap-4">
        <span className="h-px w-10 bg-gradient-to-r from-transparent to-current opacity-30" style={{ color: accent }} />
        <span className="font-display text-2xl italic md:text-3xl" style={{ color: accent }}>
          {word}
        </span>
        <span className="h-px w-10 bg-gradient-to-l from-transparent to-current opacity-30" style={{ color: accent }} />
      </div>
      <div className="relative flex flex-wrap justify-center gap-3">
        <MeetSpark accent={accent} />
        {items.map((s, i) => {
          const centerIndex = hasCenter ? mid : -1
          const side = i === centerIndex ? 'center' : i < mid ? 'left' : 'right'
          // as pontas da corrente saem primeiro; o elo mais perto do centro chega
          // por último e "fecha" a conexão
          const order = side === 'left' ? i : side === 'right' ? n - 1 - i : 0
          return <Item key={s.name} name={s.name} label={s.handle ?? s.name} url={s.url} side={side} order={order} />
        })}
      </div>
    </Reveal>
  )
}

export default function Social() {
  return (
    <section id="redes" className="relative py-28 md:py-40">
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center">
        <Reveal>
          <span className="text-[11px] tracking-[0.4em] uppercase text-[#f4eef7]/50">
            Siga e ouça
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#f4eef7] mt-4 mb-16">
            Redes <span className="italic text-[#4f7fd6]">e plataformas</span>
          </h2>
        </Reveal>

        <Group word="Siga" accent="#d954d1" items={socials} delay={0.1} />

        <div className="my-12 flex justify-center">
          <span className="h-px w-16 bg-[#f4eef7]/15" />
        </div>

        <Group word="Ouça" accent="#4f7fd6" items={streaming} delay={0.15} />
      </div>
    </section>
  )
}
