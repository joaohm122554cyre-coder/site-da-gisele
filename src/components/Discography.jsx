import photo from '../assets/photos/palco-microfone-1.png'
import { songs } from '../lib/site-data'
import Reveal from './Reveal'

export default function Discography() {
  return (
    <section id="musicas" className="relative py-28 md:py-40 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-12 gap-10 items-end">
          <div className="md:col-span-6">
            <Reveal>
              <span className="text-[11px] tracking-[0.4em] uppercase text-[#1a2140]/50">
                Discografia
              </span>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#1a2140] mt-4 leading-[1.05]">
                Sucessos que
                <br />
                marcaram
                <br />
                <span className="italic text-[#d1548f]">gerações</span>
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

      <div className="mt-20 md:mt-28 border-y border-[#a9a0d8] py-3">
        <div className="flex whitespace-nowrap animate-[marquee_38s_linear_infinite] hover:[animation-play-state:paused]">
          {[...songs, ...songs].map((song, i) => (
            <span
              key={i}
              className="font-display italic text-3xl md:text-5xl text-[#1a2140]/35 mx-6 md:mx-10 shrink-0"
            >
              {song} <span className="text-[#1a2140]/20 not-italic">&middot;</span>
            </span>
          ))}
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
