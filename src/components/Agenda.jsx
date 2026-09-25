import { SiWhatsapp } from 'react-icons/si'
import { agenda } from '../lib/site-data'
import Reveal from './Reveal'

const upcoming = []

export default function Agenda() {
  return (
    <section id="agenda" className="relative py-20 md:py-32 bg-transparent">
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <Reveal>
          <span className="text-[11px] tracking-[0.4em] uppercase text-[#f4eef7]/50">
            Agenda
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#f4eef7] mt-4">
            Próximos <span className="italic text-[#4f7fd6]">shows</span>
          </h2>
        </Reveal>

        {upcoming.length === 0 ? (
          <Reveal delay={0.15}>
            <p className="mt-10 max-w-lg font-fraunces text-lg leading-[1.8] text-[#f4eef7]/90 md:text-xl">
              {agenda.description}
            </p>
            <a
              href={`https://wa.me/${agenda.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="group mt-8 inline-flex items-center gap-3 rounded-full border border-[#25d366]/40 bg-[#14122a]/55 py-3.5 pl-5 pr-6 text-[11px] uppercase tracking-[0.28em] text-[#f4eef7]/90 backdrop-blur-md transition hover:border-[#25d366]/80 hover:bg-[#14122a]/75 hover:text-[#f4eef7]"
            >
              <span className="grid h-8 w-8 place-items-center rounded-full bg-[#25d366]/15 text-[#25d366] transition group-hover:bg-[#25d366]/25">
                <SiWhatsapp className="text-base" aria-hidden="true" />
              </span>
              Falar com {agenda.contactName} no WhatsApp
            </a>
          </Reveal>
        ) : (
          <ul className="mt-14 divide-y divide-[#a9a0d8] max-w-2xl">
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
