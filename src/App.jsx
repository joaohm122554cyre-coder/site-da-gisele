import { useRef } from 'react'
import Nav from './components/Nav'
import BackgroundVideo from './components/BackgroundVideo'
import Hero from './components/Hero'
import About from './components/About'
import Stats from './components/Stats'
import MeuBarquinho from './components/MeuBarquinho'
import PhotoSessionPink from './components/PhotoSessionPink'
import Discography from './components/Discography'
import CurrentMoment from './components/CurrentMoment'
import MotherSon from './components/MotherSon'
import Videos from './components/Videos'
import Gallery from './components/Gallery'
import Agenda from './components/Agenda'
import Hire from './components/Hire'
import Press from './components/Press'
import Social from './components/Social'
import Footer from './components/Footer'

export default function App() {
  const statsRef = useRef(null)

  return (
    <div className="relative">
      <BackgroundVideo switchRef={statsRef} />

      <main className="md:pl-14 relative">
        <Nav />
        <Hero />
        <About />
        <div ref={statsRef}>
          <Stats />
        </div>
        <MeuBarquinho />
        <PhotoSessionPink />
        <Discography />
        <CurrentMoment />
        <MotherSon />
        <Videos />
        <Gallery />
        <Agenda />
        <Hire />
        <Press />
        <Social />
        <Footer />
      </main>
    </div>
  )
}
