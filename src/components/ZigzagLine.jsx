import { useId } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const W = 200
const H = 40
const STEPS = 20
const AMPLITUDE = 15

// Quanto maior, mais arredondadas as pontas (0 = bico, 0.5 = onda suave).
const ROUNDNESS = 0.36

// Ondas fortes perto do texto que vão ficando retas até a ponta.
// Cada ponta tem tangente horizontal, por isso o topo e o fundo ficam redondos.
function buildPath(side) {
  const pts = []
  for (let i = 0; i <= STEPS; i++) {
    const t = i / STEPS
    const x = side === 'left' ? W - t * W : t * W
    const amp = i === 0 || i === STEPS ? 0 : AMPLITUDE * Math.pow(1 - t, 1.5)
    pts.push([x, H / 2 + (i % 2 === 1 ? -amp : amp)])
  }
  let d = `M ${pts[0][0].toFixed(2)} ${pts[0][1].toFixed(2)}`
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1]
    const [x1, y1] = pts[i]
    const dx = (x1 - x0) * ROUNDNESS
    d += ` C ${(x0 + dx).toFixed(2)} ${y0.toFixed(2)} ${(x1 - dx).toFixed(2)} ${y1.toFixed(2)} ${x1.toFixed(2)} ${y1.toFixed(2)}`
  }
  return d
}

// largura da luz que corre pela linha (unidades do desenho, W = 200)
const SHINE_BLUE = 150
const SHINE_WHITE = 72
// traço da luz um pouco mais grosso que a linha, para ela se destacar
const SHINE_STROKE = 4

const strokeProps = {
  fill: 'none',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  vectorEffect: 'non-scaling-stroke',
}

// Luz que corre pela linha, do texto até a ponta. Usa animação nativa do SVG,
// porque animações de CSS dentro de máscara não são desenhadas.
function Shine({ side, width, fill }) {
  const from = (side === 'left' ? W : 0) - width / 2
  const to = side === 'left' ? from - W : from + W
  return (
    <rect x={from} y="-10" width={width} height={H + 20} fill={fill} opacity="0">
      <animate
        attributeName="x"
        values={`${from};${to};${to}`}
        keyTimes="0;0.6;1"
        calcMode="spline"
        keySplines="0 0 0.58 1; 0 0 1 1"
        dur="2s"
        begin="1.8s"
        repeatCount="indefinite"
      />
      <animate
        attributeName="opacity"
        values="0;1;0;0"
        keyTimes="0;0.06;0.6;1"
        dur="2s"
        begin="1.8s"
        repeatCount="indefinite"
      />
    </rect>
  )
}

export default function ZigzagLine({ side }) {
  const reduceMotion = useReducedMotion()
  const uid = useId().replace(/:/g, '')
  const maskId = `zz-mask-${uid}`
  const whiteId = `zz-white-${uid}`
  const blueId = `zz-blue-${uid}`
  const d = buildPath(side)
  const hidden = side === 'left' ? 'inset(-8px 0px -8px 100%)' : 'inset(-8px 100% -8px 0px)'

  return (
    <motion.div
      aria-hidden="true"
      initial={{ clipPath: hidden }}
      whileInView={{ clipPath: 'inset(-8px 0px -8px 0px)' }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 1.6, ease: [0.45, 0, 0.25, 1] }}
      className="hidden lg:block flex-1 min-w-8"
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        className="block w-full h-10 overflow-visible"
      >
        <defs>
          <linearGradient id={whiteId} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.5" stopColor="#fff" stopOpacity="1" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={blueId} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#a9ceff" stopOpacity="0" />
            <stop offset="0.5" stopColor="#a9ceff" stopOpacity="1" />
            <stop offset="1" stopColor="#a9ceff" stopOpacity="0" />
          </linearGradient>
          <mask id={maskId} maskUnits="userSpaceOnUse" x="-10" y="-10" width={W + 20} height={H + 20}>
            <path d={d} stroke="#fff" {...strokeProps} strokeWidth={SHINE_STROKE} />
          </mask>
        </defs>

        <path d={d} stroke="#4f7fd6" {...strokeProps} />

        {/* camadas iguais somam a intensidade da luz sobre o traço fino */}
        {!reduceMotion && (
          <g mask={`url(#${maskId})`}>
            {[0, 1, 2].map((layer) => (
              <g key={layer}>
                <Shine side={side} width={SHINE_BLUE} fill={`url(#${blueId})`} />
                <Shine side={side} width={SHINE_WHITE} fill={`url(#${whiteId})`} />
              </g>
            ))}
          </g>
        )}
      </svg>
    </motion.div>
  )
}
