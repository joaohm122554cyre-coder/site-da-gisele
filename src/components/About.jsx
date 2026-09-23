import { about } from '../lib/site-data'
import Reveal from './Reveal'
import PhotoSessionPink from './PhotoSessionPink'

const MARKUP = /(\*\*[^*]+\*\*|\[[^\]]+\])/g

function Rich({ text }) {
  return text.split(MARKUP).map((part, i) => {
    if (part.startsWith('**')) {
      return (
        <strong
          key={i}
          className="px-[0.1em] font-semibold text-white [-webkit-box-decoration-break:clone] [background:linear-gradient(transparent_62%,rgba(217,84,209,0.42)_62%,rgba(217,84,209,0.42)_94%,transparent_94%)] [box-decoration-break:clone]"
        >
          {part.slice(2, -2)}
        </strong>
      )
    }
    if (part.startsWith('[')) {
      return (
        <em key={i} className="font-display text-[1.1em] italic text-[#f2a8ee] [text-shadow:0_0_22px_rgba(217,84,209,0.55)]">
          {part.slice(1, -1)}
        </em>
      )
    }
    return part
  })
}

export default function About() {
  return (
    <section id="sobre" className="relative py-28 md:py-40">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <Reveal>
          <span className="font-script text-4xl md:text-5xl text-[#d954d1] leading-none">
            Sobre
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#f4eef7] mt-3 leading-[1.05]">
            Uma voz que
            <br />
            atravessa
            <br />
            <span className="italic text-[#d954d1]">gerações</span>
          </h2>
        </Reveal>
      </div>

      <div className="mt-10 md:mt-14">
        <PhotoSessionPink />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-12 gap-6">
          <div className="md:col-span-7 md:col-start-6 space-y-7 font-fraunces text-lg leading-[1.8] text-[#f4eef7]/95 [text-shadow:0_1px_14px_rgba(20,18,42,0.85)] md:text-xl">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className={i === 0 ? 'drop-cap' : ''}>
                  <Rich text={p} />
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
