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
        vb: {
          negro: '#1C0A00',
          ambar: '#E8952A',
          dorado: '#F5C96A',
          rojo: '#C0341A',
          crema: '#F7F1E8',
          // tonos auxiliares (derivados)
          'negro-soft': '#4A2A10',
          'crema-2': '#F3E7D7',
        },
      },
      fontFamily: {
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        card: '0 1px 4px rgba(28,10,0,0.07), 0 0 0 1px rgba(28,10,0,0.06)',
        'card-hover': '0 10px 38px rgba(28,10,0,0.14), 0 0 0 1px rgba(232,149,42,0.22)',
        nav: '0 6px 28px rgba(28,10,0,0.45)',
        'glow-ambar': '0 6px 24px rgba(232,149,42,0.32)',
        'glow-dorado': '0 6px 24px rgba(245,201,106,0.28)',
      },
    },
  },
  plugins: [],
}
