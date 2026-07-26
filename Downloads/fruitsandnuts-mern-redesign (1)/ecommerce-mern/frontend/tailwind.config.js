/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Brand palette (Fruits & Nuts premium redesign)
        primary: {
          50: '#eaf4ea',
          100: '#cde5cf',
          200: '#a3d0a6',
          300: '#75b979',
          400: '#4a9d51',
          500: '#2e7d32', // brand primary
          600: '#256a29',
          700: '#1c5620',
          800: '#154018',
          900: '#0f2e11',
        },
        secondary: {
          50: '#f3f9ec',
          100: '#e2f1cd',
          200: '#c9e59f',
          300: '#aad86b',
          400: '#8bc34a', // brand secondary
          500: '#71a838',
          600: '#588429',
          700: '#41611f',
          800: '#2c4116',
          900: '#1a260c',
        },
        accent: {
          50: '#fef8e9',
          100: '#fdedc2',
          200: '#fbdc8b',
          300: '#f9c452',
          400: '#f9a825', // brand accent
          500: '#e08e0f',
          600: '#b96e0a',
          700: '#8f520c',
          800: '#6b3d0e',
          900: '#402408',
        },
        ink: '#1e1e1e', // brand text
        surface: '#f8f9fa', // brand background
        // Back-compat aliases so pages not yet redesigned (Cart, Checkout, Admin, etc.)
        // keep working unchanged until they get their own redesign pass.
        brand: {
          50: '#eaf4ea', 100: '#cde5cf', 200: '#a3d0a6', 300: '#75b979', 400: '#4a9d51',
          500: '#2e7d32', 600: '#256a29', 700: '#1c5620', 800: '#154018', 900: '#0f2e11',
        },
        cocoa: {
          50: '#fef8e9', 100: '#fdedc2', 200: '#fbdc8b', 300: '#f9c452', 400: '#f9a825',
          500: '#e08e0f', 600: '#b96e0a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(15, 46, 17, 0.12)',
        'glass-lg': '0 20px 60px -10px rgba(15, 46, 17, 0.25)',
        glow: '0 0 0 1px rgba(255,255,255,0.1), 0 8px 24px -4px rgba(46,125,50,0.35)',
        card: '0 2px 8px rgba(30,30,30,0.06), 0 1px 2px rgba(30,30,30,0.04)',
        'card-hover': '0 16px 40px -8px rgba(30,30,30,0.18)',
      },
      backgroundImage: {
        'orchard-mesh':
          'radial-gradient(circle at 15% 20%, rgba(139,195,74,0.35), transparent 45%), radial-gradient(circle at 85% 15%, rgba(249,168,37,0.28), transparent 40%), radial-gradient(circle at 50% 90%, rgba(46,125,50,0.4), transparent 50%)',
        'orchard-dark':
          'radial-gradient(circle at 15% 20%, rgba(139,195,74,0.18), transparent 45%), radial-gradient(circle at 85% 15%, rgba(249,168,37,0.14), transparent 40%), radial-gradient(circle at 50% 90%, rgba(46,125,50,0.3), transparent 50%)',
        'leaf-texture': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cpath d='M60 10c20 15 30 40 20 65-10 20-30 25-40 10-8-13-2-35 20-75z' fill='none' stroke='%232e7d32' stroke-opacity='0.05' stroke-width='2'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-8px) rotate(2deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        'fade-in': {
          '0%': { opacity: 0, transform: 'translateY(16px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: 0, transform: 'scale(0.94)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseRing: {
          '0%': { boxShadow: '0 0 0 0 rgba(37,211,102,0.5)' },
          '70%': { boxShadow: '0 0 0 12px rgba(37,211,102,0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(37,211,102,0)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float-slow 8s ease-in-out infinite',
        shimmer: 'shimmer 2s infinite linear',
        'fade-in': 'fade-in 0.6s ease-out both',
        'scale-in': 'scale-in 0.5s ease-out both',
        marquee: 'marquee 28s linear infinite',
        'pulse-ring': 'pulseRing 2.2s cubic-bezier(0.4,0,0.6,1) infinite',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
