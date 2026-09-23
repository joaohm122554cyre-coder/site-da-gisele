import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { isRootUnlocked, isVideoActive, subscribeRootUnlock, subscribeVideoActivity } from '../lib/root-growth'

// Uma raiz orgânica e sinuosa que cresce enquanto a página rola, com pequenos
// galhos saindo pro lado. Só aparece depois que a semente da linha do tempo
// chega ao fim, e pausa enquanto algum clipe está tocando.
const W = 100
const H = 1000
const STEPS = 14
const AMPLITUDE = 16

function buildTrunk() {
  const pts = []
  for (let i = 0; i <= STEPS; i++) {
    const t = i / STEPS
    const y = t * H
    const x = i === 0 || i === STEPS ? W / 2 : W / 2 + AMPLITUDE * Math.sin(t * Math.PI * 2.4)
    pts.push([x, y])
  }
  let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1]
    const [x1, y1] = pts[i]
    const dy = (y1 - y0) * 0.5
    d += ` C ${x0.toFixed(1)} ${(y0 + dy).toFixed(1)} ${x1.toFixed(1)} ${(y1 - dy).toFixed(1)} ${x1.toFixed(1)} ${y1.toFixed(1)}`
  }
  return { d, pts }
}

// Pequeno galho saindo do tronco no ponto de fração f (0 a 1), pro lado indicado.
function buildBranch(pts, f, side, len) {
  const idx = f * STEPS
  const i0 = Math.floor(idx)
  const i1 = Math.min(i0 + 1, STEPS)
  const lt = idx - i0
  const x = pts[i0][0] + (pts[i1][0] - pts[i0][0]) * lt
  const y = pts[i0][1] + (pts[i1][1] - pts[i0][1]) * lt
  const endX = x + side * len
  const endY = y + len * 0.6
  const midX = x + side * len * 0.6
  const midY = y + len * 0.18
  return `M ${x.toFixed(1)} ${y.toFixed(1)} Q ${midX.toFixed(1)} ${midY.toFixed(1)} ${endX.toFixed(1)} ${endY.toFixed(1)}`
}

const EDGE_MASK =
  'linear-gradient(to bottom, transparent 0%, #000 14%, #000 86%, transparent 100%)'

export default function RootLine({
  from = '#d954d1',
  to = '#4f7fd6',
  branches = [0.3, 0.62],
  branchLength = 22,
  opacity = 0.4,
  className = '',
}) {
  const wrapRef = useRef(null)
  const reduceMotion = useReducedMotion()
  const [unlocked, setUnlocked] = useState(isRootUnlocked)
  const [videoActive, setVideoActiveState] = useState(isVideoActive)
  const { d: trunkD, pts } = buildTrunk()
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
      className={`pointer-events-none absolute inset-y-0 left-1/2 w-14 -translate-x-1/2 md:w-20 ${className}`}
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
            strokeWidth="1.6"
            strokeLinecap="round"
            opacity="0.4"
            style={{ pathLength: grow }}
          />
          {branches.map((f, i) => (
            <BranchPath
              key={i}
              d={buildBranch(pts, f, i % 2 === 0 ? 1 : -1, branchLength)}
              gradId={gradId}
              grow={grow}
              from={f}
            />
          ))}
        </g>
      </svg>
    </div>
  )
}

function BranchPath({ d, gradId, grow, from }) {
  const branchGrow = useTransform(grow, [from, Math.min(from + 0.1, 1)], [0, 1])
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={`url(#${gradId})`}
      strokeWidth="1"
      strokeLinecap="round"
      opacity="0.3"
      style={{ pathLength: branchGrow }}
    />
  )
}
