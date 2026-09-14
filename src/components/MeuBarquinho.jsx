import photo from '../assets/photos/retrato-jardim.png'
import { meuBarquinho } from '../lib/site-data'

export default function MeuBarquinho() {
  return (
    <section id="meu-barquinho" className="relative py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center">
        <img
          src={photo}
          alt={meuBarquinho.title}
          className="rounded-lg w-full max-w-md mx-auto object-cover shadow-2xl shadow-pink-950/40"
        />
        <div>
          <p className="font-display italic text-lg text-pink-200/80">O clássico</p>
          <h2 className="font-display text-4xl md:text-5xl text-white mb-6">
            {meuBarquinho.title}
          </h2>
          <p className="text-sm md:text-base text-pink-50/80 leading-relaxed max-w-md">
            {meuBarquinho.description}
          </p>
          {meuBarquinho.url ? (
            <a
              href={meuBarquinho.url}
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-8 px-8 py-3 rounded-full bg-pink-200 text-[#2a0e22] text-sm uppercase tracking-widest hover:bg-pink-100 transition-colors"
            >
              Ouvir agora
            </a>
          ) : (
            <p className="mt-8 text-xs uppercase tracking-widest text-pink-100/50">
              Link para ouvir em breve
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
