import { useState } from 'react'
import { videos, socials } from '../lib/site-data'
import Reveal from './Reveal'

const YOUTUBE_SUBSCRIBERS = '918 mil'
const youtubeChannel = socials.find((s) => s.name === 'YouTube')?.url

const idFromEmbed = (url) => url?.split('/embed/')[1]?.split('?')[0]
const idFromWatch = (url) => new URL(url).searchParams.get('v')

// Playlist: o clipe principal primeiro, depois os outros. Clicar numa capa
// troca o clipe do player grande e já começa a tocar.
const playlist = [
  ...(videos.main
    ? [{ id: idFromEmbed(videos.main), title: videos.mainTitle, thumbnail: videos.mainThumbnail }]
    : []),
  ...videos.items.map((item) => ({ id: idFromWatch(item.url), title: item.title, thumbnail: item.thumbnail })),
]

const PlayIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="#f4eef7">
    <path d="M4 2.5v11l10-5.5-10-5.5z" />
  </svg>
)

const YouTubeIcon = ({ className }) => (
  <svg viewBox="0 0 28 20" fill="none" className={className} aria-hidden="true">
    <path
      d="M27.4 3.1a3.5 3.5 0 0 0-2.46-2.47C22.7 0 14 0 14 0S5.3 0 3.06.63A3.5 3.5 0 0 0 .6 3.1 36.6 36.6 0 0 0 0 10a36.6 36.6 0 0 0 .6 6.9 3.5 3.5 0 0 0 2.46 2.47C5.3 20 14 20 14 20s8.7 0 10.94-.63a3.5 3.5 0 0 0 2.46-2.47A36.6 36.6 0 0 0 28 10a36.6 36.6 0 0 0-.6-6.9Z"
      fill="#ff0033"
    />
    <path d="M11 14.3 18.5 10 11 5.7v8.6Z" fill="#ffffff" />
  </svg>
)

// Caixa com proporção 16:9 via padding-top (em vez de aspect-ratio), que não
// depende do motor de grid/flex do navegador pra calcular a altura — em
// alguns celulares o aspect-video dentro de layouts mais complexos cortava
// o vídeo pela metade.
function VideoFrame({ children }) {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-[#14122a] shadow-2xl shadow-black/40 ring-1 ring-[#f4eef7]/10">
      <div style={{ paddingTop: '56.25%' }} />
      <div className="absolute inset-0">{children}</div>
    </div>
  )
}

