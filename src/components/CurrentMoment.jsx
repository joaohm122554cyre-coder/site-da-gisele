import photo from '../assets/photos/palco-microfone-2.webp'
import { currentMoment } from '../lib/site-data'
import Reveal from './Reveal'

export default function CurrentMoment() {
  return (
    <section className="relative py-28 md:py-40 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-12 gap-10 md:gap-16">
        <div className="md:col-span-5">
          <Reveal className="md:sticky md:top-28">
            <img
              src={photo}
              alt="Giselli Cristina em show recente"
              className="w-full aspect-[4/5] object-cover grayscale-[10%]"
            />
          </Reveal>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <Reveal>
            <span className="text-[11px] tracking-[0.4em] uppercase text-[#f4eef7]/50">
              {currentMoment.title}
            </span>
          </Reveal>
          <div className="mt-6 space-y-8">
            {currentMoment.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <p className="text-sm md:text-base text-[#f4eef7]/65 leading-relaxed">
                  {p}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
