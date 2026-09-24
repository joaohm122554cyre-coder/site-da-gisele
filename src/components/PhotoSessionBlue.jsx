import { useLayoutEffect, useReducer, useRef, useState } from 'react'
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

const ACCENT = '#4f7fd6'

// Ordem da expressão: começa com sorrisos limpos e suaves e vai ficando mais intensa.
// "mood" é a palavra que aparece embaixo do cartão no computador, dando alma pra cada foto.
const photos = [
  { src: retratoSorriso, alt: 'Giselli Cristina sorrindo diante de flores em tons de azul e lilás', position: '50% 22%', mood: 'Sorriso' },
  { src: retrato2, alt: 'Retrato de Giselli Cristina sorrindo com fundo azul', position: '50% 14%', mood: 'Doçura' },
  { src: emPe, alt: 'Giselli Cristina em pé, sorrindo, segurando o microfone sob luzes azuis', position: '50% 12%', mood: 'Presença' },
  { src: colunasPiano, alt: 'Giselli Cristina cantando com suavidade ao lado de um piano branco, com colunas azuis ao fundo', position: '88% 50%', mood: 'Suavidade' },
  { src: colunas1, alt: 'Giselli Cristina cantando de olhos fechados e braço aberto diante de colunas iluminadas em azul', position: '50% 50%', mood: 'Entrega' },
  { src: colunas2, alt: 'Giselli Cristina cantando com o braço estendido, sob colunas de luz azul', position: '42% 50%', mood: 'Intensidade' },
  { src: colunas3, alt: 'Giselli Cristina cantando com a mão erguida diante de colunas iluminadas em azul', position: '90% 50%', mood: 'Louvor' },
  { src: clipe, alt: 'Giselli Cristina de braço erguido no clipe de Eu Só Quero Adorar, com o Nicolas Henrique ao teclado', position: '62% 50%', mood: 'Família' },
]

const SLIDE_SECONDS = 3
const DESKTOP_SLIDE_SECONDS = 2
const KENBURNS_SECONDS = DESKTOP_SLIDE_SECONDS + 1
const SMOOTH = 'cubic-bezier(0.65,0,0.35,1)'
const mod = (a, n) => ((a % n) + n) % n
const total = photos.length
const progressStyle = (running, seconds = SLIDE_SECONDS) => ({
  animation: `panel-progress ${seconds}s linear forwards`,
  animationPlayState: running ? 'running' : 'paused',
})

// step só cresce a cada foto que passa (foto atual = step % total), então depois da última a
// primeira simplesmente continua a sequência, sem rebobinar.
function reducer({ step }, action) {
  if (action.type === 'next') return { step: step + 1, prev: step }
  if (action.type === 'back') return { step: step - 1, prev: step }
  return { step: action.step, prev: step }
}

const GAP = 12

