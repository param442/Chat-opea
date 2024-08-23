import type { Config } from "tailwindcss";

const config: Omit<Config, "content"> = {
  theme: {
    extend: {
      boxShadow: {
        "inner-glow": "inset 0 0 8px rgba(255, 255, 255, 0.6)", // Customize as needed
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        BlackRussian: "#1F1F22",
        EerieBlack: "#1A1A1E",
        VividGreen: "#40F251",
        Lavender: "#7262F2",
        MagentaPurple: "#BB4FE8", // Fixed typo from 'MagentaPurpel' to 'MagentaPurple'
        CharcoalGray: "#2C2C32", // Fixed typo from 'CharcolGrey' to 'CharcoalGray'
        HotPink: "#FB668A",
        ShadowBlack: "#2A2A2D",
        BlueCharcol: "#26272D",
        SunFlowerYellow: "#FFD939",
      },
      backgroundImage: {
        "glow-conic":
          "conic-gradient(from 180deg at 50% 50%, #2a8af6 0deg, #a853ba 180deg, #e92a67 360deg)",
      },
    },
  },
  plugins: [],
};

export default config;
