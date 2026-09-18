import photo from '../assets/photos/palco-microfone-1.png'
import { songs } from '../lib/site-data'
import Reveal from './Reveal'

const hits = ['Meu Barquinho', 'Eu Só Quero Adorar', 'Bondade de Deus']

function Row({ list, reverse, duration, band, rotate, z, hitColor, faded }) {
  const hitClass =
    hitColor === 'blue'
      ? 'font-script text-5xl md:text-7xl text-[#bcd2fb] hover:text-white pulse-glow-blue'
      : 'font-script text-5xl md:text-7xl text-[#f9c8f5] hover:text-white pulse-glow-pink'

  return (
    <div
      className={`relative w-[160%] -ml-[30%] py-10 md:py-14 backdrop-blur-md ${band} ${faded ? 'opacity-60' : ''}`}
      style={{
        transform: `rotate(${rotate}deg)`,
        zIndex: z,
        maskImage:
          'linear-gradient(to right, transparent, black 18%, black 82%, transparent)',
      }}
    >
      <div className="overflow-hidden">
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
                      ? hitClass
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

      <div className="relative mt-24 md:mt-32 mb-8 py-16 overflow-hidden">
        <Row
          list={songs}
          duration={34}
          band="bg-gradient-to-r from-[#5c1a52]/25 via-[#7a2468]/25 to-[#4a1444]/25"
          rotate={-1.5}
          z={0}
          hitColor="pink"
          faded
        />
        <div className="h-4 md:h-6" />
        <Row
          list={[...songs].reverse()}
          reverse
          duration={40}
          band="bg-gradient-to-r from-[#141a42]/50 via-[#1f2c66]/50 to-[#121738]/50"
          rotate={1.5}
          z={10}
          hitColor="blue"
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
          0%, 100% { transform: translateY(2px); }
          50% { transform: translateY(-4px); }
        }
        .pulse-glow-pink {
          animation: glow-pulse-pink 2.4s ease-in-out infinite;
        }
        @keyframes glow-pulse-pink {
          0%, 100% { text-shadow: 0 0 10px rgba(217,84,209,0.35), 0 0 2px rgba(217,84,209,0.5); }
          50% { text-shadow: 0 0 28px rgba(217,84,209,0.9), 0 0 8px rgba(217,84,209,0.8); }
        }
        .pulse-glow-blue {
          animation: glow-pulse-blue 2.4s ease-in-out infinite;
        }
        @keyframes glow-pulse-blue {
          0%, 100% { text-shadow: 0 0 10px rgba(79,127,214,0.35), 0 0 2px rgba(79,127,214,0.5); }
          50% { text-shadow: 0 0 28px rgba(79,127,214,0.9), 0 0 8px rgba(79,127,214,0.8); }
        }
      `}</style>
    </section>
  )
}
