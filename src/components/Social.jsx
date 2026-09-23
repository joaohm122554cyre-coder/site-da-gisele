import { SiSpotify, SiApplemusic, SiYoutube, SiDeezer, SiInstagram } from 'react-icons/si'
import { FaAmazon } from 'react-icons/fa'
import { socials, streaming } from '../lib/site-data'
import Reveal from './Reveal'
import RootLine from './RootLine'

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

function Item({ name, label, url }) {
  const Icon = icons[name]
  const color = colors[name]

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="group inline-flex items-center gap-2.5 rounded-full border border-[#f4eef7]/12 bg-[#14122a]/40 py-2 pl-2 pr-5 text-sm text-[#f4eef7]/75 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:text-[#f4eef7]"
      style={{ '--hover-border': hexToRgba(color, 0.6) }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--hover-border)')}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = '')}
    >
      <span
        className="grid h-7 w-7 place-items-center rounded-full transition group-hover:brightness-125"
        style={{ background: name === 'Instagram' ? instagramGradient : hexToRgba(color, 0.18) }}
      >
        <Icon className="h-3.5 w-3.5" style={{ color: name === 'Instagram' ? '#fff' : color }} aria-hidden="true" />
      </span>
      {label}
    </a>
  )
}

function Group({ word, accent, items, delay }) {
  return (
    <Reveal delay={delay}>
      <div className="mb-6 flex items-center justify-center gap-4">
        <span className="h-px w-10 bg-gradient-to-r from-transparent to-current opacity-30" style={{ color: accent }} />
        <span className="font-display text-2xl italic md:text-3xl" style={{ color: accent }}>
          {word}
        </span>
        <span className="h-px w-10 bg-gradient-to-l from-transparent to-current opacity-30" style={{ color: accent }} />
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        {items.map((s) => (
          <Item key={s.name} name={s.name} label={s.handle ?? s.name} url={s.url} />
        ))}
      </div>
    </Reveal>
  )
}

export default function Social() {
  return (
    <section id="redes" className="relative py-28 md:py-40">
      <RootLine from="#4f7fd6" to="#4f7fd6" seed={5} />
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
