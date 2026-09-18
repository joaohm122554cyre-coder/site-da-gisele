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
