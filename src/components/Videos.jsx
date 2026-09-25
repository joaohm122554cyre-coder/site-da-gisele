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

function AlbumTile({ item }) {
  return (
    <a href={item.url} target="_blank" rel="noreferrer" className="group flex flex-col gap-3">
      <div className="relative aspect-square">
        <div
          className="absolute right-0 top-1/2 h-[78%] w-[78%] -translate-y-1/2 translate-x-[26%] rounded-full shadow-lg shadow-black/40"
          style={{ backgroundImage: VINYL_BG }}
        />
        <div className="absolute inset-0 overflow-hidden rounded-lg shadow-xl shadow-black/40 ring-1 ring-[#f4eef7]/15">
          <img
            src={item.thumbnail}
            alt=""
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute inset-0 flex items-center justify-center bg-[#14122a]/0 opacity-0 transition-opacity duration-300 group-hover:bg-[#14122a]/30 group-hover:opacity-100">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[#14122a]/70 backdrop-blur-sm ring-1 ring-[#e9c968]/50">
              <svg width="10" height="10" viewBox="0 0 16 16" fill="#f4eef7">
                <path d="M4 2.5v11l10-5.5-10-5.5z" />
              </svg>
            </span>
          </span>
        </div>
      </div>
      <p className="line-clamp-2 text-xs leading-snug text-[#f4eef7]/75 transition-colors group-hover:text-[#f4eef7] md:text-sm">
        {item.title}
      </p>
    </a>
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
            <p className="mb-6 px-1 text-[11px] tracking-[0.3em] uppercase text-[#f4eef7]/45">
              Mais assistidos
            </p>
            <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-4">
              {videos.items.map((item, i) => (
                <AlbumTile key={i} item={item} />
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}
