import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { isRootUnlocked, isVideoActive, subscribeRootUnlock, subscribeVideoActivity } from '../lib/root-growth'

// Um sistema de raízes de verdade: tronco tortuoso (não uma senoide lisa) que
// solta ramos irregulares em ângulos variados, alguns curtos e outros indo
// até a borda da seção, com sub-ramos mais finos bifurcando deles. Cresce com
// o scroll, só aparece depois que a semente da linha do tempo chega ao fim, e
// pausa enquanto algum clipe está tocando.
const W = 100
const H = 1000

function mulberry32(seed) {
  let s = seed >>> 0
  return function rng() {
    s = (s + 0x6d2b79f5) | 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// Caminho torto: cada passo tem uma pequena guinada aleatória suavizada por
// inércia (drift), o que dá o aspecto anguloso de uma raiz em vez de uma
// curva perfeita.
function walk(rng, x0, y0, y1, { steps, bias = 0, jitter = 5, drift = 0.35 }) {
  const pts = [[x0, y0]]
  let x = x0
  let vx = bias
  const dy = (y1 - y0) / steps
  for (let i = 1; i <= steps; i++) {
    vx = vx * (1 - drift) + (bias + (rng() - 0.5) * jitter) * drift
    x += vx
    pts.push([x, y0 + dy * i])
  }
  return pts
}

function pathFromPoints(pts) {
  let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`
  for (let i = 1; i < pts.length; i++) {
    d += ` L ${pts[i][0].toFixed(1)} ${pts[i][1].toFixed(1)}`
  }
  return d
}

function pointAt(pts, f) {
  const idx = f * (pts.length - 1)
  const i0 = Math.floor(idx)
  const i1 = Math.min(i0 + 1, pts.length - 1)
  const t = idx - i0
  return [
    pts[i0][0] + (pts[i1][0] - pts[i0][0]) * t,
    pts[i0][1] + (pts[i1][1] - pts[i0][1]) * t,
  ]
}

function buildRootSystem(seed) {
  const rng = mulberry32(seed)
  const trunkPts = walk(rng, 50, 0, H, { steps: 44, bias: 0, jitter: 8, drift: 0.28 })
  const limbs = []

  const limbCount = 5 + Math.floor(rng() * 2)
  for (let i = 0; i < limbCount; i++) {
    const f = 0.1 + (i / limbCount) * 0.85 + (rng() - 0.5) * 0.05
    const [x, y] = pointAt(trunkPts, f)
    const side = rng() < 0.5 ? -1 : 1
    const reachesEdge = i % 3 === 0
    const targetX = reachesEdge
      ? side === 1
        ? 95 - rng() * 5
        : 5 + rng() * 5
      : x + side * (12 + rng() * 24)
    const limbSteps = 9 + Math.floor(rng() * 6)
    const limbYEnd = y + Math.abs(targetX - x) * (0.35 + rng() * 0.35)
    const bias = (targetX - x) / limbSteps
    const limbPts = walk(rng, x, y, limbYEnd, { steps: limbSteps, bias, jitter: 4.5, drift: 0.4 })
    limbs.push({
      d: pathFromPoints(limbPts),
      from: Math.max(0, Math.min(f, 0.95)),
      width: reachesEdge ? 1.1 : 0.9,
      opacity: 0.32,
    })

    if (rng() < 0.65) {
      const sf = 0.3 + rng() * 0.5
      const [sx, sy] = pointAt(limbPts, sf)
      const sSide = rng() < 0.5 ? -1 : 1
      const sTargetX = sx + sSide * (7 + rng() * 12)
      const sSteps = 5 + Math.floor(rng() * 4)
      const sYEnd = sy + Math.abs(sTargetX - sx) * (0.4 + rng() * 0.35)
      const sBias = (sTargetX - sx) / sSteps
      const subPts = walk(rng, sx, sy, sYEnd, { steps: sSteps, bias: sBias, jitter: 3.5, drift: 0.45 })
      limbs.push({
        d: pathFromPoints(subPts),
        from: Math.max(0, Math.min(f + sf * 0.07, 0.97)),
        width: 0.55,
        opacity: 0.2,
      })
    }
  }

  return { trunkD: pathFromPoints(trunkPts), limbs }
}

const EDGE_MASK =
  'linear-gradient(to bottom, transparent 0%, #000 14%, #000 86%, transparent 100%)'

export default function RootLine({
  from = '#d954d1',
  to = '#4f7fd6',
  seed = 1,
  opacity = 0.4,
  className = '',
}) {
  const wrapRef = useRef(null)
  const reduceMotion = useReducedMotion()
  const [unlocked, setUnlocked] = useState(isRootUnlocked)
  const [videoActive, setVideoActiveState] = useState(isVideoActive)
  const { trunkD, limbs } = useMemo(() => buildRootSystem(seed), [seed])
  const gradIdRef = useRef(`root-grad-${Math.random().toString(36).slice(2)}`)
  const gradId = gradIdRef.current

  useEffect(() => subscribeRootUnlock(setUnlocked), [])
  useEffect(() => subscribeVideoActivity(setVideoActiveState), [])

  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ['start 88%', 'end 55%'] })
  const spring = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 })
  const grow = reduceMotion ? scrollYProgress : spring

  const show = unlocked && !videoActive
  const groupOpacity = show ? opacity / 0.4 : 0

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{ WebkitMaskImage: EDGE_MASK, maskImage: EDGE_MASK }}
    >
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="h-full w-full overflow-visible">
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2={H} gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor={from} />
            <stop offset="1" stopColor={to} />
          </linearGradient>
        </defs>
        <g style={{ opacity: groupOpacity, transition: 'opacity 700ms ease' }}>
          <motion.path
            d={trunkD}
            fill="none"
            stroke={`url(#${gradId})`}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            opacity="0.42"
            style={{ pathLength: grow }}
          />
          {limbs.map((limb, i) => (
            <LimbPath key={i} limb={limb} gradId={gradId} grow={grow} />
          ))}
        </g>
      </svg>
    </div>
  )
}

function LimbPath({ limb, gradId, grow }) {
  const limbGrow = useTransform(grow, [limb.from, Math.min(limb.from + 0.12, 1)], [0, 1])
  return (
    <motion.path
      d={limb.d}
      fill="none"
      stroke={`url(#${gradId})`}
      strokeWidth={limb.width}
      strokeLinecap="round"
      strokeLinejoin="round"
      vectorEffect="non-scaling-stroke"
      opacity={limb.opacity}
      style={{ pathLength: limbGrow }}
    />
  )
}
