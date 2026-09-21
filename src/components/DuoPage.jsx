import { useEffect, useRef, useSyncExternalStore } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { FiArrowLeft, FiArrowUpRight, FiPlay } from 'react-icons/fi'
import Reveal from './Reveal'
import AnimatedNumber from './AnimatedNumber'
import Footer from './Footer'
import Link from './Link'
import { goBack, isPlainClick } from '../lib/router'
import logo from '../assets/logo/gc-monograma.png'
import fundoVideo from '../assets/videos/stats-bg.mp4'
import fotoRoxo from '../assets/photos/dupla-roxo.webp'
import fotoCantando from '../assets/photos/dupla-cantando.webp'
import fotoViolao from '../assets/photos/dupla-violao.webp'
import azulClipe from '../assets/photos/azul-clipe.webp'
import queroAdoraLoCena from '../assets/photos/quero-adora-lo-cena.jpg'
import pensandoBemCena from '../assets/photos/pensando-bem-cena.jpg'

const BACK_TO = '/#conheca-dupla'
const goBackToSite = () => goBack(BACK_TO, { block: 'center' })

// Ordem cronológica das estreias no YouTube.
const songs = [
  {
    key: 'quero-adora-lo',
    month: 'Fevereiro de 2025',
    title: 'Quero Adorá-lo',
    text: 'Registro ao vivo na Assembleia de Deus em Ponta Grossa, com o coral de mulheres da UFADPG e a participação dos filhos Rafaelli Cristina e Nicolas Henrique.',
    views: 9699384,
    image: queroAdoraLoCena,
    alt: 'Giselli Cristina cantando ao vivo em “Quero Adorá-lo”',
    position: '50% 28%',
    url: 'https://www.youtube.com/watch?v=WteDeyyXFuM',
  },
  {
    key: 'adorar',
    month: 'Abril de 2025',
    title: 'Eu Só Quero Adorar',
    text: 'O clipe que reuniu Giselli e Nicolas Henrique e conquistou o Single de Ouro.',
    views: 17993828,
    image: azulClipe,
    alt: 'Giselli Cristina e Nicolas Henrique ao teclado no clipe de “Eu Só Quero Adorar”',
    position: '62% 50%',
    url: 'https://www.youtube.com/watch?v=jFPV45ARHqg',
  },
  {
    key: 'pensando-bem',
    month: 'Setembro de 2025',
    title: 'Pensando Bem',
    text: 'Um dueto intimista, de mãe e filho, em versão acústica.',
    views: 2459514,
    image: pensandoBemCena,
    alt: 'Nicolas Henrique ao violão e Giselli Cristina em “Pensando Bem”',
    position: '50% 40%',
    url: 'https://www.youtube.com/watch?v=KeAEX20EqZ0',
  },
]

const totalViews = songs.reduce((sum, s) => sum + s.views, 0)
const millions = (n) => `${(Math.floor(n / 1e5) / 10).toLocaleString('pt-BR')} mi`

const paragraphs = [
  'Giselli Cristina construiu, ao longo de quase três décadas, uma das trajetórias mais respeitadas da música gospel brasileira. Em 2025, essa história ganhou uma voz a mais: a do filho, Nicolas Henrique, que esteve ao lado dela em três registros que marcaram o ano.',
  'Ele canta e toca teclado e violão; ela, na voz. Juntos, gravaram o clipe de “Eu Só Quero Adorar”, que rendeu o Single de Ouro, participaram do registro ao vivo de “Quero Adorá-lo”, com o coral de mulheres da UFADPG, e se encontraram num dueto acústico, “Pensando Bem”.',
  'Foi na música que os dois se encontraram diante do público — e o público respondeu. Só nesses três registros, são mais de 30 milhões de visualizações.',
]

const numbers = [
  { value: 3, label: 'registros juntos em 2025', tone: 'stat-pink' },
  { value: Math.floor(totalViews / 1e6), suffix: 'mi+', label: 'visualizações somando os três', tone: 'stat-blue' },
  { value: 1, label: 'Single de Ouro', tone: 'stat-pink' },
]

function useIsDesktop() {
  return useSyncExternalStore(
    (onChange) => {
      const query = window.matchMedia('(min-width: 768px)')
      query.addEventListener('change', onChange)
      return () => query.removeEventListener('change', onChange)
    },
    () => window.matchMedia('(min-width: 768px)').matches,
    () => false,
  )
}

