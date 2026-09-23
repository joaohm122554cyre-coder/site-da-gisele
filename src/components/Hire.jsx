import { SiWhatsapp } from 'react-icons/si'
import { FiExternalLink, FiMail } from 'react-icons/fi'
import { hire } from '../lib/site-data'
import Reveal from './Reveal'
import ZigzagLine from './ZigzagLine'
import RootLine from './RootLine'

export default function Hire() {
  return (
    <section id="contrate" className="relative py-32 md:py-48">
      <RootLine from="#4f7fd6" to="#4f7fd6" branches={[0.3, 0.68]} />
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 text-center">
        <Reveal>
          <span className="text-[11px] tracking-[0.4em] uppercase text-[#f4eef7]/50">
            Contrate
          </span>
          <div className="mt-4 flex items-center gap-2">
            <ZigzagLine side="left" />
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#f4eef7]">
              {hire.title}
            </h2>
            <ZigzagLine side="right" />
          </div>
          <p className="mt-6 text-sm md:text-base text-[#f4eef7]/65 max-w-md mx-auto">
            {hire.description}
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          {hire.whatsapp || hire.email ? (
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              {hire.whatsapp && (
                <a
                  href={`https://wa.me/${hire.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-3 rounded-full border border-[#25d366]/40 bg-[#14122a]/55 py-3.5 pl-5 pr-6 text-[11px] uppercase tracking-[0.28em] text-[#f4eef7]/90 backdrop-blur-md transition hover:border-[#25d366]/80 hover:bg-[#14122a]/75 hover:text-[#f4eef7]"
                >
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-[#25d366]/15 text-[#25d366] transition group-hover:bg-[#25d366]/25">
                    <SiWhatsapp className="text-base" aria-hidden="true" />
                  </span>
                  Falar no WhatsApp
                </a>
              )}
              {hire.email && (
                <a
                  href={`mailto:${hire.email}`}
                  className="group inline-flex items-center gap-3 rounded-full border border-[#f4eef7]/20 bg-[#14122a]/55 py-3.5 pl-5 pr-6 text-[11px] uppercase tracking-[0.28em] text-[#f4eef7]/90 backdrop-blur-md transition hover:border-[#d954d1]/60 hover:bg-[#14122a]/75 hover:text-[#f4eef7]"
                >
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-[#d954d1]/15 text-[#d954d1] transition group-hover:bg-[#d954d1]/25">
                    <FiMail className="text-base" aria-hidden="true" />
                  </span>
                  Enviar e-mail
                </a>
              )}
            </div>
          ) : (
            <p className="mt-10 text-[11px] uppercase tracking-[0.2em] text-[#f4eef7]/40">
              Canal oficial de contratação em breve
            </p>
          )}
        </Reveal>

        {hire.agency && (
          <Reveal delay={0.22}>
            <a
              href={hire.agency.url}
              target="_blank"
              rel="noreferrer"
              className="group mt-6 inline-flex items-center gap-3 rounded-full border border-[#4f7fd6]/40 bg-[#14122a]/55 py-3.5 pl-5 pr-6 text-[11px] uppercase tracking-[0.28em] text-[#f4eef7]/90 backdrop-blur-md transition hover:border-[#4f7fd6]/80 hover:bg-[#14122a]/75 hover:text-[#f4eef7]"
            >
              <span className="grid h-8 w-8 place-items-center rounded-full bg-[#4f7fd6]/15 text-[#4f7fd6] transition group-hover:bg-[#4f7fd6]/25">
                <FiExternalLink className="text-base" aria-hidden="true" />
              </span>
              Visitar site da {hire.agency.name}
            </a>
          </Reveal>
        )}
      </div>
    </section>
  )
}
