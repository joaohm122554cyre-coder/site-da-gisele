import { useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import photoArco from '../assets/photos/sessao-rosa-1.webp'
import photoJardim from '../assets/photos/retrato-suave.webp'
import photoPalco from '../assets/photos/retrato-casual.webp'
import Reveal from './Reveal'

const photos = [
  { src: photoArco, alt: 'Giselli Cristina sorrindo diante de um arco iluminado em rosa', position: '50% 12%' },
  { src: photoJardim, alt: 'Giselli Cristina em um jardim de rosas', position: '50% 8%' },
  { src: photoPalco, alt: 'Giselli Cristina cantando de olhos fechados', position: '50% 10%' },
]

const SLIDE_SECONDS = 6
const pad = (n) => String(n).padStart(2, '0')

export default function PhotoSessionPink() {
  const [active, setActive] = useState(0)
  const [hovering, setHovering] = useState(false)
  const stripRef = useRef(null)
  const inView = useInView(stripRef, { margin: '-15% 0px' })
  const reduceMotion = useReducedMotion()
  const running = inView && !hovering

  const next = () => setActive((i) => (i + 1) % photos.length)

  return (
    <section className="relative pt-4 md:pt-8 pb-20 md:pb-28">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <Reveal>
          <div className="flex items-end justify-between mb-6 md:mb-8">
            <span className="text-[11px] tracking-[0.4em] uppercase text-[#f4eef7]/50">Ensaio</span>
            <span className="text-[11px] tabular-nums tracking-[0.3em] text-[#f4eef7]/45">
              <span className="text-[#f4eef7]/90">{pad(active + 1)}</span> / {pad(photos.length)}
            </span>
          </div>

          <div
            ref={stripRef}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className="relative flex flex-col md:flex-row gap-3 h-[34rem] md:h-[36rem]"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-x-10 -bottom-16 h-56 bg-[radial-gradient(ellipse_at_center,rgba(217,84,209,0.16),transparent_65%)]"
            />

            {photos.map((photo, i) => {
              const isActive = i === active
              return (
                <button
                  key={photo.src}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Foto ${i + 1} de ${photos.length}`}
                  aria-current={isActive ? 'true' : undefined}
                  className="group relative min-h-0 min-w-0 basis-0 overflow-hidden rounded-2xl text-left outline-none transition-[flex-grow,box-shadow] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:ring-2 focus-visible:ring-[#d954d1]"
                  style={{
                    flexGrow: isActive ? 3.4 : 1,
                    boxShadow: isActive
                      ? '0 0 0 1px rgba(217,84,209,0.35), 0 0 70px -16px rgba(217,84,209,0.55)'
                      : '0 0 0 1px rgba(244,238,247,0.08)',
                  }}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    decoding="async"
                    className={`absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out ${
                      isActive ? 'scale-100' : 'scale-110'
                    }`}
                    style={{ objectPosition: photo.position }}
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-[#14122a] transition-opacity duration-700 group-hover:opacity-50"
                    style={{ opacity: isActive ? 0 : 0.6 }}
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#14122a]/75 to-transparent"
                  />
                  <span className="absolute bottom-4 left-5 font-display italic text-2xl md:text-3xl text-[#f4eef7]/90 [text-shadow:0_1px_14px_rgba(10,8,25,0.7)]">
                    {pad(i + 1)}
                  </span>

                  {isActive && !reduceMotion && (
                    <span
                      key={active}
                      aria-hidden="true"
                      onAnimationEnd={next}
                      className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-[#d954d1]"
                      style={{
                        animation: `panel-progress ${SLIDE_SECONDS}s linear forwards`,
                        animationPlayState: running ? 'running' : 'paused',
                      }}
                    />
                  )}
                </button>
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
