import { motion } from 'framer-motion'
import photoArco from '../assets/photos/sessao-rosa-1.jpeg'
import retratoCasual from '../assets/photos/retrato-casual.png'
import retratoSuave from '../assets/photos/retrato-suave.png'

const photos = [photoArco, retratoCasual, retratoSuave]
const rowTop = [...photos, ...photos]
const rowBottom = [...photos].reverse().concat([...photos].reverse())

function MarqueeRow({ images, direction, duration }) {
  const animateX = direction === 'left' ? [0, '-50%'] : ['-50%', 0]
  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex gap-4 w-max"
        animate={{ x: animateX }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
      >
        {images.map((src, i) => (
          <div
            key={i}
            className="glow-ring h-56 md:h-80 w-44 md:w-64 flex-shrink-0 rounded-2xl"
            style={{ '--glow-color': '#d954d1' }}
          >
            <img
              src={src}
              alt="Giselli Cristina"
              className="rounded-xl object-cover grayscale-[10%]"
            />
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default function PhotoSessionPink() {
  return (
    <section className="relative py-16 md:py-24 space-y-4">
      <MarqueeRow images={rowTop} direction="left" duration={32} />
      <MarqueeRow images={rowBottom} direction="right" duration={36} />
    </section>
  )
}
