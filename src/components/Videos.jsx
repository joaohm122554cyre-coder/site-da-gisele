import { videos } from '../lib/site-data'

export default function Videos() {
  return (
    <section id="videos" className="relative py-24 md:py-32 bg-[#120a14]">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <h2 className="font-display text-4xl md:text-5xl text-white text-center mb-4">
          {videos.title}
        </h2>
        <p className="text-sm md:text-base text-pink-50/70 text-center max-w-lg mx-auto mb-12">
          {videos.description}
        </p>

        {videos.main ? (
          <div className="aspect-video max-w-4xl mx-auto rounded-lg overflow-hidden shadow-2xl shadow-pink-950/40">
            <iframe
              src={videos.main}
              title={videos.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <div className="max-w-4xl mx-auto aspect-video rounded-lg border border-pink-100/15 flex items-center justify-center">
            <p className="text-pink-100/50 text-sm uppercase tracking-widest">
              Vídeos em breve
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
