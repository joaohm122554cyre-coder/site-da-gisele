import photoStage from '../assets/photos/palco-microfone-2.webp'
import photoKeys from '../assets/photos/giselli-nicolas-teclado.webp'
import photoGuitar from '../assets/photos/giselli-nicolas-violao.webp'
import photoGold from '../assets/photos/giselli-nicolas-disco-ouro.webp'
import { currentMoment } from '../lib/site-data'
import Reveal from './Reveal'

function Photo({ src, alt, ratio, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`w-full ${ratio} object-cover grayscale-[10%] hover:grayscale-0 transition-all duration-500`}
      />
    </Reveal>
  )
}

export default function CurrentMoment() {
  return (
    <section className="relative py-28 md:py-40 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-12 gap-10 md:gap-16">
        <div className="md:col-span-6">
          <div className="md:sticky md:top-28 grid grid-cols-[3fr_2fr] gap-3 md:gap-4 items-start">
            <div className="space-y-3 md:space-y-4">
              <Photo src={photoStage} alt="Giselli Cristina em show recente" ratio="aspect-[4/5]" />
              <Photo
                src={photoKeys}
                alt="Nicolas Henrique ao teclado e Giselli Cristina"
                ratio="aspect-[3/2]"
                delay={0.1}
              />
            </div>
            <div className="mt-10 md:mt-16 space-y-3 md:space-y-4">
              <Photo
                src={photoGuitar}
                alt="Giselli Cristina e Nicolas Henrique cantando ao violão"
                ratio="aspect-[4/5]"
                delay={0.05}
              />
              <Photo
                src={photoGold}
                alt="Giselli Cristina e Nicolas Henrique com o Disco de Ouro"
                ratio="aspect-[2/3]"
                delay={0.15}
              />
            </div>
          </div>
        </div>
        <div className="md:col-span-5 md:col-start-8">
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
