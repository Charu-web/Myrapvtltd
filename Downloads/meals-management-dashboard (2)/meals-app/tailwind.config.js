/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          blue: '#3B9FE0',
          blueDark: '#2B87CC',
          blueLight: '#EAF4FC',
          blueSoft: '#DCEEFB',
        },
        sidebar: {
          from: '#E4453A',
          to: '#8E1B1B',
          active: '#FFFFFF',
        },
      },
      boxShadow: {
        card: '0 10px 30px -10px rgba(15, 23, 42, 0.15)',
        modal: '0 24px 60px -12px rgba(15, 23, 42, 0.35)',
        sidebar: '4px 0 24px -8px rgba(139, 0, 0, 0.35)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [],
}
