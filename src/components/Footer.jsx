import { artist } from '../lib/site-data'

export default function Footer() {
  return (
    <footer className="py-10 bg-transparent border-t border-[#a9a0d8]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-display text-sm tracking-[0.3em] text-[#f4eef7]/65 uppercase">
          {artist.name}
        </p>
        <p className="text-[11px] text-[#f4eef7]/40">
          &copy; {new Date().getFullYear()} {artist.name}. Todos os direitos reservados. {artist.label}.
        </p>
      </div>
    </footer>
  )
}
