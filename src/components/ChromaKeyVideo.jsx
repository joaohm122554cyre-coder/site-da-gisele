import { useEffect, useRef } from 'react'

// Os vídeos 3D dos ícones vêm com fundo verde (chroma key) pra edição de
// vídeo. Aqui a gente desenha cada quadro num canvas e apaga os pixels
// verdes, deixando só o ícone com fundo transparente.
export default function ChromaKeyVideo({ src, size = 64, className = '' }) {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    let raf

    const draw = () => {
      if (video.readyState >= 2) {
        ctx.drawImage(video, 0, 0, size, size)
        const frame = ctx.getImageData(0, 0, size, size)
        const d = frame.data
        for (let i = 0; i < d.length; i += 4) {
          const r = d[i]
          const g = d[i + 1]
          const b = d[i + 2]
          if (g > 85 && g > r * 1.25 && g > b * 1.25) {
            d[i + 3] = 0
          }
        }
        ctx.putImageData(frame, 0, 0)
      }
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [size])

  return (
    <>
      <video ref={videoRef} src={src} autoPlay loop muted playsInline className="hidden" />
      <canvas ref={canvasRef} width={size} height={size} className={className} />
    </>
  )
}
