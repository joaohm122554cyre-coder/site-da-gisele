import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import photo1 from '../assets/photos/giselli-nicolas-1.webp'
import photo2 from '../assets/photos/giselli-nicolas-2.webp'
import photo3 from '../assets/photos/giselli-nicolas-3.webp'

const photos = [photo1, photo2, photo3]

export default function MotherSon() {
  const [index, setIndex] = useState(0)

  const go = (dir) => setIndex((i) => (i + dir + photos.length) % photos.length)

  return (
    <section className="relative py-16 md:py-24">
      <div className="max-w-md mx-auto px-6 flex flex-col items-center">
        <div className="relative w-full">
          <div
            className="glow-ring aspect-[4/5] w-full rounded-2xl"
            style={{ '--glow-color': '#4f7fd6' }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={index}
                src={photos[index]}
                alt="Giselli Cristina e Nicolas Henrique"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="rounded-xl object-cover w-full h-full grayscale-[10%]"
              />
            </AnimatePresence>
          </div>

          <button
            onClick={() => go(-1)}
            aria-label="Foto anterior"
            className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/70 backdrop-blur flex items-center justify-center text-[#1c1638] hover:bg-white transition-colors"
          >
            ‹
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Próxima foto"
            className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/70 backdrop-blur flex items-center justify-center text-[#1c1638] hover:bg-white transition-colors"
          >
            ›
          </button>
        </div>

        <div className="flex gap-2 mt-6">
          {photos.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Ir para foto ${i + 1}`}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === index ? 'bg-[#4f7fd6]' : 'bg-[#f4eef7]/20'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
