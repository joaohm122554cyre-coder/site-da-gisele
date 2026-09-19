import { gallery } from '../lib/site-data'
import Reveal from './Reveal'

const photoModules = import.meta.glob('../assets/photos/*', {
  eager: true,
  import: 'default',
})

const withoutExt = (name) => name.replace(/\.[^./]+$/, '')

function resolvePhoto(filename) {
  const wanted = withoutExt(filename)
  const match = Object.entries(photoModules).find(
    ([path]) => withoutExt(path.split('/').pop()) === wanted
  )
  return match ? match[1] : undefined
}

export default function Gallery() {
  return (
    <section id="galeria" className="relative py-28 md:py-40">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <Reveal className="mb-16">
          <span className="text-[11px] tracking-[0.4em] uppercase text-[#f4eef7]/50">
            Galeria
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#f4eef7] mt-4">
            Bastidores <span className="italic text-[#d954d1]">e palco</span>
          </h2>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {gallery.map((photo, i) => (
            <Reveal key={photo.src} delay={i * 0.05}>
              <img
                src={resolvePhoto(photo.src)}
                alt={photo.alt}
                loading="lazy"
                decoding="async"
                className="w-full h-64 object-cover grayscale-[10%] hover:grayscale-0 transition-all duration-500"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
