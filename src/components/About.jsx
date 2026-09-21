import { about } from '../lib/site-data'
import Reveal from './Reveal'
import PhotoSessionPink from './PhotoSessionPink'

export default function About() {
  return (
    <section id="sobre" className="relative py-28 md:py-40">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <Reveal>
          <span className="font-script text-4xl md:text-5xl text-[#d954d1] leading-none">
            Sobre
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#f4eef7] mt-3 leading-[1.05]">
            Uma voz que
            <br />
            atravessa
            <br />
            <span className="italic text-[#d954d1]">gerações</span>
          </h2>
        </Reveal>
      </div>

      <div className="mt-10 md:mt-14">
        <PhotoSessionPink />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-12 gap-6">
          <div className="md:col-span-7 md:col-start-6 space-y-7 font-serif text-lg md:text-xl text-[#f4eef7]/75 leading-relaxed">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className={i === 0 ? 'drop-cap' : ''}>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
