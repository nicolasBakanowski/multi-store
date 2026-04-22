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
        verde: {
          DEFAULT: '#1B3D2A',
          light: '#2E5B40',
          dark: '#12291C',
          50: '#EDF5F0',
        },
        crema: {
          DEFAULT: '#F5F0E8',
          dark: '#EBE3D5',
          darker: '#D9CEBF',
        },
        ambar: {
          DEFAULT: '#C8913A',
          light: '#D4A843',
          dark: '#A07228',
        },
        carbon: {
          DEFAULT: '#1C1C1C',
          light: '#3A3A3A',
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
    },
  },
  plugins: [],
}
