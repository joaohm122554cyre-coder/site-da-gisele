import logo from '../assets/logo/logo giselli cristina.png'
import { artist } from '../lib/site-data'

const navLinks = [
  { label: 'A Artista', href: '#sobre' },
  { label: 'Canções', href: '#musicas' },
  { label: 'Vídeos', href: '#videos' },
  { label: 'Galeria', href: '#galeria' },
  { label: 'Contrate', href: '#contrate' },
  { label: 'Imprensa', href: '#imprensa' },
]

export default function Footer() {
  return (
    <footer className="py-12 bg-[#0c0710] border-t border-pink-100/10">
      <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col items-center gap-8 text-center">
        <img src={logo} alt={artist.name} className="h-10 opacity-90" />

        <p className="font-display italic text-pink-100/80">
          Uma voz que atravessa gerações.
        </p>

        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs uppercase tracking-widest text-pink-100/60">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-pink-100">
              {link.label}
            </a>
          ))}
        </nav>

        <p className="text-xs text-pink-100/50">
          © {new Date().getFullYear()} {artist.name}. Todos os direitos
          reservados. {artist.label}.
        </p>
      </div>
    </footer>
  )
}
