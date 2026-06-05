import { useEffect } from "react";
import { motion } from "framer-motion";

// Píxeles a recortar del header y footer del embed de Instagram
const CROP_TOP = 50;
const CROP_BOTTOM = 120;
const IFRAME_WIDTH = 400;
const IFRAME_HEIGHT = 710;

export default function Testimonios() {
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

  const visibleHeight = IFRAME_HEIGHT - CROP_TOP - CROP_BOTTOM;

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          className="font-serif text-navy text-3xl sm:text-4xl md:text-5xl text-center mb-12 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Hemos ayudado a cientos de personas a comprar su apartamento de la
          forma más sencilla.
        </motion.h2>

        <motion.div
          className="flex justify-center mb-14"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div
            style={{
              width: IFRAME_WIDTH,
              height: visibleHeight,
              overflow: "hidden",
              borderRadius: "12px",
            }}
          >
            <iframe
              src="https://www.instagram.com/reel/DOHiYi9iYnC/embed/"
              width={IFRAME_WIDTH}
              height={IFRAME_HEIGHT}
              frameBorder="0"
              scrolling="no"
              allowTransparency="true"
              allow="encrypted-media"
              title="Video testimonio"
              style={{ marginTop: -CROP_TOP }}
            />
          </div>
        </motion.div>

        <div
          id="featurable-c29f4a7a-ea85-49fe-898f-e666bfc8983d"
          data-featurable-async
        ></div>
      </div>
    </section>
  );
}
