import { hire } from '../lib/site-data'
import Reveal from './Reveal'
import ZigzagLine from './ZigzagLine'

export default function Hire() {
  return (
    <section id="contrate" className="relative py-32 md:py-48">
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
            <div className="mt-10 flex flex-wrap justify-center gap-x-10 gap-y-4">
              {hire.whatsapp && (
                <a
                  href={`https://wa.me/${hire.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] tracking-[0.3em] uppercase text-[#f4eef7]/80 hover:text-[#f4eef7] border-b border-transparent hover:border-[#d954d1] transition-all pb-0.5"
                >
                  Falar no WhatsApp
                </a>
              )}
              {hire.email && (
                <a
                  href={`mailto:${hire.email}`}
                  className="text-[11px] tracking-[0.3em] uppercase text-[#f4eef7]/80 hover:text-[#f4eef7] border-b border-transparent hover:border-[#d954d1] transition-all pb-0.5"
                >
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
      </div>
    </section>
  )
}
