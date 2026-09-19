import photoArco from '../assets/photos/sessao-rosa-1.webp'
import retratoCasual from '../assets/photos/retrato-casual.webp'
import retratoSuave from '../assets/photos/retrato-suave.webp'
import Marquee from './Marquee'

const photos = [photoArco, retratoCasual, retratoSuave]
const photosReversed = [...photos].reverse()

function Row({ images, reverse, duration }) {
  return (
    <Marquee reverse={reverse} duration={duration}>
      {images.map((src, i) => (
        <div
          key={i}
          className="glow-ring h-56 md:h-80 w-44 md:w-64 flex-shrink-0 rounded-2xl mr-4"
          style={{ '--glow-color': '#d954d1' }}
        >
          <img
            src={src}
            alt="Giselli Cristina"
            className="rounded-xl object-cover grayscale-[10%]"
          />
        </div>
      ))}
    </Marquee>
  )
}

export default function PhotoSessionPink() {
  return (
    <section className="relative py-16 md:py-24 space-y-4">
      <Row images={photos} duration={32} />
      <Row images={photosReversed} reverse duration={36} />
    </section>
  )
}
