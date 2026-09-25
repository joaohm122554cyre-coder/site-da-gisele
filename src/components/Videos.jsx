import { useState } from 'react'
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

function VinylThumb({ thumbnail, size = 52 }) {
  return (
    <div
      className="relative shrink-0 rounded-full [animation:none] group-hover:[animation:vinyl-rotate_3.6s_linear_infinite]"
      style={{ width: size, height: size, backgroundImage: VINYL_BG }}
    >
      <div className="absolute inset-[20%] overflow-hidden rounded-full border border-[#e9c968]/70">
        <img src={thumbnail} alt="" className="h-full w-full object-cover" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-1.5 w-1.5 rounded-full border border-[#e9c968]/60 bg-[#170f28]" />
      </div>
    </div>
  )
}

function VideoList({ items }) {
  return (
    <div className="flex flex-col gap-1">
      {items.map((item, i) => (
        <a
          key={i}
          href={item.url}
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-[#f4eef7]/5 md:px-3"
        >
          <span className="w-4 shrink-0 text-[11px] tabular-nums text-[#f4eef7]/30">
            {String(i + 1).padStart(2, '0')}
          </span>
          <VinylThumb thumbnail={item.thumbnail} />
          <p className="min-w-0 flex-1 truncate text-sm text-[#f4eef7]/80 transition-colors group-hover:text-[#f4eef7]">
            {item.title}
          </p>
          <svg
            className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
            width="12"
            height="12"
            viewBox="0 0 16 16"
            fill="#e9c968"
          >
            <path d="M4 2.5v11l10-5.5-10-5.5z" />
          </svg>
        </a>
      ))}
    </div>
  )
}

export default function Videos() {
  return (
    <section id="videos" className="relative py-20 md:py-32">
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

        {videos.main ? (
          <Reveal delay={0.1} className="grid gap-6 md:grid-cols-[1.6fr_1fr] md:gap-8">
            <div className="aspect-video overflow-hidden rounded-2xl">
              <MainVideo />
            </div>

            {videos.items.length > 0 && (
              <div className="flex flex-col rounded-2xl border border-[#f4eef7]/10 bg-[#f4eef7]/[0.03] p-3 md:p-4">
                <p className="px-2 pb-2 pt-1 text-[11px] tracking-[0.3em] uppercase text-[#f4eef7]/45">
                  Mais assistidos
                </p>
                <div className="flex flex-1 flex-col justify-center">
                  <VideoList items={videos.items} />
                </div>
              </div>
            )}
          </Reveal>
        ) : (
          <div className="max-w-4xl mx-auto aspect-video border border-[#a9a0d8]/60 rounded-xl flex items-center justify-center">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#f4eef7]/40">
              Vídeos em breve
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
