import bg from '../assets/photos/cena-videoclipe.jpeg'
import { hire } from '../lib/site-data'
import Reveal from './Reveal'

export default function Hire() {
  return (
    <section id="contrate" className="relative py-32 md:py-48 overflow-hidden">
      <div className="absolute inset-0">
        <img src={bg} alt="" className="w-full h-full object-cover opacity-30 mix-blend-luminosity" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#d8b3e6]/80 via-[#c0b0e8]/85 to-[#aab6ea]/85" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-12 text-center">
        <Reveal>
          <span className="text-[11px] tracking-[0.4em] uppercase text-[#1a2140]/50">
            Contrate
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#1a2140] mt-4">
            {hire.title}
          </h2>
          <p className="mt-6 text-sm md:text-base text-[#1a2140]/65 max-w-md mx-auto">
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
                  className="text-[11px] tracking-[0.3em] uppercase text-[#1a2140]/80 hover:text-[#1a2140] border-b border-transparent hover:border-[#d1548f] transition-all pb-0.5"
                >
                  Falar no WhatsApp
                </a>
              )}
              {hire.email && (
                <a
                  href={`mailto:${hire.email}`}
                  className="text-[11px] tracking-[0.3em] uppercase text-[#1a2140]/80 hover:text-[#1a2140] border-b border-transparent hover:border-[#d1548f] transition-all pb-0.5"
                >
                  Enviar e-mail
                </a>
              )}
            </div>
          ) : (
            <p className="mt-10 text-[11px] uppercase tracking-[0.2em] text-[#1a2140]/40">
              Canal oficial de contratação em breve
            </p>
          )}
        </Reveal>
      </div>
    </section>
  )
}
