import photo1 from '../assets/photos/sessao-rosa-1.jpeg'
import photo2 from '../assets/photos/sessao-rosa-2.png'
import photo3 from '../assets/photos/sessao-rosa-3.png'

const photos = [photo1, photo2, photo3]

export default function PhotoSessionPink() {
  return (
    <section className="relative py-24 md:py-32 bg-[#1a0a16] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(244,114,182,0.18),transparent_60%)]" />
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        <p className="font-display italic text-lg text-pink-200/80 text-center">Ensaio</p>
        <h2 className="font-display text-4xl md:text-5xl text-white text-center mb-16">
          Sessão <span className="italic text-pink-300">Rosa</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {photos.map((src, i) => (
            <img
              key={i}
              src={src}
              alt="Giselli Cristina - ensaio rosa"
              className="rounded-lg w-full h-96 object-cover shadow-2xl shadow-pink-950/50 ring-1 ring-pink-200/20"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
