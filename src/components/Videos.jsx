import { useState, useRef } from 'react'
import { videos } from '../lib/site-data'
import Reveal from './Reveal'

// Cartaz clicável: mostra a foto (leve) em vez do player do YouTube já carregado.
// O iframe (bem mais pesado) só entra depois que a pessoa clica em assistir.
function MainVideo() {
  const [playing, setPlaying] = useState(false)

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
        <span className="grid h-16 w-16 place-items-center rounded-full bg-[#14122a]/60 backdrop-blur-sm ring-1 ring-[#f4eef7]/30 transition-transform duration-300 group-hover:scale-110 md:h-20 md:w-20">
          <svg width="22" height="22" viewBox="0 0 16 16" fill="#f4eef7">
            <path d="M4 2.5v11l10-5.5-10-5.5z" />
          </svg>
        </span>
      </span>
      {videos.mainTitle && (
        <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#14122a]/85 to-transparent px-6 pb-5 pt-10 text-left">
          <span className="font-display text-xl italic text-[#f4eef7] md:text-2xl">{videos.mainTitle}</span>
        </span>
      )}
    </button>
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
      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none' }}
      >
        {items.map((item, i) => (
          <a
            key={i}
            href={item.url}
            target="_blank"
            rel="noreferrer"
            className="snap-start shrink-0 w-64 md:w-72 group"
          >
            <div className="aspect-video rounded-xl overflow-hidden bg-[#f4eef7]/10">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <p className="mt-3 text-sm text-[#f4eef7]/80">{item.title}</p>
          </a>
        ))}
      </div>

      <button
        onClick={() => scroll(-1)}
        aria-label="Vídeo anterior"
        className="hidden md:flex absolute -left-5 top-[38%] -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur items-center justify-center shadow text-[#1c1638] hover:bg-white transition-colors"
      >
        ‹
      </button>
      <button
        onClick={() => scroll(1)}
        aria-label="Próximo vídeo"
        className="hidden md:flex absolute -right-5 top-[38%] -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur items-center justify-center shadow text-[#1c1638] hover:bg-white transition-colors"
      >
        ›
      </button>
    </div>
  )
}

export default function Videos() {
  return (
    <section id="videos" className="relative py-28 md:py-40">
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
