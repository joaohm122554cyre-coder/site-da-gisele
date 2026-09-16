import { motion } from 'framer-motion'
import heroVideo from '../assets/videos/hero-bg.mp4'
import heroImg from '../assets/photos/hero-glamour.png'
import { artist } from '../lib/site-data'

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[720px] flex items-end overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <video
          src={heroVideo}
          poster={heroImg}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-[65%_top] grayscale-[15%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#3a1030] via-[#3a1030]/15 to-[#ffc7e6]/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#3a1030]/70 via-transparent to-transparent" />
      </motion.div>

      <div className="relative z-10 w-full pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.4 }}
            className="text-[11px] md:text-xs tracking-[0.4em] uppercase text-white/70 mb-6"
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
              className="font-display italic text-[16vw] md:text-[9rem] lg:text-[10.5rem] leading-[0.82] text-transparent [-webkit-text-stroke:1px_#d1548f] md:[-webkit-text-stroke:1.5px_#d1548f]"
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
            <p className="max-w-sm text-sm md:text-base text-white/80 leading-relaxed">
              {artist.tagline}. Quase 30 anos construindo a trilha sonora da
              fé de milhões de brasileiros.
            </p>
            <a
              href="#sobre"
              className="group inline-flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase text-white/90 hover:text-white transition-colors"
            >
              A história
              <span className="w-10 h-px bg-[#d1548f] group-hover:w-16 transition-all duration-500" />
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
