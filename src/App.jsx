import { useEffect } from 'react'
import IntroParallax from './components/IntroParallax'
import Ubicacion from './components/Ubicacion'
import Apartamentos from './components/Apartamentos'
import QuienesSomos from './components/QuienesSomos'
import Testimonios from './components/Testimonios'
import Precios from './components/Precios'
import FAQ from './components/FAQ'
import Resumen from './components/Resumen'
import Contacto from './components/Contacto'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'

export default function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
  }, [])

  return (
    <>
      <IntroParallax />
      <Ubicacion />
      <Apartamentos />
      <Testimonios />
      <QuienesSomos />
      <Precios />
      <FAQ />
      <Resumen />
      <Contacto />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