function BackLink({ className, children }) {
  return (
    <a
      href={BACK_TO}
      className={className}
      onClick={(event) => {
        if (!isPlainClick(event)) return
        event.preventDefault()
        goBackToSite()
      }}
    >
      {children}
    </a>
  )
}

function DuoBackground() {
  const ref = useRef(null)

  useEffect(() => {
    const video = ref.current
    video.muted = true
    video.play().catch(() => {})
  }, [])

  return (
    <div aria-hidden="true" className="fixed inset-0 -z-20 overflow-hidden">
      <video
        ref={ref}
        src={fundoVideo}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        disableRemotePlayback
        className="h-full w-full object-cover"
        style={{ filter: 'blur(2px) brightness(0.4) saturate(0.9)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#14122a]/60 via-[#1c1638]/35 to-[#170f28]/70" />
    </div>
  )
}

function TopBar() {
  return (
    <nav
      aria-label="Navegação"
      className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-center justify-between px-4 py-4 md:px-10 md:py-6"
    >
      <BackLink className="pointer-events-auto group inline-flex items-center gap-2.5 rounded-full border border-[#f4eef7]/20 bg-[#14122a]/55 py-2.5 pl-3.5 pr-5 text-[10px] uppercase tracking-[0.28em] text-[#f4eef7]/90 backdrop-blur-md transition hover:border-[#d954d1]/60 hover:bg-[#14122a]/75">
        <FiArrowLeft className="text-sm transition-transform group-hover:-translate-x-1" aria-hidden="true" />
        Voltar ao site
      </BackLink>
      <Link to="/" aria-label="Giselli Cristina — página inicial" className="pointer-events-auto">
        <img
          src={logo}
          alt="GC"
          className="w-9 opacity-90 drop-shadow-[0_0_10px_rgba(217,84,209,0.35)] transition hover:opacity-100 md:w-10"
        />
      </Link>
    </nav>
  )
}

function NamePill({ side, name, role }) {
  return (
    <div
      className={`absolute bottom-3 rounded-xl border border-[#f4eef7]/15 bg-[#14122a]/55 px-3 py-2 backdrop-blur-md ${
        side === 'left' ? 'left-3' : 'right-3 text-right'
      }`}
    >
      <p className="font-display text-sm text-[#f4eef7]">{name}</p>
      <p className="mt-0.5 text-[9px] uppercase tracking-[0.25em] text-[#f4eef7]/60">{role}</p>
    </div>
  )
}

function PageHero() {
  const ref = useRef(null)
  const isDesktop = useIsDesktop()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '7%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-28%'])
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <header ref={ref} className="relative md:flex md:h-[100svh] md:min-h-[640px] md:items-end md:overflow-hidden">
      <div className="relative aspect-[3/2] overflow-hidden md:absolute md:inset-0 md:aspect-auto md:[-webkit-mask-image:linear-gradient(to_bottom,#000_60%,transparent_100%)] md:[mask-image:linear-gradient(to_bottom,#000_60%,transparent_100%)]">
        <motion.img
          src={fotoRoxo}
          alt="Nicolas Henrique ao teclado e Giselli Cristina, sorrindo, sob luzes roxas"
          decoding="async"
          fetchPriority="high"
          style={{ y: imageY, scale: 1.15 }}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="md:hidden">
          <NamePill side="left" name="Nicolas Henrique" role="Voz, teclado e violão" />
          <NamePill side="right" name="Giselli Cristina" role="Voz" />
        </div>
      </div>

      <motion.div
        style={isDesktop ? { y: textY, opacity: textOpacity } : undefined}
        className="relative z-10 w-full px-6 pb-12 pt-10 text-center md:px-16 md:pb-20 md:pt-0 md:text-left"
      >
        <motion.span
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="block font-script text-5xl leading-none text-[#f08de8] [text-shadow:0_2px_30px_rgba(20,18,42,0.9)] md:text-7xl"
        >
          Giselli &amp; Nicolas
        </motion.span>
        <motion.h1
          id="dupla-titulo"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-3 font-display text-[2.75rem] leading-[1.05] text-[#f4eef7] [text-shadow:0_2px_40px_rgba(20,18,42,0.9)] sm:text-6xl md:text-[clamp(2.75rem,5.4vw,5.75rem)]"
        >
          Dois corações,
          <br />
          <span className="italic text-[#d954d1]">um só louvor</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-5 max-w-xl font-serif text-xl italic leading-relaxed text-[#f4eef7]/80 [text-shadow:0_2px_24px_rgba(20,18,42,0.9)] md:mx-0 md:text-2xl"
        >
          Uma mãe, um filho e a música como ponto de encontro.
        </motion.p>
      </motion.div>

      <div aria-hidden="true" className="pointer-events-none absolute bottom-8 right-10 hidden flex-col items-center gap-3 md:flex">
        <span className="text-[9px] uppercase tracking-[0.4em] text-[#f4eef7]/50 [writing-mode:vertical-rl]">Role</span>
        <span className="relative h-14 w-px overflow-hidden bg-[#f4eef7]/15">
          <motion.span
            animate={{ y: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 bg-[#d954d1]"
          />
        </span>
      </div>
    </header>
  )
}

function SongCard({ song, index, fill }) {
  const lit = useTransform(fill, [index * 0.33 - 0.02, index * 0.33 + 0.05], [0, 1])

  return (
    <Reveal delay={index * 0.12} className="relative md:pt-10">
      <span className="absolute left-0 top-0 hidden h-[11px] w-[11px] md:block">
        <span className="absolute inset-0 rounded-full bg-[#f4eef7]/25 ring-4 ring-[#1c1638]" />
        <motion.span
          style={{ opacity: lit }}
          className="absolute inset-0 rounded-full bg-[#d954d1] shadow-[0_0_14px_3px_rgba(217,84,209,0.6)]"
        />
      </span>

      <a
        href={song.url}
        target="_blank"
        rel="noreferrer"
        aria-label={`Assistir “${song.title}” no YouTube`}
        className="group relative block aspect-[4/3] overflow-hidden rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-[#4f7fd6]"
      >
        <img
          src={song.image}
          alt={song.alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
          style={{ objectPosition: song.position }}
        />
        <span className="absolute inset-0 grid place-items-center bg-[#14122a]/0 transition-colors duration-500 group-hover:bg-[#14122a]/35">
          <span className="grid h-14 w-14 scale-90 place-items-center rounded-full border border-[#f4eef7]/40 bg-[#14122a]/50 text-[#f4eef7] opacity-0 backdrop-blur-md transition-all duration-500 group-hover:scale-100 group-hover:opacity-100">
            <FiPlay className="ml-0.5" aria-hidden="true" />
          </span>
        </span>
      </a>

      <p className="mt-5 font-display text-2xl italic lining-nums text-[#d954d1]">{song.month}</p>
      <h3 className="mt-1 font-display text-2xl text-[#f4eef7] md:text-[1.7rem]">{song.title}</h3>
      <p className="mt-3 font-serif text-lg leading-relaxed text-[#f4eef7]/75">{song.text}</p>
      <p className="mt-4 text-[11px] uppercase tracking-[0.25em] text-[#f4eef7]/55">
        <span className="stat-blue mr-2 font-display text-2xl normal-case italic tracking-normal lining-nums">
          {millions(song.views)}
        </span>
        visualizações
      </p>
    </Reveal>
  )
}

function Songs() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 65%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 110, damping: 26, restDelta: 0.0005 })

  return (
    <div ref={ref} className="relative grid gap-14 md:grid-cols-3 md:gap-8">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-[5px] hidden h-px md:block">
        <div className="absolute inset-0 bg-[#f4eef7]/15" />
        <motion.div
          style={{ scaleX: fill }}
          className="absolute inset-0 origin-left bg-gradient-to-r from-[#d954d1] to-[#7f9cf5] shadow-[0_0_10px_rgba(217,84,209,0.55)]"
        />
      </div>
      {songs.map((song, i) => (
        <SongCard key={song.key} song={song} index={i} fill={fill} />
      ))}
    </div>
  )
}

export default function DuoPage() {
  useEffect(() => {
    const previous = document.title
    document.title = 'Giselli & Nicolas | Giselli Cristina'
    return () => {
      document.title = previous
    }
  }, [])

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="relative">
      <DuoBackground />
      <TopBar />

      <main>
        <PageHero />

        <section aria-labelledby="dupla-titulo" className="relative py-24 md:py-36">
          <div className="mx-auto max-w-6xl px-6 md:px-12">
            <div className="grid gap-12 md:grid-cols-12 md:gap-16">
              <Reveal className="md:sticky md:top-28 md:col-span-5 md:self-start">
                <p className="font-display text-3xl italic leading-[1.2] text-[#f4eef7] md:text-[2.6rem]">
                  Quando mãe e filho cantam juntos, a música ganha{' '}
                  <span className="text-[#d954d1]">um sentido a mais.</span>
                </p>
              </Reveal>

              <div className="md:col-span-6 md:col-start-7">
                <div className="space-y-6">
                  {paragraphs.map((p, i) => (
                    <Reveal key={i} delay={i * 0.08}>
                      <p
                        className={`font-serif text-lg lining-nums leading-relaxed text-[#f4eef7]/75 md:text-xl ${
                          i === 0 ? 'drop-cap' : ''
                        }`}
                      >
                        {p}
                      </p>
                    </Reveal>
                  ))}
                </div>

                <Reveal delay={0.1}>
                  <div className="mt-12 grid grid-cols-3 gap-4 border-t border-[#f4eef7]/10 pt-8 md:gap-8">
                    {numbers.map((n) => (
                      <div key={n.label}>
                        <p
                          translate="no"
                          className={`notranslate font-display text-4xl italic font-semibold leading-none lining-nums md:text-6xl ${n.tone}`}
                        >
                          <AnimatedNumber value={n.value} />
                          {n.suffix && <span className="ml-1 text-[0.42em]">{n.suffix}</span>}
                        </p>
                        <p className="mt-4 text-[10px] uppercase leading-relaxed tracking-[0.2em] text-[#f4eef7]/60 md:text-[11px]">
                          {n.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </Reveal>
              </div>
            </div>

            <div className="mx-auto mt-20 grid max-w-5xl grid-cols-2 items-start gap-3 md:mt-32 md:gap-8">
              <Reveal>
                <img
                  src={fotoCantando}
                  alt="Giselli Cristina e Nicolas Henrique cantando juntos, ele ao violão"
                  loading="lazy"
                  decoding="async"
                  className="aspect-square w-full rounded-2xl object-cover shadow-[0_0_0_1px_rgba(244,238,247,0.1)]"
                />
              </Reveal>
              <Reveal delay={0.12} className="mt-10 md:mt-20">
                <img
                  src={fotoViolao}
                  alt="Mãe e filho cantando lado a lado, Nicolas Henrique com o violão"
                  loading="lazy"
                  decoding="async"
                  className="aspect-square w-full rounded-2xl object-cover shadow-[0_0_0_1px_rgba(244,238,247,0.1)]"
                />
              </Reveal>
            </div>

            <Reveal className="mb-12 mt-24 text-center md:mb-16 md:mt-40">
              <span className="text-[11px] uppercase tracking-[0.4em] text-[#f4eef7]/50">Juntos na música</span>
              <h2 className="mt-4 font-display text-3xl leading-[1.15] text-[#f4eef7] sm:text-4xl md:text-5xl">
                Três registros, <span className="italic text-[#d954d1]">uma só família</span>
              </h2>
            </Reveal>

            <Songs />

            <Reveal className="mt-24 text-center md:mt-36">
              <p className="font-serif text-2xl italic text-[#f4eef7]/80 md:text-3xl">Ouça a dupla, do começo ao fim.</p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link
                  to="/#musicas"
                  className="group inline-flex items-center gap-3 rounded-full bg-[#d954d1] py-3.5 pl-7 pr-5 text-[11px] uppercase tracking-[0.3em] text-white shadow-[0_0_34px_-8px_rgba(217,84,209,0.8)] transition hover:brightness-110"
                >
                  Ouvir as músicas
                  <FiArrowUpRight
                    className="text-base transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
                <Link
                  to="/#videos"
                  className="inline-flex items-center rounded-full border border-[#f4eef7]/25 px-7 py-3.5 text-[11px] uppercase tracking-[0.3em] text-[#f4eef7]/85 transition hover:border-[#f4eef7]/60 hover:text-[#f4eef7]"
                >
                  Ver os vídeos
                </Link>
              </div>
              <BackLink className="group mt-10 inline-flex items-center gap-2.5 text-[11px] uppercase tracking-[0.3em] text-[#f4eef7]/60 transition hover:text-[#f4eef7]">
                <FiArrowLeft className="transition-transform group-hover:-translate-x-1" aria-hidden="true" />
                Voltar ao site
              </BackLink>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </motion.div>
  )
}
