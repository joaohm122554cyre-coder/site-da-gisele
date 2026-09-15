import bg from '../assets/photos/show-banda.png'
import { stats } from '../lib/site-data'
import Reveal from './Reveal'

export default function Stats() {
  return (
    <section className="relative py-28 md:py-40 border-y border-[#a9a0d8]">
      <div className="absolute inset-0">
        <img src={bg} alt="" className="w-full h-full object-cover opacity-15 mix-blend-luminosity" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#f5b8e3]/70 via-[#d8b3e6]/70 to-[#aab6ea]/70" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <Reveal>
          <span className="text-[11px] tracking-[0.4em] uppercase text-[#1a2140]/50">
            Trajetória
          </span>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 divide-x divide-[#a9a0d8]">
          {stats.map((s, i) => (
            <Reveal key={i} delay={i * 0.1} className="px-4 md:px-8 first:pl-0">
              <p className="font-display text-4xl sm:text-5xl md:text-6xl text-[#1a2140] leading-none">
                {s.prefix}
                {s.value}
                {s.suffix}
              </p>
              <p className="mt-4 text-[11px] md:text-xs uppercase tracking-[0.2em] text-[#1a2140]/55">
                {s.label}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
