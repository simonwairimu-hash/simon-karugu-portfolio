/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        portfolio: {
          bg: 'var(--portfolio-bg)',
          card: 'var(--portfolio-card)',
          accent: 'var(--portfolio-accent)',
          text: 'var(--portfolio-text)',
          muted: 'var(--portfolio-muted)',
          border: 'var(--portfolio-border)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
