import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { INSTAGRAM_URL } from "../constants";
import videoTestimonios from "../assets/videos/testimios.mp4";

const VIDEO_WIDTH = 400;

export default function Testimonios() {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const toggleAudio = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  return (
    <section id="video-testimonios" className="py-20 px-6 bg-white">
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
          <div className="w-full max-w-sm">
            <div className="relative">
              <video
                ref={videoRef}
                src={videoTestimonios}
                width={VIDEO_WIDTH}
                autoPlay
                muted={isMuted}
                loop
                playsInline
                className="w-full rounded-xl"
                style={{ display: "block" }}
              />
              <button
                onClick={toggleAudio}
                className="absolute bottom-4 right-4 bg-black bg-opacity-60 hover:bg-opacity-80 text-white p-2.5 rounded-full transition-all"
                title={isMuted ? "Activar audio" : "Desactivar audio"}
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </button>
            </div>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full mt-2 py-3 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white font-semibold rounded-lg hover:shadow-lg transition-shadow"
            >
              Ver más en Instagram
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
