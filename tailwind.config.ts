import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FFF8F0",
        almond: "#F8EEDC",
        blush: "#F1DCCF",
        mist: "#EAF4FA",
        navy: "#013648",
        ink: "#173E50",
        slate: "#56707B",
        line: "#DED6C8",
        sand: "#FEFBF6",
        warm: "#F9F0E3",
        gold: "#AD9759",
        goldTint: "#F5E7C1",
        pine: "#29493F",
        background: "#FFF8F0",
        foreground: "#173E50",
        card: "#FEFBF6",
        "card-foreground": "#173E50",
        border: "#DED6C8",
        primary: "#013648",
        "primary-foreground": "#FFF8F0",
        secondary: "#F9F0E3",
        "secondary-foreground": "#013648",
        muted: "#F5EEE4",
        "muted-foreground": "#56707B",
        accent: "#EAF4FA",
        "accent-foreground": "#013648"
      },
      fontFamily: {
        sans: ["Manrope", "sans-serif"],
        serif: ["Fraunces", "serif"]
      },
      boxShadow: {
        glow: "0 26px 80px rgba(1, 54, 72, 0.12)",
        float: "0 18px 50px rgba(1, 54, 72, 0.14)",
        card: "0 14px 40px rgba(1, 54, 72, 0.08)",
        halo: "0 18px 45px rgba(173, 151, 89, 0.24)"
      },
      backgroundImage: {
        grain:
          "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.72), transparent 36%), radial-gradient(circle at 80% 0%, rgba(219,229,239,0.45), transparent 28%), radial-gradient(circle at 50% 100%, rgba(236,216,207,0.36), transparent 30%)"
      }
    }
  },
  plugins: []
} satisfies Config;
