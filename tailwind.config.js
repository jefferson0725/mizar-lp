export default {
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0A2342",
          light: "#1a3a3e",
          dark: "#081a2e",
        },
        rojo: {
          DEFAULT: "#E74C3C",
          light: "#EC6851",
          dark: "#D63D2D",
        },
        gris: {
          oscuro: "#333333",
          claro: "#F5F5F5",
        },
        dorado: {
          DEFAULT: "#D4AF37",
          light: "#E8C876",
          dark: "#B8933D",
        },
        blanco: "#FFFFFF",
      },
      fontFamily: {
        serif: ["Playfair Display", "serif"],
        sans: ["DM Sans", "sans-serif"],
      },
      boxShadow: {
        card: "0 4px 12px rgba(10, 35, 66, 0.12)",
        hover: "0 8px 20px rgba(231, 76, 60, 0.15)",
        dark: "0 4px 12px rgba(10, 35, 66, 0.18)",
      },
      backgroundImage: {
        "gradient-hero": "linear-gradient(135deg, #0A2342 0%, #1a3a3e 100%)",
        "gradient-cta": "linear-gradient(135deg, #E74C3C 0%, #D63D2D 100%)",
        "gradient-section": "linear-gradient(180deg, #FFFFFF 0%, #F5F5F5 100%)",
      },
    },
  },
};
