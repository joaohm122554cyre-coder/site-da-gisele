import bg from '../assets/photos/cena-videoclipe.jpeg'
import { hire } from '../lib/site-data'

export default function Hire() {
  return (
    <section id="contrate" className="relative py-24 md:py-32">
      <div className="absolute inset-0">
        <img src={bg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0710] via-[#0c0710]/90 to-[#0c0710]/70" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-12 text-center">
        <h2 className="font-display text-4xl md:text-5xl text-white mb-6">
          {hire.title}
        </h2>
        <p className="text-sm md:text-base text-pink-50/80 max-w-md mx-auto">
          {hire.description}
        </p>

        {hire.whatsapp || hire.email ? (
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {hire.whatsapp && (
              <a
                href={`https://wa.me/${hire.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="px-8 py-3 rounded-full bg-pink-200 text-[#2a0e22] text-sm uppercase tracking-widest hover:bg-pink-100 transition-colors"
              >
                Falar no WhatsApp
              </a>
            )}
            {hire.email && (
              <a
                href={`mailto:${hire.email}`}
                className="px-8 py-3 rounded-full border border-pink-200/60 text-pink-100 text-sm uppercase tracking-widest hover:bg-pink-200 hover:text-[#2a0e22] transition-colors"
              >
                Enviar e-mail
              </a>
            )}
          </div>
        ) : (
          <p className="mt-10 text-xs uppercase tracking-widest text-pink-100/50">
            Canal oficial de contratação em breve
          </p>
        )}
      </div>
    </section>
  )
}
