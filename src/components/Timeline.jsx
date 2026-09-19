import Reveal from './Reveal'
import barquinhoAlbum from '../assets/photos/meu-barquinho-album.jpg'
import bondadeCena from '../assets/photos/bondade-de-deus-cena.jpg'
import discoDeOuro from '../assets/photos/disco-de-ouro-adorar.jpg'
import sessaoRosa from '../assets/photos/sessao-rosa-1.webp'

const items = [
  {
    year: 'Há quase 30 anos',
    title: 'O começo da caminhada',
    text: 'Uma trajetória feita de fé e de voz começava a ser escrita, a mesma que hoje atravessa gerações.',
  },
  {
    year: 'Anos de ouro',
    title: 'Um fenômeno de vendas',
    text: 'No auge do mercado fonográfico gospel, destacou-se como um dos grandes fenômenos de vendas físicas do segmento, com mais de 1 milhão de discos vendidos ao longo da carreira.',
  },
  {
    year: '2010',
    title: 'Meu Barquinho',
    text: 'A canção que a projetou para todo o país e se tornou uma das mais lembradas do gospel brasileiro. No YouTube desde 2010, já passa de 104 milhões de visualizações.',
    image: barquinhoAlbum,
    imageAlt: 'Capa do álbum Meu Barquinho',
  },
  {
    year: '2023',
    title: 'Bondade de Deus',
    text: 'Ao lado de Clayton Queiroz, gravou uma das versões mais assistidas do segmento gospel, com mais de 64 milhões de visualizações.',
    image: bondadeCena,
    imageAlt: 'Giselli Cristina cantando Bondade de Deus',
  },
  {
    year: '2025',
    title: 'Em família',
    text: 'Com o filho Nicolas Henrique, gravou “Eu Só Quero Adorar” e conquistou o Single de Ouro. No mesmo ano, ele e Rafaelli Cristina participaram do registro ao vivo de “Quero Adorá-lo”, com o coral de mulheres da UFADPG, e mãe e filho lançaram o dueto “Pensando Bem”.',
    image: discoDeOuro,
    imageAlt: 'Giselli, Nicolas Henrique e a equipe com o Single de Ouro',
    wide: true,
  },
  {
    year: 'Hoje',
    title: 'Uma voz que segue',
    text: 'Artista da Maximus Records, com mais de 1 bilhão de streams acumulados e reconhecida como uma das artistas gospel mais respeitadas do Brasil.',
    image: sessaoRosa,
    imageAlt: 'Retrato de Giselli Cristina',
  },
]

function Entry({ item, index }) {
  const textOnLeft = index % 2 === 0

  return (
    <div className="relative grid gap-x-20 gap-y-6 pb-16 pl-12 md:grid-cols-2 md:pb-24 md:pl-0 last:pb-0">
      <span className="absolute left-4 top-3 h-3 w-3 -translate-x-1/2 rounded-full bg-[#d954d1] shadow-[0_0_14px_3px_rgba(217,84,209,0.55)] ring-4 ring-[#1c1638] md:left-1/2" />

      <Reveal
        className={`md:row-start-1 ${
          textOnLeft ? 'md:col-start-1 md:text-right' : 'md:col-start-2'
        }`}
      >
        <p className="font-display text-3xl italic lining-nums text-[#d954d1] md:text-4xl">{item.year}</p>
        <h3 className="mt-2 font-display text-2xl text-[#f4eef7] md:text-3xl">{item.title}</h3>
        <p
          className={`mt-4 max-w-md font-serif text-lg lining-nums leading-relaxed text-[#f4eef7]/75 md:text-xl ${
            textOnLeft ? 'md:ml-auto' : ''
          }`}
        >
          {item.text}
        </p>
      </Reveal>

      {item.image && (
        <Reveal
          delay={0.12}
          className={`md:row-start-1 ${
            textOnLeft ? 'md:col-start-2' : 'md:col-start-1 md:justify-self-end'
          }`}
        >
          <img
            src={item.image}
            alt={item.imageAlt}
            loading="lazy"
            decoding="async"
            className={`w-full rounded-md object-cover grayscale-[8%] ${
              item.wide ? 'max-w-[340px] aspect-[3/2]' : 'max-w-[260px] aspect-square'
            }`}
          />
        </Reveal>
      )}
    </div>
  )
}

export default function Timeline() {
  return (
    <section id="historia" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <Reveal className="mb-16 text-center md:mb-24">
          <span className="font-script text-4xl leading-none text-[#d954d1] md:text-5xl">
            Sua história
          </span>
          <h2 className="mt-3 font-display text-4xl leading-[1.1] text-[#f4eef7] sm:text-5xl md:text-6xl">
            Quase três décadas
            <br />
            <span className="italic text-[#d954d1]">cantando a fé</span>
          </h2>
        </Reveal>

        <div className="relative">
          <div className="absolute bottom-0 left-4 top-0 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#d954d1]/45 to-transparent md:left-1/2" />
          {items.map((item, i) => (
            <Entry key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
