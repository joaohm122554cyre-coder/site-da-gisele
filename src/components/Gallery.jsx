import { gallery } from '../lib/site-data'

const photoModules = import.meta.glob('../assets/photos/*', {
  eager: true,
  import: 'default',
})

function resolvePhoto(filename) {
  const match = Object.entries(photoModules).find(([path]) =>
    path.endsWith(`/${filename}`)
  )
  return match ? match[1] : undefined
}

export default function Gallery() {
  return (
    <section id="galeria" className="relative py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <h2 className="font-display text-4xl md:text-5xl text-white text-center mb-16">
          Galeria
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {gallery.map((photo) => (
            <img
              key={photo.src}
              src={resolvePhoto(photo.src)}
              alt={photo.alt}
              className="rounded-lg w-full h-64 object-cover shadow-lg shadow-pink-950/30"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
