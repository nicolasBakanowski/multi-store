/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Terracota/Siena — color primario Despacho
        verde: {
          DEFAULT: '#7A3B1E',
          light: '#9B5030',
          dark: '#5A2A12',
          50: '#F5EDE7',
          100: '#E8D5C8',
        },
        // Kraft — fondo cálido
        crema: {
          DEFAULT: '#F0E6D3',
          dark: '#E3D4BC',
          darker: '#D0BC9E',
          50: '#F8F3EC',
        },
        // Ocre/Dorado — acento
        ambar: {
          DEFAULT: '#C8892A',
          light: '#D4A040',
          dark: '#9E6A18',
          50: '#FDF4E7',
        },
        // Marrón profundo — texto
        carbon: {
          DEFAULT: '#2C1A0E',
          light: '#4A3020',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'card': '0 1px 4px rgba(44,26,14,0.07), 0 0 0 1px rgba(44,26,14,0.05)',
        'card-hover': '0 8px 32px rgba(44,26,14,0.13), 0 0 0 1px rgba(200,137,42,0.2)',
        'nav': '0 4px 24px rgba(90,42,18,0.3)',
        'glow-ambar': '0 4px 20px rgba(200,137,42,0.32)',
        'glow-verde': '0 4px 20px rgba(122,59,30,0.28)',
      },
    },
  },
  plugins: [],
}
