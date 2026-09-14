import bg from '../assets/photos/cena-videoclipe.jpeg'
import { contact, streaming } from '../lib/site-data'

export default function Contact() {
  return (
    <section id="contato" className="relative py-24 md:py-32">
      <div className="absolute inset-0">
        <img src={bg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0710] via-[#0c0710]/90 to-[#0c0710]/70" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-12 text-center">
        <p className="font-display italic text-lg text-pink-200/80">Contato para</p>
        <h2 className="font-display text-3xl md:text-5xl text-white mb-10 uppercase">
          Imprensa, Entrevista e Eventos
        </h2>

        <div className="space-y-3 text-pink-50/90 text-sm md:text-base">
          <p>Assessoria: {contact.label}</p>
          <p>Instagram: {contact.instagram}</p>
          <p>YouTube: {contact.youtube}</p>
        </div>

        <div className="mt-12">
          <p className="text-xs uppercase tracking-[0.2em] text-pink-100/60 mb-4">
            Ouça Giselli Cristina
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {streaming.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2 rounded-full border border-pink-100/30 text-pink-100/90 text-xs md:text-sm hover:bg-pink-200 hover:text-[#2a0e22] transition-colors"
              >
                {s.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
