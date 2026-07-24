/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#E53E4D',
          redDark: '#C0202F',
          redDeep: '#8C1621',
          blue: '#3B82F6',
          blueDark: '#2563EB',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 14px rgba(0,0,0,0.06)',
        modal: '0 20px 60px rgba(0,0,0,0.25)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [],
}
