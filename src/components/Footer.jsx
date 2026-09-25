import instagramLogo from '../assets/icons/instagram.svg'
import ebenezerLogo from '../assets/icons/ebenezer-e.svg'
import { artist } from '../lib/site-data'

const credits = [
  { label: 'Instagram', href: 'https://www.instagram.com/agencia_ebenezer_br', logo: instagramLogo },
  { label: 'ebenezeragencia.com.br', href: 'https://ebenezeragencia.com.br', logo: ebenezerLogo },
]

export default function Footer() {
  return (
    <footer className="py-14 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center gap-10 md:flex-row md:items-center md:justify-between">
        <div className="text-center md:text-left">
          <p className="font-display text-base tracking-[0.3em] text-[#f4eef7] uppercase">
            {artist.name}
          </p>
          <p className="mt-2 text-[11px] text-[#f4eef7]/55">
            &copy; {new Date().getFullYear()} Todos os direitos reservados. {artist.label}.
          </p>
        </div>

        <div className="flex flex-col items-center gap-3 md:items-end">
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#f4eef7]/60">Desenvolvido por Ebenézer</span>
          <div className="flex items-center gap-3">
            {credits.map(({ label, href, logo }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-full border border-[#f4eef7]/15 bg-[#14122a]/40 py-1.5 pl-1.5 pr-4 backdrop-blur-sm transition-colors duration-300 hover:border-[#d954d1]/50"
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white p-1.5 shadow-sm">
                  <img src={logo} alt="" className="h-full w-full object-contain" />
                </span>
                <span className="text-[12px] font-medium text-[#f4eef7]/85 transition-colors group-hover:text-[#f4eef7]">
                  {label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
