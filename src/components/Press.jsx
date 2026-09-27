import { FiDownload } from 'react-icons/fi'
import { press } from '../lib/site-data'
import Reveal from './Reveal'

const MARKUP = /(\*\*[^*]+\*\*|\[[^\]]+\])/g

function Rich({ text }) {
  return text.split(MARKUP).map((part, i) => {
    if (part.startsWith('**')) {
      return (
        <strong
          key={i}
          className="px-[0.1em] font-semibold text-white [-webkit-box-decoration-break:clone] [background:linear-gradient(transparent_62%,rgba(79,127,214,0.42)_62%,rgba(79,127,214,0.42)_94%,transparent_94%)] [box-decoration-break:clone]"
        >
          {part.slice(2, -2)}
        </strong>
      )
    }
    if (part.startsWith('[')) {
      return (
        <em key={i} className="font-display text-[1.1em] italic text-[#a9c6fb] [text-shadow:0_0_22px_rgba(79,127,214,0.55)]">
          {part.slice(1, -1)}
        </em>
      )
    }
    return part
  })
}

export default function Press() {
  return (
    <section id="imprensa" className="relative py-20 md:py-32">
      <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-12 text-center">
        <Reveal>
          <span className="text-[11px] tracking-[0.4em] uppercase text-[#f4eef7]/50">
            Imprensa
          </span>
          <h2 className="font-display text-4xl leading-[1.1] text-[#f4eef7] mt-4 sm:text-5xl md:text-6xl">
            Pronta para
            <br />
            <span className="italic text-[#4f7fd6]">contar essa história</span>
          </h2>
          <p className="mt-7 max-w-xl mx-auto font-fraunces text-lg leading-[1.8] text-[#f4eef7]/90 [text-shadow:0_1px_14px_rgba(20,18,42,0.85)] md:text-xl">
            <Rich text={press.description} />
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          {press.mediaKitUrl ? (
            <>
              <p className="mt-10 text-[13px] text-[#f4eef7]/50">{press.mediaKitNote}</p>
              <a
                href={press.mediaKitUrl}
                target="_blank"
                rel="noreferrer"
                className="cta-glow group mt-5 inline-flex items-center gap-3 rounded-full border border-[#d954d1]/45 bg-[#d954d1]/10 py-2 pl-2 pr-6 text-[11px] uppercase tracking-[0.28em] text-[#f4eef7]/90 backdrop-blur-sm transition-all duration-500 hover:border-[#d954d1] hover:bg-[#d954d1]/20 hover:text-[#f4eef7]"
              >
                <span className="grid h-9 w-9 place-items-center rounded-full bg-[#d954d1] text-white transition-transform duration-500 group-hover:translate-x-1">
                  <FiDownload className="text-base" aria-hidden="true" />
                </span>
                Baixar mídia kit
              </a>
            </>
          ) : (
            <p className="mt-10 text-[11px] uppercase tracking-[0.2em] text-[#f4eef7]/40">
              Mídia kit para download em breve
            </p>
          )}
        </Reveal>
      </div>
    </section>
  )
}
