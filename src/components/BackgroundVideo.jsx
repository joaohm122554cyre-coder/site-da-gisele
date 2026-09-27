import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import heroVideoHd from '../assets/videos/hero-bg.mp4'
import heroVideoSm from '../assets/videos/hero-bg-sm.mp4'
import heroPoster from '../assets/videos/hero-poster.webp'
import statsVideoHd from '../assets/videos/stats-bg-hd.mp4'
import statsVideoSm from '../assets/videos/stats-bg.mp4'

// iPhone decodifica vídeo bem mesmo em qualidade alta, mas Android mais simples
// engasga — então no celular a escolha também olha o sistema, não só o tamanho
// da tela: iOS ganha o vídeo HD, Android fica no leve pra não travar.
const isIOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent)
const isWideScreen =
  typeof window !== 'undefined' && window.matchMedia('(min-width: 900px)').matches
const saveData = typeof navigator !== 'undefined' && navigator.connection?.saveData
const isHdScreen = !saveData && (isWideScreen || isIOS)

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

// Os dois vídeos de fundo (Hero e Stats) tocavam o tempo inteiro, mesmo o que
// tá com opacidade 0 (completamente invisível) — decodificar dois vídeos ao
// mesmo tempo pesa muito em Android mais fraco. Pausa o que sumiu e só
// retoma quando ele volta a aparecer no cross-fade.
function usePauseWhenHidden(ref, opacity) {
  useEffect(() => {
    const video = ref.current
    if (!video) return
    // se o vídeo começar a tocar (autoplay nativo, ou o useForceAutoplay
    // insistindo) enquanto ainda tá com opacidade 0, pausa na hora — cobre o
    // instante antes da pessoa rolar até a faixa de transição
    const enforce = () => {
      if (opacity.get() < 0.02 && !video.paused) video.pause()
    }
    enforce()
    video.addEventListener('playing', enforce)
    video.addEventListener('loadeddata', enforce)
    return () => {
      video.removeEventListener('playing', enforce)
      video.removeEventListener('loadeddata', enforce)
    }
  }, [ref, opacity])

  useMotionValueEvent(opacity, 'change', (value) => {
    const video = ref.current
    if (!video) return
    if (value < 0.02) {
      if (!video.paused) video.pause()
    } else if (video.paused) {
      video.play().catch(() => {})
    }
  })
}

export default function BackgroundVideo({ switchRef }) {
  const heroRef = useForceAutoplay()
  const statsRef = useForceAutoplay()
  const statsReady = useDeferredLoad()

  // Desfoque (blur) ao vivo em vídeo de tela cheia é o efeito mais caro pro celular —
  // e na troca pro vídeo do Momento Atual eram dois vídeos borrados ao mesmo tempo,
  // o que travava a rolagem. No celular fica só o escurecimento, que é leve.
  const { scrollY } = useScroll()
  const heroFilter = useTransform(
    scrollY,
    [0, 500, 1600],
    isWideScreen
      ? [
          'blur(0px) brightness(0.85) saturate(0.9)',
          'blur(5px) brightness(0.6) saturate(0.85)',
          'blur(12px) brightness(0.4) saturate(0.8)',
        ]
      : ['brightness(0.85) saturate(0.9)', 'brightness(0.55) saturate(0.85)', 'brightness(0.35) saturate(0.8)']
  )
  const statsFilter = isWideScreen
    ? 'blur(1.5px) brightness(0.5) saturate(0.9)'
    : 'brightness(0.45) saturate(0.9)'

  const { scrollYProgress } = useScroll({
    target: switchRef,
    offset: ['start 25%', 'start -45%'],
  })
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const statsOpacity = useTransform(scrollYProgress, [0, 1], [0, 1])

  usePauseWhenHidden(heroRef, heroOpacity)
  usePauseWhenHidden(statsRef, statsOpacity)

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
        style={{ opacity: statsOpacity, filter: statsFilter }}
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  )
}
