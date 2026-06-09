export default {
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#025362",
          light: "#0a6b7a",
          dark: "#013a45",
        },
        rojo: {
          DEFAULT: "#dfd473",
          light: "#ebe39a",
          dark: "#a89a2f",
        },
        gris: {
          oscuro: "#2d3a3d",
          claro: "#f1f4f3",
        },
        dorado: {
          DEFAULT: "#c5b94f",
          light: "#ebe39a",
          dark: "#a89a2f",
        },
        blanco: "#FFFFFF",
      },
      fontFamily: {
        serif: ["Fraunces", "Playfair Display", "serif"],
        sans: ["DM Sans", "sans-serif"],
      },
      boxShadow: {
        card: "0 4px 12px rgba(2, 83, 98, 0.12)",
        hover: "0 8px 20px rgba(2, 83, 98, 0.18)",
        dark: "0 4px 12px rgba(1, 58, 69, 0.2)",
      },
      backgroundImage: {
        "gradient-hero": "linear-gradient(135deg, #013a45 0%, #025362 55%, #0a6b7a 100%)",
        "gradient-cta": "linear-gradient(135deg, #ebe39a 0%, #dfd473 100%)",
        "gradient-section": "linear-gradient(180deg, #FFFFFF 0%, #f1f4f3 100%)",
      },
    },
  },
};
