import photo from '../assets/photos/retrato-jardim.png'
import { meuBarquinho } from '../lib/site-data'
import Reveal from './Reveal'

export default function MeuBarquinho() {
  return (
    <section id="meu-barquinho" className="relative py-28 md:py-40">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-5">
          <Reveal>
            <img
              src={photo}
              alt={meuBarquinho.title}
              className="w-full object-cover aspect-[4/5] grayscale-[10%]"
            />
          </Reveal>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <Reveal>
            <span className="text-[11px] tracking-[0.4em] uppercase text-[#1a2140]/50">
              O clássico
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#1a2140] mt-4">
              {meuBarquinho.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-sm md:text-base text-[#1a2140]/65 leading-relaxed max-w-md">
              {meuBarquinho.description}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            {meuBarquinho.url ? (
              <a
                href={meuBarquinho.url}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-3 mt-10 text-[11px] tracking-[0.3em] uppercase text-[#1a2140]/80 hover:text-[#1a2140] transition-colors"
              >
                Ouvir agora
                <span className="w-10 h-px bg-[#d1548f] group-hover:w-16 transition-all duration-500" />
              </a>
            ) : (
              <p className="mt-10 text-[11px] uppercase tracking-[0.2em] text-[#1a2140]/40">
                Link para ouvir em breve
              </p>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
