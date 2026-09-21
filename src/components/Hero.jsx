import { motion } from 'framer-motion'
import { artist } from '../lib/site-data'

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[720px] flex items-end overflow-x-clip">
      <div
        className="absolute inset-x-0 top-0 h-[130%] pointer-events-none"
        style={{
          maskImage: 'linear-gradient(to bottom, black 0%, black 77%, transparent 100%)',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, transparent 0%, rgba(28,22,56,0.12) 40%, rgba(20,18,42,0.5) 70%, rgba(20,18,42,0.42) 77%, transparent 100%)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#14122a]/50 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 w-full pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.4 }}
            className="text-[11px] md:text-xs tracking-[0.4em] uppercase text-white/80 mb-6 [text-shadow:0_1px_14px_rgba(10,8,25,0.85)]"
          >
            Cantora &middot; Compositora &middot; {artist.label}
          </motion.p>

          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, delay: 1.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[16vw] md:text-[9rem] lg:text-[10.5rem] leading-[0.82] text-white tracking-tight"
            >
              Giselli
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, delay: 2.05, ease: [0.16, 1, 0.3, 1] }}
              className="font-display italic text-[16vw] md:text-[9rem] lg:text-[10.5rem] leading-[0.82] text-transparent [-webkit-text-stroke:1px_#d954d1] md:[-webkit-text-stroke:1.5px_#d954d1]"
            >
              Cristina
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.6 }}
            className="mt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
          >
            <p className="max-w-sm text-sm md:text-base text-white/90 leading-relaxed [text-shadow:0_1px_14px_rgba(10,8,25,0.85)]">
              {artist.tagline}. Quase 30 anos construindo a trilha sonora da
              fé de milhões de brasileiros.
            </p>
            <a
              href="#sobre"
              className="group inline-flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase text-white/90 hover:text-white transition-colors [text-shadow:0_1px_14px_rgba(10,8,25,0.85)]"
            >
              A história
              <span className="w-10 h-px bg-[#4f7fd6] group-hover:w-16 transition-all duration-500" />
            </a>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 3.2 }}
        className="absolute bottom-8 inset-x-0 z-10 flex justify-center"
      >
        <motion.a
          href="#sobre"
          aria-label="Rolar para baixo"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="text-white/60 hover:text-white transition-colors"
        >
          <svg width="20" height="28" viewBox="0 0 20 28" fill="none">
            <path
              d="M10 1v22M10 23l-6-6M10 23l6-6"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.a>
      </motion.div>
    </section>
  )
}