// Cartaz clicável: mostra a foto (leve) em vez do player do YouTube já carregado.
// O iframe (bem mais pesado) só entra depois que a pessoa clica em assistir.
function MainPlayer({ video, playing, onPlay }) {
  if (playing) {
    return (
      <iframe
        key={video.id}
        src={`https://www.youtube.com/embed/${video.id}?autoplay=1&playsinline=1&rel=0&modestbranding=1&cc_load_policy=0`}
        title={video.title}
        className="h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    )
  }

  return (
    <button type="button" onClick={onPlay} aria-label={`Assistir ${video.title}`} className="group relative h-full w-full">
      <img
        src={video.thumbnail}
        alt=""
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <span className="absolute inset-0 bg-[#14122a]/25 transition-colors duration-300 group-hover:bg-[#14122a]/10" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-[#14122a]/60 backdrop-blur-sm ring-1 ring-[#e9c968]/50 transition-transform duration-300 group-hover:scale-110 md:h-20 md:w-20">
          <PlayIcon />
        </span>
      </span>
      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#14122a]/90 to-transparent px-5 pb-4 pt-12 text-left md:px-8 md:pb-6">
        <span className="block text-[10px] uppercase tracking-[0.3em] text-[#e9c968]/85">Clipe em destaque</span>
        <span className="font-display text-xl italic text-[#f4eef7] md:text-3xl">{video.title}</span>
      </span>
    </button>
  )
}

function PlaylistTile({ video, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-label={`Assistir ${video.title}`}
      aria-current={selected ? 'true' : undefined}
      className="group flex flex-col gap-2.5 text-left"
    >
      <span
        className={`relative block w-full overflow-hidden rounded-lg shadow-lg shadow-black/40 transition-all duration-300 ${
          selected ? 'ring-2 ring-[#ff0033] ring-offset-2 ring-offset-[#14122a]' : 'ring-1 ring-[#f4eef7]/15'
        }`}
      >
        <span className="block" style={{ paddingTop: '56.25%' }} />
        <img
          src={video.thumbnail}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span
          className={`absolute inset-0 flex items-center justify-center transition-colors duration-300 ${
            selected ? 'bg-[#14122a]/45' : 'bg-[#14122a]/15 group-hover:bg-[#14122a]/35'
          }`}
        >
          {selected ? (
            <span className="rounded-full bg-[#ff0033] px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.2em] text-white">
              No player
            </span>
          ) : (
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[#14122a]/60 opacity-0 ring-1 ring-[#f4eef7]/40 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
              <PlayIcon size={12} />
            </span>
          )}
        </span>
      </span>
      <span
        className={`line-clamp-2 text-xs font-medium leading-snug [text-shadow:0_1px_4px_rgba(0,0,0,0.6)] md:text-sm ${
          selected ? 'text-[#f4eef7]' : 'text-[#f4eef7]/75 group-hover:text-[#f4eef7]'
        }`}
      >
        {video.title}
      </span>
    </button>
  )
}

export default function Videos() {
  const [selected, setSelected] = useState(0)
  const [playing, setPlaying] = useState(false)
  const current = playlist[selected]

  const select = (i) => {
    setSelected(i)
    setPlaying(true)
  }

  return (
    <section id="videos" className="relative py-20 md:py-32">
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        <Reveal className="text-center max-w-xl mx-auto mb-12 md:mb-14">
          <span className="text-[11px] tracking-[0.4em] uppercase text-[#f4eef7]/50">Assista</span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#f4eef7] mt-4 leading-[1.1]">
            Clipes que <span className="italic text-[#ff4d6d]">tocaram</span> o Brasil
          </h2>
          <p className="mt-6 font-fraunces italic text-base md:text-lg text-[#f4eef7]/80">{videos.description}</p>
        </Reveal>

        {current ? (
          <Reveal delay={0.1} className="mx-auto w-full max-w-4xl">
            <VideoFrame>
              <MainPlayer video={current} playing={playing} onPlay={() => setPlaying(true)} />
            </VideoFrame>
          </Reveal>
        ) : (
          <Reveal delay={0.1} className="mx-auto w-full max-w-4xl">
            <VideoFrame>
              <div className="flex h-full w-full items-center justify-center border border-[#a9a0d8]/60">
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#f4eef7]/40">Vídeos em breve</p>
              </div>
            </VideoFrame>
          </Reveal>
        )}

        {playlist.length > 1 && (
          <Reveal delay={0.2} className="mx-auto mt-10 max-w-4xl md:mt-12">
            <p className="mb-5 px-1 text-[11px] tracking-[0.3em] uppercase text-[#f4eef7]/70 [text-shadow:0_1px_4px_rgba(0,0,0,0.6)]">
              Escolha um clipe
            </p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3">
              {playlist.map((video, i) => (
                <PlaylistTile key={video.id} video={video} selected={i === selected} onSelect={() => select(i)} />
              ))}
            </div>
          </Reveal>
        )}

        {youtubeChannel && (
          <Reveal delay={0.25} className="mt-14 flex justify-center">
            <a
              href={`${youtubeChannel}?sub_confirmation=1`}
              target="_blank"
              rel="noreferrer"
              className="cta-glow group inline-flex items-center gap-3 rounded-full border border-[#ff0033]/45 bg-[#ff0033]/10 py-2 pl-2 pr-6 text-[11px] uppercase tracking-[0.25em] text-[#f4eef7]/90 backdrop-blur-sm transition-all duration-500 hover:border-[#ff0033] hover:bg-[#ff0033]/20 hover:text-[#f4eef7]"
              style={{ '--glow-rgb': '255, 0, 51' }}
            >
              <span className="grid h-9 w-9 place-items-center rounded-full bg-white transition-transform duration-500 group-hover:translate-x-1">
                <YouTubeIcon className="h-3.5 w-5" />
              </span>
              <span>
                Inscreva-se no canal
                <span className="ml-2 text-[#f4eef7]/55">· {YOUTUBE_SUBSCRIBERS} inscritos</span>
              </span>
            </a>
          </Reveal>
        )}
      </div>
    </section>
  )
}
