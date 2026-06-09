import { useEffect } from "react";
import IntroParallax from "./components/IntroParallax";
import Ubicacion from "./components/Ubicacion";
import Timeline from "./components/Timeline";
import Apartamentos from "./components/Apartamentos";
import Testimonios from "./components/Testimonios";
import QuienesSomos from "./components/QuienesSomos";
import Precios from "./components/Precios";
import FAQ from "./components/FAQ";
import Resumen from "./components/Resumen";
import Contacto from "./components/Contacto";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

export default function TerrazasApp() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    document.title = "Terrazas de la Cantera · Apartamentos en Piedecuesta | Mizar";
    return () => {
      document.title = "Laureles Campestre · Apartamentos en Girón | Mizar";
    };
  }, []);

  return (
    // theme-terrazas sobreescribe los tokens CSS de Tailwind (navy → teal, rojo → lima)
    <div className="theme-terrazas">
      <IntroParallax />
      <Ubicacion />
      <Timeline />
      <Apartamentos />
      <Testimonios />
      <QuienesSomos />
      <Precios />
      <FAQ />
      <Resumen />
      <Contacto />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
