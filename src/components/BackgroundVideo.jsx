import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import heroVideoHd from '../assets/videos/hero-bg.mp4'
import heroVideoSm from '../assets/videos/hero-bg-sm.mp4'
import statsVideoHd from '../assets/videos/stats-bg-hd.mp4'
import statsVideoSm from '../assets/videos/stats-bg.mp4'

const isHdScreen =
  typeof window !== 'undefined' &&
  window.matchMedia('(min-width: 900px)').matches &&
  !navigator.connection?.saveData

const heroVideo = isHdScreen ? heroVideoHd : heroVideoSm
const statsVideo = isHdScreen ? statsVideoHd : statsVideoSm

function useForceAutoplay() {
  const ref = useRef(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return

    video.muted = true
    video.defaultMuted = true
    video.setAttribute('muted', '')
    video.setAttribute('playsinline', '')
    video.setAttribute('webkit-playsinline', '')

    const tryPlay = () => {
      if (video.paused) video.play().catch(() => {})
    }

    video.load()
    tryPlay()

    const gestureEvents = ['touchstart', 'touchend', 'pointerdown', 'click', 'scroll']
    gestureEvents.forEach((evt) =>
      document.addEventListener(evt, tryPlay, { passive: true })
    )

    const dataEvents = ['loadeddata', 'canplay', 'canplaythrough']
    dataEvents.forEach((evt) => video.addEventListener(evt, tryPlay))

    document.addEventListener('visibilitychange', tryPlay)

    const retryInterval = setInterval(() => {
      if (video.paused) {
        tryPlay()
      } else {
        clearInterval(retryInterval)
      }
    }, 500)
    const stopRetrying = setTimeout(() => clearInterval(retryInterval), 8000)

    return () => {
      gestureEvents.forEach((evt) => document.removeEventListener(evt, tryPlay))
      dataEvents.forEach((evt) => video.removeEventListener(evt, tryPlay))
      document.removeEventListener('visibilitychange', tryPlay)
      clearInterval(retryInterval)
      clearTimeout(stopRetrying)
    }
  }, [])

  return ref
}

export default function BackgroundVideo({ switchRef }) {
  const heroRef = useForceAutoplay()
  const statsRef = useForceAutoplay()

  const { scrollY } = useScroll()
  const heroFilter = useTransform(
    scrollY,
    [0, 300, 900],
    [
      'blur(0px) brightness(0.8) saturate(0.8)',
      'blur(10px) brightness(0.4) saturate(0.75)',
      'blur(20px) brightness(0.18) saturate(0.7)',
    ]
  )

  const { scrollYProgress } = useScroll({
    target: switchRef,
    offset: ['start 25%', 'start -45%'],
  })
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const statsOpacity = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <div className="fixed inset-0 h-lvh -z-20 overflow-hidden">
      <motion.video
        ref={heroRef}
        src={heroVideo}
        autoPlay
        loop
        muted
        playsInline
        webkit-playsinline="true"
        preload="auto"
        disableRemotePlayback
        controlsList="nodownload noplaybackrate"
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
        style={{ filter: heroFilter, opacity: heroOpacity }}
        className="absolute inset-0 w-full h-full object-cover object-[65%_top]"
      />
      <motion.video
        ref={statsRef}
        src={statsVideo}
        autoPlay
        loop
        muted
        playsInline
        webkit-playsinline="true"
        preload="auto"
        disableRemotePlayback
        controlsList="nodownload noplaybackrate"
        style={{ opacity: statsOpacity, filter: 'blur(1.5px) brightness(0.5) saturate(0.9)' }}
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  )
}
