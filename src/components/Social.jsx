import { socials, streaming } from '../lib/site-data'
import AnimatedCompactNumber from './AnimatedCompactNumber'
import Marquee from './Marquee'
import Reveal from './Reveal'
import spotifyLogo from '../assets/icons/spotify.svg'
import appleMusicLogo from '../assets/icons/apple-music.svg'
import youtubeLogo from '../assets/icons/youtube.svg'
import instagramLogo from '../assets/icons/instagram.svg'
import facebookLogo from '../assets/icons/facebook.svg'
import deezerLogo from '../assets/icons/deezer.svg'
import amazonMusicLogo from '../assets/icons/amazon-music.svg'

// Logos originais de cada plataforma (não ícone genérico) — pedido explícito pra não
// parecer "desenho".
const logos = {
  Spotify: spotifyLogo,
  'Apple Music': appleMusicLogo,
  YouTube: youtubeLogo,
  'Amazon Music': amazonMusicLogo,
  Deezer: deezerLogo,
  Instagram: instagramLogo,
  Facebook: facebookLogo,
}

// Cor de marca de cada plataforma, usada só no contorno/brilho da pílula.
const colors = {
  Spotify: '#1DB954',
  'Apple Music': '#FA2D48',
  YouTube: '#FF0000',
  'Amazon Music': '#00A8E1',
  Deezer: '#A238FF',
  Instagram: '#E1306C',
  Facebook: '#1877F2',
}

// Números reais, conferidos direto nas páginas oficiais (Facebook, Instagram e
// YouTube) — nada estimado.
const socialStats = [
  { name: 'Facebook', value: 78169, label: 'curtidas' },
  { name: 'Instagram', value: 481000, label: 'seguidores' },
  { name: 'YouTube', value: 918000, label: 'inscritos' },
]
// Todas as redes numa lista só, sem repetir o YouTube (que aparece nas duas listas
// originais — como rede pra seguir e como plataforma pra ouvir).
const platforms = [
  ...socials,
  ...streaming.filter((s) => !socials.some((soc) => soc.name === s.name)),
]

function PlatformPill({ name, label, url }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="group mx-3 inline-flex shrink-0 items-center gap-2.5 rounded-full border border-[#f4eef7]/12 bg-[#14122a]/40 py-2 pl-2 pr-5 text-sm text-[#f4eef7]/75 backdrop-blur-sm transition-colors duration-300 hover:border-[#f4eef7]/30 hover:text-[#f4eef7] md:mx-4"
    >
      <span className="grid h-8 shrink-0 place-items-center rounded-full bg-white px-2 shadow-sm">
        <img src={logos[name]} alt="" className="h-4 w-auto max-w-[3.25rem] object-contain" />
      </span>
      {label}
    </a>
  )
}

// Duas fileiras, cada uma correndo pra um lado, de ponta a ponta da tela — mesmo
// recurso do carrossel de músicas, aplicado nas redes.
function PlatformMarquee() {
  const reversed = [...platforms].reverse()
  return (
    <Reveal delay={0.1} className="relative py-2">
      <div
        className="space-y-3"
        style={{ maskImage: 'linear-gradient(to right, transparent, black 6%, black 94%, transparent)' }}
      >
        <Marquee duration={30} pauseOnHover>
          {platforms.map((p) => (
            <PlatformPill key={p.name} name={p.name} label={p.handle ?? p.name} url={p.url} />
          ))}
        </Marquee>
        <Marquee duration={34} reverse pauseOnHover>
          {reversed.map((p) => (
            <PlatformPill key={p.name} name={p.name} label={p.handle ?? p.name} url={p.url} />
          ))}
        </Marquee>
      </div>
    </Reveal>
  )
}

function SocialStats() {
  return (
    <Reveal delay={0.05} className="mb-16 flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
      {socialStats.map((s) => {
        const color = colors[s.name]
        return (
          <div key={s.name} className="flex items-center gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white p-2 shadow-sm">
              <img src={logos[s.name]} alt="" className="h-full w-full object-contain" />
            </span>
            <div className="text-left">
              <p
                translate="no"
                className="notranslate font-display text-3xl italic font-semibold leading-none md:text-4xl"
                style={{ color }}
              >
                <AnimatedCompactNumber value={s.value} />
              </p>
              <p className="mt-1.5 text-[10px] uppercase tracking-[0.25em] text-[#f4eef7]/50">{s.label}</p>
            </div>
          </div>
        )
      })}
    </Reveal>
  )
}

export default function Social() {
  return (
    <section id="redes" className="relative py-20 md:py-32">
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center">
        <Reveal>
          <span className="text-[11px] tracking-[0.4em] uppercase text-[#f4eef7]/50">
            Redes sociais
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#f4eef7] mt-4 mb-10">
            Redes <span className="italic text-[#4f7fd6]">e plataformas</span>
          </h2>
        </Reveal>

        <SocialStats />
      </div>

      <PlatformMarquee />
    </section>
  )
}
