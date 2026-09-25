import { useEffect, useRef, useState } from 'react'
import { videos } from '../lib/site-data'
import Reveal from './Reveal'

const VINYL_BG =
  'repeating-radial-gradient(circle at 50% 50%, #caa53d 0px, #e9c968 2px, #8a6a1f 4px, #f3dc94 6px)'

// Cartaz clicável: mostra a foto (leve) em vez do player do YouTube já carregado.
// O iframe (bem mais pesado) só entra depois que a pessoa clica em assistir.
function MainVideo() {
  const [playing, setPlaying] = useState(false)

  if (playing) {
    return (
      <iframe
        src={`${videos.main}?autoplay=1&playsinline=1&rel=0&modestbranding=1&cc_load_policy=0`}
        title={videos.mainTitle ?? videos.title}
        className="h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    )
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Assistir ${videos.mainTitle ?? videos.title}`}
      className="group relative h-full w-full"
    >
      <img
        src={videos.mainThumbnail}
        alt=""
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <span className="absolute inset-0 bg-[#14122a]/25 transition-colors duration-300 group-hover:bg-[#14122a]/10" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-[#14122a]/60 backdrop-blur-sm ring-1 ring-[#e9c968]/50 transition-transform duration-300 group-hover:scale-110 md:h-20 md:w-20">
          <svg width="22" height="22" viewBox="0 0 16 16" fill="#f4eef7">
            <path d="M4 2.5v11l10-5.5-10-5.5z" />
          </svg>
        </span>
      </span>
      {videos.mainTitle && (
        <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#14122a]/85 to-transparent px-6 pb-5 pt-10 text-left">
          <span className="block text-[10px] uppercase tracking-[0.3em] text-[#e9c968]/80">
            Tocando agora
          </span>
          <span className="font-display text-xl italic text-[#f4eef7] md:text-2xl">
            {videos.mainTitle}
          </span>
        </span>
      )}
    </button>
  )
}

// Caixa com proporção 16:9 via padding-top (em vez de aspect-ratio), que não
// depende do motor de grid/flex do navegador pra calcular a altura — em
// alguns celulares o aspect-video dentro de layouts mais complexos cortava
// o vídeo pela metade.
function VideoFrame({ children }) {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-[#14122a] shadow-xl shadow-black/30 ring-1 ring-[#f4eef7]/10">
      <div style={{ paddingTop: '56.25%' }} />
      <div className="absolute inset-0">{children}</div>
    </div>
  )
}

// Toca uma prévia de 35s do clipe (áudio) ao clicar na capa, em vez de
// mandar a pessoa direto pro YouTube. Só uma prévia toca por vez.
function useAudioPreviews() {
  const audioRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onTime = () => setProgress(audio.duration ? audio.currentTime / audio.duration : 0)
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    const onEnded = () => {
      setPlaying(false)
      setProgress(0)
    }
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('ended', onEnded)
    return () => {
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('ended', onEnded)
    }
  }, [])

  const toggle = (index, src) => {
    const audio = audioRef.current
    if (!audio) return
    if (activeIndex === index) {
      if (playing) {
        audio.pause()
      } else {
        setPlaying(true) // otimista: disco já gira ao tocar, sem esperar o buffer
        audio.play().catch(() => setPlaying(false))
      }
      return
    }
    audio.src = src
    audio.currentTime = 0
    setActiveIndex(index)
    setProgress(0)
    setPlaying(true)
    audio.play().catch(() => setPlaying(false))
  }

  return { audioRef, activeIndex, playing, progress, toggle }
}

function AlbumTile({ item, isActive, playing, progress, onToggle, peek = 'right' }) {
  const peekSide =
    peek === 'right'
      ? 'right-0 translate-x-[26%]'
      : 'left-0 -translate-x-[26%]'

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-square">
        <div
          className={`absolute top-1/2 h-[78%] w-[78%] -translate-y-1/2 rounded-full shadow-lg shadow-black/40 ${peekSide} ${
            playing ? '[animation:vinyl-rotate_3.6s_linear_infinite]' : ''
          }`}
          style={{ backgroundImage: VINYL_BG }}
        />
        <button
          type="button"
          onClick={onToggle}
          aria-label={playing ? `Pausar prévia de ${item.title}` : `Ouvir prévia de ${item.title}`}
          className="group absolute inset-0 overflow-hidden rounded-lg shadow-xl shadow-black/40 ring-1 ring-[#f4eef7]/15"
        >
          <img
            src={item.thumbnail}
            alt=""
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span
            className={`absolute inset-0 flex items-center justify-center bg-[#14122a]/0 transition-opacity duration-300 group-hover:bg-[#14122a]/30 group-hover:opacity-100 ${
              isActive ? 'bg-[#14122a]/30 opacity-100' : 'opacity-0'
            }`}
          >
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[#14122a]/70 backdrop-blur-sm ring-1 ring-[#e9c968]/50">
              {playing ? (
                <svg width="10" height="10" viewBox="0 0 16 16" fill="#f4eef7">
                  <rect x="3" y="2" width="3.5" height="12" rx="1" />
                  <rect x="9.5" y="2" width="3.5" height="12" rx="1" />
                </svg>
              ) : (
                <svg width="10" height="10" viewBox="0 0 16 16" fill="#f4eef7">
                  <path d="M4 2.5v11l10-5.5-10-5.5z" />
                </svg>
              )}
            </span>
          </span>
          {isActive && (
            <span className="absolute inset-x-0 bottom-0 h-[3px] bg-[#14122a]/60">
              <span
                className="block h-full bg-[#e9c968] transition-[width] duration-150"
                style={{ width: `${progress * 100}%` }}
              />
            </span>
          )}
        </button>
      </div>
      <div className="flex items-start justify-between gap-2">
        <p className="line-clamp-2 text-xs font-medium leading-snug text-[#f4eef7] [text-shadow:0_1px_4px_rgba(0,0,0,0.6)] md:text-sm">
          {item.title}
        </p>
        <a
          href={item.url}
          target="_blank"
          rel="noreferrer"
          aria-label={`Assistir clipe de ${item.title} no YouTube`}
          title="Assistir clipe completo"
          className="mt-0.5 shrink-0 text-[#f4eef7]/35 transition-colors hover:text-[#e9c968]"
        >
          <svg width="16" height="12" viewBox="0 0 28 20" fill="none">
            <path
              d="M27.4 3.1a3.5 3.5 0 0 0-2.46-2.47C22.7 0 14 0 14 0S5.3 0 3.06.63A3.5 3.5 0 0 0 .6 3.1 36.6 36.6 0 0 0 0 10a36.6 36.6 0 0 0 .6 6.9 3.5 3.5 0 0 0 2.46 2.47C5.3 20 14 20 14 20s8.7 0 10.94-.63a3.5 3.5 0 0 0 2.46-2.47A36.6 36.6 0 0 0 28 10a36.6 36.6 0 0 0-.6-6.9Z"
              fill="currentColor"
            />
            <path d="M11 14.3 18.5 10 11 5.7v8.6Z" fill="#170f28" />
          </svg>
        </a>
      </div>
    </div>
  )
}

export default function Videos() {
  const { audioRef, activeIndex, playing, progress, toggle } = useAudioPreviews()

  return (
    <section id="videos" className="relative py-20 md:py-32">
      <audio ref={audioRef} preload="none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        <Reveal className="text-center max-w-lg mx-auto mb-14">
          <span className="text-[11px] tracking-[0.4em] uppercase text-[#f4eef7]/50">
            Assista
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#f4eef7] mt-4">
            {videos.title}
          </h2>
          <p className="mt-6 text-sm md:text-base text-[#f4eef7]/65">
            {videos.description}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mx-auto max-w-4xl">
          {videos.main ? (
            <VideoFrame>
              <MainVideo />
            </VideoFrame>
          ) : (
            <VideoFrame>
              <div className="flex h-full w-full items-center justify-center border border-[#a9a0d8]/60">
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#f4eef7]/40">
                  Vídeos em breve
                </p>
              </div>
            </VideoFrame>
          )}
        </Reveal>

        {videos.items.length > 0 && (
          <Reveal delay={0.2} className="mt-12 md:mt-16">
            <p className="mb-1 px-1 text-[11px] tracking-[0.3em] uppercase text-[#f4eef7]/70 [text-shadow:0_1px_4px_rgba(0,0,0,0.6)]">
              Prévia dos clipes
            </p>
            <p className="mb-6 px-1 text-xs text-[#f4eef7]/85 [text-shadow:0_1px_4px_rgba(0,0,0,0.6)]">
              Toque na capa pra ouvir um trecho. O ícone do YouTube abre o clipe completo.
            </p>
            <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-4">
              {videos.items.map((item, i) => (
                <AlbumTile
                  key={i}
                  item={item}
                  isActive={activeIndex === i}
                  playing={activeIndex === i && playing}
                  progress={activeIndex === i ? progress : 0}
                  onToggle={() => toggle(i, item.preview)}
                  peek={i % 2 === 0 ? 'right' : 'left'}
                />
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}
