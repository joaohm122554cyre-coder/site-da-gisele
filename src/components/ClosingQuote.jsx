import Reveal from './Reveal'

export default function ClosingQuote() {
  return (
    <section className="relative pb-24 md:pb-32">
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
        <Reveal>
          <span className="mx-auto mb-10 block h-px w-16 bg-gradient-to-r from-transparent via-[#d954d1] to-transparent" />
          <p className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-[#f4eef7]/85 leading-snug [text-shadow:0_1px_18px_rgba(10,8,25,0.85)]">
            &ldquo;Mais do que uma cantora,{' '}
            <span className="not-italic font-semibold text-[#d954d1] text-[1.15em]">
              Giselli Cristina
            </span>{' '}
            representa uma geração da{' '}
            <span className="text-[#f4eef7]">música gospel brasileira</span>. Sua
            trajetória é marcada por{' '}
            <span className="text-[#f4eef7]">fé, excelência, credibilidade</span> e
            canções que continuam emocionando pessoas em todo o país.&rdquo;
          </p>
        </Reveal>
      </div>
    </section>
  )
}
