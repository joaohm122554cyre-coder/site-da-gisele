import { artist } from '../lib/site-data'

export default function Footer() {
  return (
    <footer className="py-10 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-display text-sm tracking-[0.3em] text-[#f4eef7]/65 uppercase">
          {artist.name}
        </p>
        <p className="text-[11px] text-[#f4eef7]/40">
          &copy; {new Date().getFullYear()} {artist.name}. Todos os direitos reservados. {artist.label}.
        </p>
        <a
          href="https://www.instagram.com/agencia_ebenezer_br"
          target="_blank"
          rel="noreferrer"
          className="text-[11px] text-[#f4eef7]/40 transition-colors hover:text-[#f4eef7]/70"
        >
          Site por <span className="text-[#d954d1]">Ebenézer</span>
        </a>
      </div>
    </footer>
  )
}
