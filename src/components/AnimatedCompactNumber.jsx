import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'framer-motion'

function formatCompact(n) {
  if (n >= 1_000_000_000) {
    const v = n / 1_000_000_000
    return `${v % 1 === 0 ? v.toFixed(0) : v.toFixed(1)}bi`
  }
  if (n >= 1_000_000) {
    const v = n / 1_000_000
    return `${v % 1 === 0 ? v.toFixed(0) : v.toFixed(1)}mi`
  }
  if (n >= 1_000) {
    const v = n / 1_000
    return `${v % 1 === 0 ? v.toFixed(0) : v.toFixed(1)}mil`
  }
  return `${Math.round(n)}`
}

export default function AnimatedCompactNumber({ value, duration = 3.2 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })
  const [display, setDisplay] = useState(formatCompact(0))

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration,
      ease: 'linear',
      onUpdate: (v) => setDisplay(formatCompact(v)),
    })
    return () => controls.stop()
  }, [inView, value, duration])

  return <span ref={ref}>{display}</span>
}
