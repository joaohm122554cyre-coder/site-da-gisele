import photo from '../assets/photos/palco-microfone-1.png'
import { songs } from '../lib/site-data'
import Reveal from './Reveal'

const hits = ['Meu Barquinho', 'Eu Só Quero Adorar', 'Bondade de Deus']

export default function Discography() {
  return (
    <section id="musicas" className="relative py-28 md:py-40 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-12 gap-10 items-end">
          <div className="md:col-span-6">
            <Reveal>
              <span className="text-[11px] tracking-[0.4em] uppercase text-[#f4eef7]/50">
                Discografia
              </span>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#f4eef7] mt-4 leading-[1.05]">
                Sucessos que
                <br />
                marcaram
                <br />
                <span className="italic text-[#d954d1]">gerações</span>
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-6">
            <Reveal delay={0.15}>
              <img
                src={photo}
                alt="Giselli Cristina no palco"
                className="w-full aspect-[16/11] object-cover grayscale-[10%]"
              />
            </Reveal>
          </div>
        </div>
      </div>

      <div
        className="mt-20 md:mt-28 py-6"
        style={{ maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)' }}
      >
        <div className="flex whitespace-nowrap animate-[marquee_38s_linear_infinite] hover:[animation-play-state:paused]">
          {[...songs, ...songs].map((song, i) => {
            const isHit = hits.includes(song)
            return (
              <span
                key={i}
                className={`group mx-6 md:mx-10 shrink-0 transition-colors duration-300 ${
                  isHit
                    ? 'font-display italic font-semibold text-4xl md:text-6xl text-[#d954d1] hover:text-[#f4eef7]'
                    : 'font-display italic text-2xl md:text-4xl text-[#f4eef7]/45 hover:text-[#f4eef7]/90'
                }`}
              >
                {song}{' '}
                <span className="text-[#f4eef7]/25 not-italic text-xl md:text-2xl align-middle">
                  &middot;
                </span>
              </span>
            )
          })}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}