// Celular: carrossel que desliza pro lado, com um pedacinho da foto vizinha aparecendo.
// Na primeira foto não existe "anterior"; depois que dá a volta, a última passa a ser a anterior.
function MobileCarousel({ step, prev, dispatch, inView }) {
  const wrapRef = useRef(null)
  const touchX = useRef(null)
  const [width, setWidth] = useState(0)

  useLayoutEffect(() => {
    const el = wrapRef.current
    const measure = () => setWidth(el.clientWidth)
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const slideW = width * 0.78
  const stepPx = slideW + GAP
  const anchor = (width - slideW) / 2
  const half = Math.floor(total / 2)
  const offsetOf = (i, s) => mod(i - s + half, total) - half
  const current = mod(step, total)
  const next = () => dispatch({ type: 'next' })
  const back = () => step > 0 && dispatch({ type: 'back' })

  const onTouchEnd = (e) => {
    if (touchX.current == null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    touchX.current = null
    if (dx < -40) next()
    else if (dx > 40) back()
  }

  return (
    <div className="relative -mx-6 md:hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-6 -bottom-10 h-40 bg-[radial-gradient(ellipse_at_center,rgba(79,127,214,0.22),transparent_65%)]"
      />
      <div
        ref={wrapRef}
        className="relative h-[26rem] overflow-hidden"
        style={{ touchAction: 'pan-y' }}
        onTouchStart={(e) => {
          touchX.current = e.touches[0].clientX
        }}
        onTouchEnd={onTouchEnd}
      >
        {width > 0 &&
          photos.map((photo, i) => {
            const offset = offsetOf(i, step)
            // a foto que dá a volta atravessa a tela por fora, então ela "teletransporta" sem animar
            const wraps = Math.abs(offset - offsetOf(i, prev)) > 1.5
            const isActive = i === current
            return (
              <button
                key={photo.src}
                type="button"
                onClick={() => (isActive || offset > 0 ? next() : back())}
                aria-label={isActive ? `Foto ${i + 1} de ${total}. Toque para ver a próxima` : `Ir para a foto ${i + 1}`}
                aria-current={isActive ? 'true' : undefined}
                className="absolute left-0 top-0 h-full rounded-2xl text-left outline-none focus-visible:ring-2 focus-visible:ring-[#4f7fd6]"
                style={{
                  width: slideW,
                  zIndex: isActive ? 10 : 0,
                  transform: `translate3d(${anchor + offset * stepPx}px,0,0) scale(${isActive ? 1.05 : 1})`,
                  transition: wraps ? 'none' : `transform 1200ms ${SMOOTH}, box-shadow 500ms ease`,
                  boxShadow: isActive
                    ? '0 24px 48px -18px rgba(79,127,214,0.65), 0 0 0 1px rgba(79,127,214,0.45)'
                    : '0 0 0 1px rgba(244,238,247,0.1)',
                }}
              >
                {isActive ? (
                  <div className="glow-ring h-full w-full rounded-2xl" style={{ '--glow-color': ACCENT }}>
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      loading="lazy"
                      decoding="async"
                      draggable="false"
                      className="select-none rounded-[13px] object-cover"
                      style={{ objectPosition: photo.position }}
                    />
                  </div>
                ) : (
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    decoding="async"
                    draggable="false"
                    className="absolute inset-0 h-full w-full select-none rounded-2xl object-cover"
                    style={{ objectPosition: photo.position }}
                  />
                )}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-2xl bg-[#14122a] transition-opacity duration-[1200ms]"
                  style={{ opacity: isActive ? 0 : 0.5 }}
                />
                {isActive && (
                  <span
                    key={step}
                    aria-hidden="true"
                    onAnimationEnd={next}
                    className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-[#4f7fd6]"
                    style={progressStyle(inView)}
                  />
                )}
              </button>
            )
          })}
      </div>
    </div>
  )
}

const ArrowIcon = ({ flip }) => (
  <svg viewBox="0 0 24 24" className={`h-4 w-4 ${flip ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

// Trilha de barrinhas tipo Stories do Instagram: a ativa preenche sozinha com o
// tempo do slide (é o que avança pra próxima foto) e dá pra clicar em qualquer uma.
function StoryDots({ current, onJump, running, onFill, accent }) {
  return (
    <div className="flex items-center gap-1.5">
      {photos.map((p, i) => {
        const isActive = i === current
        return (
          <button
            key={p.src}
            type="button"
            onClick={() => onJump(i)}
            aria-label={`Ir para a foto ${i + 1} de ${total}`}
            aria-current={isActive ? 'true' : undefined}
            className="relative h-1.5 overflow-hidden rounded-full bg-[#f4eef7]/15 transition-[width] duration-500"
            style={{ width: isActive ? '2rem' : '0.375rem' }}
          >
            {isActive && (
              <span
                key={current}
                aria-hidden="true"
                onAnimationEnd={onFill}
                className="absolute inset-0 origin-left rounded-full"
                style={{ background: accent, ...progressStyle(running, DESKTOP_SLIDE_SECONDS) }}
              />
            )}
          </button>
        )
      })}
    </div>
  )
}

// Computador: cartão principal com zoom lento (Ken Burns), uma espiadinha da
// próxima foto do lado e a barrinha de progresso somem — a barra de posição
// e a palavra do momento moram fora do cartão, embaixo.
function DesktopSlide({ step, current, running, onEnd, onNext, onBack, onJump }) {
  const photo = photos[current]
  const peekNext = photos[mod(step + 1, total)]
  const peekPrev = photos[mod(step - 1, total)]

  return (
    <>
      <div className="relative flex items-stretch justify-center gap-4">
        <button
          type="button"
          onClick={onBack}
          aria-label="Ver foto anterior"
          className="group relative hidden w-20 shrink-0 overflow-hidden rounded-2xl lg:block xl:w-28"
        >
          <img
            src={peekPrev.src}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover opacity-55 transition duration-500 group-hover:opacity-90"
            style={{ objectPosition: peekPrev.position }}
          />
        </button>

        <div className="relative aspect-[4/5] w-full max-w-xl overflow-hidden rounded-2xl shadow-[0_0_0_1px_rgba(79,127,214,0.2)]">
          {photos.map((p, i) => {
            const isActive = i === current
            return (
              <img
                key={isActive ? `${p.src}-zoom-${current}` : p.src}
                src={p.src}
                alt={isActive ? p.alt : ''}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[900ms] ease-in-out"
                style={{
                  objectPosition: p.position,
                  opacity: isActive ? 1 : 0,
                  animation: isActive ? `kenburns ${KENBURNS_SECONDS}s ease-out forwards` : 'none',
                }}
              />
            )
          })}

          <button
            type="button"
            onClick={onBack}
            aria-label="Foto anterior"
            className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-[#14122a]/55 text-white backdrop-blur-sm transition hover:border-white/60 hover:bg-[#14122a]/80"
          >
            <ArrowIcon flip />
          </button>
          <button
            type="button"
            onClick={onNext}
            aria-label="Próxima foto"
            className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-[#14122a]/55 text-white backdrop-blur-sm transition hover:border-white/60 hover:bg-[#14122a]/80"
          >
            <ArrowIcon />
          </button>
        </div>

        <button
          type="button"
          onClick={onNext}
          aria-label="Ver próxima foto"
          className="group relative hidden w-20 shrink-0 overflow-hidden rounded-2xl lg:block xl:w-28"
        >
          <img
            src={peekNext.src}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover opacity-55 transition duration-500 group-hover:opacity-90"
            style={{ objectPosition: peekNext.position }}
          />
        </button>
      </div>

      <div className="relative z-10 mt-6 flex flex-col items-center gap-4">
        <span key={`mood-${current}`} className="font-display text-xl italic md:text-2xl" style={{ color: ACCENT }}>
          {photo.mood}
        </span>
        <StoryDots current={current} onJump={onJump} running={running} onFill={onEnd} accent={ACCENT} />
      </div>
    </>
  )
}

export default function PhotoSessionBlue() {
  const [{ step, prev }, dispatch] = useReducer(reducer, { step: 0, prev: 0 })
  const [hovering, setHovering] = useState(false)
  const wrapRef = useRef(null)
  const inView = useInView(wrapRef, { margin: '-15% 0px' })
  const current = mod(step, total)

  return (
    <section id="ensaio-azul" className="relative pt-16 md:pt-24 pb-32 md:pb-56">
      <Reveal className="relative z-10">
        <div ref={wrapRef}>
          <div className="max-w-7xl md:max-w-none mx-auto px-6 md:px-12">
            <div className="mb-6 md:mb-8">
              <span className="text-[11px] tracking-[0.4em] uppercase text-[#f4eef7]/50">Ensaio azul</span>
            </div>

            <MobileCarousel step={step} prev={prev} dispatch={dispatch} inView={inView} />
          </div>

          {/* computador: cartão principal com zoom lento + espiadinha da próxima foto */}
          <div
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className="relative hidden md:block w-full max-w-7xl mx-auto px-6 md:px-12"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 -bottom-10 h-56 bg-[radial-gradient(ellipse_at_center,rgba(79,127,214,0.2),transparent_65%)]"
            />
            <DesktopSlide
              step={step}
              current={current}
              running={inView && !hovering}
              onEnd={() => dispatch({ type: 'next' })}
              onNext={() => dispatch({ type: 'next' })}
              onBack={() => dispatch({ type: 'back' })}
              onJump={(i) => dispatch({ type: 'set', step: i })}
            />
          </div>
        </div>
      </Reveal>
    </section>
  )
}
