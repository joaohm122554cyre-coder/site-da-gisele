import { socials, streaming } from '../lib/site-data'
import Reveal from './Reveal'

function Item({ label, url }) {
  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="text-sm md:text-base text-[#1a2140]/70 hover:text-[#1a2140] border-b border-transparent hover:border-[#d1548f] transition-all pb-0.5"
      >
        {label}
      </a>
    )
  }
  return <span className="text-sm md:text-base text-[#1a2140]/30">{label}</span>
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

        <Reveal delay={0.1} className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-8">
          {socials.map((s) => (
            <Item key={s.name} label={s.handle ?? s.name} url={s.url} />
          ))}
        </Reveal>

        <Reveal delay={0.15} className="flex flex-wrap justify-center gap-x-8 gap-y-3">
          {streaming.map((s) => (
            <Item key={s.name} label={s.name} url={s.url} />
          ))}
        </Reveal>
      </div>
    </section>
  )
}
