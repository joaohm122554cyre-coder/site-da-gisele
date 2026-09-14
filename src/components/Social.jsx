import { socials, streaming } from '../lib/site-data'

function Pill({ label, url }) {
  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="px-5 py-2 rounded-full border border-pink-100/30 text-pink-100/90 text-xs md:text-sm hover:bg-pink-200 hover:text-[#2a0e22] transition-colors"
      >
        {label}
      </a>
    )
  }
  return (
    <span className="px-5 py-2 rounded-full border border-pink-100/10 text-pink-100/40 text-xs md:text-sm">
      {label}
    </span>
  )
}

export default function Social() {
  return (
    <section id="redes" className="relative py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
        <h2 className="font-display text-4xl md:text-5xl text-white mb-4">
          Redes e Plataformas
        </h2>
        <p className="text-sm md:text-base text-pink-50/70 max-w-md mx-auto mb-12">
          Siga e ouça Giselli Cristina nos canais oficiais.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {socials.map((s) => (
            <Pill key={s.name} label={s.handle ?? s.name} url={s.url} />
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {streaming.map((s) => (
            <Pill key={s.name} label={s.name} url={s.url} />
          ))}
        </div>
      </div>
    </section>
  )
}
