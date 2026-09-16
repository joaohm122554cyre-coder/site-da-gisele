import { motion, useScroll, useTransform } from 'framer-motion'
import heroVideo from '../assets/videos/hero-bg.mp4'

export default function BackgroundVideo() {
  const { scrollY } = useScroll()
  const blur = useTransform(
    scrollY,
    [0, 400, 1200],
    ['blur(0px)', 'blur(6px)', 'blur(18px)']
  )

  return (
    <div className="fixed inset-0 -z-20 overflow-hidden">
      <motion.video
        src={heroVideo}
        autoPlay
        loop
        muted
        playsInline
        style={{ filter: blur }}
        className="w-full h-full object-cover object-[65%_top] grayscale-[15%]"
      />
    </div>
  )
}
