/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#FAFAFA', // Ivory
        surface: '#FFFFFF',
        primary: '#D4AF37',    // Gold
        secondary: '#1F2937',  // Charcoal
        text: '#333333',       // Dark Gray
        muted: '#9CA3AF',
      },
      fontFamily: {
        serif: ['Merriweather', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
