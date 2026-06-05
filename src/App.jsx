import { useEffect } from 'react'
import Hero from './components/Hero'
import GanchoEmocional from './components/GanchoEmocional'
import Ubicacion from './components/Ubicacion'
import Apartamentos from './components/Apartamentos'
import Testimonios from './components/Testimonios'
import Precios from './components/Precios'
import FAQ from './components/FAQ'
import Contacto from './components/Contacto'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'

export default function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
  }, [])

  return (
    <>
      <Hero />
      <GanchoEmocional />
      <Ubicacion />
      <Apartamentos />
      <Testimonios />
      <Precios />
      <FAQ />
      <Contacto />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
