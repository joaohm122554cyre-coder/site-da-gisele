import Reveal from './Reveal'

const upcoming = []

export default function Agenda() {
  return (
    <section id="agenda" className="relative py-28 md:py-40 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <Reveal>
          <span className="text-[11px] tracking-[0.4em] uppercase text-[#f4eef7]/50">
            Agenda
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#f4eef7] mt-4">
            Próximos <span className="italic text-[#4f7fd6]">shows</span>
          </h2>
        </Reveal>

        {upcoming.length === 0 ? (
          <Reveal delay={0.15}>
            <p className="mt-10 text-sm md:text-base text-[#f4eef7]/55 max-w-md">
              Novas datas em breve. Para contratação de shows e eventos,
              entre em contato com a assessoria.
            </p>
            <a
              href="#contato"
              className="group inline-flex items-center gap-3 mt-10 text-[11px] tracking-[0.3em] uppercase text-[#f4eef7]/75 hover:text-[#f4eef7] transition-colors"
            >
              Falar com a assessoria
              <span className="w-10 h-px bg-[#4f7fd6] group-hover:w-16 transition-all duration-500" />
            </a>
          </Reveal>
        ) : (
          <ul className="mt-14 divide-y divide-[#a9a0d8] max-w-2xl">
            {upcoming.map((ev, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <li className="flex justify-between py-5 text-[#f4eef7]/75 text-sm md:text-base">
                  <span>{ev.date}</span>
                  <span>{ev.city}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
