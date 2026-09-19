import { useEffect, useRef, useState } from 'react'

export default function Marquee({
  children,
  duration = 30,
  reverse = false,
  pauseOnHover = false,
  className = '',
  style,
}) {
  const containerRef = useRef(null)
  const setRef = useRef(null)
  const [copies, setCopies] = useState(2)

  useEffect(() => {
    const container = containerRef.current
    const set = setRef.current
    if (!container || !set) return

    const measure = () => {
      const setWidth = set.offsetWidth
      if (setWidth > 0) {
        setCopies(Math.max(2, Math.ceil(container.clientWidth / setWidth) + 1))
      }
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(container)
    observer.observe(set)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`} style={style}>
      <div
        className={`flex w-max whitespace-nowrap ${
          pauseOnHover ? 'hover:[animation-play-state:paused]' : ''
        }`}
        style={{
          '--marquee-shift': `${100 / copies}%`,
          animation: `${reverse ? 'marquee-scroll-reverse' : 'marquee-scroll'} ${duration}s linear infinite`,
        }}
      >
        {Array.from({ length: copies }, (_, i) => (
          <div
            key={i}
            ref={i === 0 ? setRef : undefined}
            aria-hidden={i > 0 ? true : undefined}
            className="flex shrink-0"
          >
            {children}
          </div>
        ))}
      </div>
    </div>
  )
}
