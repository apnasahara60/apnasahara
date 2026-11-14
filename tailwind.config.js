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
        canvas: '#F5F6F2',
        forest: {
          DEFAULT: '#1E4733',
          50: '#F2F6F3',
          100: '#E2ECE5',
          200: '#C7DACD',
          600: '#26573F',
          700: '#1E4733',
          800: '#173627',
          900: '#0F241A',
        },
        sage: {
          50: '#F7F8F5',
          100: '#EFF2EC',
          200: '#DFE5DB',
          300: '#C8D3C3',
          400: '#9FB098',
          500: '#758C6E',
          600: '#566B50',
          700: '#3D4D39',
          800: '#2A3527',
          900: '#1A2118',
        },
        brand: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif']
      },
      animation: {
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      }
    },
  },
  plugins: [],
}
