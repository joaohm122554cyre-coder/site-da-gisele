import { useEffect, useRef, useState } from 'react'
import Reveal from './Reveal'
import VinylPlayer from './VinylPlayer'
import SongMarquee from './SongMarquee'
import { setVideoActive } from '../lib/root-growth'
import barquinhoLabel from '../assets/photos/meu-barquinho-capa.jpg'
import barquinhoAudio from '../assets/audio/meu-barquinho-preview.mp3'
import barquinhoAlbum from '../assets/photos/meu-barquinho-album.jpg'
import adorarLabel from '../assets/photos/eu-so-quero-adorar-capa.jpg'
import adorarVideo from '../assets/videos/adorar-preview.mp4'
import discoDeOuroAdorar from '../assets/photos/disco-de-ouro-adorar.jpg'
import bondadeLabel from '../assets/photos/bondade-de-deus-capa.jpg'
import bondadeVideo from '../assets/videos/bondade-preview.mp4'
import queroAdoraLoLabel from '../assets/photos/quero-adora-lo-capa.jpg'
import queroAdoraLoVideo from '../assets/videos/quero-adora-lo-preview.mp4'
import pensandoBemLabel from '../assets/photos/pensando-bem-capa.jpg'
import pensandoBemVideo from '../assets/videos/pensando-bem-preview.mp4'
import bondadeCena from '../assets/photos/bondade-de-deus-cena.jpg'
import queroAdoraLoCena from '../assets/photos/quero-adora-lo-cena.jpg'
import pensandoBemCena from '../assets/photos/pensando-bem-cena.jpg'

const tracks = [
  {
    key: 'barquinho',
    eyebrow: 'O clássico',
    title: 'Meu Barquinho',
    description:
      'A canção que projetou Giselli Cristina para todo o país e se tornou uma das músicas mais lembradas da música gospel brasileira.',
    label: barquinhoLabel,
    audio: barquinhoAudio,
    backdrop: barquinhoAlbum,
    duration: 45,
    youtubeUrl: 'https://www.youtube.com/watch?v=_AOK_aSiDmo',
    meta: {
      views: 104631250,
      premiere: '11/11/2010',
    },
    award: {
      image: barquinhoAlbum,
      caption: 'Capa do álbum Meu Barquinho',
      maxWidth: 'max-w-[240px]',
    },
  },
  {
    key: 'adorar',
    eyebrow: 'Disco de Ouro',
    title: 'Eu Só Quero Adorar',
    description:
      'Gravada ao lado do filho, Nicolas Henrique, conquistou Disco de Ouro e se tornou um dos maiores fenômenos da música gospel nas plataformas digitais.',
    label: adorarLabel,
    video: adorarVideo,
    duration: 78,
    youtubeUrl: 'https://www.youtube.com/watch?v=jFPV45ARHqg',
    meta: {
      views: 17993828,
      premiere: '14/04/2025',
      credit: 'Moisés Cleyton / C1C2 Produções',
      tags: ['louvores', 'musicagospel', 'clipegospel'],
    },
    award: {
      image: discoDeOuroAdorar,
      caption: 'Giselli, Nicolas Henrique e a equipe com o Single de Ouro',
    },
  },
  {
    key: 'bondade',
    eyebrow: 'Feat. Clayton Queiroz',
    title: 'Bondade de Deus',
    description:
      'Um dos maiores sucessos do segmento gospel, reafirmando a força de Giselli Cristina nas plataformas digitais em parceria com Clayton Queiroz.',
    label: bondadeLabel,
    video: bondadeVideo,
    duration: 72,
    youtubeUrl: 'https://www.youtube.com/watch?v=dkfSaLXj2S4',
    meta: {
      views: 64344815,
      premiere: '31/03/2023',
    },
    award: {
      image: bondadeCena,
      caption: 'Giselli Cristina em Bondade de Deus',
      maxWidth: 'max-w-[240px]',
    },
  },
  {
    key: 'quero-adora-lo',
    eyebrow: 'Ao vivo com o Coral UFADPG',
    title: 'Quero Adorá-lo',
    description:
      'Registro ao vivo na Igreja Assembleia de Deus em Ponta Grossa, com participação especial do coral de mulheres da UFADPG e dos filhos Rafaelli Cristina e Nicolas Henrique.',
    label: queroAdoraLoLabel,
    video: queroAdoraLoVideo,
    duration: 75,
    youtubeUrl: 'https://www.youtube.com/watch?v=WteDeyyXFuM',
    meta: {
      views: 9699384,
      premiere: '11/02/2025',
      credit: 'Direção: Pr. Altair de Moraes e Pra. Elienai',
    },
    award: {
      image: queroAdoraLoCena,
      caption: 'Ao vivo com o Coral UFADPG',
      maxWidth: 'max-w-[240px]',
    },
  },
  {
    key: 'pensando-bem',
    eyebrow: 'Feat. Nicolas Henrique',
    title: 'Pensando Bem',
    description:
      'Um dueto intimista entre mãe e filho, Giselli Cristina e Nicolas Henrique, em uma versão acústica que emocionou o público.',
    label: pensandoBemLabel,
    video: pensandoBemVideo,
    duration: 76,
    youtubeUrl: 'https://www.youtube.com/watch?v=KeAEX20EqZ0',
    meta: {
      views: 2459514,
      premiere: '29/09/2025',
      credit: 'Nilseu Buarque / Editora Prisma',
      tags: ['louvores', 'musicagospel', 'clipegospel'],
    },
    award: {
      image: pensandoBemCena,
      caption: 'Com Nicolas Henrique em Pensando Bem',
      maxWidth: 'max-w-[240px]',
    },
  },
]

