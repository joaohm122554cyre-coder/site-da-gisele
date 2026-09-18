import photo from '../assets/photos/palco-microfone-1.png'
import { songs } from '../lib/site-data'
import Reveal from './Reveal'

const hits = ['Meu Barquinho', 'Eu Só Quero Adorar', 'Bondade de Deus']

function Row({ list, reverse, duration, band, rotate, z }) {
  return (
    <div
      className={`relative w-[130%] -ml-[15%] py-5 md:py-7 shadow-2xl shadow-black/50 ${band}`}
      style={{ transform: `rotate(${rotate}deg)`, zIndex: z }}
    >
      <div
        className="overflow-hidden"
        style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
      >
        <div
          className="flex whitespace-nowrap hover:[animation-play-state:paused]"
          style={{
            animation: `${reverse ? 'marquee-reverse' : 'marquee'} ${duration}s linear infinite`,
          }}
        >
          {[...list, ...list].map((song, i) => {
            const isHit = hits.includes(song)
            return (
              <span
                key={i}
                className="inline-block shrink-0"
                style={{
                  animation: `float 3.4s ease-in-out infinite`,
                  animationDelay: `${(i % list.length) * 0.18}s`,
                }}
              >
                <span
                  className={`group mx-5 md:mx-8 transition-colors duration-300 ${
                    isHit
                      ? 'font-script text-5xl md:text-7xl text-[#f9c8f5] hover:text-white pulse-glow'
                      : 'font-display italic text-xl md:text-3xl text-[#f4eef7]/55 hover:text-[#f4eef7]/95'
                  }`}
                >
                  {song}
                </span>
                <span className="text-[#f4eef7]/45 text-lg md:text-2xl align-middle">&#9835;</span>
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )
}

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

      <div className="relative mt-24 md:mt-32 mb-8 py-10 overflow-hidden">
        <Row
          list={songs}
          duration={34}
          band="bg-gradient-to-r from-[#5c1a52] via-[#7a2468] to-[#4a1444]"
          rotate={-3}
          z={0}
        />
        <div className="h-3 md:h-5" />
        <Row
          list={[...songs].reverse()}
          reverse
          duration={40}
          band="bg-gradient-to-r from-[#141a42] via-[#1f2c66] to-[#121738]"
          rotate={2}
          z={10}
        />
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .pulse-glow {
          animation: glow-pulse 2.4s ease-in-out infinite;
        }
        @keyframes glow-pulse {
          0%, 100% { text-shadow: 0 0 10px rgba(217,84,209,0.35), 0 0 2px rgba(217,84,209,0.5); }
          50% { text-shadow: 0 0 28px rgba(217,84,209,0.9), 0 0 8px rgba(217,84,209,0.8); }
        }
      `}</style>
    </section>
  )
}
