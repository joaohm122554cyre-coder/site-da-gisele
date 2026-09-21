import { useRef } from 'react'
import Nav from './components/Nav'
import BackgroundVideo from './components/BackgroundVideo'
import Hero from './components/Hero'
import About from './components/About'
import Timeline from './components/Timeline'
import Stats from './components/Stats'
import MeuBarquinho from './components/MeuBarquinho'
import CurrentMoment from './components/CurrentMoment'
import Videos from './components/Videos'
import Gallery from './components/Gallery'
import PhotoSessionBlue from './components/PhotoSessionBlue'
import Divider from './components/Divider'
import Agenda from './components/Agenda'
import Hire from './components/Hire'
import Press from './components/Press'
import Social from './components/Social'
import ClosingQuote from './components/ClosingQuote'
import Footer from './components/Footer'

export default function App() {
  const switchRef = useRef(null)

  return (
    <div className="relative">
      <BackgroundVideo switchRef={switchRef} />

      <main className="md:pl-14 relative">
        <Nav />
        <Hero />
        <About />
        <Timeline />
        <Stats />
        <MeuBarquinho />
        <div ref={switchRef}>
          <CurrentMoment />
        </div>
        <Videos />
        <Gallery />
        <PhotoSessionBlue />
        <Divider />
        <Agenda />
        <Hire />
        <Press />
        <Social />
        <ClosingQuote />
        <Footer />
      </main>
    </div>
  )
}
