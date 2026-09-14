import bg from '../assets/photos/show-banda.png'
import { stats } from '../lib/site-data'

export default function Stats() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-0">
        <img src={bg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#0c0710]/85" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        <h2 className="font-display text-4xl md:text-5xl text-white text-center mb-16">
          Números e <span className="italic text-pink-300">Conquistas</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s, i) => (
            <div key={i}>
              <p className="font-display text-3xl md:text-4xl text-pink-200">
                {s.prefix}
                {s.value}
                {s.suffix}
              </p>
              <p className="mt-2 text-xs md:text-sm uppercase tracking-wider text-pink-100/70">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
