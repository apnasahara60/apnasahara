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
        // Art Nouveau Florido Palette
        primary: '#008080',      // Deep Teal
        secondary: '#CFB53B',    // Old Gold
        tertiary: '#E0B0FF',     // Mauve
        neutral: '#FFFFF0',      // Ivory
        surface: '#808000',      // Olive Green
        accent: '#800020',       // Burgundy
        peacock: '#005F9E',      // Peacock Blue
        cream: '#FFFDD0',        // Cream

        // Semantic tones
        nouveau: {
          teal: '#008080',
          tealDark: '#006666',
          tealLight: '#0d9b9b',
          gold: '#CFB53B',
          goldMuted: '#e3d27a',
          goldDark: '#99831d',
          mauve: '#E0B0FF',
          mauveLight: '#f3e1ff',
          ivory: '#FFFFF0',
          ivorySoft: '#fafae8',
          olive: '#808000',
          burgundy: '#800020',
          peacock: '#005F9E',
          cream: '#FFFDD0',
          charcoal: '#17211C',
          charcoalSoft: '#242F29',
          ink: '#101714',
        },

        canvas: '#FFFFF0',
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
          500: '#008080',
          600: '#006666',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        }
      },
      borderRadius: {
        'art': '12px',
        'art-lg': '18px',
        'art-xl': '24px',
      },
      boxShadow: {
        'nouveau': '0 2px 12px rgba(23, 33, 28, 0.06)',
        'nouveau-hover': '0 8px 24px rgba(23, 33, 28, 0.12)',
        'gold-glow': '0 0 16px rgba(207, 181, 59, 0.25)',
      },
      fontFamily: {
        quattrocento: ['Quattrocento', 'Georgia', 'serif'],
        serif: ['Quattrocento', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'Consolas', 'monospace'],
        sans: ['Quattrocento', 'Inter', 'sans-serif'],
        display: ['Quattrocento', 'serif'],
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      animation: {
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'fade-in-up': 'fadeInUp 480ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
