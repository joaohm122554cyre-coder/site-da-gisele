import { FiArrowRight, FiAward } from 'react-icons/fi'
import photoGold from '../assets/photos/giselli-nicolas-disco-ouro.webp'
import { goldRecord } from '../lib/site-data'
import Reveal from './Reveal'
import Link from './Link'

export default function GoldRecord() {
  return (
    <section className="relative py-20 md:py-32">
      <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
        <Reveal>
          <span className="font-script text-4xl md:text-5xl text-[#d954d1] leading-none">
            Conquista
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#f4eef7] mt-3 leading-[1.05]">
            Um <span className="italic text-[#d954d1]">Disco de Ouro</span> em família
          </h2>
        </Reveal>
      </div>

      <Reveal delay={0.1} className="mt-12 md:mt-16 max-w-sm mx-auto px-6">
        <img
          src={photoGold}
          alt="Giselli Cristina e Nicolas Henrique com o Disco de Ouro de Eu Só Quero Adorar"
          loading="lazy"
          decoding="async"
          className="w-full rounded-2xl object-cover shadow-[0_0_0_1px_rgba(244,238,247,0.1)]"
        />
      </Reveal>

      <Reveal delay={0.18} className="mt-10 flex justify-center px-6">
        <Link
          to="/disco-de-ouro"
          id="conheca-disco-ouro"
          returnTo="conheca-disco-ouro"
          className="group inline-flex items-center gap-4 rounded-full border border-[#d954d1]/45 bg-[#d954d1]/10 py-2 pl-2 pr-3 backdrop-blur-sm transition-all duration-500 hover:border-[#d954d1] hover:bg-[#d954d1]/20 hover:shadow-[0_0_40px_-8px_rgba(217,84,209,0.7)]"
        >
          <span className="grid h-11 w-11 place-items-center rounded-full bg-[#d954d1]/15 text-[#d954d1]">
            <FiAward className="text-lg" aria-hidden="true" />
          </span>
          <span className="flex flex-col text-left leading-tight">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#f4eef7]/55">
              {goldRecord.eyebrow}
            </span>
            <span className="mt-1 font-display text-lg italic text-[#f4eef7] md:text-xl">
              {goldRecord.ctaLabel}
            </span>
          </span>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-[#d954d1] text-white transition-transform duration-500 group-hover:translate-x-1">
            <FiArrowRight aria-hidden="true" />
          </span>
        </Link>
      </Reveal>
    </section>
  )
}
