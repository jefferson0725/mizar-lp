import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const FORM_ID = "3fFCODye6YCSItphtEmo";

export default function Contacto() {
  const iframeRef = useRef(null);
  const [iframeHeight, setIframeHeight] = useState(600);

  useEffect(() => {
    // Load sixteam embed script
    if (!document.querySelector(`script[src*="form_embed.js"]`)) {
      const script = document.createElement("script");
      script.src = "https://web.sixteam.pro/js/form_embed.js";
      document.body.appendChild(script);
    }

    // Listen for postMessage height updates from the iframe
    function onMessage(e) {
      try {
        const data = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
        if (!data) return;

        // GHL / sixteam format
        const h =
          data.height ??
          data.frameHeight ??
          (data.type === "GHL:iframeResize" ? data.value : null) ??
          (data.id === FORM_ID ? data.height : null);

        if (h && Number(h) > 100) {
          setIframeHeight(Number(h));
        }
      } catch {
        // ignore parse errors
      }
    }

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-2xl mx-auto">
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
          <h2 className="font-serif text-navy text-3xl sm:text-4xl md:text-5xl mb-4 leading-tight">
            Tu apartamento propio en Piedecuesta está más cerca de lo que crees, sin importar dónde estés hoy.
          </h2>
          <p className="text-gray-600 text-lg">Cuéntanos tu caso y te explicamos cuál plan se ajusta a ti.</p>
        </motion.div>

        <iframe
          ref={iframeRef}
          src={`https://web.sixteam.pro/widget/form/${FORM_ID}`}
          style={{ width: "100%", height: `${iframeHeight}px`, border: "none", borderRadius: "3px", transition: "height 0.3s ease" }}
          id={`inline-${FORM_ID}`}
          data-layout='{"id":"INLINE"}'
          data-trigger-type="alwaysShow"
          data-trigger-value=""
          data-activation-type="alwaysActivated"
          data-activation-value=""
          data-deactivation-type="neverDeactivate"
          data-deactivation-value=""
          data-form-name="Agendamiento de llamadas Terrazas"
          data-height="600"
          data-layout-iframe-id={`inline-${FORM_ID}`}
          data-form-id={FORM_ID}
          title="Agendamiento de llamadas Terrazas"
        />
      </div>
    </section>
  );
}
