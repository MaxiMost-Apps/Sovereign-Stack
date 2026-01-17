/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#FAFAFA', // Off-white / Silk
        foreground: '#171717',
        primary: {
          DEFAULT: '#D4AF37', // Gold
          foreground: '#FFFFFF',
        },
        muted: '#F5F5F5',
        card: '#FFFFFF',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Assuming Inter or system font
        serif: ['Merriweather', 'serif'], // For the Manifesto maybe?
      },
    },
  },
  plugins: [],
}
