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

// Cada foto mantém o formato original (sem cortes); as colunas têm larguras e
// alturas de início diferentes para a galeria não parecer uma grade rígida.
const ratios = ['aspect-[4/5]', 'aspect-square', 'aspect-[4/5]', 'aspect-[3/2]', 'aspect-[4/5]', 'aspect-[4/5]']

// No celular a 3ª coluna ocupa a largura toda e mostra as duas fotos lado a lado.
const columns = [
  { photos: [0, 3], className: 'space-y-3 md:space-y-4' },
  { photos: [1, 4], className: 'space-y-3 md:space-y-4 mt-8 md:mt-20' },
  {
    photos: [2, 5],
    className: 'col-span-2 md:col-span-1 grid grid-cols-2 md:grid-cols-1 gap-3 md:gap-4 md:mt-8',
    secondPhotoClass: 'mt-6 md:mt-0',
  },
]

function Photo({ index, delay, className = '' }) {
  const photo = gallery[index]
  return (
    <Reveal delay={delay} className={className}>
      <img
        src={resolvePhoto(photo.src)}
        alt={photo.alt}
        loading="lazy"
        decoding="async"
        className={`w-full ${ratios[index]} object-cover grayscale-[10%] hover:grayscale-0 transition-all duration-500`}
      />
    </Reveal>
  )
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
            Bastidores <span className="italic text-[#4f7fd6]">e palco</span>
          </h2>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-[5fr_4fr_3.6fr] gap-3 md:gap-4 items-start">
          {columns.map((col, c) => (
            <div key={c} className={col.className}>
              {col.photos.map((index, p) => (
                <Photo
                  key={gallery[index].src}
                  index={index}
                  delay={(c + p) * 0.06}
                  className={p === 1 ? col.secondPhotoClass : ''}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
