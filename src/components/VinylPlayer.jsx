import { useEffect, useState } from 'react'
import { motion, animate } from 'framer-motion'

function formatTime(s) {
  if (!Number.isFinite(s)) return '0:00'
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

function CountUpViews({ value, delay = 0 }) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 1.8,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.floor(v)),
    })
    return () => controls.stop()
  }, [value, delay])

  return <>{display.toLocaleString('pt-BR')}</>
}

export default function VinylPlayer({
  label,
  labelAlt,
  trackName,
  playing,
  onToggle,
  progress,
  current,
  duration,
  meta,
  youtubeUrl,
}) {
  const toggle = onToggle

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative w-64 h-64 md:w-80 md:h-80">
        {/* tonearm */}
        <div
          className="absolute -top-2 -right-2 w-24 h-24 md:w-28 md:h-28 origin-top-right z-20 transition-transform duration-700 ease-out"
          style={{ transform: playing ? 'rotate(0deg)' : 'rotate(-22deg)' }}
        >
          <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#e9c968] border border-[#a9822f] shadow" />
          <div className="absolute top-2.5 right-2.5 w-[3px] h-20 md:h-24 bg-gradient-to-b from-[#e9c968] to-[#a9822f] rounded-full origin-top rotate-[38deg]" />
        </div>

        {/* disc */}
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? `Pausar ${trackName}` : `Tocar ${trackName}`}
          className="group relative w-full h-full rounded-full cursor-pointer focus:outline-none"
        >
          <div
            className={`vinyl-spin ${playing ? 'is-playing' : ''} w-full h-full rounded-full relative shadow-2xl`}
            style={{
              background:
                'repeating-radial-gradient(circle at 50% 50%, #caa53d 0px, #e9c968 2px, #8a6a1f 4px, #f3dc94 6px)',
            }}
          >
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.35),transparent_45%)]" />

            <div className="absolute inset-[32%] rounded-full overflow-hidden border-2 border-[#e9c968] shadow-inner">
              <img src={label} alt={labelAlt} className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-[#170f28] border border-[#e9c968]/60" />
            </div>
          </div>

          <div
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
              playing ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
            }`}
          >
            <div className="w-14 h-14 rounded-full bg-[#170f28]/70 backdrop-blur-sm flex items-center justify-center border border-[#e9c968]/40">
              {playing ? (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="#f4eef7">
                  <rect x="3" y="2" width="3.5" height="12" rx="1" />
                  <rect x="9.5" y="2" width="3.5" height="12" rx="1" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 16 16" fill="#f4eef7">
                  <path d="M4 2.5v11l10-5.5-10-5.5z" />
                </svg>
              )}
            </div>
          </div>
        </button>
      </div>

      <div className="flex flex-col items-center gap-2 w-48">
        <div className="w-full h-[2px] bg-[#f4eef7]/15 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#d954d1] transition-[width] duration-150"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
        <p className="text-[10px] tracking-[0.15em] uppercase text-[#f4eef7]/75">
          {formatTime(current)} / {formatTime(duration)} &middot; prévia
        </p>
      </div>

      {youtubeUrl && (
        <motion.a
          href={youtubeUrl}
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="group inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#ff0033]/40 hover:border-[#ff0033]/80 bg-[#ff0033]/[0.08] hover:bg-[#ff0033]/20 transition-colors"
        >
          <svg width="15" height="11" viewBox="0 0 28 20" fill="none">
            <path
              d="M27.4 3.1a3.5 3.5 0 0 0-2.46-2.47C22.7 0 14 0 14 0S5.3 0 3.06.63A3.5 3.5 0 0 0 .6 3.1 36.6 36.6 0 0 0 0 10a36.6 36.6 0 0 0 .6 6.9 3.5 3.5 0 0 0 2.46 2.47C5.3 20 14 20 14 20s8.7 0 10.94-.63a3.5 3.5 0 0 0 2.46-2.47A36.6 36.6 0 0 0 28 10a36.6 36.6 0 0 0-.6-6.9Z"
              fill="#ff0033"
            />
            <path d="M11 14.3 18.5 10 11 5.7v8.6Z" fill="#170f28" />
          </svg>
          <span className="text-[10px] tracking-[0.15em] uppercase text-[#f4eef7]/90 group-hover:text-white transition-colors">
            Assistir clipe completo
          </span>
        </motion.a>
      )}

      {meta && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-1.5 text-center max-w-[220px] pt-2 border-t border-[#f4eef7]/10"
        >
          {(meta.views || meta.premiere) && (
            <p className="text-[11px] text-[#f4eef7]/70 flex items-center gap-1.5">
              {meta.views && (
                <span className="inline-flex items-center gap-1 font-medium text-[#f7b9f1]">
                  <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5Z"
                      stroke="currentColor"
                      strokeWidth="1.1"
                    />
                    <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.1" />
                  </svg>
                  <CountUpViews value={meta.views} delay={0.5} /> visualizações
                </span>
              )}
              {meta.views && meta.premiere && <span className="text-[#f4eef7]/40">&middot;</span>}
              {meta.premiere && <span>estreou {meta.premiere}</span>}
            </p>
          )}

          {meta.credit && (
            <p className="text-[10px] text-[#f4eef7]/55">{meta.credit}</p>
          )}

          {meta.tags?.length > 0 && (
            <p className="text-[10px] text-[#d954d1]/70">
              {meta.tags.map((t) => `#${t}`).join(' ')}
            </p>
          )}
        </motion.div>
      )}
    </div>
  )
}
