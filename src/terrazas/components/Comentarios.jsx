import { useEffect } from "react";
import { motion } from "framer-motion";

export default function Comentarios() {
  useEffect(() => {
    const featurableScript = document.createElement("script");
    featurableScript.src =
      "https://featurable.com/assets/v2/carousel_default.min.js";
    featurableScript.defer = true;
    featurableScript.charset = "UTF-8";
    document.body.appendChild(featurableScript);
    return () => {
      document.body.removeChild(featurableScript);
    };
  }, []);

  return (
    <section id="comentarios" className="py-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          className="font-serif text-navy text-3xl sm:text-4xl md:text-5xl text-center mb-12 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Lo que dicen nuestros clientes
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div
            id="featurable-c29f4a7a-ea85-49fe-898f-e666bfc8983d"
            data-featurable-async
          ></div>
        </motion.div>
      </div>
    </section>
  );
}
