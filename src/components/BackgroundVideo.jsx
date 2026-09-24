import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import heroVideoHd from '../assets/videos/hero-bg.mp4'
import heroVideoSm from '../assets/videos/hero-bg-sm.mp4'
import heroPoster from '../assets/videos/hero-poster.webp'
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
    video.setAttribute('autoplay', '')
    video.setAttribute('playsinline', '')
    video.setAttribute('webkit-playsinline', '')

    const tryPlay = () => {
      video.muted = true
      if (video.paused) video.play().catch(() => {})
    }

    video.load()
    tryPlay()
    // iOS/Android às vezes só liberam o play() depois do metadata carregar —
    // insistir nos primeiros frames via requestAnimationFrame pega esse instante
    // sem esperar o intervalo de 300ms.
    let rafId
    let rafTries = 0
    const rafLoop = () => {
      if (!video.paused || rafTries > 90) return
      tryPlay()
      rafTries += 1
      rafId = requestAnimationFrame(rafLoop)
    }
    rafId = requestAnimationFrame(rafLoop)

    // Qualquer sinal de interação ou de a página voltar a ficar visível conta
    // como "gesto" pro navegador liberar o autoplay que ficou preso.
    const gestureEvents = [
      'touchstart',
      'touchmove',
      'touchend',
      'pointerdown',
      'click',
      'scroll',
      'wheel',
    ]
    gestureEvents.forEach((evt) =>
      document.addEventListener(evt, tryPlay, { passive: true })
    )

    const dataEvents = ['loadedmetadata', 'loadeddata', 'canplay', 'canplaythrough']
    dataEvents.forEach((evt) => video.addEventListener(evt, tryPlay))

    document.addEventListener('visibilitychange', tryPlay)
    // pageshow cobre o Safari restaurando a página do cache (voltar de outro
    // app/aba), caso em que o vídeo volta pausado sem disparar mais nada.
    window.addEventListener('pageshow', tryPlay)
    window.addEventListener('focus', tryPlay)

    const retryInterval = setInterval(() => {
      if (video.paused) {
        tryPlay()
      } else {
        clearInterval(retryInterval)
      }
    }, 300)
    const stopRetrying = setTimeout(() => clearInterval(retryInterval), 12000)

    return () => {
      gestureEvents.forEach((evt) => document.removeEventListener(evt, tryPlay))
      dataEvents.forEach((evt) => video.removeEventListener(evt, tryPlay))
      document.removeEventListener('visibilitychange', tryPlay)
      window.removeEventListener('pageshow', tryPlay)
      window.removeEventListener('focus', tryPlay)
      cancelAnimationFrame(rafId)
      clearInterval(retryInterval)
      clearTimeout(stopRetrying)
    }
  }, [])

  return ref
}

// O vídeo de fundo da seção "Momento Atual" só é visto bem mais embaixo na página —
// baixá-lo junto com o vídeo do hero, logo na entrada, disputa banda com ele à toa e
// deixa a entrada mais lenta. Aqui ele só começa a carregar quando a pessoa rola a
// página (ou depois de um tempinho parada), nunca antes disso.
function useDeferredLoad(scrollThreshold = 0.6, idleDelay = 4000) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (ready) return
    const onScroll = () => {
      if (window.scrollY > window.innerHeight * scrollThreshold) setReady(true)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    const timer = setTimeout(() => setReady(true), idleDelay)
    return () => {
      window.removeEventListener('scroll', onScroll)
      clearTimeout(timer)
    }
  }, [ready, scrollThreshold, idleDelay])

  return ready
}

export default function BackgroundVideo({ switchRef }) {
  const heroRef = useForceAutoplay()
  const statsRef = useForceAutoplay()
  const statsReady = useDeferredLoad()

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
        poster={heroPoster}
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
        src={statsReady ? statsVideo : undefined}
        autoPlay
        loop
        muted
        playsInline
        webkit-playsinline="true"
        preload={statsReady ? 'auto' : 'none'}
        disableRemotePlayback
        controlsList="nodownload noplaybackrate"
        style={{ opacity: statsOpacity, filter: 'blur(1.5px) brightness(0.5) saturate(0.9)' }}
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  )
}
