import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiArrowLeft, FiArrowUpRight } from 'react-icons/fi'
import Reveal from './Reveal'
import AnimatedNumber from './AnimatedNumber'
import Footer from './Footer'
import Link from './Link'
import { goBack, isPlainClick } from '../lib/router'
import logo from '../assets/logo/gc-monograma.png'
import photoGold from '../assets/photos/giselli-nicolas-disco-ouro.webp'
import { goldRecord } from '../lib/site-data'

const BACK_TO = '/#conheca-disco-ouro'
const goBackToSite = () => goBack(BACK_TO, { block: 'center' })

const MARKUP = /(\*\*[^*]+\*\*|\[[^\]]+\])/g

function Rich({ text }) {
  return text.split(MARKUP).map((part, i) => {
    if (part.startsWith('**')) {
      return (
        <strong
          key={i}
          className="px-[0.1em] font-semibold text-white [-webkit-box-decoration-break:clone] [background:linear-gradient(transparent_62%,rgba(217,84,209,0.42)_62%,rgba(217,84,209,0.42)_94%,transparent_94%)] [box-decoration-break:clone]"
        >
          {part.slice(2, -2)}
        </strong>
      )
    }
    if (part.startsWith('[')) {
      return (
        <em key={i} className="font-display text-[1.1em] italic text-[#f2a8ee] [text-shadow:0_0_22px_rgba(217,84,209,0.55)]">
          {part.slice(1, -1)}
        </em>
      )
    }
    return part
  })
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

function TopBar() {
  return (
    <nav
      aria-label="Navegação"
      className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-center justify-between px-4 pb-4 pt-[calc(1rem+env(safe-area-inset-top))] md:px-10 md:py-6"
    >
      <BackLink className="pointer-events-auto group inline-flex items-center gap-2.5 rounded-full border border-[#f4eef7]/20 bg-[#14122a]/55 py-2.5 pl-3.5 pr-5 text-[10px] uppercase tracking-[0.28em] text-[#f4eef7]/90 backdrop-blur-md transition hover:border-[#d954d1]/60 hover:bg-[#14122a]/75">
        <FiArrowLeft className="text-sm transition-transform group-hover:-translate-x-1" aria-hidden="true" />
        Voltar ao site
      </BackLink>
      <Link
        to="/"
        aria-label="Giselli Cristina — página inicial"
        className="pointer-events-auto rounded-full bg-[#14122a]/45 p-2 backdrop-blur-md"
      >
        <img
          src={logo}
          alt="GC"
          className="w-8 opacity-90 drop-shadow-[0_0_10px_rgba(217,84,209,0.35)] transition hover:opacity-100 md:w-9"
        />
      </Link>
    </nav>
  )
}

function PageHero() {
  return (
    <header className="relative md:flex md:min-h-[560px] md:items-end md:overflow-hidden">
      <div className="relative aspect-[4/5] overflow-hidden [-webkit-mask-image:linear-gradient(to_bottom,#000_50%,transparent_100%)] [mask-image:linear-gradient(to_bottom,#000_50%,transparent_100%)] md:absolute md:inset-0 md:aspect-auto md:[-webkit-mask-image:linear-gradient(to_bottom,#000_60%,transparent_100%)] md:[mask-image:linear-gradient(to_bottom,#000_60%,transparent_100%)]">
        <motion.img
          src={photoGold}
          alt="Giselli Cristina e Nicolas Henrique recebendo o Disco de Ouro de Eu Só Quero Adorar"
          decoding="async"
          fetchPriority="high"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 h-full w-full object-cover object-[50%_28%]"
        />
      </div>

      <div className="relative z-10 -mt-40 w-full px-6 pb-12 text-center md:mt-0 md:px-16 md:pb-20 md:text-left">
        <motion.span
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="block font-script text-5xl leading-none text-[#f08de8] [text-shadow:0_2px_30px_rgba(20,18,42,0.9)] md:text-7xl"
        >
          Disco de Ouro
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-3 font-display text-[2.75rem] leading-[1.05] text-[#f4eef7] [text-shadow:0_2px_40px_rgba(20,18,42,0.9)] sm:text-6xl md:text-[clamp(2.75rem,5.4vw,5.75rem)]"
        >
          Eu Só Quero
          <br />
          <span className="italic text-[#d954d1]">Adorar</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-5 max-w-xl text-balance font-fraunces text-[1.15rem] italic leading-snug text-[#f4eef7]/95 [text-shadow:0_2px_24px_rgba(20,18,42,0.9)] md:mx-0 md:text-2xl md:leading-relaxed"
        >
          A canção que Giselli gravou com o filho, Nicolas Henrique, e que virou ouro.
        </motion.p>
      </div>
    </header>
  )
}

const stats = [
  { value: Math.floor(goldRecord.views / 1e6), suffix: 'mi+', label: 'visualizações no clipe oficial', tone: 'stat-pink' },
  { value: 1, label: 'Disco de Ouro', tone: 'stat-blue' },
  { value: 2, label: 'vozes, mãe e filho', tone: 'stat-pink' },
]

export default function GoldRecordPage() {
  useEffect(() => {
    const previous = document.title
    document.title = 'Disco de Ouro | Giselli Cristina'
    return () => {
      document.title = previous
    }
  }, [])

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="relative">
      <TopBar />

      <main>
        <PageHero />

        <section className="relative py-24 md:py-36">
          <div className="mx-auto max-w-2xl px-6 md:px-12">
            <div className="space-y-6">
              {goldRecord.paragraphs.map((p, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <p
                    className={`font-fraunces text-[1.0625rem] leading-[1.8] text-[#f4eef7]/95 [text-shadow:0_1px_14px_rgba(20,18,42,0.85)] md:text-[1.2rem] ${
                      i === 0 ? 'drop-cap' : ''
                    }`}
                  >
                    <Rich text={p} />
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1}>
              <div className="mt-14 grid grid-cols-3 gap-4 border-t border-[#f4eef7]/10 pt-8 md:gap-8">
                {stats.map((s) => (
                  <div key={s.label}>
                    <p
                      translate="no"
                      className={`notranslate font-display text-4xl italic font-semibold leading-none lining-nums md:text-6xl ${s.tone}`}
                    >
                      <AnimatedNumber value={s.value} />
                      {s.suffix && <span className="ml-1 text-[0.42em]">{s.suffix}</span>}
                    </p>
                    <p className="mt-4 text-[11px] uppercase leading-relaxed tracking-[0.12em] text-[#f4eef7]/80 md:text-xs md:tracking-[0.18em]">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal className="mt-24 text-center md:mt-36">
            <p className="font-fraunces text-2xl italic text-[#f4eef7]/95 md:text-3xl">Ouça a canção que virou ouro.</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/#musicas"
                className="group inline-flex items-center gap-3 rounded-full bg-[#d954d1] py-3.5 pl-7 pr-5 text-[11px] uppercase tracking-[0.3em] text-white shadow-[0_0_34px_-8px_rgba(217,84,209,0.8)] transition hover:brightness-110"
              >
                Ouvir a música
                <FiArrowUpRight
                  className="text-base transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
              <Link
                to="/dupla"
                className="inline-flex items-center rounded-full border border-[#f4eef7]/25 px-7 py-3.5 text-[11px] uppercase tracking-[0.3em] text-[#f4eef7]/85 transition hover:border-[#f4eef7]/60 hover:text-[#f4eef7]"
              >
                Conheça a dupla
              </Link>
            </div>
            <BackLink className="group mt-10 inline-flex items-center gap-2.5 text-[11px] uppercase tracking-[0.3em] text-[#f4eef7]/80 transition hover:text-[#f4eef7]">
              <FiArrowLeft className="transition-transform group-hover:-translate-x-1" aria-hidden="true" />
              Voltar ao site
            </BackLink>
          </Reveal>
        </section>
      </main>

      <Footer />
    </motion.div>
  )
}
