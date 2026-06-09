import { useEffect } from "react";
import IntroParallax from "./components/IntroParallax";
import Ubicacion from "./components/Ubicacion";
import Comentarios from "./components/Comentarios";
import Apartamentos from "./components/Apartamentos";
import Testimonios from "./components/Testimonios";
import QuienesSomos from "./components/QuienesSomos";
import Precios from "./components/Precios";
import FAQ from "./components/FAQ";
import Resumen from "./components/Resumen";
import Contacto from "./components/Contacto";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

export default function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <>
      <IntroParallax />
      <Ubicacion />
      <Comentarios />
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
  );
}
