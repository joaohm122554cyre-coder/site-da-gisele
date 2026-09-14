import heroImg from '../assets/photos/hero-glamour.png'
import { artist } from '../lib/site-data'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt={artist.name}
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c0710] via-[#0c0710]/70 to-[#3a1030]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0710] via-transparent to-[#0c0710]/40" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 w-full">
        <p className="font-display italic text-xl md:text-2xl text-pink-200/90 mb-2">
          Mídia Kit
        </p>
        <h1 className="font-display text-6xl sm:text-7xl md:text-8xl leading-[0.95] text-white tracking-tight">
          GISELLI
          <br />
          CRISTINA
        </h1>
        <p className="mt-6 max-w-md text-sm md:text-base text-pink-100/80 uppercase tracking-[0.2em]">
          {artist.tagline}
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#redes"
            className="inline-block px-8 py-3 rounded-full bg-pink-200 text-[#2a0e22] text-sm uppercase tracking-widest hover:bg-pink-100 transition-colors"
          >
            Ouça agora
          </a>
          <a
            href="#contrate"
            className="inline-block px-8 py-3 rounded-full border border-pink-200/60 text-pink-100 text-sm uppercase tracking-widest hover:bg-pink-200 hover:text-[#2a0e22] transition-colors"
          >
            Contrate
          </a>
        </div>
      </div>
    </section>
  )
}
