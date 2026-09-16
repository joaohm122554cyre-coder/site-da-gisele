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
  return (
    <div className="relative">
      <BackgroundVideo />
      <div className="absolute inset-x-0 top-0 h-[220vh] -z-10 bg-gradient-to-b from-transparent via-[#1c1638]/65 to-[#14122a]" />

      <main className="md:pl-14 relative">
        <Nav />
        <Hero />
        <About />
        <Stats />
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
