import { useEffect, useLayoutEffect, useMemo, useReducer, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
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
const DESKTOP_SLIDE_SECONDS = 1.5
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

const ArrowIcon = ({ flip }) => (
  <svg viewBox="0 0 24 24" className={`h-4 w-4 ${flip ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

// Computador: cartão único, sempre do mesmo tamanho — como um carrossel do Instagram.
// A foto preenche o cartão inteiro (sem esticar, sem sobra desfocada); troca sozinha
// a cada 3s ou pelas setas.
function DesktopSlide({ step, running, onEnd, onNext, onBack, frameRef }) {
  const current = mod(step, total)
  const photo = photos[current]

  return (
    <div
      ref={frameRef}
      className="relative z-10 mx-auto aspect-[4/5] w-full max-w-xl overflow-hidden rounded-2xl shadow-[0_0_0_1px_rgba(79,127,214,0.2)]"
    >
      {photos.map((p, i) => (
        <img
          key={p.src}
          src={p.src}
          alt={i === current ? p.alt : ''}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[900ms] ease-in-out"
          style={{ objectPosition: p.position, opacity: i === current ? 1 : 0 }}
        />
      ))}

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

      <span
        key={step}
        aria-hidden="true"
        onAnimationEnd={onEnd}
        className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-[#4f7fd6]"
        style={progressStyle(running, DESKTOP_SLIDE_SECONDS)}
      />
      <span className="sr-only">
        Foto {current + 1} de {total}: {photo.alt}
      </span>
    </div>
  )
}

// Nuvenzinha decorativa nos 4 cantos, com miniaturas dela espalhadas — uma referência
// suave à fé cristã. Cada foto mora num canto fixo; quando ela vira a foto central, a
// miniatura some do canto (ela "foi pro centro") e volta quando deixa de ser a atual.
const cloudPhotos = {
  'bottom-left': [3, 6],
  'bottom-right': [1, 4],
  'top-left': [0, 5],
  'top-right': [2, 7],
}
const corners = Object.keys(cloudPhotos)
const cornerOfIndex = {}
corners.forEach((corner) => cloudPhotos[corner].forEach((i) => (cornerOfIndex[i] = corner)))

function CloudCorner({ corner, current, registerThumb }) {
  const [vSide, hSide] = corner.split('-')
  const isLeft = hSide === 'left'
  const isTop = vSide === 'top'
  const vProp = isTop ? 'top' : 'bottom'
  const hProp = isLeft ? 'left' : 'right'

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute hidden lg:block ${isTop ? 'top-6' : 'bottom-6'} ${isLeft ? 'left-0' : 'right-0'}`}
    >
      <div
        className="absolute h-44 w-60 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(244,238,247,0.16),rgba(79,127,214,0.1)_55%,transparent_75%)] blur-xl"
        style={{ [hProp]: '-1.5rem', [vProp]: '-1rem' }}
      />
      {/* a miniatura da foto atual fica com opacidade 0 (não removida), pra manter a
          posição medível — é dela que a cópia voadora parte */}
      {cloudPhotos[corner].map((i, k) => {
        const photo = photos[i]
        return (
          <img
            key={photo.src}
            ref={(el) => registerThumb(i, el)}
            src={photo.src}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute h-20 w-20 max-w-none rounded-2xl border border-white/20 object-cover shadow-[0_8px_24px_rgba(20,18,42,0.5)] transition-opacity duration-300"
            style={{
              objectPosition: photo.position,
              opacity: i === current ? 0 : 0.75,
              [hProp]: k === 0 ? '0.5rem' : '4rem',
              [vProp]: k === 0 ? '3.5rem' : '-0.5rem',
              transform: `rotate(${isLeft ? -8 + k * 10 : 8 - k * 10}deg)`,
            }}
          />
        )
      })}
    </div>
  )
}

// Gerador simples e determinístico (mesma semente sempre gera o mesmo desenho, então
// as raízes não "embaralham" a cada re-render).
function makeRand(seed) {
  let s = seed
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

// Um galho de raiz: sai de (x0,y0) na direção dir, ondula (perpendicular à direção,
// afinando) e, se ainda tem profundidade sobrando, solta 1-2 galhos filhos no meio do
// caminho — assim a árvore de raízes cresce sozinha a partir do tronco.
function buildBranch(x0, y0, dir, len, depth, rand) {
  const [dx, dy] = dir
  const [px, py] = [-dy, dx]
  const end = { x: x0 + dx * len, y: y0 + dy * len }
  const amp = len * 0.16
  const at = (t, side) => ({ x: x0 + dx * len * t + px * side, y: y0 + dy * len * t + py * side })
  const p1 = at(0.35, amp)
  const p2 = at(0.7, -amp * 0.6)
  const mid = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 }
  const path = `M ${x0} ${y0} Q ${p1.x} ${p1.y} ${mid.x} ${mid.y} Q ${p2.x} ${p2.y} ${end.x} ${end.y}`

  const branches = [{ path, depth }]
  if (depth < 3 && len > 34) {
    const count = depth === 0 ? 3 : 2
    for (let c = 0; c < count; c++) {
      const t = 0.4 + rand() * 0.35
      const from = { x: x0 + dx * len * t, y: y0 + dy * len * t }
      const turn = (0.45 + rand() * 0.5) * (c % 2 === 0 ? 1 : -1)
      const angle = Math.atan2(dy, dx) + turn
      const childDir = [Math.cos(angle), Math.sin(angle)]
      const childLen = len * (0.4 + rand() * 0.22)
      branches.push(...buildBranch(from.x, from.y, childDir, childLen, depth + 1, rand))
    }
  }
  return branches
}

