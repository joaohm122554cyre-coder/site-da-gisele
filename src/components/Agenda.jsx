import { SiWhatsapp } from 'react-icons/si'
import { agenda } from '../lib/site-data'
import Reveal from './Reveal'

const upcoming = []

export default function Agenda() {
  return (
    <section id="agenda" className="relative py-20 md:py-32 bg-transparent">
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 text-center">
        <Reveal>
          <span className="text-[11px] tracking-[0.4em] uppercase text-[#f4eef7]/50">
            Agenda
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#f4eef7] mt-4">
            {upcoming.length === 0 ? (
              <>
                Leve Giselli ao <span className="italic text-[#4f7fd6]">seu evento</span>
              </>
            ) : (
              <>
                Próximos <span className="italic text-[#4f7fd6]">shows</span>
              </>
            )}
          </h2>
        </Reveal>

        {upcoming.length === 0 ? (
          <Reveal delay={0.15}>
            <p className="mt-10 max-w-lg mx-auto font-fraunces text-lg leading-[1.8] text-[#f4eef7]/90 md:text-xl">
              {agenda.description}
            </p>
            <a
              href={`https://wa.me/${agenda.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="cta-glow group mt-8 inline-flex items-center gap-3 rounded-full border border-[#4f7fd6]/45 bg-[#4f7fd6]/10 py-2 pl-2 pr-6 text-[11px] uppercase tracking-[0.28em] text-[#f4eef7]/90 backdrop-blur-sm transition-all duration-500 hover:border-[#4f7fd6] hover:bg-[#4f7fd6]/20 hover:text-[#f4eef7]"
              style={{ '--glow-rgb': '79, 127, 214' }}
            >
              <span className="grid h-9 w-9 place-items-center rounded-full bg-[#4f7fd6] text-white transition-transform duration-500 group-hover:translate-x-1">
                <SiWhatsapp className="text-base" aria-hidden="true" />
              </span>
              Falar com {agenda.contactName} no WhatsApp
            </a>
          </Reveal>
        ) : (
          <ul className="mt-14 mx-auto max-w-2xl divide-y divide-[#a9a0d8] text-left">
            {upcoming.map((ev, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <li className="flex justify-between py-5 text-[#f4eef7]/75 text-sm md:text-base">
                  <span>{ev.date}</span>
                  <span>{ev.city}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
