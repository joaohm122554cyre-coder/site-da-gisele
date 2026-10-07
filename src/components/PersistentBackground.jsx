import { useEffect, useRef } from 'react'
import fundoVideo from '../assets/videos/stats-bg.mp4'

// Fica montado no Root, nunca desmonta ao trocar de página (/, /dupla,
// /single-de-ouro). Sem isso, cada página tinha seu próprio vídeo de fundo,
// que reiniciava do zero a cada troca de rota — daí o flash de fundo roxo
// sólido por alguns segundos enquanto o vídeo novo carregava.
// active=false na home: ela já tem seu próprio fundo de vídeo cobrindo a tela
// inteira, então esse aqui fica escondido atrás à toa — decodificar um vídeo
// que ninguém vê pesa bastante em Android mais fraco. Só toca de verdade nas
// outras páginas (/dupla, /single-de-ouro), que não têm fundo próprio.
export default function PersistentBackground({ active = true }) {
  const ref = useRef(null)

  useEffect(() => {
    const video = ref.current
    video.muted = true
    if (active) video.play().catch(() => {})
  }, [])

  useEffect(() => {
    const video = ref.current
    if (!video) return
    if (active) video.play().catch(() => {})
    else video.pause()
  }, [active])

  return (
    <div aria-hidden="true" className="fixed inset-0 -z-30 h-lvh overflow-hidden">
      <video
        ref={ref}
        src={fundoVideo}
        autoPlay
        loop
        muted
        playsInline
        preload={active ? 'auto' : 'none'}
        disableRemotePlayback
        className="h-full w-full object-cover"
        style={{ filter: 'blur(2px) brightness(0.4) saturate(0.9)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#14122a]/60 via-[#1c1638]/35 to-[#170f28]/70" />
    </div>
  )
}