// Sistema de raízes que nasce no cartão (o "tronco") e se espalha pela seção inteira,
// como as referências de raiz de árvore — não são mais só 4 linhas até as nuvens.
function useRootSystem(box, center) {
  return useMemo(() => {
    if (!box.w || !box.h) return []
    const rand = makeRand(7)
    const PRIMARY = 14
    const roots = []
    for (let i = 0; i < PRIMARY; i++) {
      const angle = (i / PRIMARY) * Math.PI * 2 + (rand() - 0.5) * 0.3
      const dir = [Math.cos(angle), Math.sin(angle)]
      const edgeX = dir[0] > 0 ? box.w - center.x : center.x
      const edgeY = dir[1] > 0 ? box.h - center.y : center.y
      const edgeDist = Math.min(
        dir[0] !== 0 ? Math.abs(edgeX / dir[0]) : Infinity,
        dir[1] !== 0 ? Math.abs(edgeY / dir[1]) : Infinity,
      )
      const len = edgeDist * (0.96 + rand() * 0.16)
      const angleDeg = (angle * 180) / Math.PI
      buildBranch(center.x, center.y, dir, len, 0, rand).forEach((b) => roots.push({ ...b, angleDeg }))
    }
    return roots
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [box.w, box.h, center.x, center.y])
}

const branchWidth = [2.2, 1.3, 0.8]

// A raiz cujo ângulo (a partir do centro) mais se aproxima do canto ativo acende; o
// resto fica como textura de fundo, apagada.
function ConnectingLines({ activeCorner, box, center, cloudAnchors }) {
  const roots = useRootSystem(box, center)
  if (!roots.length) return null

  const targetAngle = (() => {
    const a = cloudAnchors[activeCorner]
    if (!a) return null
    return (Math.atan2(a.y - center.y, a.x - center.x) * 180) / Math.PI
  })()

  let closest = null
  if (targetAngle != null) {
    let best = Infinity
    roots.forEach((r) => {
      if (r.depth !== 0) return
      const diff = Math.abs(((r.angleDeg - targetAngle + 540) % 360) - 180)
      if (diff < best) {
        best = diff
        closest = r.angleDeg
      }
    })
  }

  return (
    <svg
      aria-hidden="true"
      width={box.w}
      height={box.h}
      viewBox={`0 0 ${box.w} ${box.h}`}
      className="pointer-events-none absolute inset-0 hidden lg:block"
    >
      {roots.map((r, i) => {
        const active = closest != null && r.angleDeg === closest
        return (
          <path
            key={i}
            d={r.path}
            fill="none"
            stroke="#7fb0f7"
            strokeWidth={branchWidth[r.depth]}
            strokeLinecap="round"
            style={{
              opacity: active ? 0.85 : 0.18,
              filter: active ? 'drop-shadow(0 0 6px rgba(79,127,214,0.85))' : 'none',
              transition: 'opacity 700ms ease',
            }}
          />
        )
      })}
    </svg>
  )
}

const FLIGHT_MS = 800

// Miniatura que voa da nuvem até o cartão quando a foto atual muda.
function FlyingPhoto({ flight }) {
  if (!flight) return null
  return (
    <motion.img
      key={flight.key}
      src={flight.src}
      alt=""
      initial={{ x: flight.from.x, y: flight.from.y, width: flight.from.w, height: flight.from.h }}
      animate={{ x: flight.to.x, y: flight.to.y, width: flight.to.w, height: flight.to.h }}
      transition={{ duration: FLIGHT_MS / 1000, ease: [0.65, 0, 0.35, 1] }}
      className="pointer-events-none absolute left-0 top-0 z-20 rounded-2xl object-cover shadow-[0_0_50px_rgba(79,127,214,0.7)]"
      style={{ objectPosition: flight.position }}
    />
  )
}

export default function PhotoSessionBlue() {
  const [{ step, prev }, dispatch] = useReducer(reducer, { step: 0, prev: 0 })
  const [hovering, setHovering] = useState(false)
  const [flight, setFlight] = useState(null)
  const wrapRef = useRef(null)
  const deskWrapRef = useRef(null)
  const frameRef = useRef(null)
  const thumbRefs = useRef({})
  const registerThumb = (i, el) => {
    thumbRefs.current[i] = el
  }
  const inView = useInView(wrapRef, { margin: '-15% 0px' })
  const current = mod(step, total)
  const [box, setBox] = useState({ w: 0, h: 0 })
  const [center, setCenter] = useState({ x: 0, y: 0 })
  const [cloudAnchors, setCloudAnchors] = useState({})

  // mede a faixa, o cartão e o centro de cada nuvem (a partir das miniaturas de
  // verdade) pra desenhar as raízes com coordenadas reais, sem desalinhar
  useLayoutEffect(() => {
    const wrapEl = deskWrapRef.current
    const frameEl = frameRef.current
    if (!wrapEl || !frameEl) return
    const measure = () => {
      const wrapRect = wrapEl.getBoundingClientRect()
      const frameRect = frameEl.getBoundingClientRect()
      setBox({ w: wrapRect.width, h: wrapRect.height })
      setCenter({
        x: frameRect.left - wrapRect.left + frameRect.width / 2,
        y: frameRect.top - wrapRect.top + frameRect.height / 2,
      })
      const nextAnchors = {}
      corners.forEach((corner) => {
        // ignora a miniatura que está invisível (é a foto atual) — senão a linha mira
        // no meio do caminho entre as duas, incluindo o "buraco" que ninguém vê
        const rects = cloudPhotos[corner]
          .filter((i) => i !== current)
          .map((i) => thumbRefs.current[i]?.getBoundingClientRect())
          .filter(Boolean)
        if (!rects.length) return
        nextAnchors[corner] = {
          x: rects.reduce((sum, r) => sum + r.left + r.width / 2, 0) / rects.length - wrapRect.left,
          y: rects.reduce((sum, r) => sum + r.top + r.height / 2, 0) / rects.length - wrapRect.top,
        }
      })
      setCloudAnchors(nextAnchors)
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(wrapEl)
    observer.observe(frameEl)
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current])

  // sempre que a foto atual muda, mede onde a miniatura estava (na nuvem) e onde o
  // cartão está, e solta uma cópia voando de um ponto ao outro
  useEffect(() => {
    const thumbEl = thumbRefs.current[current]
    const frameEl = frameRef.current
    const wrapEl = deskWrapRef.current
    if (!thumbEl || !frameEl || !wrapEl) return
    const wrapRect = wrapEl.getBoundingClientRect()
    const fromRect = thumbEl.getBoundingClientRect()
    const toRect = frameEl.getBoundingClientRect()
    setFlight({
      key: step,
      src: photos[current].src,
      position: photos[current].position,
      from: { x: fromRect.left - wrapRect.left, y: fromRect.top - wrapRect.top, w: fromRect.width, h: fromRect.height },
      to: { x: toRect.left - wrapRect.left, y: toRect.top - wrapRect.top, w: toRect.width, h: toRect.height },
    })
    const timer = setTimeout(() => setFlight(null), FLIGHT_MS)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step])

  return (
    <section id="ensaio-azul" className="relative pt-16 md:pt-24 pb-32 md:pb-56">
      <Reveal>
        <div ref={wrapRef}>
          <div className="max-w-7xl md:max-w-none mx-auto px-6 md:px-12">
            <div className="mb-6 md:mb-8">
              <span className="text-[11px] tracking-[0.4em] uppercase text-[#f4eef7]/50">Ensaio azul</span>
            </div>

            <MobileCarousel step={step} prev={prev} dispatch={dispatch} inView={inView} />
          </div>

          {/* computador: um cartão só, ligado por linhas às nuvens de fotos nos cantos */}
          <div
            ref={deskWrapRef}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className="relative hidden md:block max-w-7xl mx-auto px-12"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 -bottom-10 h-56 bg-[radial-gradient(ellipse_at_center,rgba(79,127,214,0.2),transparent_65%)]"
            />
            <ConnectingLines activeCorner={cornerOfIndex[current]} box={box} center={center} cloudAnchors={cloudAnchors} />
            {corners.map((corner) => (
              <CloudCorner key={corner} corner={corner} current={current} registerThumb={registerThumb} />
            ))}
            <DesktopSlide
              step={step}
              running={inView && !hovering}
              onEnd={() => dispatch({ type: 'next' })}
              onNext={() => dispatch({ type: 'next' })}
              onBack={() => dispatch({ type: 'back' })}
              frameRef={frameRef}
            />
            <FlyingPhoto flight={flight} />
          </div>
        </div>
      </Reveal>
    </section>
  )
}
