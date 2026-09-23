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
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#f4eef7]/20 text-sm text-[#f4eef7]/80 hover:bg-[#4f7fd6] hover:text-[#14122a] hover:border-[#4f7fd6] transition-colors"
      >
        {content}
      </a>
    )
  }
  return (
    <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#f4eef7]/10 text-sm text-[#f4eef7]/30">
      {content}
    </span>
  )
}

export default function Social() {
  return (
    <section id="redes" className="relative py-28 md:py-40">
      <RootLine from="#4f7fd6" to="#4f7fd6" branches={[0.32, 0.66]} />
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center">
        <Reveal>
          <span className="text-[11px] tracking-[0.4em] uppercase text-[#f4eef7]/50">
            Siga e ouça
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#f4eef7] mt-4 mb-12">
            Redes <span className="italic text-[#4f7fd6]">e plataformas</span>
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
