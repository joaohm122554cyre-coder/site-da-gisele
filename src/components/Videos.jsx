import { useRef } from 'react'
import { videos } from '../lib/site-data'
import Reveal from './Reveal'

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
              <iframe
                src={videos.main}
                title={videos.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
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
