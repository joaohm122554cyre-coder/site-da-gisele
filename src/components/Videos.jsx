import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { videos } from '../lib/site-data'
import Reveal from './Reveal'

const CLAPPER_STRIPES = 'repeating-linear-gradient(115deg, #f4eef7 0 16px, #14122a 16px 32px)'

// Cartaz clicável em forma de claquete de cinema: a barra listrada "bate" antes
// de revelar o player do YouTube — que só carrega de fato depois do clique.
function MainVideo() {
  const [playing, setPlaying] = useState(false)
  const [clapping, setClapping] = useState(false)

  if (playing) {
    return (
      <iframe
        src={`${videos.main}?autoplay=1`}
        title={videos.mainTitle ?? videos.title}
        className="h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    )
  }

  const handleClap = () => {
    if (clapping) return
    setClapping(true)
  }

  return (
    <div className="relative h-full w-full" style={{ perspective: 700 }}>
      <button
        type="button"
        onClick={handleClap}
        aria-label={`Assistir ${videos.mainTitle ?? videos.title}`}
        disabled={clapping}
        className="group relative block h-full w-full"
      >
        <img
          src={videos.mainThumbnail}
          alt=""
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute inset-0 bg-[#14122a]/25 transition-colors duration-300 group-hover:bg-[#14122a]/10" />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-[#14122a]/60 backdrop-blur-sm ring-1 ring-[#f4eef7]/30 transition-transform duration-300 group-hover:scale-110 md:h-20 md:w-20">
            <svg width="22" height="22" viewBox="0 0 16 16" fill="#f4eef7">
              <path d="M4 2.5v11l10-5.5-10-5.5z" />
            </svg>
          </span>
        </span>

        {/* flash do clap */}
        <motion.span
          className="pointer-events-none absolute inset-0 bg-[#f4eef7]"
          initial={{ opacity: 0 }}
          animate={{ opacity: clapping ? [0, 0.55, 0] : 0 }}
          transition={{ duration: 0.35, times: [0, 0.25, 1] }}
          onAnimationComplete={() => {
            if (clapping) setPlaying(true)
          }}
        />
      </button>

      {/* braço da claquete, articulado no topo */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-0 flex h-9 items-center justify-between px-4 text-[9px] uppercase tracking-[0.25em] text-[#f4eef7] shadow-[0_6px_14px_rgba(0,0,0,0.45)] md:h-11 md:px-6 md:text-[10px]"
        style={{ backgroundImage: CLAPPER_STRIPES, transformOrigin: 'top center' }}
        initial={{ rotateX: -55 }}
        animate={{ rotateX: clapping ? 0 : -55 }}
        transition={{ duration: 0.18, ease: 'easeIn' }}
      >
        <span className="[text-shadow:0_1px_3px_rgba(0,0,0,0.85)]">Giselli Cristina</span>
        <span className="[text-shadow:0_1px_3px_rgba(0,0,0,0.85)]">{videos.mainTitle}</span>
      </motion.div>

      {videos.mainTitle && (
        <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#14122a]/85 to-transparent px-6 pb-5 pt-10 text-left">
          <span className="font-display text-xl italic text-[#f4eef7] md:text-2xl">{videos.mainTitle}</span>
        </span>
      )}
    </div>
  )
}

function SprocketRail() {
  const holes = Array.from({ length: 48 })
  return (
    <div className="flex h-3 items-center justify-between bg-[#f4eef7]/[0.06] px-2 md:h-3.5">
      {holes.map((_, i) => (
        <span key={i} className="h-1.5 w-1.5 shrink-0 rounded-[1px] bg-[#0b0a16] md:h-[7px] md:w-[7px]" />
      ))}
    </div>
  )
}

function VideoCarousel({ items }) {
  const trackRef = useRef(null)

  const scroll = (dir) => {
    trackRef.current?.scrollBy({
      left: dir * trackRef.current.clientWidth * 0.9,
      behavior: 'smooth',
    })
  }

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-2xl bg-[#14122a]">
        <SprocketRail />
        <div
          ref={trackRef}
          className="flex divide-x divide-[#f4eef7]/15 overflow-x-auto scroll-smooth snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none' }}
        >
          {items.map((item, i) => (
            <a
              key={i}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="group relative aspect-video w-60 shrink-0 snap-start overflow-hidden sm:w-64 md:w-72"
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute left-2 top-2 rounded-sm bg-[#0b0a16]/70 px-1.5 py-0.5 text-[9px] uppercase tracking-[0.2em] text-[#f4eef7]/85 backdrop-blur-sm">
                Take {String(i + 1).padStart(2, '0')}
              </span>
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0b0a16] to-transparent px-3 pb-2 pt-7">
                <span className="line-clamp-1 text-[11px] text-[#f4eef7]/90">{item.title}</span>
              </span>
              <span className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-[#14122a]/70 ring-1 ring-[#f4eef7]/40">
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="#f4eef7">
                    <path d="M4 2.5v11l10-5.5-10-5.5z" />
                  </svg>
                </span>
              </span>
            </a>
          ))}
        </div>
        <SprocketRail />
      </div>

      <button
        onClick={() => scroll(-1)}
        aria-label="Vídeo anterior"
        className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur items-center justify-center shadow text-[#1c1638] hover:bg-white transition-colors"
      >
        ‹
      </button>
      <button
        onClick={() => scroll(1)}
        aria-label="Próximo vídeo"
        className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur items-center justify-center shadow text-[#1c1638] hover:bg-white transition-colors"
      >
        ›
      </button>
    </div>
  )
}

export default function Videos() {
  return (
    <section id="videos" className="relative py-20 md:py-32">
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <Reveal className="text-center max-w-lg mx-auto mb-16">
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

        <Reveal delay={0.1}>
          {videos.main ? (
            <div className="aspect-video max-w-4xl mx-auto overflow-hidden rounded-xl">
              <MainVideo />
            </div>
          ) : (
            <div className="max-w-4xl mx-auto aspect-video border border-[#a9a0d8]/60 rounded-xl flex items-center justify-center">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#f4eef7]/40">
                Vídeos em breve
              </p>
            </div>
          )}
        </Reveal>

        {videos.items.length > 0 && (
          <Reveal delay={0.2} className="mt-16">
            <p className="text-[11px] tracking-[0.3em] uppercase text-[#f4eef7]/50 mb-6">
              Mais assistidos
            </p>
            <VideoCarousel items={videos.items} />
          </Reveal>
        )}
      </div>
    </section>
  )
}
