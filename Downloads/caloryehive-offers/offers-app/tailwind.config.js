/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff1f0',
          100: '#ffe1de',
          200: '#ffc9c4',
          300: '#ffa39a',
          400: '#ff6e60',
          500: '#f43f2e',
          600: '#e0271c',
          700: '#bd1c18',
          800: '#9c1a19',
          900: '#821a1c',
          950: '#470a0a',
        },
        ink: {
          900: '#141414',
          800: '#1f1f1f',
          700: '#2b2b2b',
        },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 8px rgba(20, 20, 20, 0.04), 0 1px 2px rgba(20,20,20,0.03)',
        'card-hover': '0 20px 40px -12px rgba(20, 20, 20, 0.15)',
        sidebar: '4px 0 24px rgba(196, 30, 25, 0.15)',
        pop: '0 12px 24px -8px rgba(0,0,0,0.35)',
      },
      borderRadius: {
        xl2: '1.25rem',
        xl3: '1.75rem',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(165deg, #ff6e60 0%, #e0271c 45%, #7a1414 100%)',
        'brand-gradient-soft': 'linear-gradient(180deg, #ff8a7c 0%, #d4231c 100%)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
