import defaultTheme from "tailwindcss/defaultTheme";
import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
        heading: ["var(--font-manrope)", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        background: "var(--color-background)",
        "text-primary": "var(--color-text-primary)",
        "text-secondary": "var(--color-text-secondary)",
        "accent-primary": "var(--color-accent-primary)",
        "accent-secondary": "var(--color-accent-secondary)",
        "border-color": "var(--color-border-color)",
      },
    },
  },
  plugins: [
    typography({
      theme: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
          },
        },
      },
    }),
  ],
};

export default config;
