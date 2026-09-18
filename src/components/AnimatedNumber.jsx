import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'framer-motion'

export default function AnimatedNumber({ value, duration = 1.6 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })
  const [display, setDisplay] = useState(0)
  const lastUpdate = useRef(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration,
      ease: 'easeOut',
      onUpdate: (v) => {
        const now = performance.now()
        if (v === value || now - lastUpdate.current > 45) {
          lastUpdate.current = now
          setDisplay(Math.round(v))
        }
      },
    })
    return () => controls.stop()
  }, [inView, value, duration])

  return <span ref={ref}>{display}</span>
}
