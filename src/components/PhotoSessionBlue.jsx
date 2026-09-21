import { useEffect, useLayoutEffect, useReducer, useRef, useState } from 'react'
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
const mod = (a, n) => ((a % n) + n) % n
const total = photos.length
const progressStyle = (running) => ({
  animation: `panel-progress ${SLIDE_SECONDS}s linear forwards`,
  animationPlayState: running ? 'running' : 'paused',
})

// step só cresce a cada foto que passa (foto atual = step % total), então depois da última a
// primeira simplesmente continua a sequência. start = primeira foto da faixa do computador:
// ela vai rolando, a foto que sai encolhe pela esquerda e a próxima entra pela direita.
function reducer(state, action) {
  const { step, start } = state
  if (action.type === 'next') {
    const next = step + 1
    return { step: next, prev: step, start: next > start + total - 1 ? start + 1 : start }
  }
  if (action.type === 'back') return { step: step - 1, prev: step, start: Math.min(start, step - 1) }
  return { ...state, step: action.step, prev: step }
}

const EDGE = 24
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
  const anchor = step === 0 ? EDGE : (width - slideW) / 2
  const half = Math.floor(total / 2)
  const offsetOf = (i, s) => (s === 0 ? i : mod(i - s + half, total) - half)
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
                className="absolute left-0 top-0 h-full overflow-hidden rounded-2xl text-left outline-none focus-visible:ring-2 focus-visible:ring-[#4f7fd6]"
                style={{
                  width: slideW,
                  transform: `translate3d(${anchor + offset * stepPx}px,0,0)`,
                  transition: wraps ? 'none' : `transform 1200ms ${SMOOTH}`,
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

// Computador: painel que abre. Painéis novos entram com largura 0 pela direita e os que saem
// encolhem até sumir pela esquerda (margem e flex animam juntos, então nada dá "pulo").
function DesktopPanel({ n, photo, step, leaving, first, last, running, onSelect, onEnd }) {
  const [entered, setEntered] = useState(n < total)
  const isActive = n === step
  const collapsed = leaving || !entered

  useEffect(() => {
    if (entered) return
    let second
    const firstFrame = requestAnimationFrame(() => {
      second = requestAnimationFrame(() => setEntered(true))
    })
    return () => {
      cancelAnimationFrame(firstFrame)
      cancelAnimationFrame(second)
    }
  }, [entered])

  return (
    <button
      type="button"
      tabIndex={leaving ? -1 : 0}
      aria-hidden={leaving || undefined}
      onClick={() => onSelect(n)}
      aria-label={`Foto ${mod(n, total) + 1} de ${total}`}
      aria-current={isActive ? 'true' : undefined}
      className={`group relative min-h-0 min-w-0 basis-0 overflow-hidden text-left outline-none transition-[flex-grow,margin,box-shadow,border-radius] duration-[1500ms] ease-[cubic-bezier(0.65,0,0.35,1)] focus-visible:ring-2 focus-visible:ring-[#4f7fd6] ${
        leaving ? 'pointer-events-none' : ''
      }`}
      style={{
        flexGrow: collapsed ? 0 : isActive ? 5 : 1,
        marginRight: collapsed || last ? 0 : 12,
        borderRadius: `${first ? 0 : 16}px ${last ? 0 : 16}px ${last ? 0 : 16}px ${first ? 0 : 16}px`,
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
          key={step}
          aria-hidden="true"
          onAnimationEnd={onEnd}
          className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-[#4f7fd6]"
          style={progressStyle(running)}
        />
      )}
    </button>
  )
}

export default function PhotoSessionBlue() {
  const [{ step, prev, start }, dispatch] = useReducer(reducer, { step: 0, prev: 0, start: 0 })
  const [hovering, setHovering] = useState(false)
  const wrapRef = useRef(null)
  const inView = useInView(wrapRef, { margin: '-15% 0px' })

  // painéis que aparecem: a foto que acabou de sair (encolhida) e as da faixa atual
  const from = Math.max(start - 1, 0)
  const panels = Array.from({ length: start + total - from }, (_, k) => from + k)

  return (
    <section id="ensaio-azul" className="relative pt-16 md:pt-24 pb-32 md:pb-56">
      <Reveal>
        <div ref={wrapRef}>
          <div className="max-w-7xl md:max-w-none mx-auto px-6 md:px-12">
            <div className="flex items-end justify-between mb-6 md:mb-8">
              <span className="text-[11px] tracking-[0.4em] uppercase text-[#f4eef7]/50">Ensaio azul</span>
              <span className="text-[11px] tabular-nums tracking-[0.3em] text-[#f4eef7]/45">
                <span className="text-[#f4eef7]/90">{pad(mod(step, total) + 1)}</span> / {pad(total)}
              </span>
            </div>

            <MobileCarousel step={step} prev={prev} dispatch={dispatch} inView={inView} />
          </div>

          {/* computador: painéis que abrem, de ponta a ponta da tela */}
          <div
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className="relative hidden md:flex w-full h-[clamp(30rem,42vw,46rem)]"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 -bottom-16 h-56 bg-[radial-gradient(ellipse_at_center,rgba(79,127,214,0.2),transparent_65%)]"
            />
            {panels.map((n) => (
              <DesktopPanel
                key={n}
                n={n}
                photo={photos[mod(n, total)]}
                step={step}
                leaving={n < start}
                first={n === start}
                last={n === start + total - 1}
                running={inView && !hovering}
                onSelect={(to) => dispatch({ type: 'to', step: to })}
                onEnd={() => dispatch({ type: 'next' })}
              />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
