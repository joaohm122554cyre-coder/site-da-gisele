import { useLayoutEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import retratoSorriso from '../assets/photos/azul-retrato-sorriso.webp'
import colunas1 from '../assets/photos/azul-colunas-1.webp'
import emPe from '../assets/photos/azul-em-pe.webp'
import colunasPiano from '../assets/photos/azul-colunas-piano.webp'
import retrato2 from '../assets/photos/azul-retrato-2.webp'
import colunas2 from '../assets/photos/azul-colunas-2.webp'
import clipe from '../assets/photos/azul-clipe.webp'
import colunas3 from '../assets/photos/azul-colunas-3.webp'
import Reveal from './Reveal'

// Ordem da expressão: começa com sorrisos limpos e suaves e vai ficando mais intensa.
const photos = [
  { src: retratoSorriso, alt: 'Giselli Cristina sorrindo diante de flores em tons de azul e lilás', position: '50% 22%' },
  { src: retrato2, alt: 'Retrato de Giselli Cristina sorrindo com fundo azul', position: '50% 14%' },
  { src: emPe, alt: 'Giselli Cristina em pé, sorrindo, segurando o microfone sob luzes azuis', position: '50% 12%' },
  { src: colunasPiano, alt: 'Giselli Cristina cantando com suavidade ao lado de um piano branco, com colunas azuis ao fundo', position: '88% 50%' },
  { src: colunas1, alt: 'Giselli Cristina cantando de olhos fechados e braço aberto diante de colunas iluminadas em azul', position: '50% 50%' },
  { src: colunas2, alt: 'Giselli Cristina cantando com o braço estendido, sob colunas de luz azul', position: '42% 50%' },
  { src: colunas3, alt: 'Giselli Cristina cantando com a mão erguida diante de colunas iluminadas em azul', position: '90% 50%' },
  { src: clipe, alt: 'Giselli Cristina de braço erguido no clipe de Eu Só Quero Adorar, com o Nicolas Henrique ao teclado', position: '62% 50%' },
]

const SLIDE_SECONDS = 3
const SMOOTH = 'cubic-bezier(0.65,0,0.35,1)'
const pad = (n) => String(n).padStart(2, '0')
const progressStyle = (running) => ({
  animation: `panel-progress ${SLIDE_SECONDS}s linear forwards`,
  animationPlayState: running ? 'running' : 'paused',
})

// Celular: carrossel que desliza pro lado, com um pedacinho da foto vizinha aparecendo.
// Na primeira foto não existe "anterior"; a partir da segunda dá pra voltar.
function MobileCarousel({ active, setActive, inView }) {
  const total = photos.length
  const wrapRef = useRef(null)
  const touchX = useRef(null)
  const [width, setWidth] = useState(0)
  const [fading, setFading] = useState(false)
  const [jumping, setJumping] = useState(false)

  useLayoutEffect(() => {
    const el = wrapRef.current
    const measure = () => setWidth(el.clientWidth)
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const EDGE = 24
  const GAP = 12
  const slideW = width * 0.78
  const step = slideW + GAP
  const trackW = EDGE * 2 + total * slideW + (total - 1) * GAP
  const maxShift = Math.max(trackW - width, 0)
  const shift = Math.min(Math.max(EDGE + active * step - (width - slideW) / 2, 0), maxShift)

  const advance = () => {
    if (active < total - 1) {
      setActive(active + 1)
      return
    }
    // depois da última foto, some suave e recomeça pela primeira (sem "rebobinar")
    setFading(true)
    setTimeout(() => {
      setJumping(true)
      setActive(0)
      setTimeout(() => {
        setJumping(false)
        setFading(false)
      }, 60)
    }, 520)
  }

  const onTouchEnd = (e) => {
    if (touchX.current == null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    touchX.current = null
    if (dx < -40) advance()
    else if (dx > 40 && active > 0) setActive(active - 1)
  }

  return (
    <div className="relative -mx-6 md:hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-6 -bottom-10 h-40 bg-[radial-gradient(ellipse_at_center,rgba(79,127,214,0.22),transparent_65%)]"
      />
      <div
        ref={wrapRef}
        className="relative overflow-hidden"
        style={{ touchAction: 'pan-y' }}
        onTouchStart={(e) => {
          touchX.current = e.touches[0].clientX
        }}
        onTouchEnd={onTouchEnd}
      >
        {width > 0 && (
          <div
            className="flex h-[26rem]"
            style={{
              width: trackW,
              paddingInline: EDGE,
              gap: GAP,
              transform: `translate3d(${-shift}px,0,0)`,
              transition: `${jumping ? 'none' : `transform 1200ms ${SMOOTH}`}, opacity 500ms ease`,
              opacity: fading ? 0 : 1,
            }}
          >
            {photos.map((photo, i) => {
              const isActive = i === active
              return (
                <button
                  key={photo.src}
                  type="button"
                  onClick={() => (isActive ? advance() : setActive(i))}
                  aria-label={
                    isActive ? `Foto ${i + 1} de ${total}. Toque para ver a próxima` : `Ir para a foto ${i + 1}`
                  }
                  aria-current={isActive ? 'true' : undefined}
                  className="relative h-full shrink-0 overflow-hidden rounded-2xl text-left outline-none focus-visible:ring-2 focus-visible:ring-[#4f7fd6]"
                  style={{
                    width: slideW,
                    boxShadow: isActive
                      ? '0 0 0 1px rgba(79,127,214,0.45), 0 0 60px -14px rgba(79,127,214,0.6)'
                      : '0 0 0 1px rgba(244,238,247,0.1)',
                  }}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    decoding="async"
                    draggable="false"
                    className="absolute inset-0 h-full w-full select-none object-cover"
                    style={{ objectPosition: photo.position }}
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-[#14122a] transition-opacity duration-[1200ms]"
                    style={{ opacity: isActive ? 0 : 0.5 }}
                  />
                  {isActive && (
                    <span
                      key={active}
                      aria-hidden="true"
                      onAnimationEnd={advance}
                      className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-[#4f7fd6]"
                      style={progressStyle(inView && !fading)}
                    />
                  )}
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default function PhotoSessionBlue() {
  const [active, setActive] = useState(0)
  const [hovering, setHovering] = useState(false)
  const wrapRef = useRef(null)
  const inView = useInView(wrapRef, { margin: '-15% 0px' })
  const total = photos.length

  const next = () => setActive((i) => (i + 1) % total)

  return (
    <section id="ensaio-azul" className="relative pt-16 md:pt-24 pb-32 md:pb-56">
      <Reveal>
        <div ref={wrapRef}>
          <div className="max-w-7xl md:max-w-none mx-auto px-6 md:px-12">
            <div className="flex items-end justify-between mb-6 md:mb-8">
              <span className="text-[11px] tracking-[0.4em] uppercase text-[#f4eef7]/50">Ensaio azul</span>
              <span className="text-[11px] tabular-nums tracking-[0.3em] text-[#f4eef7]/45">
                <span className="text-[#f4eef7]/90">{pad(active + 1)}</span> / {pad(total)}
              </span>
            </div>

            <MobileCarousel active={active} setActive={setActive} inView={inView} />
          </div>

          {/* computador: painéis que abrem, de ponta a ponta da tela */}
          <div
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className="relative hidden md:flex w-full gap-3 h-[clamp(30rem,42vw,46rem)]"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 -bottom-16 h-56 bg-[radial-gradient(ellipse_at_center,rgba(79,127,214,0.2),transparent_65%)]"
            />

            {photos.map((photo, i) => {
              const isActive = i === active
              return (
                <button
                  key={photo.src}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Foto ${i + 1} de ${total}`}
                  aria-current={isActive ? 'true' : undefined}
                  className="group relative min-h-0 min-w-0 basis-0 overflow-hidden rounded-2xl first-of-type:rounded-l-none last-of-type:rounded-r-none text-left outline-none transition-[flex-grow,box-shadow] duration-[1500ms] ease-[cubic-bezier(0.65,0,0.35,1)] focus-visible:ring-2 focus-visible:ring-[#4f7fd6]"
                  style={{
                    flexGrow: isActive ? 5 : 1,
                    boxShadow: isActive
                      ? '0 0 0 1px rgba(79,127,214,0.45), 0 0 70px -16px rgba(79,127,214,0.6)'
                      : '0 0 0 1px rgba(244,238,247,0.08)',
                  }}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    decoding="async"
                    className={`absolute inset-0 h-full w-full object-cover transition-transform duration-[2000ms] ease-in-out ${
                      isActive ? 'scale-100' : 'scale-110'
                    }`}
                    style={{ objectPosition: photo.position }}
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-[#14122a] transition-opacity duration-[1400ms] group-hover:opacity-50"
                    style={{ opacity: isActive ? 0 : 0.6 }}
                  />
                  {isActive && (
                    <span
                      key={active}
                      aria-hidden="true"
                      onAnimationEnd={next}
                      className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-[#4f7fd6]"
                      style={progressStyle(inView && !hovering)}
                    />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
