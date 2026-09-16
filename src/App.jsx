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
      <div className="absolute inset-x-0 top-0 h-[220vh] -z-10 bg-[linear-gradient(to_bottom,transparent_0%,transparent_38%,#3a1030_46%,#33224a_58%,#241a42_72%,#1c1638_86%,#14122a_100%)]" />

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
