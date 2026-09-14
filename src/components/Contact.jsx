import bg from '../assets/photos/cena-videoclipe.jpeg'
import { contact, streaming } from '../lib/site-data'
import Reveal from './Reveal'

export default function Contact() {
  return (
    <section id="contato" className="relative py-32 md:py-48 overflow-hidden">
      <div className="absolute inset-0">
        <img src={bg} alt="" className="w-full h-full object-cover opacity-20 mix-blend-luminosity" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#aab6ea]/75 via-[#7fa8ec]/80 to-[#5f97e8]/85" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <Reveal>
          <span className="text-[11px] tracking-[0.4em] uppercase text-[#1a2140]/50">
            Contato
          </span>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl text-[#1a2140] mt-4 leading-[1.05] max-w-3xl">
            Imprensa, entrevistas <span className="italic text-[#d1548f]">e eventos</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid md:grid-cols-12 gap-10">
          <Reveal delay={0.1} className="md:col-span-4 space-y-2 text-sm text-[#1a2140]/65">
            <p className="text-[11px] tracking-[0.2em] uppercase text-[#1a2140]/50 mb-3">
              Assessoria
            </p>
            <p className="text-[#1a2140]/75">{contact.label}</p>
            <p>{contact.instagram}</p>
            <p>{contact.youtube}</p>
          </Reveal>

          <Reveal delay={0.2} className="md:col-span-8">
            <p className="text-[11px] tracking-[0.2em] uppercase text-[#1a2140]/50 mb-5">
              Ouça Giselli Cristina
            </p>
            <div className="flex flex-wrap gap-x-8 gap-y-4">
              {streaming.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm md:text-base text-[#1a2140]/70 hover:text-[#1a2140] border-b border-transparent hover:border-[#d1548f] transition-all pb-0.5"
                >
                  {s.name}
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
