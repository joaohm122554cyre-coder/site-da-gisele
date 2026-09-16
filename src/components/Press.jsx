import { press } from '../lib/site-data'
import Reveal from './Reveal'

export default function Press() {
  return (
    <section id="imprensa" className="relative py-28 md:py-40 border-t border-[#a9a0d8]/60">
      <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
        <Reveal>
          <span className="text-[11px] tracking-[0.4em] uppercase text-[#f4eef7]/50">
            Imprensa
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#f4eef7] mt-4">
            {press.title}
          </h2>
          <p className="mt-6 text-sm md:text-base text-[#f4eef7]/65 max-w-md mx-auto">
            {press.description}
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          {press.mediaKitUrl ? (
            <a
              href={press.mediaKitUrl}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 mt-10 text-[11px] tracking-[0.3em] uppercase text-[#f4eef7]/80 hover:text-[#f4eef7] transition-colors"
            >
              Baixar mídia kit
              <span className="w-10 h-px bg-[#d954d1] group-hover:w-16 transition-all duration-500" />
            </a>
          ) : (
            <p className="mt-10 text-[11px] uppercase tracking-[0.2em] text-[#f4eef7]/40">
              Mídia kit para download em breve
            </p>
          )}
        </Reveal>
      </div>
    </section>
  )
}