const EDGE_MASK = 'linear-gradient(to bottom, transparent 0, #000 7rem, #000 calc(100% - 7rem), transparent 100%)'

export default function MeuBarquinho() {
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [current, setCurrent] = useState(0)
  const [duration, setDuration] = useState(tracks[0].duration)
  const mediaRef = useRef(null)
  const sectionRef = useRef(null)
  const track = tracks[index]

  useEffect(() => {
    setPlaying(false)
    setCurrent(0)
    setDuration(tracks[index].duration)

    const media = mediaRef.current
    if (!media) return

    const onTime = () => setCurrent(media.currentTime)
    const onLoaded = () => {
      if (Number.isFinite(media.duration) && media.duration > 0) setDuration(media.duration)
    }
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)

    media.addEventListener('timeupdate', onTime)
    media.addEventListener('loadedmetadata', onLoaded)
    media.addEventListener('play', onPlay)
    media.addEventListener('pause', onPause)
    return () => {
      media.removeEventListener('timeupdate', onTime)
      media.removeEventListener('loadedmetadata', onLoaded)
      media.removeEventListener('play', onPlay)
      media.removeEventListener('pause', onPause)
      media.pause()
    }
  }, [index])

  // a raiz decorativa pausa de crescer enquanto um clipe está tocando
  useEffect(() => {
    setVideoActive(playing)
    return () => setVideoActive(false)
  }, [playing])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) mediaRef.current?.pause()
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const toggle = () => {
    const media = mediaRef.current
    if (!media) return
    if (media.paused) media.play().catch(() => {})
    else media.pause()
  }

  const go = (dir) => {
    setIndex((i) => (i + dir + tracks.length) % tracks.length)
  }

  return (
    <section ref={sectionRef} id="musicas" className="relative py-28 md:py-40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-1000"
        style={{ opacity: playing ? 1 : 0, WebkitMaskImage: EDGE_MASK, maskImage: EDGE_MASK }}
      >
        <div className="sticky top-0 h-[100svh] max-h-full w-full overflow-hidden">
          {track.video ? (
            <video
              key={track.key}
              ref={mediaRef}
              src={track.video}
              preload="metadata"
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
              style={{ filter: 'brightness(0.62) saturate(1.02)' }}
            />
          ) : (
            <>
              <audio key={track.key} ref={mediaRef} src={track.audio} preload="metadata" />
              <img
                src={track.backdrop}
                alt=""
                className={`absolute inset-0 h-full w-full object-cover ${playing ? 'bg-drift' : ''}`}
                style={{ objectPosition: '50% 38%', filter: 'blur(4px) brightness(0.52) saturate(1.05)' }}
              />
            </>
          )}
          <div className="absolute inset-0 bg-[#14122a]/40" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(20,18,42,0.5)_100%)]" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-12 gap-10 items-center [text-shadow:0_1px_16px_rgba(20,18,42,0.85)]">
        <Reveal className="md:col-span-12 text-center mb-2 md:mb-10">
          <span className="text-[11px] tracking-[0.4em] uppercase text-[#f4eef7]/50">
            Repertório
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#f4eef7] mt-4 leading-[1.15]">
            Músicas que encantaram
            <br />
            <span className="italic text-[#d954d1]">corações</span> de gerações
          </h2>
        </Reveal>

        <div className="md:col-span-5 flex justify-center">
          <div className="relative flex items-center gap-3 md:gap-5">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Música anterior"
              className="shrink-0 w-9 h-9 rounded-full border border-[#f4eef7]/20 flex items-center justify-center text-[#f4eef7]/60 hover:text-[#f4eef7] hover:border-[#f4eef7]/50 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M10 2 4 8l6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <Reveal key={track.key}>
              <VinylPlayer
                label={track.label}
                labelAlt={`${track.title} — capa`}
                trackName={track.title}
                playing={playing}
                onToggle={toggle}
                progress={duration ? Math.min(current / duration, 1) : 0}
                current={current}
                duration={duration}
                meta={track.meta}
                youtubeUrl={track.youtubeUrl}
              />
            </Reveal>

            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Próxima música"
              className="shrink-0 w-9 h-9 rounded-full border border-[#f4eef7]/20 flex items-center justify-center text-[#f4eef7]/60 hover:text-[#f4eef7] hover:border-[#f4eef7]/50 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M6 2l6 6-6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <Reveal key={`${track.key}-text`}>
            <span className="text-[11px] tracking-[0.4em] uppercase text-[#f4eef7]/50">
              {track.eyebrow}
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#f4eef7] mt-4">
              {track.title}
            </h2>
            <p className="mt-6 text-sm md:text-base text-[#f4eef7]/65 leading-relaxed max-w-md">
              {track.description}
            </p>

            {track.award && (
              <div className={`mt-8 ${track.award.maxWidth ?? 'max-w-sm'}`}>
                <img
                  src={track.award.image}
                  alt={track.award.caption}
                  className="w-full rounded-md grayscale-[8%]"
                />
                <p className="mt-2 text-[10px] tracking-[0.1em] text-[#f4eef7]/40">
                  {track.award.caption}
                </p>
              </div>
            )}

            <p className="mt-10 text-[11px] uppercase tracking-[0.2em] text-[#f4eef7]/40">
              Clique no disco para ouvir uma prévia
            </p>

            <div className="flex gap-2 mt-8">
              {tracks.map((t, i) => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Ir para ${t.title}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index ? 'w-8 bg-[#d954d1]' : 'w-1.5 bg-[#f4eef7]/25'
                  }`}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      <div className="relative z-10 mt-16 md:mt-24">
        <SongMarquee />
      </div>
    </section>
  )
}
