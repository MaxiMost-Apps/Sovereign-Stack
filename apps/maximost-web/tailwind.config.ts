/** @type {import('tailwindcss').Config} */
export default {
  content: ['./client/index.html', './client/src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // THE VOID PALETTE
        background: '#050505', // True Black (OLED friendly)
        surface: '#0A0A0A',    // Deepest Charcoal
        glass: 'rgba(255, 255, 255, 0.03)', // The "Frost" layer
        border: 'rgba(255, 255, 255, 0.08)',

        // HUD ACCENTS (High Neon)
        neon: {
          blue: '#2E9CDB',   // Sci-fi Blue
          teal: '#00E5FF',   // Cyber Teal
          amber: '#FFB300',  // Warning/Focus
          red: '#FF2A6D',    // Critical/Delete
          purple: '#D946EF', // Creative/AI
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'], // For numbers/data
      },
      animation: {
        'enter': 'enter 0.4s ease-out forwards',
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        enter: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 10px rgba(0, 229, 255, 0.1)' },
          '50%': { opacity: '.8', boxShadow: '0 0 20px rgba(0, 229, 255, 0.3)' },
        }
      }
    },
  },
  plugins: [],
};
