import { stats } from '../lib/site-data'
import Reveal from './Reveal'
import AnimatedNumber from './AnimatedNumber'
import AnimatedCompactNumber from './AnimatedCompactNumber'
import RootLine from './RootLine'

export default function Stats() {
  return (
    <section className="relative py-28 md:py-40">
      <RootLine from="#d954d1" to="#e07de8" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <Reveal>
          <span className="text-[11px] tracking-[0.4em] uppercase text-[#f4eef7]/50">
            Trajetória
          </span>
        </Reveal>

        <div className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-x-6 md:gap-x-10 gap-y-14">
          {stats.map((s, i) => {
            const isNumeric = Boolean(s.raw) || !Number.isNaN(Number(s.value))
            return (
              <Reveal key={i} delay={i * 0.1}>
                <p
                  translate="no"
                  className={`notranslate flex items-end font-display italic font-semibold leading-none ${
                    i % 2 === 0 ? 'stat-pink' : 'stat-blue'
                  } ${
                    isNumeric
                      ? 'min-h-12 sm:min-h-[3.75rem] md:min-h-[4.5rem] text-5xl sm:text-6xl md:text-7xl'
                      : 'min-h-12 sm:min-h-[3.75rem] md:min-h-[4.5rem] text-3xl sm:text-4xl'
                  }`}
                >
                  <span>
                    {s.prefix}
                    {s.raw ? (
                      <AnimatedCompactNumber value={s.raw} />
                    ) : isNumeric ? (
                      <AnimatedNumber value={Number(s.value)} />
                    ) : (
                      s.value
                    )}
                    {s.suffix && <span className="ml-2 text-[0.42em]">{s.suffix.trim()}</span>}
                  </span>
                </p>
                <p
                  translate="no"
                  className="notranslate mt-5 text-[11px] md:text-xs uppercase tracking-[0.25em] text-[#f4eef7]/60"
                >
                  {s.label}
                </p>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
