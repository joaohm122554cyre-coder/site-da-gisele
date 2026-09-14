import photo from '../assets/photos/palco-microfone-1.png'
import { songs } from '../lib/site-data'

export default function Discography() {
  return (
    <section id="musicas" className="relative py-24 md:py-32 bg-[#120a14]">
      <div className="max-w-6xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="font-display text-4xl md:text-5xl text-white leading-tight">
            Sucessos que
            <br />
            marcaram
            <br />
            <span className="italic text-pink-300">gerações</span>
          </h2>
          <p className="mt-6 text-sm md:text-base text-pink-50/70 max-w-md">
            Ao longo de sua trajetória, lançou canções que se tornaram parte
            da história da música gospel brasileira.
          </p>
          <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
            {songs.map((song) => (
              <li
                key={song}
                className="text-pink-100/90 text-sm md:text-base border-b border-pink-100/10 pb-2"
              >
                {song}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-pink-100/60 max-w-md">
            Além de diversos outros sucessos que seguem impactando milhões de
            pessoas em todo o Brasil.
          </p>
        </div>
        <img
          src={photo}
          alt="Giselli Cristina no palco"
          className="rounded-lg w-full object-cover shadow-2xl shadow-pink-950/40"
        />
      </div>
    </section>
  )
}
