import { motion } from 'framer-motion'
import photo from '../assets/photos/retrato-jardim.webp'
import { about } from '../lib/site-data'
import Reveal from './Reveal'

const BADGE_RADIUS = 82
const BADGE_CIRCUMFERENCE = 2 * Math.PI * BADGE_RADIUS

function CareerBadge() {
  return (
    <div className="relative w-28 h-28 md:w-36 md:h-36 shrink-0">
      <motion.svg
        viewBox="0 0 200 200"
        className="absolute inset-0 w-full h-full text-[#f4eef7]/70"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      >
        <defs>
          <path
            id="badgeCircle"
            d={`M 100,100 m -${BADGE_RADIUS},0 a ${BADGE_RADIUS},${BADGE_RADIUS} 0 1,1 ${BADGE_RADIUS * 2},0 a ${BADGE_RADIUS},${BADGE_RADIUS} 0 1,1 -${BADGE_RADIUS * 2},0`}
          />
        </defs>
        <circle cx="100" cy="100" r="96" fill="none" stroke="currentColor" strokeWidth="0.75" opacity="0.4" />
        <text fontSize="10" fill="currentColor">
          <textPath
            href="#badgeCircle"
            startOffset="0%"
            textLength={BADGE_CIRCUMFERENCE}
            lengthAdjust="spacingAndGlyphs"
          >
            ✦ ANOS DE CARREIRA ✦ TRAJETÓRIA GOSPEL
          </textPath>
        </text>
      </motion.svg>
      <div className="absolute inset-[20%] rounded-full bg-[#fdf3f8]/95 backdrop-blur-sm border border-[#d954d1]/30 flex flex-col items-center justify-center">
        <p className="font-display text-2xl md:text-3xl text-[#1c1638] leading-none">29</p>
        <p className="mt-1 text-[7px] md:text-[8px] tracking-[0.15em] uppercase text-[#1c1638]/55 text-center leading-tight">
          Anos de
          <br />
          carreira
        </p>
      </div>
    </div>
  )
}

export default function About() {
  return (
    <section id="sobre" className="relative py-28 md:py-40">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-12 gap-10 md:gap-6 items-start">
          <div className="md:col-span-5">
            <Reveal>
              <span className="font-script text-4xl md:text-5xl text-[#d954d1] leading-none">
                Sobre
              </span>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#f4eef7] mt-3 leading-[1.05]">
                Uma voz que
                <br />
                atravessa
                <br />
                <span className="italic text-[#d954d1]">gerações</span>
              </h2>
            </Reveal>
          </div>

          <div className="md:col-span-2 hidden md:block" />

          <div className="md:col-span-5">
            <Reveal delay={0.15} className="relative">
              <img
                src={photo}
                alt="Giselli Cristina"
                className="w-full object-cover aspect-[4/5] grayscale-[10%]"
              />
              <div className="absolute -bottom-8 -left-8 md:-bottom-10 md:-left-10 hidden md:block">
                <CareerBadge />
              </div>
            </Reveal>
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-6 mt-20 md:mt-28">
          <div className="md:col-span-7 md:col-start-6 space-y-7 font-serif text-lg md:text-xl text-[#f4eef7]/75 leading-relaxed">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className={i === 0 ? 'drop-cap' : ''}>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
