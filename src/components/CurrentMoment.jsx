import photoStage from '../assets/photos/palco-microfone-2.webp'
import photoKeys from '../assets/photos/giselli-nicolas-teclado.webp'
import photoGuitar from '../assets/photos/giselli-nicolas-violao.webp'
import photoGold from '../assets/photos/giselli-nicolas-disco-ouro.webp'
import { FiArrowRight } from 'react-icons/fi'
import photoDuo from '../assets/photos/dupla-cantando.webp'
import { currentMoment } from '../lib/site-data'
import Reveal from './Reveal'
import Link from './Link'
import RootLine from './RootLine'

// Recortes dos rostos (fundo ampliado 3x, centrado em cada rosto).
const faces = [
  { name: 'Giselli', position: '8% 21%' },
  { name: 'Nicolas', position: '96% 12%' },
]

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
      <RootLine from="#d954d1" to="#4f7fd6" branches={[0.35, 0.7]} />
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-12 gap-10 md:gap-16">
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
        <div className="md:col-span-6">
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

          <Reveal delay={0.3} className="mt-12">
            <Link
              to="/dupla"
              id="conheca-dupla"
              returnTo="conheca-dupla"
              className="group inline-flex items-center gap-4 rounded-full border border-[#d954d1]/45 bg-[#d954d1]/10 py-2 pl-2 pr-3 backdrop-blur-sm transition-all duration-500 hover:border-[#d954d1] hover:bg-[#d954d1]/20 hover:shadow-[0_0_40px_-8px_rgba(217,84,209,0.7)]"
            >
              <span className="flex -space-x-3" aria-hidden="true">
                {faces.map((face) => (
                  <span
                    key={face.name}
                    className="block h-11 w-11 rounded-full ring-2 ring-[#1c1638]"
                    style={{
                      backgroundImage: `url(${photoDuo})`,
                      backgroundSize: '300%',
                      backgroundPosition: face.position,
                    }}
                  />
                ))}
              </span>
              <span className="flex flex-col text-left leading-tight">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#f4eef7]/55">Giselli &amp; Nicolas</span>
                <span className="mt-1 font-display text-lg italic text-[#f4eef7] md:text-xl">Conheça essa dupla</span>
              </span>
              <span className="grid h-9 w-9 place-items-center rounded-full bg-[#d954d1] text-white transition-transform duration-500 group-hover:translate-x-1">
                <FiArrowRight aria-hidden="true" />
              </span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
