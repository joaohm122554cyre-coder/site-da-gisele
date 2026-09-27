import { FiExternalLink } from 'react-icons/fi'
import { hire } from '../lib/site-data'
import Reveal from './Reveal'

export default function Hire() {
  return (
    <section id="contrate" className="relative py-24 md:py-36">
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 text-center">
        <Reveal>
          <span className="text-[11px] tracking-[0.4em] uppercase text-[#f4eef7]/50">
            Contrate
          </span>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl text-[#f4eef7]">
            {hire.title}
          </h2>
          <p className="mt-6 max-w-md mx-auto font-fraunces text-lg leading-[1.7] text-[#f4eef7]/95 [text-shadow:0_1px_14px_rgba(20,18,42,0.85)] md:text-xl">
            {hire.description}
          </p>
        </Reveal>

        {hire.agency ? (
          <Reveal delay={0.15}>
            <p className="mt-3 text-[13px] text-[#f4eef7]/70 max-w-sm mx-auto">
              Lá você fala direto com quem organiza a agenda dela e fecha a data do seu evento.
            </p>
            <a
              href={hire.agency.url}
              target="_blank"
              rel="noreferrer"
              className="cta-glow group mt-6 inline-flex items-center gap-3 rounded-full border border-[#4f7fd6]/45 bg-[#4f7fd6]/10 py-2 pl-2 pr-6 text-[11px] uppercase tracking-[0.28em] text-[#f4eef7]/90 backdrop-blur-sm transition-all duration-500 hover:border-[#4f7fd6] hover:bg-[#4f7fd6]/20 hover:text-[#f4eef7]"
              style={{ '--glow-rgb': '79, 127, 214' }}
            >
              <span className="grid h-9 w-9 place-items-center rounded-full bg-[#4f7fd6] text-white transition-transform duration-500 group-hover:translate-x-1">
                <FiExternalLink className="text-base" aria-hidden="true" />
              </span>
              Contratar pela {hire.agency.name}
            </a>
          </Reveal>
        ) : (
          <Reveal delay={0.15}>
            <p className="mt-10 text-[11px] uppercase tracking-[0.2em] text-[#f4eef7]/40">
              Canal oficial de contratação em breve
            </p>
          </Reveal>
        )}
      </div>
    </section>
  )
}
