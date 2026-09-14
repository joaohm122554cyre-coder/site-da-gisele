import photo from '../assets/photos/palco-microfone-2.jpeg'
import { currentMoment } from '../lib/site-data'

export default function CurrentMoment() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center">
        <img
          src={photo}
          alt="Giselli Cristina em show recente"
          className="rounded-lg w-full object-cover shadow-2xl shadow-pink-950/40 order-2 md:order-1"
        />
        <div className="order-1 md:order-2">
          <h2 className="font-display text-4xl md:text-5xl text-white mb-6">
            {currentMoment.title}
          </h2>
          <div className="space-y-5 text-sm md:text-base text-pink-50/80 leading-relaxed">
            {currentMoment.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
