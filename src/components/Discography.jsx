import photo from '../assets/photos/palco-microfone-1.png'
import { songs } from '../lib/site-data'
import Reveal from './Reveal'

const hits = ['Meu Barquinho', 'Eu Só Quero Adorar', 'Bondade de Deus']

function Row({ list, reverse, duration, hitColor }) {
  const hitClass =
    hitColor === 'blue'
      ? 'font-script text-2xl md:text-4xl text-[#bcd2fb] hover:text-white pulse-glow-blue'
      : 'font-script text-2xl md:text-4xl text-[#f9c8f5] hover:text-white pulse-glow-pink'

  return (
    <div
      className="overflow-hidden py-2"
      style={{
        maskImage:
          'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
      }}
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
                className={`group mx-4 md:mx-6 transition-colors duration-300 ${
                  isHit
                    ? hitClass
                    : 'font-display italic text-base md:text-xl text-[#f4eef7]/55 hover:text-[#f4eef7]/95'
                }`}
              >
                {song}
              </span>
              <span className="text-[#f4eef7]/45 text-sm md:text-lg align-middle">&#9835;</span>
            </span>
          )
        })}
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

      <div className="mt-20 md:mt-28 space-y-1">
        <Row list={songs} duration={34} hitColor="pink" />
        <Row list={[...songs].reverse()} reverse duration={40} hitColor="blue" />
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
