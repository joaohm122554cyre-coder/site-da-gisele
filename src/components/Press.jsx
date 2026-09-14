import { press } from '../lib/site-data'

export default function Press() {
  return (
    <section id="imprensa" className="relative py-24 md:py-32 bg-[#120a14]">
      <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
        <h2 className="font-display text-4xl md:text-5xl text-white mb-6">
          {press.title}
        </h2>
        <p className="text-sm md:text-base text-pink-50/80 max-w-md mx-auto">
          {press.description}
        </p>

        {press.mediaKitUrl ? (
          <a
            href={press.mediaKitUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-10 px-8 py-3 rounded-full border border-pink-200/60 text-pink-100 text-sm uppercase tracking-widest hover:bg-pink-200 hover:text-[#2a0e22] transition-colors"
          >
            Baixar mídia kit
          </a>
        ) : (
          <p className="mt-10 text-xs uppercase tracking-widest text-pink-100/50">
            Mídia kit para download em breve
          </p>
        )}
      </div>
    </section>
  )
}
