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
import Videos from './components/Videos'
import Gallery from './components/Gallery'
import Divider from './components/Divider'
import Agenda from './components/Agenda'
import Hire from './components/Hire'
import Press from './components/Press'
import Social from './components/Social'
import Footer from './components/Footer'

export default function App() {
  const discographyRef = useRef(null)

  return (
    <div className="relative">
      <BackgroundVideo switchRef={discographyRef} />

      <main className="md:pl-14 relative">
        <Nav />
        <Hero />
        <About />
        <Stats />
        <MeuBarquinho />
        <PhotoSessionPink />
        <div ref={discographyRef}>
          <Discography />
        </div>
        <CurrentMoment />
        <Videos />
        <Gallery />
        <Divider />
        <Agenda />
        <Hire />
        <Press />
        <Social />
        <Footer />
      </main>
    </div>
  )
}
