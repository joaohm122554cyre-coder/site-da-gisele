import { SiInstagram } from 'react-icons/si'
import { FiGlobe } from 'react-icons/fi'
import { artist } from '../lib/site-data'

const ebenezerLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/agencia_ebenezer_br', Icon: SiInstagram },
  { label: 'ebenezeragencia.com.br', href: 'https://ebenezeragencia.com.br', Icon: FiGlobe },
]

export default function Footer() {
  return (
    <footer className="py-12 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center gap-8 md:flex-row md:items-center md:justify-between">
        <div className="text-center md:text-left">
          <p className="font-display text-sm tracking-[0.3em] text-[#f4eef7]/65 uppercase">
            {artist.name}
          </p>
          <p className="mt-2 text-[11px] text-[#f4eef7]/40">
            &copy; {new Date().getFullYear()} {artist.name}. Todos os direitos reservados. {artist.label}.
          </p>
        </div>

        <div className="flex flex-col items-center gap-3 md:items-end">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#f4eef7]/40">Desenvolvido por Ebenézer</span>
          <div className="flex items-center gap-2.5">
            {ebenezerLinks.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-[#f4eef7]/15 bg-[#14122a]/40 px-3.5 py-2 text-[11px] text-[#f4eef7]/70 backdrop-blur-sm transition-colors hover:border-[#d954d1]/50 hover:text-[#f4eef7]"
              >
                <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
