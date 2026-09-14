import photo from '../assets/photos/retrato-jardim.png'
import { about } from '../lib/site-data'

export default function About() {
  return (
    <section id="sobre" className="relative py-24 md:py-32 bg-[#120a14]">
      <div className="max-w-6xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center">
        <div className="relative order-2 md:order-1">
          <img
            src={photo}
            alt="Giselli Cristina"
            className="rounded-lg w-full max-w-md mx-auto object-cover shadow-2xl shadow-pink-950/40"
          />
        </div>
        <div className="order-1 md:order-2">
          <h2 className="font-display text-4xl md:text-5xl text-white mb-2">
            Uma das vozes mais
            <br />
            importantes da
            <br />
            <span className="italic text-pink-300">música gospel brasileira</span>
          </h2>
          <div className="mt-8 space-y-5 text-pink-50/80 text-sm md:text-base leading-relaxed">
            {about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-12 mt-20 text-center">
        <p className="font-display italic text-xl md:text-2xl text-pink-100/90 leading-relaxed">
          "{about.closing}"
        </p>
      </div>
    </section>
  )
}
