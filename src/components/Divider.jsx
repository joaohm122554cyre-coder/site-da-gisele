import { Fragment } from 'react'
import { motion } from 'framer-motion'
import ornament from '../assets/ornament-divider.png'

const maskStyle = {
  WebkitMaskImage: `url(${ornament})`,
  maskImage: `url(${ornament})`,
}

export default function Divider() {
  return (
    <div className="relative pt-6 md:pt-10 pb-6 md:pb-10 px-3 md:px-6 flex justify-center">
      <motion.div
        initial={{ clipPath: 'inset(-24px 50% -24px 50%)' }}
        whileInView={{ clipPath: 'inset(-24px -24px -24px -24px)' }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 1.8, ease: [0.45, 0, 0.25, 1] }}
        className="relative w-full max-w-[720px]"
      >
        <img
          src={ornament}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="ornament-glow w-full"
        />
        {/* duas camadas iguais somam a intensidade da luz sobre o traço fino */}
        {[0, 1].map((layer) => (
          <Fragment key={layer}>
            <span aria-hidden="true" className="ornament-shine ornament-shine-left" style={maskStyle} />
            <span aria-hidden="true" className="ornament-shine ornament-shine-right" style={maskStyle} />
          </Fragment>
        ))}
      </motion.div>
    </div>
  )
}
