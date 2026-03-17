import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#FFAB00",
        secondary: "#1A85FF",
        neutral: {
          "01": "#181C32", "02": "#3F4254", "03": "#5E6278",
          "04": "#A1A5B7", "05": "#B5B5C3", "06": "#E4E6EF",
          "07": "#EFF2F5", "08": "#EFF2F5", "09": "#F1F5F8",
          "10": "#FAFAFA", "11": "#FAFAFA",
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      addComponents({
        /* --- TYPOGRAPHY SYSTEM --- */
        ".text-t1": {
          fontSize: "28px",
          fontWeight: "700",
          "@screen md": { fontSize: "48px" },
        },
        ".text-t2": {
          fontSize: "24px",
          fontWeight: "700",
          "@screen md": { fontSize: "32px" },
        },
        ".text-h1": {
          fontSize: "20px",
          fontWeight: "600",
          "@screen md": { fontSize: "28px" },
        },
        ".text-h2": {
          fontSize: "18px",
          fontWeight: "500",
          "@screen md": { fontSize: "24px" },
        },

        /* --- INPUT SYSTEM --- */
        ".input-base": {
          width: "100%",
          display: "flex",
          alignItems: "center",
          paddingLeft: "1rem",
          paddingRight: "1rem",
          gap: "0.5rem",
          borderRadius: "8px",
          outline: "none",
          backgroundColor: theme("colors.neutral.09"),
          color: theme("colors.neutral.01"),
          transition: "all 0.2s",
          "&::placeholder": { color: theme("colors.neutral.04") },
        },
        ".input-lg": { height: "56px", fontSize: "18px" },
        ".input-md": { height: "48px", fontSize: "16px" },
        ".input-sm": { height: "40px", fontSize: "14px" },

        /* --- BUTTON SYSTEM --- */
        ".btn-base": {
          inlineSize: "fit-content",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "9999px",
          fontWeight: "500",
          transition: "all 0.2s",
          "&:active": { transform: "scale(0.95)" },
        },
        ".btn-fill": {
          backgroundColor: theme("colors.primary"),
          color: "white",
          "&:hover": { filter: "brightness(1.1)" },
        },
      });
    }),
  ],
};

export default config;