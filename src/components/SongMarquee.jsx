import { songs } from '../lib/site-data'
import Marquee from './Marquee'

const pinkClass =
  'font-script text-2xl md:text-4xl text-[#f9c8f5] hover:text-white pulse-glow-pink'
const blueClass =
  'font-script text-2xl md:text-4xl text-[#bcd2fb] hover:text-white pulse-glow-blue'

function Row({ list, reverse, duration, startColor }) {
  // Com quantidade impar de musicas a alternancia rosa/azul quebraria na emenda; duplicar mantem o padrao.
  const items = list.length % 2 === 0 ? list : [...list, ...list]

  return (
    <Marquee
      reverse={reverse}
      duration={duration * (items.length / list.length)}
      pauseOnHover
      className="py-2"
      style={{
        maskImage:
          'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
      }}
    >
      {items.map((song, i) => {
        const isPink = (i + (startColor === 'blue' ? 1 : 0)) % 2 === 0
        return (
          <span
            key={i}
            className="inline-block shrink-0"
            style={{
              animation: `float 3.4s ease-in-out infinite`,
              animationDelay: `${(i % list.length) * 0.18}s`,
            }}
          >
            <span className={`group mx-4 md:mx-6 transition-colors duration-300 ${isPink ? pinkClass : blueClass}`}>
              {song}
            </span>
            <span className="text-[#f4eef7]/45 text-sm md:text-lg align-middle">&#9835;</span>
          </span>
        )
      })}
    </Marquee>
  )
}

export default function SongMarquee() {
  return (
    <div className="relative py-6 md:py-10 space-y-1">
      <Row list={songs} duration={34} startColor="pink" />
      <Row list={[...songs].reverse()} reverse duration={40} startColor="blue" />

      <style>{`
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
    </div>
  )
}
