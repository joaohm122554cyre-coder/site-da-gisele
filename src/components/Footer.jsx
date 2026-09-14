import logo from '../assets/logo/logo giselli cristina.png'
import { artist } from '../lib/site-data'

export default function Footer() {
  return (
    <footer className="py-10 bg-[#0c0710] border-t border-pink-100/10">
      <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
        <img src={logo} alt={artist.name} className="h-10 opacity-90" />
        <p className="text-xs text-pink-100/50 text-center">
          © {new Date().getFullYear()} {artist.name}. Todos os direitos
          reservados. {artist.label}.
        </p>
      </div>
    </footer>
  )
}
