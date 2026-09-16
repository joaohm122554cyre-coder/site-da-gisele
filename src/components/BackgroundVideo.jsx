import { motion, useScroll, useTransform } from 'framer-motion'
import heroVideo from '../assets/videos/hero-bg.mp4'

export default function BackgroundVideo() {
  const { scrollY } = useScroll()
  const filter = useTransform(
    scrollY,
    [0, 300, 900],
    [
      'blur(0px) brightness(0.8) saturate(0.8)',
      'blur(10px) brightness(0.4) saturate(0.75)',
      'blur(20px) brightness(0.18) saturate(0.7)',
    ]
  )

  return (
    <div className="fixed inset-0 -z-20 overflow-hidden">
      <motion.video
        src={heroVideo}
        autoPlay
        loop
        muted
        playsInline
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
        style={{ filter }}
        className="w-full h-full object-cover object-[65%_top]"
      />
    </div>
  )
}
