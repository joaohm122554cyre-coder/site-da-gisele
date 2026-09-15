import { videos } from '../lib/site-data'
import Reveal from './Reveal'

export default function Videos() {
  return (
    <section id="videos" className="relative py-28 md:py-40">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <Reveal className="text-center max-w-lg mx-auto mb-16">
          <span className="text-[11px] tracking-[0.4em] uppercase text-[#1a2140]/50">
            Assista
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#1a2140] mt-4">
            {videos.title}
          </h2>
          <p className="mt-6 text-sm md:text-base text-[#1a2140]/65">
            {videos.description}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          {videos.main ? (
            <div className="aspect-video max-w-4xl mx-auto overflow-hidden">
              <iframe
                src={videos.main}
                title={videos.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="max-w-4xl mx-auto aspect-video border border-[#a9a0d8]/60 flex items-center justify-center">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#1a2140]/40">
                Vídeos em breve
              </p>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  )
}
