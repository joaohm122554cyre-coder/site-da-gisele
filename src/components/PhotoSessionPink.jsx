import { useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import photoArco from '../assets/photos/sessao-rosa-1.webp'
import photoJardim from '../assets/photos/retrato-suave.webp'
import cenaSentada from '../assets/photos/ensaio/dsc02660.webp'
import cenaBracoErguido from '../assets/photos/ensaio/dsc02679.webp'
import cenaInclinada from '../assets/photos/ensaio/dsc02677.webp'
import cenaMaoErguida from '../assets/photos/ensaio/dsc02682.webp'
import cenaMaoNoCabelo from '../assets/photos/ensaio/dsc02661.webp'
import cenaCantando from '../assets/photos/ensaio/dsc02656.webp'
import retratoSorrindo from '../assets/photos/ensaio/dsc02702.webp'
import retratoSorrindo2 from '../assets/photos/ensaio/dsc02698.webp'
import Reveal from './Reveal'

const photos = [
  { src: photoArco, alt: 'Giselli Cristina sorrindo diante de um arco iluminado em rosa', position: '50% 12%' },
  { src: cenaBracoErguido, alt: 'Giselli Cristina cantando com o braço erguido diante do arco rosa', position: '50% 30%' },
  { src: photoJardim, alt: 'Giselli Cristina em um jardim de rosas', position: '50% 8%' },
  { src: cenaSentada, alt: 'Giselli Cristina sentada diante do arco iluminado em rosa', position: '50% 30%' },
  { src: retratoSorrindo, alt: 'Giselli Cristina sorrindo, sentada diante do arco em rosa', position: '50% 30%' },
  { src: cenaInclinada, alt: 'Giselli Cristina cantando de olhos fechados, inclinada para o lado', position: '50% 30%' },
  { src: cenaMaoErguida, alt: 'Giselli Cristina cantando com a mão erguida', position: '56% 30%' },
  { src: cenaMaoNoCabelo, alt: 'Giselli Cristina cantando com a mão junto ao cabelo', position: '50% 30%' },
  { src: retratoSorrindo2, alt: 'Giselli Cristina sorrindo para a câmera diante do arco em rosa', position: '50% 30%' },
  { src: cenaCantando, alt: 'Giselli Cristina cantando sentada diante do arco em rosa', position: '50% 30%' },
]

const SLIDE_SECONDS = 5
const OFFSETS = [-2, -1, 0, 1, 2, 3]
const pad = (n) => String(n).padStart(2, '0')
const growOf = (rel) => (rel === 0 ? 3.4 : rel === 1 || rel === 2 ? 1 : 0)

const arrowClass =
  'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#f4eef7]/20 text-[#f4eef7]/60 transition-colors hover:border-[#f4eef7]/50 hover:text-[#f4eef7]'

export default function PhotoSessionPink() {
  const [active, setActive] = useState(0)
  const [hovering, setHovering] = useState(false)
  const stripRef = useRef(null)
  const inView = useInView(stripRef, { margin: '-15% 0px' })
  const reduceMotion = useReducedMotion()
  const running = inView && !hovering

  const go = (dir) => setActive((i) => (i + dir + photos.length) % photos.length)

  return (
    <section className="relative pt-4 md:pt-8 pb-20 md:pb-28">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <Reveal>
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <span className="text-[11px] tracking-[0.4em] uppercase text-[#f4eef7]/50">Ensaio</span>
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => go(-1)} aria-label="Foto anterior" className={arrowClass}>
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                  <path d="M10 2 4 8l6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <span className="min-w-[4.5rem] text-center text-[11px] tabular-nums tracking-[0.3em] text-[#f4eef7]/45">
                <span className="text-[#f4eef7]/90">{pad(active + 1)}</span> / {pad(photos.length)}
              </span>
              <button type="button" onClick={() => go(1)} aria-label="Próxima foto" className={arrowClass}>
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                  <path d="M6 2l6 6-6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>

          <div
            ref={stripRef}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className="relative flex flex-col md:flex-row h-[34rem] md:h-[36rem] md:-mr-3"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-x-10 -bottom-16 h-56 bg-[radial-gradient(ellipse_at_center,rgba(217,84,209,0.16),transparent_65%)]"
            />

            {OFFSETS.map((rel) => {
              const idx = (active + rel + photos.length) % photos.length
              const photo = photos[idx]
              const isActive = rel === 0
              const shown = rel >= 0 && rel <= 2
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActive(idx)}
                  tabIndex={shown ? 0 : -1}
                  aria-hidden={shown ? undefined : true}
                  aria-label={`Foto ${idx + 1} de ${photos.length}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={`group relative min-h-0 min-w-0 basis-0 overflow-hidden rounded-2xl text-left outline-none transition-[flex-grow,margin,box-shadow,opacity] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:ring-2 focus-visible:ring-[#d954d1] mb-[var(--gap)] md:mb-0 md:mr-[var(--gap)] ${
                    shown ? '' : 'pointer-events-none'
                  }`}
                  style={{
                    flexGrow: growOf(rel),
                    '--gap': shown ? '0.75rem' : '0rem',
                    opacity: shown ? 1 : 0,
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
                    {pad(idx + 1)}
                  </span>

                  {isActive && !reduceMotion && (
                    <span
                      key={active}
                      aria-hidden="true"
                      onAnimationEnd={() => go(1)}
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
