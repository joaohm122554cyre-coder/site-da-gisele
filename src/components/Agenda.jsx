const upcoming = []

export default function Agenda() {
  return (
    <section id="agenda" className="relative py-24 md:py-32 bg-[#120a14]">
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
        <h2 className="font-display text-4xl md:text-5xl text-white mb-6">
          Agenda de <span className="italic text-pink-300">Shows</span>
        </h2>
        {upcoming.length === 0 ? (
          <p className="text-pink-50/70 text-sm md:text-base max-w-md mx-auto">
            Novas datas em breve. Para contratação de shows e eventos, entre
            em contato com a assessoria.
          </p>
        ) : (
          <ul className="mt-10 space-y-4 text-left max-w-lg mx-auto">
            {upcoming.map((ev, i) => (
              <li
                key={i}
                className="flex justify-between border-b border-pink-100/10 pb-3 text-pink-100/90 text-sm md:text-base"
              >
                <span>{ev.date}</span>
                <span>{ev.city}</span>
              </li>
            ))}
          </ul>
        )}
        <a
          href="#contato"
          className="inline-block mt-10 px-8 py-3 rounded-full border border-pink-200/60 text-pink-100 text-sm uppercase tracking-widest hover:bg-pink-200 hover:text-[#2a0e22] transition-colors"
        >
          Falar com a assessoria
        </a>
      </div>
    </section>
  )
}
