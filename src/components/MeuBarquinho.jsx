import { useState } from 'react'
import Reveal from './Reveal'
import VinylPlayer from './VinylPlayer'
import barquinhoLabel from '../assets/photos/meu-barquinho-capa.jpg'
import barquinhoAudio from '../assets/audio/meu-barquinho-preview.mp3'
import adorarLabel from '../assets/photos/eu-so-quero-adorar-capa.jpg'
import adorarAudio from '../assets/audio/eu-so-quero-adorar-preview.mp3'
import discoDeOuroAdorar from '../assets/photos/disco-de-ouro-adorar.jpg'
import bondadeLabel from '../assets/photos/bondade-de-deus-capa.jpg'
import bondadeAudio from '../assets/audio/bondade-de-deus-preview.mp3'
import queroAdoraLoLabel from '../assets/photos/quero-adora-lo-capa.jpg'
import queroAdoraLoAudio from '../assets/audio/quero-adora-lo-preview.mp3'
import pensandoBemLabel from '../assets/photos/pensando-bem-capa.jpg'
import pensandoBemAudio from '../assets/audio/pensando-bem-preview.mp3'

const tracks = [
  {
    key: 'barquinho',
    eyebrow: 'O clássico',
    title: 'Meu Barquinho',
    description:
      'A canção que projetou Giselli Cristina para todo o país e se tornou uma das músicas mais lembradas da música gospel brasileira.',
    label: barquinhoLabel,
    audio: barquinhoAudio,
    youtubeUrl: 'https://www.youtube.com/watch?v=_AOK_aSiDmo',
    meta: {
      views: 104631250,
      premiere: '11/11/2010',
    },
  },
  {
    key: 'adorar',
    eyebrow: 'Disco de Ouro',
    title: 'Eu Só Quero Adorar',
    description:
      'Gravada ao lado do filho, Nicolas Henrique, conquistou Disco de Ouro e se tornou um dos maiores fenômenos da música gospel nas plataformas digitais.',
    label: adorarLabel,
    audio: adorarAudio,
    youtubeUrl: 'https://www.youtube.com/watch?v=jFPV45ARHqg',
    meta: {
      views: 17993828,
      premiere: '14/04/2025',
      credit: 'Moisés Cleyton / C1C2 Produções',
      tags: ['louvores', 'musicagospel', 'clipegospel'],
    },
    award: {
      image: discoDeOuroAdorar,
      caption: 'Giselli, Nicolas Henrique e a equipe com o Single de Ouro',
    },
  },
  {
    key: 'bondade',
    eyebrow: 'Feat. Clayton Queiroz',
    title: 'Bondade de Deus',
    description:
      'Um dos maiores sucessos do segmento gospel, reafirmando a força de Giselli Cristina nas plataformas digitais em parceria com Clayton Queiroz.',
    label: bondadeLabel,
    audio: bondadeAudio,
    youtubeUrl: 'https://www.youtube.com/watch?v=dkfSaLXj2S4',
    meta: {
      views: 64344815,
      premiere: '31/03/2023',
    },
  },
  {
    key: 'quero-adora-lo',
    eyebrow: 'Ao vivo com o Coral UFADPG',
    title: 'Quero Adorá-lo',
    description:
      'Registro ao vivo na Igreja Assembleia de Deus em Ponta Grossa, com participação especial do coral de mulheres da UFADPG e dos filhos Rafaelli Cristina e Nicolas Henrique.',
    label: queroAdoraLoLabel,
    audio: queroAdoraLoAudio,
    youtubeUrl: 'https://www.youtube.com/watch?v=WteDeyyXFuM',
    meta: {
      views: 9699384,
      premiere: '11/02/2025',
      credit: 'Direção: Pr. Altair de Moraes e Pra. Elienai',
    },
  },
  {
    key: 'pensando-bem',
    eyebrow: 'Feat. Nicolas Henrique',
    title: 'Pensando Bem',
    description:
      'Um dueto intimista entre mãe e filho, Giselli Cristina e Nicolas Henrique, em uma versão acústica que emocionou o público.',
    label: pensandoBemLabel,
    audio: pensandoBemAudio,
    youtubeUrl: 'https://www.youtube.com/watch?v=KeAEX20EqZ0',
    meta: {
      views: 2459514,
      premiere: '29/09/2025',
      credit: 'Nilseu Buarque / Editora Prisma',
      tags: ['louvores', 'musicagospel', 'clipegospel'],
    },
  },
]

export default function MeuBarquinho() {
  const [index, setIndex] = useState(0)
  const track = tracks[index]

  const go = (dir) => {
    setIndex((i) => (i + dir + tracks.length) % tracks.length)
  }

  return (
    <section id="meu-barquinho" className="relative py-28 md:py-40">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-5 flex justify-center">
          <div className="relative flex items-center gap-3 md:gap-5">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Música anterior"
              className="shrink-0 w-9 h-9 rounded-full border border-[#f4eef7]/20 flex items-center justify-center text-[#f4eef7]/60 hover:text-[#f4eef7] hover:border-[#f4eef7]/50 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M10 2 4 8l6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <Reveal key={track.key}>
              <VinylPlayer
                label={track.label}
                labelAlt={`${track.title} — capa`}
                audioSrc={track.audio}
                trackName={track.title}
                meta={track.meta}
                youtubeUrl={track.youtubeUrl}
              />
            </Reveal>

            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Próxima música"
              className="shrink-0 w-9 h-9 rounded-full border border-[#f4eef7]/20 flex items-center justify-center text-[#f4eef7]/60 hover:text-[#f4eef7] hover:border-[#f4eef7]/50 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M6 2l6 6-6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <Reveal key={`${track.key}-text`}>
            <span className="text-[11px] tracking-[0.4em] uppercase text-[#f4eef7]/50">
              {track.eyebrow}
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#f4eef7] mt-4">
              {track.title}
            </h2>
            <p className="mt-6 text-sm md:text-base text-[#f4eef7]/65 leading-relaxed max-w-md">
              {track.description}
            </p>

            {track.award && (
              <div className="mt-8 max-w-sm">
                <img
                  src={track.award.image}
                  alt={track.award.caption}
                  className="w-full rounded-md grayscale-[8%]"
                />
                <p className="mt-2 text-[10px] tracking-[0.1em] text-[#f4eef7]/40">
                  {track.award.caption}
                </p>
              </div>
            )}

            <p className="mt-10 text-[11px] uppercase tracking-[0.2em] text-[#f4eef7]/40">
              Clique no disco para ouvir uma prévia
            </p>

            <div className="flex gap-2 mt-8">
              {tracks.map((t, i) => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Ir para ${t.title}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index ? 'w-8 bg-[#d954d1]' : 'w-1.5 bg-[#f4eef7]/25'
                  }`}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
