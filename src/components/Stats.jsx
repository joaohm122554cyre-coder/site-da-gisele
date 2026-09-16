import bgVideo from '../assets/videos/stats-bg.mp4'
import { stats } from '../lib/site-data'
import Reveal from './Reveal'
import AnimatedNumber from './AnimatedNumber'

export default function Stats() {
  return (
    <section className="relative py-28 md:py-40 overflow-hidden">
      <div className="absolute inset-0">
        <video
          src={bgVideo}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#241a42]/55 via-[#2c1a48]/55 to-[#1c1638]/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <Reveal>
          <span className="text-[11px] tracking-[0.4em] uppercase text-[#f4eef7]/50">
            Trajetória
          </span>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 divide-x divide-[#a9a0d8]/30">
          {stats.map((s, i) => (
            <Reveal key={i} delay={i * 0.1} className="px-4 md:px-8 first:pl-0">
              <p className="font-display italic font-semibold text-4xl sm:text-5xl md:text-6xl text-[#d954d1] leading-none">
                {s.prefix}
                {Number.isNaN(Number(s.value)) ? (
                  s.value
                ) : (
                  <AnimatedNumber value={Number(s.value)} />
                )}
                {s.suffix}
              </p>
              <p className="mt-4 text-[11px] md:text-xs uppercase tracking-[0.2em] text-[#f4eef7]/55">
                {s.label}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
