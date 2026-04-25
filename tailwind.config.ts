import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        primary: {
          DEFAULT: "rgb(var(--primary) / <alpha-value>)",
          foreground: "rgb(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "rgb(var(--secondary) / <alpha-value>)",
          foreground: "rgb(var(--secondary-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "rgb(var(--muted) / <alpha-value>)",
          foreground: "rgb(var(--muted-foreground) / <alpha-value>)",
        },
        card: {
          DEFAULT: "rgb(var(--card) / <alpha-value>)",
          foreground: "rgb(var(--card-foreground) / <alpha-value>)",
        },
        border: "rgb(var(--border) / <alpha-value>)",
        
        // Strict 4-color palette
        navy: "rgb(var(--deep-blue) / <alpha-value>)",   
        sky: "rgb(var(--pastel-sky) / <alpha-value>)",
        cream: "rgb(var(--soft-cream) / <alpha-value>)",
        gold: "rgb(var(--gold-accent) / <alpha-value>)",

        // Aliases to avoid breaking existing App.tsx before cleanup
        almond: "rgb(var(--pastel-sky) / <alpha-value>)",
        blush: "rgb(var(--pastel-sky) / <alpha-value>)",
        mist: "rgb(var(--pastel-sky) / <alpha-value>)",
        ink: "rgb(var(--deep-blue) / <alpha-value>)",
        slate: "rgb(var(--muted-foreground) / <alpha-value>)",
        line: "rgb(var(--border) / 0.1)",
        sand: "rgb(var(--soft-cream) / <alpha-value>)",
        warm: "rgb(var(--soft-cream) / <alpha-value>)",
        goldTint: "rgb(var(--gold-accent) / 0.2)",
        pine: "rgb(var(--deep-blue) / <alpha-value>)",
        accent: "rgb(var(--gold-accent) / <alpha-value>)",
        "accent-foreground": "rgb(var(--soft-cream) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["Manrope", "sans-serif"],
        serif: ["Fraunces", "serif"],
        handwriting: ["Caveat", "cursive"]
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
