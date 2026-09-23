import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { isRootUnlocked, isVideoActive, subscribeRootUnlock, subscribeVideoActivity } from '../lib/root-growth'

// Mesmo gerador de raízes do Ensaio Rosa/Azul (PhotoSessionPink/Blue), só que
// crescendo verticalmente a partir do topo da seção em vez de irradiar de um
// cartão. Curvas em S suaves + bifurcação recursiva = parece raiz de verdade,
// não uma linha reta. Trabalha em pixels reais da seção (medida por
// ResizeObserver) para os ângulos não ficarem distorcidos.

function makeRand(seed) {
  let s = seed
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

function buildBranch(x0, y0, dir, len, depth, rand, maxDepth) {
  const [dx, dy] = dir
  const [px, py] = [-dy, dx]
  const end = { x: x0 + dx * len, y: y0 + dy * len }
  const amp = len * 0.16
  const at = (t, side) => ({ x: x0 + dx * len * t + px * side, y: y0 + dy * len * t + py * side })
  const p1 = at(0.35, amp)
  const p2 = at(0.7, -amp * 0.6)
  const mid = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 }
  const path = `M ${x0.toFixed(1)} ${y0.toFixed(1)} Q ${p1.x.toFixed(1)} ${p1.y.toFixed(1)} ${mid.x.toFixed(1)} ${mid.y.toFixed(1)} Q ${p2.x.toFixed(1)} ${p2.y.toFixed(1)} ${end.x.toFixed(1)} ${end.y.toFixed(1)}`

  const branches = [{ path, depth, midY: (y0 + end.y) / 2 }]
  if (depth < maxDepth && len > 40) {
    const count = depth === 0 ? 3 : 2
    for (let c = 0; c < count; c++) {
      const t = 0.4 + rand() * 0.35
      const from = { x: x0 + dx * len * t, y: y0 + dy * len * t }
      const turn = (0.5 + rand() * 0.55) * (c % 2 === 0 ? 1 : -1)
      const angle = Math.atan2(dy, dx) + turn
      const childDir = [Math.cos(angle), Math.sin(angle)]
      const childLen = len * (0.38 + rand() * 0.22)
      branches.push(...buildBranch(from.x, from.y, childDir, childLen, depth + 1, rand, maxDepth))
    }
  }
  return branches
}

// Irradia do centro da seção em todas as direções (igual ao Ensaio Rosa/Azul),
// cada raiz primária mirando o próprio canto/borda que calha na sua direção -
// é isso que garante que os quatro cantos da seção fiquem conectados.
function useRootSystem(w, h, seed) {
  return useMemo(() => {
    if (!w || !h) return []
    const rand = makeRand(seed)
    const cx = w / 2
    const cy = h / 2
    const PRIMARY = 7
    const branches = []
    for (let i = 0; i < PRIMARY; i++) {
      const angle = (i / PRIMARY) * Math.PI * 2 + (rand() - 0.5) * 0.35
      const dir = [Math.cos(angle), Math.sin(angle)]
      const edgeX = dir[0] > 0 ? w - cx : cx
      const edgeY = dir[1] > 0 ? h - cy : cy
      const edgeDist = Math.min(
        dir[0] !== 0 ? Math.abs(edgeX / dir[0]) : Infinity,
        dir[1] !== 0 ? Math.abs(edgeY / dir[1]) : Infinity,
      )
      const len = edgeDist * (0.94 + rand() * 0.12)
      branches.push(...buildBranch(cx, cy, dir, len, 0, rand, 1))
    }
    return branches
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [w, h, seed])
}

const BRANCH_WIDTH = [1.8, 1.1, 0.65]
const BRANCH_OPACITY = [0.42, 0.3, 0.2]

const EDGE_MASK =
  'linear-gradient(to bottom, transparent 0%, #000 3%, #000 97%, transparent 100%)'

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
  const [box, setBox] = useState({ w: 0, h: 0 })
  const gradIdRef = useRef(`root-grad-${Math.random().toString(36).slice(2)}`)
  const gradId = gradIdRef.current

  useEffect(() => subscribeRootUnlock(setUnlocked), [])
  useEffect(() => subscribeVideoActivity(setVideoActiveState), [])

  useLayoutEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const measure = () => setBox({ w: el.clientWidth, h: el.clientHeight })
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const branches = useRootSystem(box.w, box.h, seed)

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
      {box.w > 0 && box.h > 0 && (
        <svg
          width={box.w}
          height={box.h}
          viewBox={`0 0 ${box.w} ${box.h}`}
          className="h-full w-full overflow-visible"
        >
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2={box.h} gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor={from} />
              <stop offset="1" stopColor={to} />
            </linearGradient>
          </defs>
          <g style={{ opacity: groupOpacity, transition: 'opacity 700ms ease' }}>
            {branches.map((b, i) => (
              <BranchPath key={i} branch={b} boxH={box.h} gradId={gradId} grow={grow} />
            ))}
          </g>
        </svg>
      )}
    </div>
  )
}

function BranchPath({ branch, boxH, gradId, grow }) {
  const startFrac = Math.max(0, Math.min(branch.midY / boxH - 0.08, 0.95))
  const branchGrow = useTransform(grow, [startFrac, Math.min(startFrac + 0.14, 1)], [0, 1])
  return (
    <motion.path
      d={branch.path}
      fill="none"
      stroke={`url(#${gradId})`}
      strokeWidth={BRANCH_WIDTH[branch.depth] ?? 0.5}
      strokeLinecap="round"
      opacity={BRANCH_OPACITY[branch.depth] ?? 0.15}
      style={{ pathLength: branchGrow }}
    />
  )
}
