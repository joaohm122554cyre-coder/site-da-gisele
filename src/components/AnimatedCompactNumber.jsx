import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'framer-motion'

function formatCompact(n) {
  if (n >= 1_000_000_000) {
    return `${Math.round(n / 1_000_000_000)}bi`
  }
  if (n >= 1_000_000) {
    return `${Math.round(n / 1_000_000)}mi`
  }
  if (n >= 1_000) {
    return `${Math.round(n / 1_000)}mil`
  }
  return `${Math.round(n)}`
}

export default function AnimatedCompactNumber({ value, duration = 1.6 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const [display, setDisplay] = useState(formatCompact(0))
  const lastUpdate = useRef(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration,
      ease: 'linear',
      onUpdate: (v) => {
        const now = performance.now()
        if (v === value || now - lastUpdate.current > 45) {
          lastUpdate.current = now
          setDisplay(formatCompact(v))
        }
      },
    })
    return () => controls.stop()
  }, [inView, value, duration])

  const [, digits, unit] = display.match(/^(\d+)(\D*)$/)

  return (
    <span ref={ref}>
      {digits}
      {unit && <span className="ml-1 text-[0.42em]">{unit}</span>}
    </span>
  )
}
