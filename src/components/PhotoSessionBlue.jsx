import photo1 from '../assets/photos/sessao-azul-1.png'
import photo2 from '../assets/photos/sessao-azul-2.png'
import photo3 from '../assets/photos/sessao-azul-3.png'
import photo4 from '../assets/photos/sessao-azul-4.png'

const photos = [photo1, photo2, photo3, photo4]

export default function PhotoSessionBlue() {
  return (
    <section className="relative py-24 md:py-32 bg-[#070a14] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(96,165,250,0.16),transparent_60%)]" />
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        <p className="font-display italic text-lg text-sky-200/80 text-center">Ensaio</p>
        <h2 className="font-display text-4xl md:text-5xl text-white text-center mb-16">
          Sessão <span className="italic text-sky-300">Azul</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {photos.map((src, i) => (
            <img
              key={i}
              src={src}
              alt="Giselli Cristina - ensaio azul"
              className="rounded-lg w-full h-72 object-cover shadow-2xl shadow-sky-950/50 ring-1 ring-sky-200/20"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
