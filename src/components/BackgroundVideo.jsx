import { motion, useScroll, useTransform } from 'framer-motion'
import heroVideo from '../assets/videos/hero-bg.mp4'

export default function BackgroundVideo() {
  const { scrollY } = useScroll()
  const filter = useTransform(
    scrollY,
    [0, 500, 1400],
    ['blur(0px) brightness(1)', 'blur(8px) brightness(0.55)', 'blur(20px) brightness(0.22)']
  )

  return (
    <div className="fixed inset-0 -z-20 overflow-hidden">
      <motion.video
        src={heroVideo}
        autoPlay
        loop
        muted
        playsInline
        style={{ filter }}
        className="w-full h-full object-cover object-[65%_top]"
      />
    </div>
  )
}
