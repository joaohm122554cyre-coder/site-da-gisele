import { SiSpotify, SiApplemusic, SiYoutube, SiDeezer, SiInstagram } from 'react-icons/si'
import { socials, streaming } from '../lib/site-data'
import Reveal from './Reveal'

const icons = {
  Spotify: SiSpotify,
  'Apple Music': SiApplemusic,
  YouTube: SiYoutube,
  Deezer: SiDeezer,
  Instagram: SiInstagram,
}

function Item({ name, label, url }) {
  const Icon = icons[name]
  const content = (
    <>
      {Icon && <Icon className="w-4 h-4" />}
      <span>{label}</span>
    </>
  )

  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#1a2140]/20 text-sm text-[#1a2140]/80 hover:bg-[#1a2140] hover:text-[#ffdcee] hover:border-[#1a2140] transition-colors"
      >
        {content}
      </a>
    )
  }
  return (
    <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#1a2140]/10 text-sm text-[#1a2140]/30">
      {content}
    </span>
  )
}

export default function Social() {
  return (
    <section id="redes" className="relative py-28 md:py-40 border-t border-[#a9a0d8]/60">
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
        <Reveal>
          <span className="text-[11px] tracking-[0.4em] uppercase text-[#1a2140]/50">
            Siga e ouça
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#1a2140] mt-4 mb-12">
            Redes <span className="italic text-[#d1548f]">e plataformas</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="flex flex-wrap justify-center gap-3 mb-4">
          {socials.map((s) => (
            <Item key={s.name} name={s.name} label={s.handle ?? s.name} url={s.url} />
          ))}
        </Reveal>

        <Reveal delay={0.15} className="flex flex-wrap justify-center gap-3">
          {streaming.map((s) => (
            <Item key={s.name} name={s.name} label={s.name} url={s.url} />
          ))}
        </Reveal>
      </div>
    </section>
  )
}
