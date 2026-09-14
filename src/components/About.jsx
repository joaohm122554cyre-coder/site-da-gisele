import photo from '../assets/photos/retrato-jardim.png'
import { about } from '../lib/site-data'
import Reveal from './Reveal'

export default function About() {
  return (
    <section id="sobre" className="relative py-28 md:py-40">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-12 gap-10 md:gap-6 items-start">
          <div className="md:col-span-5">
            <Reveal>
              <span className="text-[11px] tracking-[0.4em] uppercase text-[#1a2140]/50">
                Sobre
              </span>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#1a2140] mt-4 leading-[1.05]">
                Uma voz que
                <br />
                atravessa
                <br />
                <span className="italic text-[#d1548f]">gerações</span>
              </h2>
            </Reveal>
          </div>

          <div className="md:col-span-2 hidden md:block" />

          <div className="md:col-span-5">
            <Reveal delay={0.15} className="relative">
              <img
                src={photo}
                alt="Giselli Cristina"
                className="w-full object-cover aspect-[4/5] grayscale-[10%]"
              />
              <div className="absolute -bottom-6 -left-6 bg-[#fdf3f8]/90 backdrop-blur-sm border border-[#a9a0d8]/30 px-6 py-4 hidden sm:block">
                <p className="font-display text-3xl text-[#1a2140]">29</p>
                <p className="text-[10px] tracking-[0.25em] uppercase text-[#1a2140]/55">
                  Anos de carreira
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-6 mt-20 md:mt-28">
          <div className="md:col-span-7 md:col-start-6 space-y-6 text-sm md:text-base text-[#1a2140]/65 leading-relaxed">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.1}>
          <p className="font-display italic text-2xl md:text-4xl text-[#1a2140]/90 leading-snug mt-24 md:mt-32 max-w-4xl">
            &ldquo;{about.closing}&rdquo;
          </p>
        </Reveal>
      </div>
    </section>
  )
}
