import { motion, useScroll, useTransform } from 'framer-motion'
import heroVideo from '../assets/videos/hero-bg.mp4'
import statsVideo from '../assets/videos/stats-bg.mp4'

export default function BackgroundVideo({ switchRef }) {
  const { scrollY } = useScroll()
  const heroFilter = useTransform(
    scrollY,
    [0, 300, 900],
    [
      'blur(0px) brightness(0.8) saturate(0.8)',
      'blur(10px) brightness(0.4) saturate(0.75)',
      'blur(20px) brightness(0.18) saturate(0.7)',
    ]
  )

  const { scrollYProgress } = useScroll({
    target: switchRef,
    offset: ['start 90%', 'start 35%'],
  })
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const statsOpacity = useTransform(scrollYProgress, [0, 1], [0, 1])

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
        style={{ filter: heroFilter, opacity: heroOpacity }}
        className="absolute inset-0 w-full h-full object-cover object-[65%_top]"
      />
      <motion.video
        src={statsVideo}
        autoPlay
        loop
        muted
        playsInline
        style={{ opacity: statsOpacity, filter: 'blur(3px) brightness(0.5) saturate(0.85)' }}
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  )
}
